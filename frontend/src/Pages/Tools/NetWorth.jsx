import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import "./Tooltip.css";
import { Tooltip as TooltipPopUp } from "./Tooltip";

const NetWorth = () => {
    const [totalAssets, setTotalAssets] = useState();
    const [totalLiabilities, setTotalLiabilities] = useState();

    const chartData = [
        { name: "Total Assets", value: totalAssets || 0 },
        { name: "Total Liabilities", value: totalLiabilities || 0 },
    ];

    return (
        <div className="tooltip-container">
            <div className="tooltip-input-main-container">
                <div className="tooltip-input-container">
                    <div className='tooltip-input-text-row'>
                        <p className="tooltip-text">Total Assets (MYR)</p>
                     
                    </div>
                    <input
                        type="number"
                        className="tooltip-input-text"
                        value={totalAssets}
                        onChange={(e) => setTotalAssets(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>

                <div className="tooltip-input-container">
                    <div className='tooltip-input-text-row'>
                        <p className="tooltip-text">Total Liabilities (MYR)</p>
                    
                    </div>
                    <input
                        type="number"
                        className="tooltip-input-text"
                        value={totalLiabilities}
                        onChange={(e) => setTotalLiabilities(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="tooltip-display-container">
                <div className='tooltip-display'>
                    <div className='tooltip-recharts'>
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

                    <div className='tooltip-display-text-container'>
                        <table>
                            <tr>
                                <td className='tooltip-display-text'>Total Assets (MYR)</td>
                            </tr>
                            <tr>
                                <td className='tooltip-display-text-bold'>
                                    {totalAssets !== undefined ? totalAssets.toFixed(2) : "-"}
                                </td>
                            </tr>
                            <tr>
                                <td className='tooltip-display-text'>Total Liabilities (MYR)</td>
                            </tr>
                            <tr>
                                <td className='tooltip-display-text-bold'>
                                    {totalLiabilities !== undefined ? totalLiabilities.toFixed(2) : "-"}
                                </td>
                            </tr>
                        </table>

                        <p className='tooltip-display-text-small'>Net Worth</p>
                        <p className='tooltip-display-text-result'>
                            MYR {totalAssets !== undefined && totalLiabilities !== undefined ? (totalAssets - totalLiabilities).toFixed(2) : "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetWorth;
