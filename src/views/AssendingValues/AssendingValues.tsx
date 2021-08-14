import React, { useCallback, useEffect, useState } from "react";
import { getPaginatedData } from "../../services/PaginatedDataService";
import randomData from "../../constants/RandomNumbers";

import "./AssendingValues.styling.css";

const AssendingValues = () => {
  const pageSize = 10;
  const [ currentPageNo, setCurrentPageNo ] = useState(1);
  const [ pageNumbeInputValue, setPageNumberInputValue ] = useState(1);
  const getData = useCallback(getPaginatedData, [currentPageNo]);
  const [ currentPageData, setCurrentPageData ] = useState(getData(randomData, currentPageNo, pageSize));
  console.log('currentPageNo', currentPageNo, 'currentPageData', currentPageData, Math.floor((randomData.length - 1) / pageSize) + 1);

  useEffect(() => {
    setCurrentPageData(getData(randomData, currentPageNo, pageSize));
  }, [ currentPageNo, getData ]);

  const handlePageInputChange = (event) => {
    setPageNumberInputValue(Number(event.target.value));
  };

  const handlePreviousPage = () => {
    setCurrentPageNo(currentPageNo - 1);
    setPageNumberInputValue(currentPageNo - 1);
  };

  const handleNextPage = () => {
    setCurrentPageNo(currentPageNo + 1);
    setPageNumberInputValue(currentPageNo + 1);
  };

  const handlePageChange = () => {
    console.log('randomData.length', randomData.length, pageNumbeInputValue <= Math.floor(randomData.length - 1 / pageSize) + 1);
    if(
        pageNumbeInputValue 
        && pageNumbeInputValue > 1 
        && pageNumbeInputValue <= Math.floor(randomData.length / pageSize) + 1
      ) {
        setCurrentPageNo(pageNumbeInputValue);
      } else {
        setPageNumberInputValue(currentPageNo);
        alert('Invalid Page Number');
      }
  }

  return (<div>
    <table>
      <thead>
        <tr>
          <th>Serial Number</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {currentPageData.map((datum, index) => (
          <tr key={datum}>
            <td>{(currentPageNo - 1) * pageSize + index + 1}</td>
            <td>{datum}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="PaginationActionContainer">
      <button 
        className="previousButton" 
        onClick={handlePreviousPage}
        disabled={currentPageNo === 1}
      >
          Previous
      </button>
      <div className="pageInputContainer">
        <input type="number" value={pageNumbeInputValue} onChange={handlePageInputChange} />
        <button
          className="goButton"
          onClick={handlePageChange}
        >Go</button>
      </div>
      <button
        className="nextButton"
        onClick={handleNextPage}
        disabled={currentPageNo >= Math.floor((randomData.length - 1) / pageSize) + 1}
      >Next</button>
    </div>
  </div>);
};

export default AssendingValues; 
