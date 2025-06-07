import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { MakeStandard, MergeGoogleAnalytics } from './utils/adMerge';
import Card from './components/Card';
import Search from './components/Search';
import Table from './components/Table';


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
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Ad Campaigns</h1>
        <nav className="flex justify-center space-x-6 mb-8">
          <Link to="/cards" className="text-blue-600 hover:underline">Card View</Link>
          <Link to="/table" className="text-blue-600 hover:underline">Table View</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/cards" />} />
          <Route path="/cards" element={
            <>
              <Search
                search={search}
                setSearch={setSearch}
                platformFilter={platformFilter}
                setPlatformFilter={setPlatformFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedAds.map((ad, index) => (
                  <Card key={index} ad={ad} />
                ))}
              </div>
            </>
          } />
          <Route path="/table" element={<Table ads={fakeDataSet} />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;
