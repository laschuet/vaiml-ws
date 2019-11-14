/**/
function dispatch(type, ...data) {
  const message = {
    type,
    timestamp: Date.now(),
    data,
  };
  this.send(JSON.stringify(message));
}

export default dispatch;
