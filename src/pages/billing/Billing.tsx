import React from 'react';
import { DollarSign, Clock, AlertTriangle } from 'lucide-react';

const Billing = () => {
  // Initialize variables with mock data
  // TODO: Replace with actual data from your billing service
  const totalRevenue = 10000;
  const pendingAmount = 2000;
  const overdueAmount = 500;

  // Currency formatting helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Stats configuration
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-semibold mt-2">{stat.value}</p>
            </div>
            <div className="bg-gray-50 rounded-full p-3">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Billing;