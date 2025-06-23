const axios = require('axios');

exports.getMarketNews = async (req, res) => {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
  const category = req.query.category || 'general';  // default to general

  try {
    const response = await axios.get('https://finnhub.io/api/v1/news', {
      params: {
        category,
        token: FINNHUB_API_KEY,
      },
    });
    res.json(response.data.slice(0, 30));
  } catch (err) {
    console.error("Error fetching news from Finnhub:", err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

exports.getStockTicker = async (req, res) => {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY; // Access it here as well
  const symbols = ['AAPL', 'GOOGL', 'AMZN', 'TSLA', 'MSFT', 'NFLX', 'NVDA'];

  const results = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const [quote, profile] = await Promise.all([
          axios.get('https://finnhub.io/api/v1/quote', {
            params: { symbol, token: FINNHUB_API_KEY },
          }),
          axios.get('https://finnhub.io/api/v1/stock/profile2', {
            params: { symbol, token: FINNHUB_API_KEY },
          }),
        ]);

        return {
          companyName: profile.data.name || 'Unknown',
          symbol,
          price: quote.data.c || 0,
          change: quote.data.dp || 0,
        };
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error.message);
        return null;
      }
    })
  );

  res.json(results.filter(Boolean));
};

exports.getHistoricalData = async (req, res) => {
  const { symbol } = req.params;
  const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

  try {
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const timeSeries = response.data["Time Series (Daily)"];

    if (!timeSeries) {
      return res.status(400).json({ error: "Invalid response from Alpha Vantage" });
    }

    const formattedData = Object.entries(timeSeries)
      .slice(0, 30) // Limit to last 30 days
      .map(([date, values]) => ({
        date,
        close: parseFloat(values["4. close"]),
      }))
      .reverse(); // To show oldest to newest

    res.json(formattedData);
  } catch (err) {
    console.error(`Error fetching historical data for ${symbol}:`, err.message);
    res.status(500).json({ error: "Server error" });
  }
};


