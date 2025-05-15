import React, { useState } from 'react';
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Container, ToggleButtonGroup, ToggleButton, Card, ListGroup, Badge, Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Expenses.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Record = () => {
  const [radioValue, setRadioValue] = useState('1');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const data = {
    labels: ["House", "Bills", "Food"],
    datasets: [{
      label: "Expenses (RM)",
      data: [1245.90, 89.00, 245.60],
      backgroundColor: ["orange", "pink", "yellow"],
      borderWidth: 5
    }]
  };

  const expenseData = {
    Food: [120, 140, 130, 110, 160, 150],
    Bills: [80, 90, 100, 85, 95, 105],
    House: [500, 520, 530, 550, 540, 560]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount (RM)' }
      },
      x: {
        title: { display: true, text: 'Month' }
      }
    }
  };

  const getChartData = (label, data, color) => ({
    labels: months,
    datasets: [{
      label: `${label} Expenses`,
      data,
      backgroundColor: color
    }]
  });

  const transactions = [
    { date: 'Wed, 14 May', items: [{ description: 'FOOD', amount: 5.00 }, { description: 'HOUSE', amount: 360.00 }] },
    { date: 'Tue, 13 May', items: [{ description: 'BILLS', amount: 64.50 }] },
    { date: 'Mon, 12 May', items: [{ description: 'TRANSPORTATION', amount: 7.00 }, { description: 'FOOD', amount: 7.00 }, { description: 'FOOD', amount: 6.50 }] },
    { date: 'Sun, 11 May', items: [{ description: 'FOOD', amount: 5.00 }, { description: 'FOOD', amount: 4.50 }, { description: 'TRANSPORTATION', amount: 8.00 }] }
  ];

  return (
    <div>
      <div className="card-header d-flex justify-content-between align-items-center mt-3">
        <ToggleButtonGroup type="radio" name="options" value={radioValue} onChange={(val) => setRadioValue(val)}>
          <ToggleButton id="tbg-radio-1" value="1" variant="outline-primary btn-lg">Record</ToggleButton>
          <ToggleButton id="tbg-radio-2" value="2" variant="outline-primary btn-lg">Track</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="card-body-expense">
        {radioValue === '1' && (
          <>
            <div className="d-flex justify-content-end gap-2 mb-3 white-box">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-month">{selectedMonth}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {months.map((month) => (
                    <Dropdown.Item key={month} active={month === selectedMonth} onClick={() => setSelectedMonth(month)}>
                      {month}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-year">{selectedYear}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {years.map((year) => (
                    <Dropdown.Item key={year} active={year === selectedYear} onClick={() => setSelectedYear(year)}>
                      {year}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Container className="mt-1">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div style={{ width: '50%', height: '300px' }}>
                  <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div className="card expenses" style={{ width: '45%' }}>
                  <p className="mb-2" style={{ fontSize: '1.25rem', fontWeight: '500' }}>Expenses Breakdown</p>
                  <div className="expense-list">
                    <div className="expense-item mb-1">
                      <div className="category">Housing<div className="amount" style={{ fontSize: '1.2rem' , fontWeight:'lighter'}}>RM 1,245.90</div></div>
                      <span className="change up">15% 🔺</span>
                    </div>
                    <div className="expense-item mb-1">
                      <div className="category">Bills<div className="amount" style={{ fontSize: '1.2rem' , fontWeight:'lighter' }}>RM 89.00</div></div>
                      <span className="change down">15% 🔻</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mt-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h2 className="mb-2 mt-2 ms-3">Expenses</h2>
                  <Link to="/app/Record" className="btn btn-primary">Add Payment</Link>
                </div>
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-0">
                    <ListGroup variant="flush">
                      {transactions.map((day, i) => (
                        <React.Fragment key={i}>
                          <ListGroup.Item className="bg-light fw-bold py-2">{day.date}</ListGroup.Item>
                          {day.items.map((item, j) => (
                            <ListGroup.Item key={j} className="d-flex justify-content-between align-items-center">
                              <span>{item.description}</span>
                              <Badge bg="light" text="dark" className="fs-6">RM {item.amount.toFixed(2)}</Badge>
                            </ListGroup.Item>
                          ))}
                        </React.Fragment>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
            </Container>
          </>
        )}

        {radioValue === '2' && (
          <Container className="mt-3">
            <h2 className="text-center mb-4">Monthly Expense Comparison</h2>

            {['Food', 'Bills', 'House'].map((category, i) => (
              <Card key={i} className="p-3 shadow-sm mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Card.Title className="text-center mb-3" style={{ fontSize: '1.5rem' }}>{category} Expenses</Card.Title>
                <Bar 
                  data={getChartData(category, expenseData[category], 
                    category === 'Food' ? 'rgba(255, 99, 132, 0.6)' : 
                    category === 'Bills' ? 'rgba(54, 162, 235, 0.6)' : 
                    'rgba(255, 206, 86, 0.6)'
                  )}
                  options={options}
                  height={200}
                />
              </Card>
            ))}
          </Container>
        )}
      </div>
    </div>
  );
};

export default Record;
