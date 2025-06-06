export const MergeGoogleAnalytics = (ads, analytics) => {
    return ads.map(ad => {
        const match = analytics.find(info =>
        info.utm_campaign === ad.campaign &&
        info.utm_medium === ad.adset &&
        info.utm_content === ad.creative
        );
        return {
        ...ad,
        results: match?.results || 0
        }
    })
}

export const MakeStandard = (ad, platform) => {
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