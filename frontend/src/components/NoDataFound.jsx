import React from 'react';
import './NoDataFound.css';

const NoDataFound = () => {
    return (
      <div className="no-data-image-container">
        <img
          src="/staticimages/no_data_found.jpg"
          alt="No Data Found"
          className="no-data-image"
        />
      </div>
    );
};

export default NoDataFound;