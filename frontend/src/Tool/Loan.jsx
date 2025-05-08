import { useState } from 'react';
import "./Tools.css";

const Loan = () => {
    const [value, setValue] = useState(0);
    
    return (
        <div className="tool-container">
            <div className="tool-input-main-container">
                <div className="tool-input-container">
                    <p className="tool-text">Loan Amount (MYR)</p>
                    <input type="number" className="tool-input-text"/>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Annual Interest Rate (%)</p>
                    <input type="number" className="tool-input-text"/>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Loan Term<span className="tool-input-text-smaller"> (max: 30 years)</span></p>                    
                    <div className="tool-slider-container">
                        <input
                            type="range"
                            className="tool-slider"
                            min="0"
                            max="30"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <p className="tool-slider-output">{value}</p>
                    </div>
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
                            <td className='tool-display-text'>Total Payment (MYR)</td>
                            <td className='tool-display-text'>: 100000.00</td>
                        </tr>
                        <tr>
                            <td className='tool-display-text'>Total Interest (MYR)</td>
                            <td className='tool-display-text'>: 100000.00</td>
                        </tr>
                    </table>

                    <p className='tool-display-text-small'>Monthly Payment</p>
                    <p className='tool-display-text-result'>MYR 1100.00</p>

                </div>
            </div>
        </div>
    );
  };

export default Loan;