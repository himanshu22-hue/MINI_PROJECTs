import axios from "axios";

export const getPrices = async (id, days, priceType, setError) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      {
        timeout: 10000, // 10 second timeout
        headers: {
          'Cache-Control': 'max-age=300' // Cache for 5 minutes
        }
      }
    );

    if (!response.data) return null;

    const dataMap = {
      'market_caps': response.data.market_caps,
      'total_volumes': response.data.total_volumes,
      'prices': response.data.prices
    };

    return dataMap[priceType] || response.data.prices;
  } catch (e) {
    console.error(`Error fetching prices for ${id}:`, e.message);
    setError?.(true);
    return null;
  }
};
