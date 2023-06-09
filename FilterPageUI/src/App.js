import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [applicantName, setApplicantName] = useState('');
  const [loanRange, setLoanRange] = useState({ min: '', max: '' });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [wishlistName, setWishlistName] = useState('');
  
  const tableData = [
    { appId: 1, applicantName: 'Gopal Reddy', expectedLoan: 250000, date: '11-10-2021', riskAnalysis: 'Low' },
    { appId: 2, applicantName: 'Suchit J', expectedLoan: 350000, date: '10-01-2022', riskAnalysis: 'Medium'  },
    { appId: 3, applicantName: 'Ayush Kumar', expectedLoan: 550000, date: '01-11-2015', riskAnalysis: 'Low' },
    { appId: 4, applicantName: 'Shristi Shrivastava', expectedLoan: 200000, date: '10-09-2017', riskAnalysis: 'Low' },
    { appId: 5, applicantName: 'Anushka Gupta', expectedLoan: 150000, date: '09-08-2020', riskAnalysis: 'High' },
    { appId: 6, applicantName: 'Aditya A P', expectedLoan: 230000, date: '08-12-2023', riskAnalysis: 'Low' },
    { appId: 7, applicantName: 'Jeevan K C', expectedLoan: 150000, date: '11-03-2023', riskAnalysis: 'Medium' },
    { appId: 8, applicantName: 'Shyam B', expectedLoan: 240000, date: '01-07-2022', riskAnalysis: 'Medium' },
    { appId: 9, applicantName: 'Abhijeet Kumar', expectedLoan: 290000, date: '08-11-2021', riskAnalysis: 'Low' },
    { appId: 10, applicantName: 'Sanchita J Ellur', expectedLoan: 190000, date: '02-11-2016', riskAnalysis: 'Medium' },
    { appId: 11, applicantName: 'Shaghil Khan', expectedLoan: 280000, date: '02-12-2017', riskAnalysis: 'High' },
    { appId: 12, applicantName: 'Vijesh Srimal', expectedLoan: 550000, date: '11-11-2018', riskAnalysis: 'Low' },
    { appId: 13, applicantName: 'Mohammed Saqheeb', expectedLoan: 650000, date: '05-06-2019', riskAnalysis: 'High' },
    { appId: 14, applicantName: 'Sai Sharan Reddy', expectedLoan: 680000, date: '07-05-2020', riskAnalysis: 'Low' },
    { appId: 15, applicantName: 'Shreyas Javalli', expectedLoan: 920000, date: '06-01-2023', riskAnalysis: 'Medium' },
    { appId: 16, applicantName: 'Ravi Kumar', expectedLoan: 950000, date: '11-05-2022', riskAnalysis: 'Low' },
    { appId: 17, applicantName: 'Leon H K', expectedLoan: 250700, date: '01-09-2021', riskAnalysis: 'Low' },
    { appId: 18, applicantName: 'Deepak A C', expectedLoan: 230000, date: '12-11-2019', riskAnalysis: 'High' },
    { appId: 19, applicantName: 'Aksha T', expectedLoan: 220000, date: '11-11-2020', riskAnalysis: 'Medium' },
    { appId: 20, applicantName: 'Shamita K', expectedLoan: 120000, date: '03-06-2023', riskAnalysis: 'High' },
    { appId: 21, applicantName: 'Abhijeet Kumar', expectedLoan: 120000, date: '03-06-2023', riskAnalysis: 'High' },
    { appId: 22, applicantName: 'Abhijeet Kumar', expectedLoan: 150000, date: '03-01-2022', riskAnalysis: 'High' },
    // Add more data rows as needed
  ];

  
  useEffect(() => {
    setTimeout(() => {
      setData(tableData);
      setFilteredData(tableData);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedFilters(selectedOptions);
  };

  const handleClearFilter = () => {
  setApplicantName('');
  setLoanRange({ min: '', max: '' });
  setDateRange({ start: '', end: '' });
  setSelectedFilters([]);
  setFilteredData(tableData); // Reset filteredData to original tableData
};

  const handleApplyFilter = () => {
    let filteredResult = data;

    // Filter by applicant name
    if (applicantName.trim() !== '') {
      filteredResult = filteredResult.filter((entry) =>
        entry.applicantName.toLowerCase().includes(applicantName.toLowerCase())
      );
    }

    // Filter by loan range
    if (loanRange.min !== '' && loanRange.max !== '') {
      filteredResult = filteredResult.filter(
        (entry) => entry.expectedLoan >= Number(loanRange.min) && entry.expectedLoan <= Number(loanRange.max)
      );
    }

    // Filter by date range
    if (dateRange.start !== '' && dateRange.end !== '') {
    filteredResult = filteredResult.filter((entry) => {
    const startDate = JSON.stringify(new Date(dateRange.start));
    const endDate = JSON.stringify(new Date(dateRange.end));
    const entryDate = JSON.stringify(new Date(entry.date));
    return entryDate >= startDate && entryDate <= endDate;
    });
}

    setFilteredData(filteredResult);
  };

  const handleSortByChange = (e) => {
    const selectedSortBy = e.target.value;
    if (selectedSortBy === '') {
      setSortBy('');
      setFilteredData(data); // Set filtered data to original unsorted data
    } else {
      setSortBy(selectedSortBy);
    }
  };
  

  useEffect(() => {
    let sortedResult = [...filteredData];
  
    if (sortBy === 'expectedLoan-asc') {
      sortedResult.sort((a, b) => a.expectedLoan - b.expectedLoan);
    } else if (sortBy === 'expectedLoan-desc') {
      sortedResult.sort((a, b) => b.expectedLoan - a.expectedLoan);
    } else if (sortBy === 'date-asc') {
      sortedResult.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date-desc') {
      sortedResult.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'applicantName') {
      sortedResult.sort((a, b) => a.applicantName.localeCompare(b.applicantName));
    }
  
    setFilteredData(sortedResult);
  }, [sortBy]);
  
  const handleAddToWishlist = () => {
    const sortedFilteredTableKey = JSON.stringify({
      filterType: selectedFilters,
      sortBy: sortBy,
    }); // Store filter type, sort by type, and sorted data in key
  
    const existingWishlist = wishlist.find((item) => item.key === sortedFilteredTableKey);
    if (existingWishlist) {
      console.log("The same table is already in the wishlist.");
      return;
    }
  
    let wishlistName = prompt("Enter a name for the wishlist:");
    if (!wishlistName) {
      console.log("Invalid wishlist name.");
      return;
    }
  
    const existingWishlistName = wishlist.find((item) => item.name === wishlistName);
    if (existingWishlistName) {
      wishlistName = prompt(`A wishlist with the name "${wishlistName}" already exists. Please enter a different name.`);
      if (!wishlistName) {
        console.log("Invalid wishlist name.");
        return;
      }
    }
  
    const updatedWishlist = [
     ...wishlist,
      {
        name: wishlistName,
        key: sortedFilteredTableKey,
      },
    ];
    setWishlist(updatedWishlist);
  
    // Send the wishlist data to the API
    axios.post('https://riskanalysis.azurewebsites.net/Mortgage/AddWishView', {
      method: 'POST',
      name: wishlistName,
      filterType: selectedFilters,
      sortBy: sortBy,
      

    },
      {
        headers: {
          'Content-Type': 'application/json'
        }
    })
     .then(response => {
        console.log('Wishlist Added:', response.data);
        // Optionally, you can update the local state or perform any other necessary actions
      })
     .catch(error => {
        console.error('Error saving wishlist:', error);
        // Handle the error gracefully (e.g., show an error message)
      });
  };


  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Company Logo" />
        </div>
        <button className="signout-button">Sign Out</button>
      </header>

      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          {/* Filter Section */}
          <div className="filter-section">
            <h3 className="filter-heading">FILTERS</h3>
            <div className={`filter-content show`}>
              <div className="filter-group">
                <label htmlFor="applicantName">Applicant Name:</label>
                <input
                  type="text"
                  id="applicantName"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label htmlFor="loanRange">Loan Range:</label>
                <input
                  type="number"
                  id="loanRangeMin"
                  value={loanRange.min}
                  onChange={(e) => setLoanRange({ ...loanRange, min: e.target.value })}
                  placeholder="Min"
                />
                <input
                  type="number"
                  id="loanRangeMax"
                  value={loanRange.max}
                  onChange={(e) => setLoanRange({ ...loanRange, max: e.target.value })}
                  placeholder="Max"
                />
              </div>
              <div className="filter-group">
                <label htmlFor="dateRange">Date Range:</label>
                <input
                  type="date"
                  id="dateRangeStart"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
                <input
                  type="date"
                  id="dateRangeEnd"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
              <div className="button-group">
                <button className="apply-filter-button" onClick={handleApplyFilter}>
                  Apply Filter
                </button>
                <button className="clear-filter-button" onClick={handleClearFilter}>
                  Clear Filter
                </button>
                {/* Add to Wishlist Button */}
                <button className="addtowishlist-button" onClick={handleAddToWishlist}>
                    Add to Wishlist
                  </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Section */}
        <main className="main">
          {/* Sort By Section */}
          <div className="sort-by sort-by-dropdown">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
            <option value="">None</option>
            <option value="expectedLoan-asc">Expected Loan (Low to High)</option>
            <option value="expectedLoan-desc">Expected Loan (High to Low)</option>
            <option value="date-asc">Date (Old to New)</option>
            <option value="date-desc">Date (New to Old)</option>
            <option value="applicantName">Applicant's Name</option>
          </select>
        </div>

          {/* Table Section */}
          <div className="table-section">
            {filteredData.length === 0 ? (
              <div className="no-data">No data found</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Applicant's ID</th>
                    <th>Applicant's Name</th>
                    <th>Expected Loan</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry) => (
                    <tr key={entry.appId}>
                      <td>{entry.appId}</td>
                      <td>{entry.applicantName}</td>
                      <td>{entry.expectedLoan}</td>
                      <td>{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;