const platformBgMap = {
    Facebook: ["bg-blue-500", "text-white"],
    Twitter: ["bg-sky-500", "text-white"],
    Snapchat: ["bg-yellow-300", "text-gray-800"],
};

const Card = ({ ad }) => {
    const headerBgClass = platformBgMap[ad.platform][0] || "bg-gray-50";
    const headerTextClass = platformBgMap[ad.platform][1] || "text-gray-800";
    return (
        
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-2 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className={`-m-5 mb-2 px-5 py-3 rounded-t-2xl ${headerBgClass} ${headerTextClass} flex justify-between items-start`}>
                <h1 className="text-xl font-bold">{ad.campaign}</h1>
                <span className={`text-sm italic ${headerTextClass}`}>{ad.platform}</span>
            </div>
            <p>Adset: <strong>{ad.adset}</strong></p>
            <p>Creative: <strong>{ad.creative}</strong></p>
            <p>Spend: <strong>${ad.spend.toLocaleString()}</strong></p>
            <p>Impressions: <strong>{ad.impressions.toLocaleString()}</strong></p>
            <p>Clicks: <strong>{ad.clicks.toLocaleString()}</strong></p>
            <p>Results: <strong>{ad.results}</strong></p>
        </div>
    );
}

export default Card;