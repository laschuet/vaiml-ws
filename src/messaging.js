/**/
const format = data => {
  const message = {
    data,
    timestamp: Date.now(),
  };
  return JSON.stringify(message);
};

/**/
function dispatch(data) {
  this.send(format(data));
}

export default dispatch;
