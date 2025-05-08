import { useState } from 'react';
import "./Tools.css";

const Investment = () => {
    const [value, setValue] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    
    return (
        <div className="tool-container">
            <div className="tool-input-main-container">
                <div className="tool-input-container">
                    <p className="tool-text">Initial Investment (MYR)</p>
                    <input type="number" className="tool-input-text"/>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Monthly Contribution (MYR)</p>
                    <input type="number" className="tool-input-text"/>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Expected Annual Return (%)</p>
                    <input type="number" className="tool-input-text"/>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Investment Duration<span className="tool-input-text-smaller"> (max: 100 years)</span></p>                    
                    <div className="tool-slider-container">
                        <input
                            type="range"
                            className="tool-slider"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <p className="tool-slider-output">{value}</p>
                    </div>
                </div>

                <div className="tool-input-container">
                    <p className="tool-text">Compounding Frequency</p>
                    <select
                        id="CompoundFrequency"
                        className='tool-select'
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="">-- Select --</option>                        
                        <option value="annually">Annually</option>
                        <option value="semi-annually">Semi-Annually</option>
                        <option value="quaterly">Quarterly</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                    </select>
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
                            <td className='tool-display-text'>Initial Investment (MYR)</td>
                            <td className='tool-display-text'>: 100000.00</td>
                        </tr>
                        <tr>
                            <td className='tool-display-text'>Final Value (MYR)</td>
                            <td className='tool-display-text'>: 100000.00</td>
                        </tr>
                    </table>


                    <p className='tool-display-text-small'>Total you've gained over full term</p>
                    <p className='tool-display-text-result'>MYR 100,000.00</p>

                </div>
            </div>
        </div>
    );
  };

export default Investment;