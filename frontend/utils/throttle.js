// src/utils/throttle.js
//마지막 호출 이후 일정 시간이 지난 후에만 함수가 다시 호출될 수 있도록해주는 함수
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    } else {
      console.log('Throttled:', func.name); // 쓰로틀링 발생 시 콘솔에 로그 출력
    }
  };
};

export default throttle;
