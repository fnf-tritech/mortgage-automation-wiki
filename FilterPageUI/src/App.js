import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isFilterVisible, setFilterVisible] = useState(false); // State to track filter visibility
  const [selectedFilters, setSelectedFilters] = useState([]); // State to track the selected filters
  const [filterRanges, setFilterRanges] = useState({}); // State to track the filter ranges
  const [buyerNameFilter, setBuyerNameFilter] = useState(''); // State to track the buyer's name filter

  const handleFilterClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleFilterChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedFilters(selectedOptions);
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilterRanges((prevRanges) => ({ ...prevRanges, [name]: value }));
  };

  const handleBuyerNameChange = (e) => {
    setBuyerNameFilter(e.target.value);
  };

  const handleClearFilter = () => {
    setSelectedFilters([]);
    setFilterRanges({});
    setBuyerNameFilter('');
  };

  const tableData = [
    { id: 1, name: 'Gopal Reddy', mortgage: 250000, date: '11-10-2021', riskAnalysis: 'Low', wishlist: false },
    { id: 2, name: 'Suchit J', mortgage: 350000, date: '10-01-2022', riskAnalysis: 'Medium', wishlist: true },
    { id: 3, name: 'Ayush Kumar', mortgage: 550000, date: '01-11-2015', riskAnalysis: 'Low', wishlist: false },
    { id: 4, name: 'Shristi Shrivastava', mortgage: 200000, date: '10-09-2017', riskAnalysis: 'Low', wishlist: false },
    { id: 5, name: 'Anushka Gupta', mortgage: 150000, date: '09-08-2020', riskAnalysis: 'High', wishlist: true },
    { id: 6, name: 'Aditya A P', mortgage: 230000, date: '08-12-2023', riskAnalysis: 'Low', wishlist: false },
    { id: 7, name: 'Jeevan K C', mortgage: 150000, date: '11-03-2023', riskAnalysis: 'Medium', wishlist: true },
    { id: 8, name: 'Shyam B', mortgage: 240000, date: '01-07-2022', riskAnalysis: 'Medium', wishlist: false },
    { id: 9, name: 'Abhijeet Kumar', mortgage: 290000, date: '08-11-2021', riskAnalysis: 'Low', wishlist: false },
    { id: 10, name: 'Sanchita J Ellur', mortgage: 190000, date: '02-11-2016', riskAnalysis: 'Medium', wishlist: true },
    { id: 11, name: 'Shaghil Khan', mortgage: 280000, date: '02-12-2017', riskAnalysis: 'High', wishlist: false },
    { id: 12, name: 'Vijesh Srimal', mortgage: 550000, date: '11-11-2018', riskAnalysis: 'Low', wishlist: true },
    { id: 13, name: 'Mohammed Saqheeb', mortgage: 650000, date: '05-06-2019', riskAnalysis: 'High', wishlist: false },
    { id: 14, name: 'Sai Sharan Reddy', mortgage: 680000, date: '07-05-2020', riskAnalysis: 'Low', wishlist: false },
    { id: 15, name: 'Shreyas Javalli', mortgage: 920000, date: '06-01-2023', riskAnalysis: 'Medium', wishlist: false },
    { id: 16, name: 'Ravi Kumar', mortgage: 950000, date: '11-05-2022', riskAnalysis: 'Low', wishlist: true },
    { id: 17, name: 'Leon H K', mortgage: 250700, date: '01-09-2021', riskAnalysis: 'Low', wishlist: false },
    { id: 18, name: 'Deepak A C', mortgage: 230000, date: '12-11-2019', riskAnalysis: 'High', wishlist: true },
    { id: 19, name: 'Aksha T', mortgage: 220000, date: '11-11-2020', riskAnalysis: 'Medium', wishlist: true },
    { id: 20, name: 'Shamita K', mortgage: 120000, date: '03-06-2023', riskAnalysis: 'High', wishlist: false },
    { id: 21, name: 'Abhijeet Kumar', mortgage: 120000, date: '03-06-2023', riskAnalysis: 'High', wishlist: false },
    // Add more data rows as needed
  ];

  
  let filteredData = [];

  if (selectedFilters.length > 0) {
    if (selectedFilters.includes('mortgage')) {
      const minMortgage = filterRanges.minMortgage || 0;
      const maxMortgage = filterRanges.maxMortgage || Infinity;
      filteredData = tableData.filter((row) => {
        return row.mortgage >= minMortgage && row.mortgage <= maxMortgage;
      });
    }

    if (selectedFilters.includes('date')) {
      const startDate = filterRanges.startDate ? new Date(filterRanges.startDate) : null;
      const endDate = filterRanges.endDate ? new Date(filterRanges.endDate) : null;
      filteredData = tableData.filter((row) => {
        if (startDate && endDate) {
          const currentDate = new Date(row.date);
          return currentDate >= startDate && currentDate <= endDate;
        }
        return true;
      });
    }

    if (selectedFilters.includes('name')) {
      filteredData = tableData.filter((row) => {
        return row.name.toLowerCase().includes(buyerNameFilter.toLowerCase());
      });
    }
  } else {
    filteredData = tableData;
  }


  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Company Logo" />
        </div>
        <button className="signout-button">Sign Out</button>
      </header>

      {/* Content */}
      <div className="content">
        {/* Title and Filter */}
        <div className="title-filter-section">
          <h1 className="title">ALL LIST</h1>
          <div className="filter-section">
            <button className="filter-button" onClick={handleFilterClick}>
              Filter
            </button>
            {isFilterVisible && (
              <>
                <select className="filter-select" multiple value={selectedFilters} onChange={handleFilterChange}>
                  <option value="name">Buyer's Name</option>
                  <option value="mortgage">Mortgage Amount</option>
                  <option value="date">Date</option>
                </select>

                {selectedFilters.includes('mortgage') && (
                  <div className="range-inputs">
                    <input
                      type="number"
                      name="minMortgage"
                      placeholder="Min Mortgage"
                      value={filterRanges.minMortgage || ''}
                      onChange={handleRangeChange}
                      className="range-input"
                    />
                    <input
                      type="number"
                      name="maxMortgage"
                      placeholder="Max Mortgage"
                      value={filterRanges.maxMortgage || ''}
                      onChange={handleRangeChange}
                      className="range-input"
                    />
                  </div>
                )}
                {selectedFilters.includes('date') && (
                  <div className="range-inputs">
                    <input
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      value={filterRanges.startDate || ''}
                      onChange={handleRangeChange}
                      className="range-input"
                    />
                    <input
                      type="date"
                      name="endDate"
                      placeholder="End Date"
                      value={filterRanges.endDate || ''}
                      onChange={handleRangeChange}
                      className="range-input"
                    />
                  </div>
                )}
                {selectedFilters.includes('name') && (
                  <div className="range-inputs">
                    <input
                      type="text"
                      name="buyerName"
                      placeholder="Buyer's Name"
                      value={buyerNameFilter}
                      onChange={handleBuyerNameChange}
                      className="range-input"
                    />
                  </div>
                )}
                <button className="clear-filter-button" onClick={handleClearFilter}>
                  Clear Filter
                </button>
              </>
            )}
          </div>
        </div>

        {/* Data Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Buyer's Name</th>
              <th>Mortgage Amount</th>
              <th>Date</th>
              <th>Risk Analysis</th>
              <th>Wishlist</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.mortgage}</td>
                <td>{row.date}</td>
                <td>{row.riskAnalysis}</td>
                <td>{row.wishlist ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
