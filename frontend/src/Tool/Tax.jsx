import { useState } from 'react';
import "./Tools.css";

const Tax = () => {
    const [value, setValue] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    
    return (
        <div className="tool-container">
            <div className="tool-input-main-container">
            <div className="tool-input-container">
                    <p className="tool-text">Residence Status</p>
                    <select
                        id="Residence Status"
                        className='tool-select'
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        <option value="resident">Resident</option>
                        <option value="non-resident">Non-Resident</option>
                    </select>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Annual Taxable Income (MYR)</p>
                    <input type="number" className="tool-input-text"/>
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Tax Reliefs / Deductions</p>
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
                            <td className='tool-display-text'>Status</td>
                            <td className='tool-display-text'>: Resident</td>
                        </tr>
                        <tr>
                            <td className='tool-display-text'>Gross Income (MYR)</td>
                            <td className='tool-display-text'>: 75,000.00</td>
                        </tr>
                        <tr>
                            <td className='tool-display-text'>Total Reliefs (MYR)</td>
                            <td className='tool-display-text'>: 15,000.00</td>
                        </tr>
                        <tr>
                            <td className='tool-display-text'>Chargable Income (MYR)</td>
                            <td className='tool-display-text'>: 60,000.00</td>
                        </tr>
                    </table>               

                    <p className='tool-display-text-small'>Estimated Tax Payable</p>
                    <p className='tool-display-text-result'>MYR 3,700.00</p>

                </div>
            </div>
        </div>
    );
  };

export default Tax;