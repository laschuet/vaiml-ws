/**/
const format = data => {
  const message = {
    data,
    timestamp: Date.now(),
  };
  return JSON.stringify(message);
};

export default format;
