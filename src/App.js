import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [fakeDataSet, setFakeDataSet] = useState(null);
  const fetchFakeData = async () => {
    const response = await fetch('http://localhost:3000/fakeDataSet');
    const fakeData = await response.json();
    
    if (response.ok) {
      const makeStandard = (ad, platform) => {
        return {
          platform,
          campaign: ad.campaign_name || ad.campaign || ad.utm_campaign || "",
          adset: ad.media_buy_name || ad.ad_group || ad.ad_squad_name || ad.utm_medium || "",
          creative: ad.ad_name || ad.image_name || ad.creative_name || ad.utm_content || "",
          spend: ad.spend || ad.cost || 0,
          impressions: ad.impressions || 0,
          clicks: ad.clicks || ad.post_clicks || 0
        };
      }

      const {
        facebook_ads = [],
        twitter_ads = [],
        snapchat_ads = []
      } = fakeData

      const standardizeAds = [
        ...facebook_ads.map(ad => makeStandard(ad, "Facebook")),
        ...twitter_ads.map(ad => makeStandard(ad, "Twitter")),
        ...snapchat_ads.map(ad => makeStandard(ad, "Snapchat"))
      ];

      setFakeDataSet(standardizeAds);
      console.log("Standardized Ads: ", standardizeAds);
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
