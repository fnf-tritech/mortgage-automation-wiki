import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterRanges, setFilterRanges] = useState({});
  const [buyerNameFilter, setBuyerNameFilter] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('');

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

  const handleAddToWishlist = () => {
    const filteredTableKey = JSON.stringify(filteredData);
    if (!wishlist.some((item) => JSON.stringify(item.tableData) === filteredTableKey)) {
      const wishlistName = prompt("Enter a name for the wishlist:");
      if (wishlistName) {
        const updatedWishlist = [
          ...wishlist,
          {
            name: wishlistName,
            tableData: filteredData
          }
        ];
        setWishlist(updatedWishlist);

        // Send the wishlist data to the API
        axios.post('https://riskanalysis.azurewebsites.net/Mortgage/AddToWishList', {
          method: 'POST',
          name: wishlistName,
          tableData: filteredData
        })
          .then(response => {
            console.log('Wishlist Added:', response.data);
            // Optionally, you can update the local state or perform any other necessary actions
          })
          .catch(error => {
            console.error('Error saving wishlist:', error);
            // Handle the error gracefully (e.g., show an error message)
          });
      } else {
        console.log("Invalid wishlist name.");
      }
    } else {
      console.log("The same table is already in the wishlist.");
    }
  };

  const handleViewAllWishlist = () => {
    console.log(wishlist);
  };

  const handleSortByChange = (e) => {
    const selectedSortBy = e.target.value;
  
    setSortBy(selectedSortBy);
  
    if (selectedSortBy === 'mortgage-asc') {
      sortedData.sort((a, b) => a.mortgage - b.mortgage);
    } else if (selectedSortBy === 'mortgage-desc') {
      sortedData.sort((a, b) => b.mortgage - a.mortgage);
    } else if (selectedSortBy === 'date-asc') {
      sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedSortBy === 'date-desc') {
      sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedSortBy === 'name') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }
  };
  

  const tableData = [
    { id: 1, name: 'Gopal Reddy', mortgage: 250000, date: '11-10-2021', riskAnalysis: 'Low', wishList: false },
    { id: 2, name: 'Suchit J', mortgage: 350000, date: '10-01-2022', riskAnalysis: 'Medium', wishList: true },
    { id: 3, name: 'Ayush Kumar', mortgage: 550000, date: '01-11-2015', riskAnalysis: 'Low', wishList: false },
    { id: 4, name: 'Shristi Shrivastava', mortgage: 200000, date: '10-09-2017', riskAnalysis: 'Low', wishList: false },
    { id: 5, name: 'Anushka Gupta', mortgage: 150000, date: '09-08-2020', riskAnalysis: 'High', wishList: true },
    { id: 6, name: 'Aditya A P', mortgage: 230000, date: '08-12-2023', riskAnalysis: 'Low', wishList: false },
    { id: 7, name: 'Jeevan K C', mortgage: 150000, date: '11-03-2023', riskAnalysis: 'Medium', wishList: true },
    { id: 8, name: 'Shyam B', mortgage: 240000, date: '01-07-2022', riskAnalysis: 'Medium', wishList: false },
    { id: 9, name: 'Abhijeet Kumar', mortgage: 290000, date: '08-11-2021', riskAnalysis: 'Low', wishList: false },
    { id: 10, name: 'Sanchita J Ellur', mortgage: 190000, date: '02-11-2016', riskAnalysis: 'Medium', wishList: true },
    { id: 11, name: 'Shaghil Khan', mortgage: 280000, date: '02-12-2017', riskAnalysis: 'High', wishList: false },
    { id: 12, name: 'Vijesh Srimal', mortgage: 550000, date: '11-11-2018', riskAnalysis: 'Low', wishList: true },
    { id: 13, name: 'Mohammed Saqheeb', mortgage: 650000, date: '05-06-2019', riskAnalysis: 'High', wishList: false },
    { id: 14, name: 'Sai Sharan Reddy', mortgage: 680000, date: '07-05-2020', riskAnalysis: 'Low', wishList: false },
    { id: 15, name: 'Shreyas Javalli', mortgage: 920000, date: '06-01-2023', riskAnalysis: 'Medium', wishList: false },
    { id: 16, name: 'Ravi Kumar', mortgage: 950000, date: '11-05-2022', riskAnalysis: 'Low', wishList: true },
    { id: 17, name: 'Leon H K', mortgage: 250700, date: '01-09-2021', riskAnalysis: 'Low', wishList: false },
    { id: 18, name: 'Deepak A C', mortgage: 230000, date: '12-11-2019', riskAnalysis: 'High', wishList: true },
    { id: 19, name: 'Aksha T', mortgage: 220000, date: '11-11-2020', riskAnalysis: 'Medium', wishList: true },
    { id: 20, name: 'Shamita K', mortgage: 120000, date: '03-06-2023', riskAnalysis: 'High', wishList: false },
    { id: 21, name: 'Abhijeet Kumar', mortgage: 120000, date: '03-06-2023', riskAnalysis: 'High', wishList: false },
    { id: 22, name: 'Abhijeet Kumar', mortgage: 150000, date: '03-01-2022', riskAnalysis: 'High', wishList: false },
    // Add more data rows as needed
  ];

  let filteredData = [];

  if (selectedFilters.length > 0) {
    filteredData = tableData.filter((row) => {
      return selectedFilters.every((filter) => {
        if (filter === 'mortgage') {
          const minMortgage = filterRanges.minMortgage || 0;
          const maxMortgage = filterRanges.maxMortgage || Infinity;
          return row.mortgage >= minMortgage && row.mortgage <= maxMortgage;
        }
        if (filter === 'date') {
          const startDate = filterRanges.startDate ? new Date(filterRanges.startDate) : null;
          const endDate = filterRanges.endDate ? new Date(filterRanges.endDate) : null;
          if (startDate && endDate) {
            const currentDate = new Date(row.date);
            return currentDate >= startDate && currentDate <= endDate;
          }
        }
        if (filter === 'name') {
          return row.name.toLowerCase().includes(buyerNameFilter.toLowerCase());
        }
        return true;
      });
    });
  } else {
    filteredData = tableData;
  }

  const sortedData = [...filteredData];
  if (sortBy === 'mortgage-asc') {
    sortedData.sort((a, b) => a.mortgage - b.mortgage);
  } else if (sortBy === 'mortgage-desc') {
    sortedData.sort((a, b) => b.mortgage - a.mortgage);
  } else if (sortBy === 'date-asc') {
    sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'date-desc') {
    sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === 'name') {
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
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
                {/* Add to Wishlist Button */}
                {filteredData.length > 0 && (
                  <button className="addtowishlist-button" onClick={handleAddToWishlist}>
                    Add to Wishlist
                  </button>
                )}
                {/* Retrieve Wishlist Button */}
                {wishlist.length > 0 && (
                  <button className="viewallwishlist-button" onClick={handleViewAllWishlist}>
                    View All Wishlist
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div className="sort-by sort-by-dropdown">
          <label htmlFor="sortBy">Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
            <option value="">None</option>
            <option value="mortgage-asc">Mortgage (Low to High)</option>
            <option value="mortgage-desc">Mortgage (High to Low)</option>
            <option value="date-asc">Date (Old to New)</option>
            <option value="date-desc">Date (New to Old)</option>
            <option value="name">Name</option>

          </select>
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
            {sortedData.map((row) => (
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
