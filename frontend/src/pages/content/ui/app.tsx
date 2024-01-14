import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content/ui/app.tsx 실행 됨');
  }, []);

  return <div className="">content view</div>;
}
