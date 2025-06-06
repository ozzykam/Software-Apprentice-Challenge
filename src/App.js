import './App.css';
import { useEffect, useState } from 'react';
import { MakeStandard, MergeGoogleAnalytics } from './utils/adMerge';

function App() {
  const [fakeDataSet, setFakeDataSet] = useState(null);
  const fetchFakeData = async () => {
    const response = await fetch('http://localhost:3000/fakeDataSet');
    const fakeData = await response.json();
    
    if (response.ok) {
      const {
        facebook_ads = [],
        twitter_ads = [],
        snapchat_ads = [],
        google_analytics = []
      } = fakeData

      const standardizeAds = [
        ...facebook_ads.map(ad => MakeStandard(ad, "Facebook")),
        ...twitter_ads.map(ad => MakeStandard(ad, "Twitter")),
        ...snapchat_ads.map(ad => MakeStandard(ad, "Snapchat"))
      ];

      const combinedAds = MergeGoogleAnalytics(standardizeAds, google_analytics);
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
