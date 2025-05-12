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
        <div className="tool-container">
            <div className="tool-input-main-container">
                <div className="tool-input-container">
                    <p className="tool-text">Loan Amount (MYR)</p>
                    <input
                        type="number"
                        className="tool-input-text"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Annual Interest Rate (%)</p>
                    <input
                        type="number"
                        className="tool-input-text"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value === "" ? undefined : Number(e.target.value))}
                    />
                </div>
                <div className="tool-input-container">
                    <p className="tool-text">Loan Term<span className="tool-input-text-smaller"> (max: 30 years)</span></p>
                    <div className="tool-slider-container">
                        <input
                            type="range"
                            className="tool-slider"
                            min="0"
                            max="30"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                        />
                        <p className="tool-slider-output">{loanTerm}</p>
                    </div>
                </div>

                <button className="tool-button" onClick={calculateLoan}>
                    <p className="tool-button-text">Calculate</p>
                </button>
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
                                        fill={index === 0 ? "#00C49F" : "#FF8042"}
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
                                <td className='tool-display-text'>Total Payment (MYR)</td>
                                <td className='tool-display-text'>: {totalPayment ? totalPayment.toFixed(2) : "-"}</td>
                            </tr>
                            <tr>
                                <td className='tool-display-text'>Total Interest (MYR)</td>
                                <td className='tool-display-text'>: {totalInterest ? totalInterest.toFixed(2) : "-"}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className='tool-display-text-small'>Monthly Payment</p>
                    <p className='tool-display-text-result'>MYR {monthlyPayment ? monthlyPayment.toFixed(2) : "-"}</p>
                </div>
            </div>
        </div>
    );
};

export default Loan;
