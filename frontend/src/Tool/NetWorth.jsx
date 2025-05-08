import { useState } from 'react';
import "./Tools.css";

const NetWorth = () => {    
    return (
        <div className="tool-container">
            <div className="tool-input-main-container">
                <div className="tool-input-container">
                    <p className="tool-text">Total Assets (MYR)</p>
                    <input type="number" className="tool-input-text"/>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Total Liabilities (MYR)</p>
                    <input type="number" className="tool-input-text"/>
                </div>

                <button className="tool-button">
                    <p className="tool-button-text">Calculate</p>
                </button>
            </div>

            <div className="tool-display-container">
                <div className='tool-display'>
                    <div className='tool-circle'>
                        <p className='tool-circle-text'>2.72%</p>
                    </div>

                    <table>
                        <tr>
                            <td className='tool-display-text'>Total Assets (MYR)</td>
                            <td className='tool-display-text'>: 322,000.00</td>
                        </tr>
                        <tr>
                            <td className='tool-display-text'>Total Liabilities (MYR)</td>
                            <td className='tool-display-text'>: 207,000.00</td>
                        </tr>
                    </table>

                <p className='tool-display-text-small'>Net Worth</p>
                <p className='tool-display-text-result'>MYR 115,000.00</p>

                </div>
            </div>
        </div>
    );
  };

export default NetWorth;