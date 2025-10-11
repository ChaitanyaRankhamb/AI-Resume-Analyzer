const expiryDate = (): Date => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now;
};

export default expiryDate;
