import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import "./Tooltip.css";

const Investment = () => {
    const [initialInvestment, setInitialInvestment] = useState();
    const [monthlyContribution, setMonthlyContribution] = useState();
    const [annualReturn, setAnnualReturn] = useState();
    const [duration, setDuration] = useState(0);
    const [compoundingFrequency, setCompoundingFrequency] = useState("");
    const [finalValue, setFinalValue] = useState();

    const handleCalculate = () => {
        if (
            isNaN(initialInvestment) ||
            isNaN(monthlyContribution) ||
            isNaN(annualReturn) ||
            isNaN(duration) ||
            !compoundingFrequency
        ) {
            alert("Please fill in all fields with valid values.");
            return;
        }
    
        const r = annualReturn / 100;
        const t = duration;
        let n = 1;
        if (compoundingFrequency === "semi-annually") n = 2;
        else if (compoundingFrequency === "quarterly") n = 4;
        else if (compoundingFrequency === "monthly") n = 12;
        else if (compoundingFrequency === "weekly") n = 52;
        else if (compoundingFrequency === "daily") n = 365;
    
        const compoundInterest = initialInvestment * Math.pow(1 + r / n, n * t);
        const totalContributions = monthlyContribution * 12 * t;
        const futureValue = compoundInterest + totalContributions;
    
        setFinalValue(futureValue);
    };    

    const totalContributions = (monthlyContribution ?? 0) * 12 * (duration ?? 0);

    const chartData = [
        { name: "Initial Investment", value: initialInvestment || 0 },
        { name: "Total Monthly Contributions", value: totalContributions || 0 },
        { name: "Total Earnings", value: (finalValue || 0) - (initialInvestment || 0) - totalContributions || 0 }
    ];    

    return (
        <div className="tool-container">
            <div className="tool-input-main-container">
                <div className="tool-input-container">
                    <p className="tool-text">Initial Investment (MYR)</p>
                    <input 
                        type="number" 
                        className="tool-input-text" 
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Monthly Contribution (MYR)</p>
                    <input 
                        type="number" 
                        className="tool-input-text" 
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Expected Annual Return (%)</p>
                    <input 
                        type="number" 
                        className="tool-input-text" 
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Investment Duration <span className="tool-input-text-smaller">(max: 100 years)</span></p>                    
                    <div className="tool-slider-container">
                        <input
                            type="range"
                            className="tool-slider"
                            min="0"
                            max="100"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <p className="tool-slider-output">{duration}</p>
                    </div>
                </div>

                <div className="tool-input-container">
                    <p className="tool-text">Compounding Frequency</p>
                    <select
                        id="CompoundFrequency"
                        className="tool-select"
                        value={compoundingFrequency}
                        onChange={(e) => setCompoundingFrequency(e.target.value)}
                    >
                        <option value="">-- Select --</option>                        
                        <option value="annually">Annually</option>
                        <option value="semi-annually">Semi-Annually</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                    </select>
                </div>

                <button className="tool-button" onClick={handleCalculate}>
                    <p className="tool-button-text">Calculate</p>
                </button>
            </div>

            <div className="tool-display-container">
                <div className="tool-display">

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
                            <td className="tool-display-text">Initial Investment (MYR)</td>
                            <td className="tool-display-text">: {initialInvestment !== undefined ? initialInvestment.toFixed(2) : "-"}</td>
                        </tr>
                        <tr>
                            <td className="tool-display-text">Final Value (MYR)</td>
                            <td className="tool-display-text">: {finalValue !== undefined ? finalValue.toFixed(2) : "-"}</td>
                        </tr>
                    </table>

                    <p className="tool-display-text-small">Total you've gained over full term</p>
                    <p className="tool-display-text-result">MYR {(finalValue - initialInvestment) ? (finalValue - initialInvestment).toFixed(2) : "-" }</p>
                </div>
            </div>
        </div>
    );
};

export default Investment;
