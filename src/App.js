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
    <ul>
    {fakeDataSet && fakeDataSet.map((ad, index) => (
        <div className="card" key={index}>
            <h1>{ad.campaign}</h1>
            <p>Platform: <strong>{ad.platform}</strong></p>
            <p>Adset: <strong>{ad.adset}</strong></p>
            <p>Creative: <strong>{ad.creative}</strong></p>
            <p>Spend: <strong>${ad.spend.toLocaleString()}</strong></p>
            <p>Impressions: <strong>{ad.impressions.toLocaleString()}</strong></p>
            <p>Clicks: <strong>{ad.clicks.toLocaleString()}</strong></p>
            <p>Results: <strong>{ad.results}</strong></p>
        </div>
      ))}
      </ul>
  );
}

export default App;
