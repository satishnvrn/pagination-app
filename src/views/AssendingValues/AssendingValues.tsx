import React, { useCallback, useEffect, useState } from "react";

import { getPaginatedData } from "../../services/PaginatedDataService";
import randomData from "../../constants/RandomNumbers";

import "./AssendingValues.styling.css";

/*
  This component displays paginated data in a table.
*/
const AssendingValues = () => {
  const pageSize = 10;

  /* This state variable is used to fetch and display data according to the page number. */
  const [ currentPageNo, setCurrentPageNo ] = useState(1);
  /*
    This state variable is used to control the page number input. 
    When Go button is clicked, it will be validated and assigned to the above variable.
  */
  const [ pageNumbeInputValue, setPageNumberInputValue ] = useState(1);

  /*
    This mehtod is a memoized version of getPaginatedData to minimize the renders for the same parameters.
  */
  const getData = useCallback(getPaginatedData, [currentPageNo]);
  /* The data is fetched and stored in this state variable. */
  const [ currentPageData, setCurrentPageData ] = useState(getData(randomData, currentPageNo, pageSize));

  /* The data is fetched when there is a change of page number and assigned to the respective state variable */
  useEffect(() => {
    setCurrentPageData(getData(randomData, currentPageNo, pageSize));
  }, [ currentPageNo, getData ]);

  /* This method handles when the page number input changes */
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

  /* 
    This method is called on click of go button.
    It validates the page number input value and sets it to current page number state variable
  */
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
