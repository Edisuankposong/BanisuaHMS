import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Receipt, Search, Filter, Plus, DollarSign, 
  CreditCard, AlertTriangle, Download, FileText,
  Clock 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

const Billing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');

  // Mock billing data
  const bills = [
    {
      id: 'BILL001',
      patientName: 'John Davis',
      patientId: 'PAT001',
      date: '2024-03-15',
      items: [
        { description: 'Consultation Fee', amount: 150 },
        { description: 'Laboratory Tests', amount: 250 },
        { description: 'Medication', amount: 175 }
      ],
      subtotal: 575,
      tax: 57.50,
      total: 632.50,
      status: 'paid',
      paymentMethod: 'credit_card',
      paidAt: '2024-03-15 14:30'
    },
    {
      id: 'BILL002',
      patientName: 'Emma Wilson',
      patientId: 'PAT002',
      date: '2024-03-15',
      items: [
        { description: 'Emergency Room Fee', amount: 500 },
        { description: 'X-Ray', amount: 300 }
      ],
      subtotal: 800,
      tax: 80,
      total: 880,
      status: 'pending',
      dueDate: '2024-03-22'
    },
    {
      id: 'BILL003',
      patientName: 'Robert Miller',
      patientId: 'PAT003',
      date: '2024-03-14',
      items: [
        { description: 'Surgery', amount: 2500 },
        { description: 'Hospital Stay (2 days)', amount: 1000 },
        { description: 'Medication', amount: 300 }
      ],
      subtotal: 3800,
      tax: 380,
      total: 4180,
      status: 'overdue',
      dueDate: '2024-03-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'overdue':
        return 'bg-danger-100 text-danger-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const columns = [
    {
      header: 'Bill ID',
      accessor: (bill: any) => (
        <div>
          <div className="font-medium text-gray-900">{bill.id}</div>
          <div className="text-sm text-gray-500">{bill.date}</div>
        </div>
      )
    },
    {
      header: 'Patient',
      accessor: (bill: any) => (
        <div>
          <div className="font-medium text-gray-900">{bill.patientName}</div>
          <div className="text-sm text-gray-500">ID: {bill.patientId}</div>
        </div>
      )
    },
    {
      header: 'Amount',
      accessor: (bill: any) => (
        <div>
          <div className="font-medium text-gray-900">{formatCurrency(bill.total)}</div>
          <div className="text-xs text-gray-500">
            {bill.items.length} items
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (bill: any) => (
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
          </span>
          {bill.status === 'paid' ? (
            <div className="text-xs text-gray-500 mt-1">
              Paid on {bill.paidAt}
            </div>
          ) : (
            <div className="text-xs text-gray-500 mt-1">
              Due by {bill.dueDate}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Payment',
      accessor: (bill: any) => (
        <div>
          {bill.status === 'paid' ? (
            <div className="text-sm text-gray-600">
              <CreditCard className="inline-block w-4 h-4 mr-1" />
              {bill.paymentMethod === 'credit_card' ? 'Credit Card' : 'Cash'}
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => console.log('Process payment:', bill.id)}
            >
              Pay Now
            </Button>
          )}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (bill: any) => (
        <div className="flex space-x-2">
          <Link to={`/billing/${bill.id}`}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FileText size={14} />}
            >
              View
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={14} />}
            onClick={() => console.log('Download invoice:', bill.id)}
          >
            Download
          </Button>
        </div>
      )
    }
  ];

  // Calculate total revenue and pending amounts
  const totalRevenue = bills
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.total, 0);

  const pendingAmount = bills
    .filter(bill => bill.status !== 'paid')
    .reduce((sum, bill) => sum + bill.total, 0);

  const overdueAmount = bills
    .filter(bill => bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.total, 0);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
          <p className="text-gray-600">Manage invoices and payments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/billing/add">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              New Bill
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <Receipt className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Bills</p>
            <p className="text-2xl font-bold text-gray-900">{bills.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <DollarSign className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <Clock className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-danger-50 mr-4">
            <AlertTriangle className="h-6 w-6 text-danger-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Overdue</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(overdueAmount)}</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search bills..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
            >
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Bills Table */}
      <Table
        columns={columns}
        data={bills}
        emptyState={
          <div className="text-center py-8">
            <Receipt size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Bills Found</h3>
            <p className="text-gray-500 mb-4">No bills match your search criteria</p>
            <Link to="/billing/add">
              <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                Create New Bill
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Billing;