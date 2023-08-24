
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { format, parseISO, differenceInSeconds } from 'date-fns';
import { formatTimestamp } from './Time'; // to display time on frontend
import TimeDisplay from './TimeDisplay';

const Show = () => {
  const [data, setData] = useState([]);
  const [startDtm, setStartDtm] = useState([]);// for starting time
  const [endDtm, setEndDtm] = useState('');// for ending time
   const [totalDi1OnTime, setTotalDi1OnTime] = useState(0);
  const [totalDi1OffTime, setTotalDi1OffTime] = useState(0);
  const [xAxisBarColor, setXAxisBarColor] = useState('yellow'); // Default color is yellow
  const [cartesianStrokeColor, setCartesianStrokeColor] = useState('palegreen'); // Default color is palegreen


  useEffect(() => {
   axios.get('http://localhost:5000/api/data')
      .then(response => {
        // Filter out documents with "modbus" and keep only "io"
        const filteredData = response.data.filter(item => item.data && item.data.msg === 'io');
        const processedData = filteredData.map(item => ({
          di1Value: item.data.io.di1,// di1 value
          dtm: formatTimestamp(item.data.dtm),// time
  
       
                }));
       
        
        setData(processedData);
        setStartDtm(processedData.length > 0 ? processedData[0].dtm : '');// startime collected
        setEndDtm(processedData.length > 0 ? processedData[processedData.length - 1].dtm : ''); //end time collected
      // calculate the di1=1 count and di1=0
        let di1OnTime = 0;
        let di1OffTime = 0;

        for (let i = 1; i < processedData.length; i++) {
          const prevData = processedData[i - 1];
          const currData = processedData[i];

          const timeDifference = moment(currData.dtm).diff(moment(prevData.dtm), 'seconds');

          if (prevData.di1Value === 1 && currData.di1Value === 1) {
            di1OnTime += timeDifference;
          } else if (prevData.di1Value === 0 && currData.di1Value === 0) {
            di1OffTime += timeDifference;
          }
        }

        const di1OnHours = di1OnTime / 3600;
        const di1OffHours = di1OffTime / 3600;

        setTotalDi1OnTime(di1OnHours);
        setTotalDi1OffTime(di1OffHours);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleXAxisBarColorChange = (event) => {  // choose button for x axis bar
    setXAxisBarColor(event.target.value);
  };
  const handleCartesianStrokeColorChange = (event) => { // color choose button for cartesian grid
    setCartesianStrokeColor(event.target.value);
  };
  
  
  return (
    <div>
      <h1>Data</h1>
      <h3>Machine On Time: {totalDi1OnTime.toFixed(2)} minutes</h3>
        <h3>Machine Off Time: {totalDi1OffTime.toFixed(2)} hours</h3>
      <TimeDisplay startDtm={startDtm} endDtm={endDtm} />
      <div style={{ display: 'flex', justifyContent: 'center', padding:"20px"  }}>
        {/* <h2>Bar Chart</h2> */}
        <div style={{ marginBottom: '20px' }}>
  <label>Choose X-axis 
    Bar Color:</label>
  <input type="color" value={xAxisBarColor} onChange={handleXAxisBarColorChange} />
</div>
{/* <div style={{ marginBottom: '20px' }}>
         <CartesianGrid fill={cartesianStrokeColor} />

  <label>Choose Y-axis Color:</label>
  <input type="color" value={cartesianStrokeColor} onChange={handleCartesianStrokeColorChange} />
</div> */}
        {/* <h3>Total Working Hours: {totalWorkingHours.toFixed(2)} hours</h3> */}
        <BarChart width={1000} height={100} data={data} barCategoryGap={0} padding-left="0px" margin={{ left: 50, right: 50 }}>
        <XAxis dataKey="dtm" tickFormatter={(time) =>moment(time).format('hh: A')} interval={2300}   />
          {/* <YAxis hide="true" /> */}
          <Tooltip
            contentStyle={{
              fontSize: '12px', // Adjust the font size as needed
              backgroundColor: 'white', // Tooltip background color
              border: '1px solid gray', // Tooltip border
              padding: '5px', // Adjust padding as needed
            }}
          />       
          <Bar dataKey="di1Value"  fill={xAxisBarColor} />
          </BarChart>
      </div>
    </div>
  );
};

export default Show;
