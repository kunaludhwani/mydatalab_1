import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormInput,
  CSpinner,
} from '@coreui/react'

const PincodeDataTable = () => {
  const [inputPincode, setInputPincode] = useState('')
  const [displayData, setDisplayData] = useState([])
  const [dataFetched, setDataFetched] = useState(false) // Track data fetching
  const [loading, setLoading] = useState(false) // Track loading state
  const [pinCodeData, setPinCodeData] = useState([]) // State for storing pincode data

  // Fetch pincode data asynchronously when the component mounts
  useEffect(() => {
    const fetchPinCodeData = async () => {
      setLoading(true) // Start the loader while fetching data
      try {
        // Dynamically import the pincode data
        const data = await import('../../../data/pincode.json')
        setPinCodeData(data.default) // Assuming data is exported as default in JSON
        setLoading(false) // Stop the loader after data is fetched
      } catch (error) {
        console.error('Error fetching pincode data: ', error)
        setLoading(false) // Stop the loader if there's an error
      }
    }

    fetchPinCodeData() // Invoke the async function
  }, []) // Empty dependency array ensures this only runs once on mount

  // Function to get data based on pincode
  const getDataByPincode = (pincode) => {
    return pinCodeData.filter((item) => item.pincode == pincode)
  }

  // Handle the input change
  const handleInputChange = (event) => {
    setInputPincode(event.target.value)
  }

  // Handle the button click
  const handleButtonClick = () => {
    setLoading(true) // Start the loader when button is clicked
    const data = getDataByPincode(parseInt(inputPincode, 10))

    // Simulate a delay for loading (you can replace this with an API call)
    setTimeout(() => {
      setDisplayData(data)
      setLoading(false) // Stop the loader after the data is fetched
      setDataFetched(true) // Mark data as fetched
    }, 1500) // Simulating a 1.5s delay for fetching data
  }

  // Handle Enter key press for search
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick() // Trigger the same functionality as the button click
    }
  }

  return (
    <div>
      <h2>Enter Pincode</h2>

      {/* Input field with margin bottom */}
      <CFormInput
        type="text"
        value={inputPincode}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Trigger search on Enter key press
        placeholder="Enter Pincode"
        className="mb-3" // Adds space below the input
      />

      {/* Primary button with margin bottom */}
      <CButton color="primary" onClick={handleButtonClick} className="mb-3">
        Get Data
      </CButton>

      {/* Display loader when data is being fetched */}
      {loading && (
        <div className="text-center my-3">
          <CSpinner color="primary" />
          <p>Loading...</p>
        </div>
      )}

      {/* Show the table if data is fetched and available */}
      {dataFetched && displayData.length > 0 && !loading ? (
        <CTable striped hover responsive className="mb-3">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Office Name</CTableHeaderCell>
              <CTableHeaderCell>Circle Name</CTableHeaderCell>
              <CTableHeaderCell>Region Name</CTableHeaderCell>
              <CTableHeaderCell>Division Name</CTableHeaderCell>
              <CTableHeaderCell>Delivery Type</CTableHeaderCell>
              <CTableHeaderCell>District</CTableHeaderCell>
              <CTableHeaderCell>State Name</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {displayData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.officename}</CTableDataCell>
                <CTableDataCell>{item.circlename}</CTableDataCell>
                <CTableDataCell>{item.regionname}</CTableDataCell>
                <CTableDataCell>{item.divisionname}</CTableDataCell>
                <CTableDataCell>{item.delivery}</CTableDataCell>
                <CTableDataCell>{item.district}</CTableDataCell>
                <CTableDataCell>{item.statename}</CTableDataCell>
                <CTableDataCell>{item.type}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : (
        dataFetched &&
        inputPincode &&
        displayData.length === 0 &&
        !loading && <div className="my-3">No data found for the given pincode.</div>
      )}
    </div>
  )
}

export default PincodeDataTable
