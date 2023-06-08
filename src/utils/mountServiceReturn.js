const serviceReturn = (status, payload) => {
  const data = typeof payload === 'string' ? { messa: payload } : payload; 
  return { status, data };
};

module.exports = serviceReturn;
