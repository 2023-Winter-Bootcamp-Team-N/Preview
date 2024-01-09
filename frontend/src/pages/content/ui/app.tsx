import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return <div className="fixed bottom-9 right-10 w-48 h-24 bg-black text-white p-4 rounded-md z-50">Hello World!</div>;
}
