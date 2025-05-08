import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import "./Tools.css";

const NetWorth = () => {    
    const[totalAssests, setTotalAssets] = useState();
    const[totalLiabilities, setTotalLiabilities] = useState();

    // const calculateNetWorth = () => {

    // };

    const chartData = [
        { name: "Total Assets", value: totalAssests || 0 },
        { name: "Total Liabilities", value: totalLiabilities || 0 },
    ];

    return (
        <div className="tool-container">
            <div className="tool-input-main-container">
                <div className="tool-input-container">
                    <p className="tool-text">Total Assets (MYR)</p>
                    <input 
                        type="number" 
                        className="tool-input-text"
                        value={totalAssests}
                        onChange={(e) => setTotalAssets(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Total Liabilities (MYR)</p>
                    <input 
                        type="number" 
                        className="tool-input-text"
                        value={totalLiabilities}
                        onChange={(e) => setTotalLiabilities(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>

                {/* <button className="tool-button" onClick={calculateNetWorth}>
                    <p className="tool-button-text">Calculate</p>
                </button> */}
            </div>

            <div className="tool-display-container">
                <div className='tool-display'>
                    <div className='tool-recharts'>
                        <PieChart width={300} height={300}>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                fill="#8884d8"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === 0 ? "#00C49F" : (index === 1 ? "#FF8042" : "#8884d8")}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>

                    <table>
                        <tr>
                            <td className='tool-display-text'>Total Assets (MYR)</td>
                            <td className='tool-display-text'>: {totalAssests !== undefined ? totalAssests.toFixed(2) : "-"}</td>
                        </tr>
                        <tr>
                            <td className='tool-display-text'>Total Liabilities (MYR)</td>
                            <td className='tool-display-text'>: {totalLiabilities !== undefined ? totalLiabilities.toFixed(2) : "-"}</td>
                        </tr>
                    </table>

                <p className='tool-display-text-small'>Net Worth</p>
                <p className='tool-display-text-result'>MYR {(totalAssests - totalLiabilities) ? (totalAssests - totalLiabilities).toFixed(2) : "-"}</p>

                </div>
            </div>
        </div>
    );
  };

export default NetWorth;