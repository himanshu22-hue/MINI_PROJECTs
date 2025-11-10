import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Paper,
  Box
} from '@mui/material';
import { PieChart } from 'recharts';
import './styles.css';

function MarketAnalysis() {
  const [marketData, setMarketData] = useState({
    fearGreedIndex: 0,
    dominanceData: [],
    volumeData: [],
    trendingCoins: []
  });

  useEffect(() => {
    fetchMarketData();
  }, []);

  // Mock function - replace with actual API call
  const fetchMarketData = async () => {
    try {
      // Implement actual API calls here
      // Fear & Greed Index: Alternative.me API
      // Market Data: CoinGecko API
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const getFearGreedColor = (value) => {
    if (value <= 20) return '#f44336'; // Extreme Fear
    if (value <= 40) return '#ff9800'; // Fear
    if (value <= 60) return '#ffeb3b'; // Neutral
    if (value <= 80) return '#4caf50'; // Greed
    return '#2196f3'; // Extreme Greed
  };

  return (
    <div className="market-analysis">
      <Grid container spacing={3}>
        {/* Fear & Greed Index */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Fear & Greed Index</Typography>
              <Box className="fear-greed-meter">
                <div 
                  className="fear-greed-indicator"
                  style={{
                    backgroundColor: getFearGreedColor(marketData.fearGreedIndex)
                  }}
                >
                  {marketData.fearGreedIndex}
                </div>
                <LinearProgress
                  variant="determinate"
                  value={marketData.fearGreedIndex}
                  className="fear-greed-progress"
                />
                <div className="fear-greed-labels">
                  <span>Extreme Fear</span>
                  <span>Extreme Greed</span>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Market Dominance */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Market Dominance</Typography>
              <div className="dominance-chart">
                <PieChart width={300} height={300} data={marketData.dominanceData} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Trading Volume Analysis */}
        <Grid item xs={12}>
          <Paper className="volume-analysis">
            <Typography variant="h6">24h Trading Volume</Typography>
            <div className="volume-bars">
              {marketData.volumeData.map((item) => (
                <div key={item.exchange} className="volume-bar">
                  <Typography variant="body2">{item.exchange}</Typography>
                  <div className="bar-container">
                    <div 
                      className="bar"
                      style={{ width: `${(item.volume / Math.max(...marketData.volumeData.map(d => d.volume))) * 100}%` }}
                    />
                  </div>
                  <Typography variant="body2">${item.volume.toLocaleString()}</Typography>
                </div>
              ))}
            </div>
          </Paper>
        </Grid>

        {/* Trending Coins */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Trending Coins</Typography>
              <div className="trending-coins">
                {marketData.trendingCoins.map((coin) => (
                  <div key={coin.id} className="trending-coin">
                    <img src={coin.image} alt={coin.name} />
                    <div className="coin-info">
                      <Typography variant="subtitle1">{coin.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {coin.symbol.toUpperCase()}
                      </Typography>
                    </div>
                    <Typography
                      variant="body2"
                      className={coin.price_change_24h >= 0 ? 'positive' : 'negative'}
                    >
                      {coin.price_change_24h >= 0 ? '+' : ''}{coin.price_change_24h}%
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default MarketAnalysis;