import { useState } from 'react';
import "./Tooltip.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import { Tooltip as TooltipPopUp } from "./Tooltip";

const Tax = () => {
    const [grossIncome, setGrossIncome] = useState();
    const [reliefs, setReliefs] = useState();
    const [selectedOption, setSelectedOption] = useState("");
    const [taxPayable, setTaxPayable] = useState();

    const calculateTax = () => {
        const chargeableIncome = grossIncome - reliefs;
        let tax = 0;

        // Simple tax rate logic for Resident
        if (selectedOption === "Resident") {
            if (chargeableIncome <= 50000) {
                tax = chargeableIncome * 0.1;
            } else {
                tax = 50000 * 0.1 + (chargeableIncome - 50000) * 0.2;
            }
        }

        // Non-Resident tax rate (hypothetical)
        else if (selectedOption === "Non-Resident") {
            tax = chargeableIncome * 0.2; // Assume flat rate for non-residents
        }

        setTaxPayable(tax);
    };

    const chartData = [
        { name: "Taxable Income", value: grossIncome || 0 },
        { name: "Tax Reliefs", value: reliefs || 0 },
        { name: "Tax Payable", value: taxPayable || 0 },
    ];

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
                        <option value="Resident">Resident</option>
                        <option value="Non-Resident">Non-Resident</option>
                    </select>
                </div>

                <div className="tool-input-container">
                    <p className="tool-text">Annual Taxable Income (MYR)</p>
                    <input 
                        type="number" 
                        className="tool-input-text"
                        value={grossIncome}
                        onChange={(e) => setGrossIncome(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>

                <div className="tool-input-container">

                    <div className='tool-input-text-row'>
                        <p className="tool-text">Tax Reliefs / Deductions (MYR)</p>                                    
                        <TooltipPopUp text={"Liabilities are financial obligations or debts a person or company owes, such as loans, credit card debt, or mortgages."}>
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </TooltipPopUp>                                           
                    </div>
                    <input 
                        type="number" 
                        className="tool-input-text"
                        value={reliefs}
                        onChange={(e) => setReliefs(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>

                <button className="tool-button" onClick={calculateTax}>
                    <p className="tool-button-text">Calculate</p>
                </button>
            </div>

            <div className="tool-display-container">
                <div className="tool-display">
                    <div className="tool-recharts">
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

                    <div className='tool-display-text-container'>
                        <table>
                            <tr>
                                <td className="tool-display-text">Status</td>
                            </tr>
                            <tr>
                                <td className="tool-display-text-bold">
                                    {selectedOption === "" ? "-" : selectedOption}
                                </td>
                            </tr>
                            <tr>
                                <td className="tool-display-text">Gross Income (MYR)</td>
                            </tr>
                            <tr>
                                <td className="tool-display-text-bold">
                                    {grossIncome !== undefined ? grossIncome.toFixed(2) : "-"}
                                </td>
                            </tr>
                            <tr>
                                <td className="tool-display-text">Total Reliefs (MYR)</td>
                            </tr>
                            <tr>
                                <td className="tool-display-text-bold">
                                    {reliefs !== undefined ? reliefs.toFixed(2) : "-"}
                                </td>
                            </tr>
                            <tr>
                                <td className="tool-display-text">Chargeable Income (MYR)</td>
                            </tr>
                            <tr>
                                <td className="tool-display-text-bold">
                                    {(grossIncome - reliefs) ? (grossIncome - reliefs).toFixed(2) : "-"}
                                </td>
                            </tr>
                        </table>

                        <p className="tool-display-text-small">Estimated Tax Payable</p>
                        <p className="tool-display-text-result">MYR {taxPayable ? taxPayable.toFixed(2) : "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tax;
