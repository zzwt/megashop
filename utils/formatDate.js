const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

export default formatDate;
