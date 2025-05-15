// Update currency formatting in Billing.tsx
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};

// Update the stats display
const stats = [
  {
    title: 'Total Revenue',
    value: formatCurrency(totalRevenue),
    icon: <DollarSign className="h-6 w-6 text-primary-600" />,
  },
  {
    title: 'Pending Amount',
    value: formatCurrency(pendingAmount),
    icon: <Clock className="h-6 w-6 text-warning-600" />,
  },
  {
    title: 'Overdue Amount',
    value: formatCurrency(overdueAmount),
    icon: <AlertTriangle className="h-6 w-6 text-danger-600" />,
  }
];

export default stats