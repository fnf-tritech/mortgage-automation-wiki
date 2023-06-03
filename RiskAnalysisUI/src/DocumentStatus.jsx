import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DocumentStatus = () => {
  const { documentName } = useParams();
  const [status, setStatus] = useState('right');

  const handleStatusChange = () => {
    setStatus(prevStatus => (prevStatus === 'right' ? 'wrong' : 'right'));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(`Document ${documentName} updated with status: ${status}`);
  };

  return (
    <div>
      <h2>Update Document Status</h2>
      <p>Document Name: {documentName}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Status:
          <select value={status} onChange={handleStatusChange}>
            <option value="right">Right</option>
            <option value="wrong">Wrong</option>
          </select>
        </label>
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
};

export default DocumentStatus;
