import React, { useState } from 'react';
import './SliderWithFlipCards.css';

const features = [
  {
    title: 'Market Insights',
    detail:
      'Stay in control of your spending with our intuitive expense tracker. Effortlessly log your daily purchases, categorize transactions, and visualize where your money is going with smart charts and summaries.',
    bgImage: 'staticimages/homebanner.jpeg'
  },
  {
    title: 'Budget Planner',
    detail:
      'Plan your monthly or weekly budget using our easy drag-and-drop planner. Get personalized limits based on past spending, set savings goals, and watch your financial plan unfold clearly.',
    bgImage: 'staticimages/homebanner.jpeg'
  },
  // Add more cards here
];

const SliderWithFlipCards = () => {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="card-slider">
      {features.map((item, index) => (
        <div
          key={index}
          className={`flip-card ${flippedIndex === index ? 'flipped' : ''}`}
          onClick={() => toggleFlip(index)}
        >
          <div className="flip-card-inner">
            <div
              className="flip-card-front"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            >
              <h2>{item.title}</h2>
            </div>
            <div className="flip-card-back">
              <p>{item.detail}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SliderWithFlipCards;
