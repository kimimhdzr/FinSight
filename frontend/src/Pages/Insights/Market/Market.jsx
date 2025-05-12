import React, { useState, useEffect } from "react";
import "./Market.css";

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

  useEffect(() => {
    fetch("http://localhost:8000/market/news/") // Django backend endpoint
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (data.length === 0) 
    return (
      <div className="market-loading-text">
        Loading news...
      </div>
    );

  return (
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
          {data.slice(8, 30).map((item, index) => (
            <div className="market-mini-container" key={index}>
              <a href={item.url} style={{ textDecoration: 'none' }}>
                <img
                  className="market-image"
                  src={item.image} /* {item.image} - image fetched from the API */
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
              {data.slice(0, 6).map((item, index) => (
                <div className="market-side-text-container">
                  <a href={data[0].url} style={{textDecoration: 'none', display: 'flex'}}>
                    <p className="market-side-box-text">{formatTimeAgo(item.datetime)}</p>
                    <p className="market-side-text">{item.headline}</p>
                  </a>              
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Market;
