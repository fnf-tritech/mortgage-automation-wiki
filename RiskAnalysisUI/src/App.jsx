import './App.css';
import 'devextreme/dist/css/dx.light.css'
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import DocumentStatus from './DocumentStatus';


const App = () => {
  return (
    <Router>
      <div className="App">
         <header className="App-header">
           <div className="logo">
             <img src={process.env.PUBLIC_URL + 'logo.png'} alt="Company Logo" />
           </div>
           <div className="sign-out">
             <button>Sign-out</button>
             <span style={{ color: 'blue' }}></span>
           </div>
           <h2 className="risk-details">RISK DETAILS</h2>
           <table className="risk-table">
             <tbody>
                 <tr>
                     <th>Parameters</th>
                     <th>Status</th>
                 </tr>
               <tr>
                 <td>Personal Info</td>
                 <td>
                   <span className="icon correct"></span>
                 </td>
                 <td>
                <Link to="/update/Personal Info">
                </Link>
              </td>
               </tr>
               <tr>
                 <td>Income verification</td>
                 <td>
                   <span className="icon wrong"></span>
                 </td>
                 <td>
                <Link to="/update/Income verification">
                </Link>
              </td>
               </tr>
               <tr>
                 <td>Asset Documentation</td>
                 <td>
                   <span className="icon wrong"></span>
                 </td>
                 <td>
                <Link to="/update/Asset Documentation">
                </Link>
              </td>
               </tr>
               <tr>
                 <td>Property Information</td>
                 <td>
                   <span className="icon correct"></span>
                 </td>
                 <td>
                <Link to="/update/Property Information">
                </Link>
              </td>
               </tr>
               <tr>
                 <td>Debt Obligations</td>
                 <td>
                   <span className="icon correct"></span>
                 </td>
                 <td>
                <Link to="/update/Debt Obligations">
                </Link>
              </td>
               </tr>
               <tr>
                 <td>Legal opinion</td>
                 <td>
                   <span className="icon correct"></span>
                 </td>
                 <td>
                <Link to="/update/Legal opinion">
                </Link>
              </td>
               </tr>
             </tbody>
           </table>
           <button className="update-result-button">Update Result</button>
           <div className="rejected-logo">
             <img src="https://www.psdstamps.com/wp-content/uploads/2020/02/round-rejected-stamp-png.png" alt="Rejected Logo" />
           </div>

           <Routes>
            <Route path="/update/:documentName" element={<DocumentStatus />} />
           </Routes>
        </header>
      </div>
      </Router>
  );
}

export default App;
