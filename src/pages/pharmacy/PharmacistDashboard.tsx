import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Pill, Package2, AlertTriangle, FileText, Clock, 
  Search, Plus, Check, X, Download, Eye 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

const PharmacistDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  // Mock data for prescriptions
  const prescriptions = [
    {
      id: '1',
      patientName: 'John Davis',
      patientId: 'PAT001',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-03-15',
      status: 'pending',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', quantity: 21 },
        { name: 'Ibuprofen', dosage: '400mg', quantity: 15 }
      ]
    },
    {
      id: '2',
      patientName: 'Emma Wilson',
      patientId: 'PAT002',
      doctor: 'Dr. Michael Brown',
      date: '2024-03-15',
      status: 'completed',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', quantity: 30 }
      ],
      completedAt: '2024-03-15 14:30'
    }
  ];

  // Mock data for low stock alerts
  const lowStockItems = [
    {
      id: '1',
      name: 'Amoxicillin 500mg',
      currentStock: 50,
      reorderLevel: 100,
      supplier: 'PharmaCorp Ltd',
      lastOrdered: '2024-03-01'
    },
    {
      id: '2',
      name: 'Metformin 850mg',
      currentStock: 25,
      reorderLevel: 75,
      supplier: 'MediSupply Inc',
      lastOrdered: '2024-03-05'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: '1',
      action: 'Prescription fulfilled',
      patient: 'Emma Wilson',
      timestamp: '2024-03-15 14:30'
    },
    {
      id: '2',
      action: 'Inventory updated',
      details: 'Added 200 units of Amoxicillin 500mg',
      timestamp: '2024-03-15 13:45'
    },
    {
      id: '3',
      action: 'Stock alert',
      details: 'Low stock warning for Metformin 850mg',
      timestamp: '2024-03-15 12:30'
    }
  ];

  const prescriptionColumns = [
    {
      header: 'Patient',
      accessor: (prescription: any) => (
        <div>
          <div className="font-medium text-gray-900">{prescription.patientName}</div>
          <div className="text-sm text-gray-500">ID: {prescription.patientId}</div>
        </div>
      )
    },
    {
      header: 'Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Medications',
      accessor: (prescription: any) => (
        <div>
          {prescription.medications.map((med: any, index: number) => (
            <div key={index} className="text-sm">
              {med.name} {med.dosage} × {med.quantity}
            </div>
          ))}
        </div>
      )
    },
    {
      header: 'Date',
      accessor: (prescription: any) => (
        <div>
          <div>{prescription.date}</div>
          {prescription.completedAt && (
            <div className="text-sm text-gray-500">
              Completed: {prescription.completedAt}
            </div>
          )}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: (prescription: any) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={14} />}
            onClick={() => console.log('View prescription:', prescription.id)}
          >
            View
          </Button>
          {prescription.status === 'pending' && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Check size={14} />}
              onClick={() => console.log('Fulfill prescription:', prescription.id)}
            >
              Fulfill
            </Button>
          )}
          {prescription.status === 'completed' && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download size={14} />}
              onClick={() => console.log('Download receipt:', prescription.id)}
            >
              Receipt
            </Button>
          )}
        </div>
      )
    }
  ];

  const lowStockColumns = [
    {
      header: 'Medicine',
      accessor: 'name'
    },
    {
      header: 'Current Stock',
      accessor: (item: any) => (
        <span className="text-danger-600 font-medium">{item.currentStock}</span>
      )
    },
    {
      header: 'Reorder Level',
      accessor: 'reorderLevel'
    },
    {
      header: 'Supplier',
      accessor: 'supplier'
    },
    {
      header: 'Last Ordered',
      accessor: 'lastOrdered'
    },
    {
      header: 'Actions',
      accessor: (item: any) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('Order stock:', item.id)}
        >
          Order Stock
        </Button>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Dashboard</h1>
          <p className="text-gray-600">Manage prescriptions and inventory</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link to="/pharmacy">
            <Button
              variant="outline"
              leftIcon={<Package2 size={16} />}
            >
              Inventory
            </Button>
          </Link>
          <Link to="/pharmacy/add">
            <Button
              variant="primary"
              leftIcon={<Plus size={16} />}
            >
              Add Medicine
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <FileText className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {prescriptions.filter(p => p.status === 'pending').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <Check className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completed Today</p>
            <p className="text-2xl font-bold text-gray-900">
              {prescriptions.filter(p => p.status === 'completed').length}
            </p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <AlertTriangle className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p className="text-2xl font-bold text-gray-900">{lowStockItems.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-secondary-50 mr-4">
            <Package2 className="h-6 w-6 text-secondary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Medicines</p>
            <p className="text-2xl font-bold text-gray-900">248</p>
          </div>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <Card title="Low Stock Alerts">
        <Table
          columns={lowStockColumns}
          data={lowStockItems}
          emptyState={
            <div className="text-center py-8">
              <Package2 size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Low Stock Items</h3>
              <p className="text-gray-500">All items are above reorder levels</p>
            </div>
          }
        />
      </Card>

      {/* Prescriptions */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                className={`py-2 px-4 text-sm font-medium rounded-lg ${
                  activeTab === 'pending'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Prescriptions
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium rounded-lg ${
                  activeTab === 'completed'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => set

ActiveTab('completed')}
              >
                Completed
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search prescriptions..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <Table
          columns={prescriptionColumns}
          data={prescriptions.filter(p => 
            activeTab === 'pending' 
              ? p.status === 'pending'
              : p.status === 'completed'
          )}
          emptyState={
            <div className="text-center py-8">
              <FileText size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Prescriptions</h3>
              <p className="text-gray-500">
                {activeTab === 'pending' 
                  ? 'No pending prescriptions to fulfill'
                  : 'No completed prescriptions yet'
                }
              </p>
            </div>
          }
        />
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  {activity.patient && (
                    <p className="text-sm text-gray-500">Patient: {activity.patient}</p>
                  )}
                  {activity.details && (
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PharmacistDashboard;