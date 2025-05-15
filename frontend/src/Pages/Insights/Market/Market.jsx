import React, { useState, useEffect } from "react";
import "./Market.css";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import { Sparklines, SparklinesLine, SparklinesTooltip } from 'react-sparklines';

import { Sparklines as MySparklines, SparklinesLine as MySparklinesLine, SparklinesTooltip as MySparklinesTooltip } from 'react-sparklines';

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
  const [unemploymentData, setUnemploymentData] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:8000/market/news/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/market/ticker/")
      .then((res) => res.json())
      .then((data) => setTickers(data))
      .catch((err) => console.error("Ticker error:", err));
  }, []);

  // Dummy data for unemployment rate over the past 6 months
  const dummyData = [
    { date: "2024-11-01", unemployment_rate: 3.2 },
    { date: "2024-12-01", unemployment_rate: 3.4 },
    { date: "2025-01-01", unemployment_rate: 3.5 },
    { date: "2025-02-01", unemployment_rate: 3.3 },
    { date: "2025-03-01", unemployment_rate: 3.1 },
    { date: "2025-04-01", unemployment_rate: 3.0 },
  ];

  useEffect(() => {
    // Use dummy data for unemployment rate instead of fetching from an API
    setUnemploymentData(dummyData);
  }, []);

  if (data.length === 0)
    return (
      <div className="market-loading-text">
        Loading news...
      </div>
    );

  const unemploymentRates = unemploymentData.map((data) => data.unemployment_rate);
  console.log("unemploymentRates:", unemploymentRates);

  return (
    <div className="market-root-container">

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

        <h1>Market Trends</h1>
        <hr className="hr-2" />

      <div className="market-dashboard">
        <div className="market-dashboard-container">
          <div className="market-dashboard-chart-container">
            <h3 className="display-text">Unemployment Rate - Malaysia (Last 6 Months)</h3>
            
            {/* <ResponsiveContainer width="100%" height={300}>
              <LineChart data={unemploymentData} margin={{ top: 20, right: 60, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="unemployment_rate"
                  stroke="#0C75D6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer> */}

           <div className="sparkline-wrapper">
            <MySparklines data={unemploymentRates} limit={6} height={20} width={100}>
              <MySparklinesLine color="#0C75D6" strokeWidth={0.2}/>
            </MySparklines>
          </div>

          </div>
          
        </div>
      </div>

      <h1>Market Insights</h1>
      <hr className="hr-2" />

      <div className="market-container">
        <div className="market-overall-container">
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
                    src={item?.image || "/staticimages/default_market.jpg"}
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
