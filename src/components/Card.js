import "./card.css";
const Card = ({ ad }) => {
    return (
        <div className="card">
            <h1>{ad.campaign}</h1>
            <p>Platform: <strong>{ad.platform}</strong></p>
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