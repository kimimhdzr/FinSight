import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import "./Tooltip.css";

const Investment = () => {
    const [initialInvestment, setInitialInvestment] = useState();
    const [monthlyContribution, setMonthlyContribution] = useState();
    const [annualReturn, setAnnualReturn] = useState();
    const [duration, setDuration] = useState(0);
    const [compoundingFrequency, setCompoundingFrequency] = useState("");
    const [finalValue, setFinalValue] = useState();
    const [roi, setROI] = useState();

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

        const totalInvestment = initialInvestment + totalContributions;
        let roi = 0;
        if (totalInvestment !== 0) {
            roi = ((futureValue - totalInvestment) / totalInvestment) * 100;
        }
        setROI(roi);
    };

    const totalContributions = (monthlyContribution ?? 0) * 12 * (duration ?? 0);

    const chartData = [
        { name: "Initial Investment", value: initialInvestment || 0 },
        { name: "Total Monthly Contributions", value: totalContributions || 0 },
        { name: "Total Earnings", value: (finalValue || 0) - (initialInvestment || 0) - totalContributions || 0 }
    ];

    return (
        <div className="tooltip-container">
            <div className="tooltip-input-main-container">
                <div className="tooltip-input-container">
                    <p className="tooltip-text">Initial Investment (MYR)</p>
                    <input 
                        type="number" 
                        className="tooltip-input-text" 
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tooltip-input-container">
                    <p className="tooltip-text">Monthly Contribution (MYR)</p>
                    <input 
                        type="number" 
                        className="tooltip-input-text" 
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tooltip-input-container">
                    <p className="tooltip-text">Expected Annual Return (%)</p>
                    <input 
                        type="number" 
                        className="tooltip-input-text" 
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tooltip-input-container">
                    <p className="tooltip-text">Investment Duration <span className="tooltip-input-text-smaller">(max: 100 years)</span></p>
                    <div className="tooltip-slider-container">
                        <input
                            type="range"
                            className="tooltip-slider"
                            min="0"
                            max="100"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                        <p className="tooltip-slider-output">{duration}</p>
                    </div>
                </div>

                <div className="tooltip-input-container">
                    <p className="tooltip-text">Compounding Frequency</p>
                    <select
                        id="CompoundFrequency"
                        className="tooltip-select"
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

                <button className="tooltip-button" onClick={handleCalculate}>
                    <p className="tooltip-button-text">Calculate</p>
                </button>
            </div>

            <div className="tooltip-display-container">
                <div className="tooltip-display">

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
                                <td className="tooltip-display-text">Initial Investment (MYR)</td>
                            </tr>
                            <tr>
                                <td className="tooltip-display-text-bold">{initialInvestment !== undefined ? initialInvestment.toFixed(2) : "-"}</td>
                            </tr>
                            <tr>
                                <td className="tooltip-display-text">Final Value (MYR)</td>
                            </tr>
                            <tr>
                                <td className="tooltip-display-text-bold">{finalValue !== undefined ? finalValue.toFixed(2) : "-"}</td>
                            </tr>
                            <tr>
                                <td className="tooltip-display-text">Return on Investment (ROI)</td>
                            </tr>
                            <tr>
                                <td className="tooltip-display-text-bold">{roi !== undefined ? roi.toFixed(2) + "%" : "-"}</td>
                            </tr>
                        </table>

                        <p className="tooltip-display-text-small">Total you've gained over full term</p>
                        <p className="tooltip-display-text-result">MYR {(finalValue - initialInvestment) ? (finalValue - initialInvestment).toFixed(2) : "-"}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Investment;
