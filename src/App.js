import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [fakeDataSet, setFakeDataSet] = useState(null);
  const fetchFakeData = async () => {
    const response = await fetch('http://localhost:3000/fakeDataSet');
    const fakeData = await response.json();
    
    if (response.ok) {
      const combinedAds = [
        ...(fakeData.facebook_ads || []),
        ...(fakeData.twitter_ads || []),
        ...(fakeData.snapchat_ads || [])
      ];
      setFakeDataSet(combinedAds);
      console.log("Combined Ads: ", combinedAds);
    } else {
      console.log("Fetch Error: ", response.statusText);
    }
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
