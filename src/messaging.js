/**/
const format = data => {
  const message = {
    data,
    timestamp: Date.now(),
  };
  return JSON.stringify(message);
};

/**/
function send(data) {
  this.send(format(data));
}

export default send;
