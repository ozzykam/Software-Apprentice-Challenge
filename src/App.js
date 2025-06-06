import './App.css';
import { useEffect } from 'react';

function App() {
  const fetchFakeData = async () => {
    const response = await fetch('http://localhost:3000/fakeDataSet');
    const fakeData = await response.json();
    console.log(fakeData);
  }

  useEffect(() => {
    fetchFakeData();
  }, []);
  return (
    <>
    </>
  );
}

export default App;
