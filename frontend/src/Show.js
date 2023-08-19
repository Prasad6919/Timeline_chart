
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Show = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
  //   axios.get('http://localhost:5000/api/data')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  axios.get('http://localhost:5000/api/data')
      .then(response => {
        // Filter out documents with "modbus" and keep only "io"
        const filteredData = response.data.filter(item => item.data && item.data.msg === 'io');
        const processedData = filteredData.map(item => ({
          di1Value: item.data.io.di1
        }));
        setData(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 

  return (
    <div>
      <h2>Data</h2>
      {/* <div> Start Time :10:54:35             End Time : 04:54:53 */}
            
      {/* </div> */}
      
      
     
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Bar Chart</h2>
        <BarChart width={1000} height={70} data={data} barCategoryGap={0} padding-left="20px">
        {/* <XAxis dataKey="name"  /> */}
          {/* <YAxis hide="true" /> */}
          <Tooltip
            contentStyle={{
              fontSize: '6px', // Adjust the font size as needed
              backgroundColor: 'white', // Tooltip background color
              border: '1px solid gray', // Tooltip border
              padding: '5px', // Adjust padding as needed
            }}
          />
         
          <CartesianGrid fill="green" stroke='pale green'/>
          <Bar dataKey="di1Value" fill=" yellow" />
        </BarChart>
      </div>
    </div>
  );
};

export default Show;
