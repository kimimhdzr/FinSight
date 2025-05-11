import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import "./Tools.css";

import { Tooltip as TooltipPopUp } from "./Tooltip";

const NetWorth = () => {
    const [totalAssets, setTotalAssets] = useState();
    const [totalLiabilities, setTotalLiabilities] = useState();

    const chartData = [
        { name: "Total Assets", value: totalAssets || 0 },
        { name: "Total Liabilities", value: totalLiabilities || 0 },
    ];

    return (
        <div className="tool-container">
            <div className="tool-input-main-container">
                <div className="tool-input-container">                    
                    <div className='tool-input-text-row'>
                        <p className="tool-text">Total Assets (MYR)</p>
                        
                        <TooltipPopUp text={"Assets are valuable resources such as stocks, bonds, real estate, or cash that can generate income or appreciate over time."}>
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </TooltipPopUp>
                    </div>
                    <input
                        type="number"
                        className="tool-input-text"
                        value={totalAssets}
                        onChange={(e) => setTotalAssets(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>

                <div className="tool-input-container">
                    <div className='tool-input-text-row'>
                        <p className="tool-text">Total Liabilities (MYR)</p>
                        
                        <TooltipPopUp text={"Liabilities are financial obligations or debts a person or company owes, such as loans, credit card debt, or mortgages."}>
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </TooltipPopUp>
                    </div>

                    <input
                        type="number"
                        className="tool-input-text"
                        value={totalLiabilities}
                        onChange={(e) => setTotalLiabilities(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
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
                        <tbody>
                            <tr>
                                <td className='tool-display-text'>Total Assets (MYR)</td>
                                <td className='tool-display-text'>: {totalAssets !== undefined ? totalAssets.toFixed(2) : "-"}</td>
                            </tr>
                            <tr>
                                <td className='tool-display-text'>Total Liabilities (MYR)</td>
                                <td className='tool-display-text'>: {totalLiabilities !== undefined ? totalLiabilities.toFixed(2) : "-"}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className='tool-display-text-small'>Net Worth</p>
                    <p className='tool-display-text-result'>
                        MYR {totalAssets !== undefined && totalLiabilities !== undefined ? (totalAssets - totalLiabilities).toFixed(2) : "-"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NetWorth;
