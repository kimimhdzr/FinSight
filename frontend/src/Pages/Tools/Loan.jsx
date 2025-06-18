import { useState } from 'react';
import "./Tooltip.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Loan = () => {
    const [loanAmount, setLoanAmount] = useState();
    const [interest, setInterest] = useState();
    const [loanTerm, setLoanTerm] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState();
    const [totalPayment, setTotalPayment] = useState();
    const [totalInterest, setTotalInterest] = useState();

    const calculateLoan = () => {
        const r = (interest / 100) / 12;
        const n = loanTerm * 12;

        if (!loanAmount || !interest || !loanTerm || r === 0) {
            setMonthlyPayment(undefined);
            setTotalPayment(undefined);
            setTotalInterest(undefined);
            return;
        }

        const monthly = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = monthly * n;
        const interestPaid = total - loanAmount;

        setMonthlyPayment(monthly);
        setTotalPayment(total);
        setTotalInterest(interestPaid);
    };

    const chartData = [
        { name: "Principal", value: loanAmount || 0 },
        { name: "Total Interest", value: totalInterest || 0 },
    ];

    return (
        <div className="tooltip-container">
            <div className="tooltip-input-main-container">
                <div className="tooltip-input-container">
                    <p className="tooltip-text">Loan Amount (MYR)</p>
                    <input
                        type="number"
                        className="tooltip-input-text"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tooltip-input-container">
                    <p className="tooltip-text">Annual Interest Rate (%)</p>
                    <input
                        type="number"
                        className="tooltip-input-text"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tooltip-input-container">
                    <p className="tooltip-text">Loan Term<span className="tooltip-input-text-smaller"> (max: 30 years)</span></p>
                    <div className="tooltip-slider-container">
                        <input
                            type="range"
                            className="tooltip-slider"
                            min="0"
                            max="30"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                        />
                        <p className="tooltip-slider-output">{loanTerm}</p>
                    </div>
                </div>

                <button className="tooltip-button" onClick={calculateLoan}>
                    <p className="tooltip-button-text">Calculate</p>
                </button>
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
                                        fill={index === 0 ? "#00C49F" : "#FF8042"}
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
                                <td className='tooltip-display-text'>Total Payment (MYR)</td>
                            </tr>
                            <tr>
                                <td className='tooltip-display-text-bold'>
                                    {totalPayment ? totalPayment.toFixed(2) : "-"}
                                </td>
                            </tr>
                            <tr>
                                <td className='tooltip-display-text'>Total Interest (MYR)</td>
                            </tr>
                            <tr>
                                <td className='tooltip-display-text-bold'>
                                    {totalInterest ? totalInterest.toFixed(2) : "-"}
                                </td>
                            </tr>
                        </table>

                        <p className='tooltip-display-text-small'>Monthly Payment</p>
                        <p className='tooltip-display-text-result'>
                            MYR {monthlyPayment ? monthlyPayment.toFixed(2) : "-"}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Loan;
