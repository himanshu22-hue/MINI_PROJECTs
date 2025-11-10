import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import './styles.css';

function NewsSection({ coinId }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNews(coinId);
  }, [coinId, filter]);

  // Mock function - replace with actual API call
  const fetchNews = async (coinId) => {
    try {
      // Implement actual news API call here
      // Example APIs: CryptoCompare News API, CryptoPanic API
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return '#4caf50';
      case 'negative':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="news-section">
      <div className="news-header">
        <Typography variant="h5" component="h2">
          Latest News & Analysis
        </Typography>
        <FormControl variant="outlined" size="small">
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">All News</MenuItem>
            <MenuItem value="positive">Positive</MenuItem>
            <MenuItem value="negative">Negative</MenuItem>
            <MenuItem value="neutral">Neutral</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={3}>
        {news.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card className="news-card">
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
              />
              <CardContent>
                <div className="news-sentiment">
                  <Chip
                    icon={article.sentiment === 'positive' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={article.sentiment}
                    style={{
                      backgroundColor: getSentimentColor(article.sentiment),
                      color: 'white'
                    }}
                    size="small"
                  />
                  <Typography variant="caption" color="textSecondary">
                    {article.source} • {article.time}
                  </Typography>
                </div>
                <Typography variant="h6" component="h3" className="news-title">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="news-excerpt">
                  {article.excerpt}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default NewsSection;