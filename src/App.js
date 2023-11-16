import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Records from './components/Records';
import Pagination from './components/Pagination';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);


  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8000/products-list')
        setData(response.data.data)
        console.log(response.data.data)
      } catch (error) {
        console.error(error)
      }
    })();

  }, [])
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)
  return (
    <div className='container mt-5'>
      <h2 style={{textAlign:"center"}}> Simple Pagination Example </h2>
      <Records data={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
