const formatDate = (dateStr) => {
  console.log(dateStr);
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

export default formatDate;
