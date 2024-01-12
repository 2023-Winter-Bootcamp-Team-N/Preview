import json

from channels.generic.websocket import WebsocketConsumer
from langchain.document_loaders import YoutubeLoader
import dotenv
import openai
import os
from youtube_transcript_api import YouTubeTranscriptApi
import math

dotenv.load_dotenv()

class Consumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        url = text_data_json["message"]
        # url = request.data.get('url')

        loader = YoutubeLoader.from_youtube_url(
                str(url),
                add_video_info=True,
                language=["ko"],
                translation="ko")
        result = loader.load()

        meta_data = result[0].metadata
        print(meta_data)
        print(meta_data['title'])
        lang_code = 'ko'  # 한국어로 설정
        video_id = meta_data['source'] #7분

        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=[lang_code])

        video_length = transcript[-1]['start']

        # 구간 나누기
        if(video_length < 240): # 3분 대 영상까지는 1개
            section_num = 1
            section_range = video_length
        elif(video_length < 540): # 8분대 영상까지는 2개
            section_num = 2
            section_range = int(video_length / section_num)
        elif(video_length < 960): # 15분대 영상까지는 3개
            section_num = 3
            section_range = int(video_length / section_num)
        elif(video_length <= 1200): #20분대 영상까지는 4개
            section_num = 4
            section_range = int(video_length / section_num)
        else: # 그 이상은 5분 단위로 나눈다.
            section_range = 350
            section_num = int(video_length / section_range)

        sections = [[] for _ in range(section_num)]
        section_time = section_range
        index = 0
        summary_by_times = [{} for _ in range(section_num)]
        summary_by_times[index]["start_time"] = "00:00"

        for entry in transcript:
            if(entry['start'] <= section_time):
                if '[' not in entry['text'] and ']' not in entry['text']:
                    sections[index].append(entry['text'])
            
            if(entry['start'] > section_time):
                section_time += section_range
                index += 1

                if(index >= section_num): break
                
                minutes, seconds = divmod(entry['start'], 60)
                seconds = math.floor(seconds)
                formatted_time = f"{int(minutes):02d}:{int(seconds):02d}"
                summary_by_times[index]["start_time"] = formatted_time

                if '[' not in entry['text'] and ']' not in entry['text']:
                    sections[index].append(entry['text'])

        for i in range(len(sections)):
            sections[i] = "".join(sections[i])

        openai.api_key = os.environ.get("OPENAI_API_KEY")

        model_name = 'gpt-3.5-turbo'

        system_prompt = [
                        'I want you to act as a Life Coach that can create good summaries!',
                        'Pick out only the important points and summarize them as briefly and concisely as possible.',
                        'Your answer must be 3 lines or less and must be in Korean.',
                        'I want you to select categories!',
                        'There are a total of 15 categories: 요리, 게임, 과학, 경제, 여행, 미술, 스포츠, 사회, 건강, 동물, 코미디, 교육, 연예, 음악, 기타. Based on the summary, you must select at least 1 and up to 2 categories from the categories presented. do not exlplan. just select.',
                        ]

        # 시간별 요약
        index = 0
        summaries = []
        for section in sections:
            section = str(section)
            if(len(section) < 300): continue
            section_summary_prompt = f'''
                    Summarize the following text in korean.
                    Text: {section}
                    Include an BULLET POINTS if possible
                    Please select only the 3 to 4 most important contents.
                    '''

            # response1 = openai.ChatCompletion.create(
            #     model=model_name,
            #     messages=[
            #         {'role': 'system', 'content': system_prompt[0]},
            #         {'role': 'assistant', 'content': system_prompt[1]},
            #         {'role': 'assistant', 'content': system_prompt[2]},
            #         {'role': 'user', 'content': section_summary_prompt}
            #     ],
            #     temperature=0,
            # )
            answer = ""
            for chunk in openai.ChatCompletion.create(
                model=model_name,
                messages=[
                    {'role': 'system', 'content': system_prompt[0]},
                    {'role': 'assistant', 'content': system_prompt[1]},
                    {'role': 'assistant', 'content': system_prompt[2]},
                    {'role': 'user', 'content': section_summary_prompt}
                ],
                temperature=0,
                stream=True
            ):
                finish_reason = chunk.choices[0].finish_reason
                if chunk.choices[0].finish_reason == "stop":
                    self.send(json.dumps({"message": "", "finish_reason": finish_reason}))
                    break

                answer = chunk.choices[0].delta["content"]

                # 메시지를 클라이언트로 바로 전송
                self.send(json.dumps({"message": answer, "finish_reason": finish_reason}, ensure_ascii=False))
                answer += answer

            print("Summary:")
            summaries.append(answer)
        
        print(summaries)
        #     summary = response1['choices'][0]['message']['content']
        #     print(summary)
        #     summary_by_times[index]["content"] = summary
        #     index += 1
            
            

        # # 전체 간단 요약
        # summary_collections = str(summaries)
        # all_summary_prompt1 =f'''
        #             Please select only the 3 to 5 most important contents.
        #             Text: {summary_collections}
        #             '''
        # response2 = openai.ChatCompletion.create(
        #     model=model_name,
        #     messages=[
        #         {'role': 'system', 'content': system_prompt[0]},
        #         {'role': 'assistant', 'content': system_prompt[1]},
        #         {'role': 'assistant', 'content': system_prompt[2]},
        #         {'role': 'user', 'content': all_summary_prompt1}
        #     ],
        #     temperature=0,
        # )

        # print()
        # print("간단요약:")
        # simple = response2['choices'][0]['message']['content']
        # print(simple)


        # # 카테고리 분류
        # category_prompt = f'''
        #             Text: {simple}
        #             ex)카테고리: 게임, 교육
        #             '''

        # response3 = openai.ChatCompletion.create(
        #     model=model_name,
        #     messages=[
        #         {'role': 'system', 'content': system_prompt[3]},
        #         {'role': 'assistant', 'content': system_prompt[4]},
        #         {'role': 'user', 'content': category_prompt}
        #     ],
        #     temperature=0,
        # )

        # print("카테고리:")
        # category_list = response3['choices'][0]['message']['content']
        # print(category_list)

        # result = category_list.split(": ")[1].split(",")

        # base_category = ['요리', '게임', '과학', '경제', '여행', '미술', '스포츠', '사회', '건강', '동물', '코미디', '교육', '연예', '음악', '기타']

        # categories = []
        # # 결과 출력
        # print(result)
        # for cateogry in result:
        #     category = cateogry.strip()
        #     if category not in base_category:
        #         continue
        #     categories.append({"category":cateogry.strip()})

        # if (len(categories) == 0): categories.append({"category":"기타"})

        # print(categories)

        # summary = {"title" : meta_data['title'],
        #             "channel" : meta_data['author'],
        #             "url" : url,
        #             "thumbnail" : meta_data['thumbnail_url'],
        #             "content" : simple
        #             }

        # response_data ={"summary" : summary,
        #                 "summary_by_times" : summary_by_times,
        #                 "categories" : categories}

        # print(response_data)
        # for i in range(4):
        #     self.send(text_data=json.dumps({"message": message}))