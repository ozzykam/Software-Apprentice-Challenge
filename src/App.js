import './App.css';
import { useEffect, useState } from 'react';
import { MakeStandard, MergeGoogleAnalytics } from './utils/adMerge';
import Card from './components/Card';
import Search from './components/Search';

function App() {
  const [fakeDataSet, setFakeDataSet] = useState(null);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

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

  if (!fakeDataSet) {
    return <p>Loading ads...</p>;
  }

  const filteredAndSortedAds = fakeDataSet.filter(ad => {
      const campaignMatch = ad.campaign.toLowerCase().includes(search.toLowerCase());
      const platformMatch = platformFilter === "All" || ad.platform === platformFilter;
      return campaignMatch && platformMatch;
    })
    .sort((a, b) => {
      if (!sortOrder) return 0;
      return sortOrder === "asc" ? a.spend - b.spend : b.spend - a.spend;
    });

  return (
    <>
    <Search
        search={search}
        setSearch={setSearch}
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      {filteredAndSortedAds.map((ad, index) => (
        <Card key={index} ad={ad} />
      ))}
    </>
  );

}

export default App;
