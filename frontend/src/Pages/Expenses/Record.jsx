import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from 'axios';

const Record = () => {
  const [radioValue, setRadioValue] = useState('1');
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [activeTab, setActiveTab] = useState('expense');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Form state for new payment
  const [paymentForm, setPaymentForm] = useState({
    type: 'expense', // expense or income
    category: 'Food',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const expenseCategories = ['Food', 'House', 'Bills', 'Transportation', 'Shopping', 'Entertainment'];
  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];

  // Icon components using Unicode symbols
  const Icons = {
    Bars: () => <span>☰</span>,
    Home: () => <span>🏠</span>,
    Utensils: () => <span>🍽️</span>,
    Receipt: () => <span>📄</span>,
    Car: () => <span>🚗</span>,
    Shopping: () => <span>🛒</span>,
    Gamepad: () => <span>🎮</span>,
    Calendar: () => <span>📅</span>,
    Dollar: () => <span>💰</span>,
    File: () => <span>📁</span>,
    Plus: () => <span>➕</span>
  };

  const categoryIcons = {
    Food: <Icons.Utensils />,
    House: <Icons.Home />,
    Bills: <Icons.Receipt />,
    Transportation: <Icons.Car />,
    Shopping: <Icons.Shopping />,
    Entertainment: <Icons.Gamepad />,
    Salary: <Icons.Dollar />,
    Freelance: <Icons.File />,
    Investment: <Icons.Dollar />,
    Gift: <Icons.Plus />,
    Other: <Icons.File />
  };

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSavePayment = async () => {
  try {
    console.log('Submitting:', paymentForm);

    if (!paymentForm.amount || !paymentForm.description) {
      alert('Please enter both amount and description.');
      return;
    }

    const response = await axios.post('http://localhost:3000/api/payments', paymentForm);
    console.log('Saved to backend:', response.data);
    alert('Payment saved successfully.');
    setIsAddingPayment(false);
    setPaymentForm({
      type: 'expense',
      category: 'Food',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  } catch (err) {
    console.error('Failed to save payment:', err);
    alert('Error saving payment. Is your backend running at http://localhost:3000?\n\nCheck console for details.');
  }
};

  const pieData = [
    { name: 'House', value: 1245.90, fill: '#FF8042' },
    { name: 'Bills', value: 89.00, fill: '#FFBB28' },
    { name: 'Food', value: 245.60, fill: '#00C49F' }
  ];

  const expenseData = {
    Food: [120, 140, 130, 110, 160, 150],
    Bills: [80, 90, 100, 85, 95, 105],
    House: [500, 520, 530, 550, 540, 560]
  };

  const getChartData = (category) => 
    months.slice(0, 6).map((month, index) => ({
      month: month.slice(0, 3),
      amount: expenseData[category][index] || 0
    }));

  const transactions = [
    { date: 'Wed, 14 May', items: [{ description: 'FOOD', amount: 5.00 }, { description: 'HOUSE', amount: 360.00 }] },
    { date: 'Tue, 13 May', items: [{ description: 'BILLS', amount: 64.50 }] },
    { date: 'Mon, 12 May', items: [{ description: 'TRANSPORTATION', amount: 7.00 }, { description: 'FOOD', amount: 7.00 }, { description: 'FOOD', amount: 6.50 }] },
    { date: 'Sun, 11 May', items: [{ description: 'FOOD', amount: 5.00 }, { description: 'FOOD', amount: 4.50 }, { description: 'TRANSPORTATION', amount: 8.00 }] }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={headerStyle}>
        <div style={toggleGroupStyle}>
          <button
            style={{
              ...toggleButtonStyle,
              backgroundColor: radioValue === '1' ? '#007bff' : 'transparent',
              color: radioValue === '1' ? 'white' : '#007bff'
            }}
            onClick={() => setRadioValue('1')}
          >
            Record
          </button>
          <button
            style={{
              ...toggleButtonStyle,
              backgroundColor: radioValue === '2' ? '#007bff' : 'transparent',
              color: radioValue === '2' ? 'white' : '#007bff'
            }}
            onClick={() => setRadioValue('2')}
          >
            Track
          </button>
        </div>
      </div>

      <div style={bodyStyle}>
        {radioValue === '1' && (
          <>
            <div style={dropdownContainerStyle}>
              <div style={dropdownWrapperStyle}>
                <button 
                  style={dropdownButtonStyle} 
                  onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                >
                  {selectedMonth} ▼
                </button>
                {showMonthDropdown && (
                  <div style={dropdownMenuStyle}>
                    {months.map((month) => (
                      <div
                        key={month}
                        style={{
                          ...dropdownItemStyle,
                          backgroundColor: month === selectedMonth ? '#007bff' : 'transparent',
                          color: month === selectedMonth ? 'white' : '#333'
                        }}
                        onClick={() => {
                          setSelectedMonth(month);
                          setShowMonthDropdown(false);
                        }}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={dropdownWrapperStyle}>
                <button 
                  style={dropdownButtonStyle} 
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                >
                  {selectedYear} ▼
                </button>
                {showYearDropdown && (
                  <div style={dropdownMenuStyle}>
                    {years.map((year) => (
                      <div
                        key={year}
                        style={{
                          ...dropdownItemStyle,
                          backgroundColor: year === selectedYear ? '#007bff' : 'transparent',
                          color: year === selectedYear ? 'white' : '#333'
                        }}
                        onClick={() => {
                          setSelectedYear(year);
                          setShowYearDropdown(false);
                        }}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={containerStyle}>
              <div style={chartContainerStyle}>
                <div style={{ width: '50%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: RM${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`RM${value}`, 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={expenseBreakdownStyle}>
                  <h3 style={{ marginBottom: '16px', fontSize: '1.25rem', fontWeight: '500' }}>Expenses Breakdown</h3>
                  <div style={expenseItemStyle}>
                    <div>
                      <div style={{ fontWeight: '600' }}>Housing</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>RM 1,245.90</div>
                    </div>
                    <span style={{ color: 'green' }}>15% 🔺</span>
                  </div>
                  <div style={expenseItemStyle}>
                    <div>
                      <div style={{ fontWeight: '600' }}>Bills</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>RM 89.00</div>
                    </div>
                    <span style={{ color: 'red' }}>15% 🔻</span>
                  </div>
                </div>
              </div>

              <div style={transactionCardStyle}>
                <div style={transactionHeaderStyle}>
                  <h2 style={{ margin: '0', fontSize: '1.5rem' }}>Expenses</h2>
                  <button 
                    style={addPaymentButtonStyle}
                    onClick={() => setIsAddingPayment(true)}
                  >
                    Add Payment
                  </button>
                </div>
                <div style={transactionListStyle}>
                  {transactions.map((day, i) => (
                    <div key={i}>
                      <div style={dateHeaderStyle}>{day.date}</div>
                      {day.items.map((item, j) => (
                        <div key={j} style={transactionItemStyle}>
                          <span>{item.description}</span>
                          <span style={amountBadgeStyle}>RM {item.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {radioValue === '2' && (
          <div style={containerStyle}>
            <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>Monthly Expense Comparison</h2>

            {['Food', 'Bills', 'House'].map((category, i) => (
              <div key={i} style={chartCardStyle}>
                <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '1.5rem' }}>{category} Expenses</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={getChartData(category)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`RM${value}`, 'Amount']} />
                    <Bar dataKey="amount" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Payment Modal */}
      {isAddingPayment && (
        <div style={modalBackdropStyle}>
          <div style={modalStyle}>
            {/* Hamburger Button */}
            <button
              style={hamburgerStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icons.Bars />
            </button>

            {/* Sidenav Drawer */}
            <div style={{
              ...sidenavStyle,
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)'
            }}>
              <ul style={sidenavListStyle}>
                <li
                  style={{
                    ...sidenavItemStyle,
                    backgroundColor: activeTab === 'expense' ? '#007bff' : 'transparent',
                    color: activeTab === 'expense' ? 'white' : '#333'
                  }}
                  onClick={() => {
                    setActiveTab('expense');
                    setPaymentForm(prev => ({ ...prev, type: 'expense', category: 'Food' }));
                    setIsMenuOpen(false);
                  }}
                >
                  <Icons.Receipt /> Add Expense
                </li>
                <li
                  style={{
                    ...sidenavItemStyle,
                    backgroundColor: activeTab === 'income' ? '#007bff' : 'transparent',
                    color: activeTab === 'income' ? 'white' : '#333'
                  }}
                  onClick={() => {
                    setActiveTab('income');
                    setPaymentForm(prev => ({ ...prev, type: 'income', category: 'Salary' }));
                    setIsMenuOpen(false);
                  }}
                >
                  <Icons.Dollar /> Add Income
                </li>
              </ul>
            </div>

            <div style={formContainerStyle}>
              <div style={formStyle}>
                <h2 style={{ marginBottom: '24px', color: '#333' }}>
                  {activeTab === 'expense' ? 'Add New Expense' : 'Add New Income'}
                </h2>
                
                {/* Category Selection */}
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Category</label>
                  <div style={categoryGridStyle}>
                    {(activeTab === 'expense' ? expenseCategories : incomeCategories).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setPaymentForm(prev => ({ ...prev, category }))}
                        style={{
                          ...categoryButtonStyle,
                          backgroundColor: paymentForm.category === category ? '#007bff' : '#f8f9fa',
                          color: paymentForm.category === category ? 'white' : '#333',
                          border: paymentForm.category === category ? '2px solid #007bff' : '2px solid #dee2e6'
                        }}
                      >
                        <div style={{ marginBottom: '8px', fontSize: '20px' }}>
                          {categoryIcons[category]}
                        </div>
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Amount (RM)</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={paymentForm.amount}
                    onChange={handlePaymentFormChange}
                    style={inputStyle}
                    step="0.01"
                    min="0"
                  />
                </div>

                {/* Description */}
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    value={paymentForm.description}
                    onChange={handlePaymentFormChange}
                    style={inputStyle}
                  />
                </div>

                {/* Date */}
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={paymentForm.date}
                    onChange={handlePaymentFormChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={modalActionsStyle}>
                <button 
                  onClick={handleSavePayment}
                  style={{
                    ...saveButtonStyle,
                    opacity: !paymentForm.amount || !paymentForm.description ? 0.5 : 1,
                    cursor: !paymentForm.amount || !paymentForm.description ? 'not-allowed' : 'pointer'
                  }}
                  disabled={!paymentForm.amount || !paymentForm.description}
                >
                  Save {activeTab === 'expense' ? 'Expense' : 'Income'}
                </button>
                <button 
                  onClick={() => setIsAddingPayment(false)}
                  style={cancelButtonStyle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '24px',
  padding: '0 20px'
};

const toggleGroupStyle = {
  display: 'flex',
  border: '2px solid #007bff',
  borderRadius: '8px',
  overflow: 'hidden'
};

const toggleButtonStyle = {
  padding: '12px 24px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '600',
  transition: 'all 0.3s ease'
};

const bodyStyle = {
  padding: '20px'
};

const dropdownContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '12px',
  marginBottom: '24px'
};

const dropdownWrapperStyle = {
  position: 'relative'
};

const dropdownButtonStyle = {
  padding: '8px 16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: 'white',
  cursor: 'pointer',
  fontSize: '14px'
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '4px',
  zIndex: 1000,
  maxHeight: '200px',
  overflowY: 'auto'
};

const dropdownItemStyle = {
  padding: '8px 16px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'background-color 0.2s ease'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const chartContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '24px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const expenseBreakdownStyle = {
  width: '45%',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px'
};

const expenseItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  padding: '12px',
  backgroundColor: 'white',
  borderRadius: '8px'
};

const transactionCardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  overflow: 'hidden'
};

const transactionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #dee2e6'
};

const addPaymentButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'background-color 0.3s ease'
};

const transactionListStyle = {
  padding: '0'
};

const dateHeaderStyle = {
  backgroundColor: '#f8f9fa',
  padding: '12px 20px',
  fontWeight: '600',
  fontSize: '14px',
  color: '#666'
};

const transactionItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid #f0f0f0'
};

const amountBadgeStyle = {
  backgroundColor: '#f8f9fa',
  color: '#333',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: '600'
};

const chartCardStyle = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  marginBottom: '24px',
  maxWidth: '800px',
  margin: '0 auto 24px auto'
};

const modalBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalStyle = {
  position: 'relative',
  backgroundColor: 'white',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
};

const hamburgerStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  zIndex: 1001,
  color: '#333',
  padding: '10px'
};

const sidenavStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '250px',
  height: '100%',
  backgroundColor: '#f8f9fa',
  transition: 'transform 0.3s ease',
  zIndex: 1000,
  borderRight: '1px solid #dee2e6'
};

const sidenavListStyle = {
  listStyle: 'none',
  padding: '60px 0 0 0',
  margin: 0
};

const sidenavItemStyle = {
  padding: '15px 20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderBottom: '1px solid #dee2e6'
};

const formContainerStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0',
  height: '100%'
};

const formStyle = {
  flex: 1,
  padding: '60px 40px 20px 40px',
  overflowY: 'auto'
};

const formGroupStyle = {
  marginBottom: '20px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  color: '#333',
  fontSize: '14px'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '2px solid #dee2e6',
  borderRadius: '8px',
  fontSize: '14px',
  transition: 'border-color 0.3s ease',
  outline: 'none',
  boxSizing: 'border-box'
};

const categoryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
  gap: '12px',
  marginTop: '8px'
};

const categoryButtonStyle = {
  padding: '16px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '12px',
  fontWeight: '500',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80px'
};

const modalActionsStyle = {
  padding: '20px 40px',
  borderTop: '1px solid #dee2e6',
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end',
  backgroundColor: '#f8f9fa'
};

const saveButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.3s ease'
};

const cancelButtonStyle = {
  padding: '12px 24px',
  backgroundColor: 'transparent',
  color: '#6c757d',
  border: '2px solid #6c757d',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'all 0.3s ease'
};

export default Record;