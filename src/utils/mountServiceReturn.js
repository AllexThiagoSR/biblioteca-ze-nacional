const serviceReturn = (status, payload) => {
  const data = typeof payload === 'string' ? { message: payload } : payload; 
  return { status, data };
};

module.exports = serviceReturn;
