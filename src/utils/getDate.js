const todayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1);
  const monthString = month.length === 1 ? '0' + month : month;
  const day = date.getDate();
  return `${year}-${monthString}-${day}`;
};

module.exports = todayDate
