export const formatDate = (date: Date | string) => {
  const dateToFormat = date instanceof Date ? date : new Date(date);
  return dateToFormat.toLocaleString("en-US");
};
