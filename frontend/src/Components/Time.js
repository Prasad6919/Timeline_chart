export const formatTimestamp = dtm => {
  const year = dtm.substring(0, 4);
  const month = dtm.substring(4, 6);
  const day = dtm.substring(6, 8);
  const hour = dtm.substring(8, 10);
  const minute = dtm.substring(10, 12);
  const second = dtm.substring(12, 14);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export default formatTimestamp;