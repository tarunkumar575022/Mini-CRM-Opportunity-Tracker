export const formatCurrency = (value) => {
  if (!value && value !== 0) return '₹0';
  
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }
  
  return `₹${value.toLocaleString('en-IN')}`;
};
