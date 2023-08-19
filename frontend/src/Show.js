
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data from API
//     axios.get('/api/data')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Data</h2>
//       <ul>
//         {data.map(item => (
//           <li key={item._id}>{item.data.io.di1}</li>
//         ))}
//       </ul>
     
//       <div>
//         <h2>Bar Chart</h2>
//         <BarChart width={600} height={300} data={data}>
//           <XAxis  />
//           <YAxis />
//           <Tooltip />
//           <Legend
//     payload={
//       data.map(item => ({
//         id: item.data.io.di1,
//         type: "square",
//         value: `Di1: ${item.data.io.di1}`,
//       }))
//     }
//   />
//           <CartesianGrid fill="yellow"/>
//           <Bar dataKey="data.io.di1" fill="#82ca9d" />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Show = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
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
        {/* <XAxis dataKey="_id"  /> */}
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
          <Bar dataKey="data.io.di1" fill=" yellow" />
        </BarChart>
      </div>
    </div>
  );
};

export default Show;
