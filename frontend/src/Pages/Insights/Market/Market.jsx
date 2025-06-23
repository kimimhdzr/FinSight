import React, { useState, useEffect } from "react";
import "./Market.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatTimeAgo = (timestamp) => {
  const secondsAgo = Math.floor(Date.now() / 1000) - timestamp;
  const h = Math.floor(secondsAgo / 3600);
  const m = Math.floor((secondsAgo % 3600) / 60);
  const s = secondsAgo % 60;

  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return `${s}s ago`;
};

const Market = () => {
  const [data, setData] = useState([]);
  const [tickers, setTickers] = useState([]);
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [historicalData, setHistoricalData] = useState([]);
  const [newsCategory, setNewsCategory] = useState("general");

  useEffect(() => {
    fetch(`http://localhost:5000/api/market/market-news?category=${newsCategory}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching news:", error));
  }, [newsCategory]);  // refetch whenever category changes

  useEffect(() => {
    fetch("http://localhost:5000/api/market/market-ticker")
      .then((res) => res.json())
      .then((data) => setTickers(data))
      .catch((err) => console.error("Ticker error:", err));
  }, []);

  useEffect(() => {
    if (!selectedStock) return;

    fetch(`http://localhost:5000/api/market/historical/${selectedStock}`)
      .then((res) => res.json())
      .then((data) => setHistoricalData(data))
      .catch((err) => console.error("Error fetching historical data:", err));
  }, [selectedStock]);

  if (data.length === 0)
    return (
      <div className="market-loading-text">
        Loading news...
      </div>
    );

  return (
    <div className="market-root-container">
      <header className="goal-header">
        <h1>
          Insights |{" "}
          <span className="goal-header-specific">
            World's Latest News
          </span>
        </h1>
      </header>
      <div className="ticker-container">
          <div className="ticker-track">
            {[...tickers, ...tickers].map((item, index) => (
              <div className="ticker-item" key={index}>
                <span className="ticker-symbol">
                  <span className="company-name">{item.companyName} </span> | <span className="symbol">{item.symbol}</span>
                  </span>
                <span className="ticker-price">
                    ${item.price.toFixed(2)}  
                <span
                  className={`ticker-change ${item.change >= 0 ? 'positive' : 'negative'}`}
                >
                ({item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%)
                  </span>
                </span>
              </div>
            ))}
          </div>          
        </div>

        <h1 className="market-text-title-big">Market Trends</h1>
        <hr className="hr-2" />

      <div className="market-dashboard">
        <div className="market-dashboard-container">
          <div className="market-dashboard-chart-container">
            <select
              id="stock"
              className="market-select"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            >
              <option value="">-- Select Stock --</option>
              <option value="AAPL">Apple (AAPL)</option>
              <option value="GOOGL">Google (GOOGL)</option>
              <option value="AMZN">Amazon (AMZN)</option>
              <option value="TSLA">Tesla (TSLA)</option>
              <option value="MSFT">Microsoft (MSFT)</option>
              <option value="NFLX">Netflix (NFLX)</option>
              <option value="NVDA">Nvidia (NVDA)</option>
            </select>
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={historicalData} margin={{ top: 20, right: 60, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="close"
                  stroke="#0C75D6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h1 className="market-text-title-big">Market Insights</h1>
      <hr className="hr-2" />

      <div className="market-container">
        <div className="market-overall-container">
           <select
            id="news-category"
            className="market-select news"
            value={newsCategory}
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="crypto">Crypto</option>
            <option value="merger">Merger</option>
          </select>
          <div className="market-main-container">
              <img
                className="market-main-image"
                src={data[7].image}
                alt="Market"
              />

            <a href={data[7].url} style={{ textDecoration: 'none' }}>
              <div className="market-main-texts">
                <p className="market-text-small">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FFF"
                    className="text-[#0C75D6] align-middle"
                  >
                    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0C75D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {formatTimeAgo(data[7].datetime)}
                </p>
                <p className="market-main-text-large">{data[7].headline}</p>
                <p className="market-main-text-medium">{data[7].summary}</p>
              </div>
            </a>
            
          </div>

          <div className="market-grid">
            {data.slice(8, 29).map((item, index) => (
              <div className="market-mini-container" key={index}>
                <a href={item.url} style={{ textDecoration: 'none' }}>
                  <img
                    className="market-image"
                    src={item.image}
                    alt="Market"
                  />
                  <div className="market-main-texts">
                    <p className="market-text-small">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#FFF"
                        className="text-[#0C75D6] align-middle"
                      >
                        <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0C75D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {formatTimeAgo(item.datetime)}
                    </p>
                    <p className="market-text">{item.headline}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="market-overall-side-container">
          <div className="market-side-container">
            <p className="market-title-text">Just In</p>
            <hr />
            {data.slice(0, 6).map((item, index) => (
              <div className="market-side-text-container" key={index}>
                <a href={item.url} style={{textDecoration: 'none', display: 'flex'}}>
                  <p className="market-side-box-text">{formatTimeAgo(item.datetime)}</p>
                  <p className="market-side-text">{item.headline}</p>
                </a>              
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
