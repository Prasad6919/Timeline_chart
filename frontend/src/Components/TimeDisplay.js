// import React from 'react';

// const TimeDisplay = ({ startDtm, endDtm }) => {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
//       <div>
//         <p style={{ fontWeight: 'bold' }}>Start Date: {startDtm}</p>
//       </div>
//       <div>
//         <p style={{ fontWeight: 'bold' }}>End Date: {endDtm}</p>
//       </div>
//     </div>
//   );
// };

// export default TimeDisplay;
import React from 'react';

const TimeDisplay = ({ startDtm, endDtm }) => {
  const formatDateTime = dtm => {
    const dateTime = new Date(dtm);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return { date, time };
  };

  const formattedStartDtm = formatDateTime(startDtm);
  const formattedEndDtm = formatDateTime(endDtm);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
      <div>
        <p style={{ fontWeight: 'bold' }}>Start Date: {formattedStartDtm.date}</p>
        <p style={{ fontWeight: 'bold' }}>Start Time: {formattedStartDtm.time}</p>
      </div>
      <div>
        <p style={{ fontWeight: 'bold' }}>End Date: {formattedEndDtm.date}</p>
        <p style={{ fontWeight: 'bold' }}>End Time: {formattedEndDtm.time}</p>
      </div>
    </div>
  );
};

export default TimeDisplay;
