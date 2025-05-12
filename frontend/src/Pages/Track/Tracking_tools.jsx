import React, { useState } from 'react';
import './Tracking_tools.css';

const Tracking_tools = () => {
  const [activeTab, setActiveTab] = useState('Planner');
  const [showExportModal, setShowExportModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: '01/01/2025',
    to: '04/04/2025'
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleExportModal = () => {
    setShowExportModal(!showExportModal);
    // Reset selections when modal closes
    if (!showExportModal) {
      setSelectedTimeRange('');
      setSelectedFormat('');
    }
  };

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const handleDateChange = (e, field) => {
    setDateRange({
      ...dateRange,
      [field]: e.target.value
    });
  };

  const getSectionHeader = () => {
    switch(activeTab) {
      case 'Planner':
        return {
          title: 'Financial Planner',
          exportText: 'Export Planner',
          showExport: true,
          exportType: 'planner'
        };
      case 'Expenses':
        return {
          title: 'Expenses Tracker',
          exportText: 'Export Report',
          showExport: true,
          exportType: 'report'
        };
      case 'Analysis':
        return {
          title: 'Spending Analysis',
          exportText: '',
          showExport: false,
          exportType: ''
        };
      default:
        return {
          title: 'Financial Planner',
          exportText: 'Export Planner',
          showExport: true,
          exportType: 'planner'
        };
    }
  };

  const { title, exportText, showExport, exportType } = getSectionHeader();

  const renderExportModalContent = () => {
    if (exportType === 'planner') {
      return (
        <>
          <h3>Export Planner</h3>
          <div className="format-options">
            <label className={`format-option ${selectedFormat === 'pdf' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="exportFormat" 
                value="pdf"
                checked={selectedFormat === 'pdf'}
                onChange={() => handleFormatChange('pdf')}
              />
              PDF
            </label>
            <label className={`format-option ${selectedFormat === 'csv' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="exportFormat" 
                value="csv"
                checked={selectedFormat === 'csv'}
                onChange={() => handleFormatChange('csv')}
              />
              CSV
            </label>
            <label className={`format-option ${selectedFormat === 'excel' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="exportFormat" 
                value="excel"
                checked={selectedFormat === 'excel'}
                onChange={() => handleFormatChange('excel')}
              />
              Excel
            </label>
          </div>
        </>
      );
    } else if (exportType === 'report') {
      return (
        <>
          <h3>Export Report</h3>
          <div className="time-options">
            <label className={`time-option ${selectedTimeRange === 'week' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="timeRange" 
                checked={selectedTimeRange === 'week'}
                onChange={() => handleTimeRangeChange('week')}
              />
              Last week
            </label>
            <label className={`time-option ${selectedTimeRange === 'month' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="timeRange" 
                checked={selectedTimeRange === 'month'}
                onChange={() => handleTimeRangeChange('month')}
              />
              Last month
            </label>
            <label className={`time-option ${selectedTimeRange === 'year' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="timeRange" 
                checked={selectedTimeRange === 'year'}
                onChange={() => handleTimeRangeChange('year')}
              />
              Year to date
            </label>
            <label className={`time-option ${selectedTimeRange === 'custom' ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="timeRange" 
                checked={selectedTimeRange === 'custom'}
                onChange={() => handleTimeRangeChange('custom')}
              />
              Specific date range
            </label>
          </div>

          {selectedTimeRange === 'custom' && (
            <div className="date-range">
              <div className="date-input">
                <label>From</label>
                <input 
                  type="text" 
                  value={dateRange.from}
                  onChange={(e) => handleDateChange(e, 'from')}
                />
              </div>
              <div className="date-input">
                <label>To</label>
                <input 
                  type="text" 
                  value={dateRange.to}
                  onChange={(e) => handleDateChange(e, 'to')}
                />
              </div>
            </div>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <div className="tracking-container">
      {/* Header with adjusted positioning */}
      <header className="page-header">
        <div className="header-content">
          <h1>Tracking Tools</h1>
          <span className="welcome-message">Hello Hakimi, Welcome Back</span>
        </div>
      </header>

      <div className="financial-tracker">
        <div className="tracker-tabs">
          <button 
            className={`planner-button ${activeTab === 'Planner' ? 'active-tab' : 'inactive-tab'}`}
            onClick={() => handleTabChange('Planner')}
          >
            Planner
          </button>
          <button 
            className={`expenses-button ${activeTab === 'Expenses' ? 'active-tab' : 'inactive-tab'}`}
            onClick={() => handleTabChange('Expenses')}
          >
            Expenses
          </button>
          <button 
            className={`analysis-button ${activeTab === 'Analysis' ? 'active-tab' : 'inactive-tab'}`}
            onClick={() => handleTabChange('Analysis')}
          >
            Analysis
          </button>
        </div>

        <div className="divider"></div>

        <section className="financial-planner-section">
          <div className="section-header">
            <h2>{title}</h2>
            {showExport && (
              <button className="export-button" onClick={toggleExportModal}>
                {exportText}
              </button>
            )}
          </div>

          {showExportModal && (
            <div className="modal-overlay">
              <div className="export-modal">
                {renderExportModalContent()}
                <div className="modal-actions">
                  <button className="cancel-button" onClick={toggleExportModal}>
                    Cancel
                  </button>
                  <button className="download-button" disabled={exportType === 'planner' ? !selectedFormat : !selectedTimeRange}>
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="tab-content">
            {activeTab === 'Planner' && <div>Planner content goes here</div>}
            {activeTab === 'Expenses' && <div>Expenses content goes here</div>}
            {activeTab === 'Analysis' && <div>Analysis content goes here</div>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tracking_tools;