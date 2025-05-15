import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package2, Search, Filter, Plus, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  stock: number;
  price: number;
  expiryDate: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const Pharmacy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with API call
  const medicines: Medicine[] = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      manufacturer: 'PharmaCorp',
      stock: 500,
      price: 5.99,
      expiryDate: '2025-12-31',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      manufacturer: 'MediLabs',
      stock: 50,
      price: 12.99,
      expiryDate: '2025-06-30',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Omeprazole 20mg',
      category: 'Gastrointestinal',
      manufacturer: 'HealthPharm',
      stock: 0,
      price: 8.99,
      expiryDate: '2025-09-30',
      status: 'out-of-stock'
    }
  ];

  const getStatusColor = (status: Medicine['status']) => {
    switch (status) {
      case 'in-stock':
        return 'bg-success-100 text-success-800';
      case 'low-stock':
        return 'bg-warning-100 text-warning-800';
      case 'out-of-stock':
        return 'bg-danger-100 text-danger-800';
    }
  };

  const columns = [
    {
      header: 'Medicine',
      accessor: (medicine: Medicine) => (
        <div>
          <div className="font-medium text-gray-900">{medicine.name}</div>
          <div className="text-sm text-gray-500">{medicine.manufacturer}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
    },
    {
      header: 'Stock',
      accessor: (medicine: Medicine) => (
        <div>
          <div className="font-medium text-gray-900">{medicine.stock} units</div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(medicine.status)}`}>
            {medicine.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>
      ),
    },
    {
      header: 'Price',
      accessor: (medicine: Medicine) => (
        <div className="font-medium text-gray-900">
          ${medicine.price.toFixed(2)}
        </div>
      ),
    },
    {
      header: 'Expiry Date',
      accessor: 'expiryDate',
    },
    {
      header: 'Actions',
      accessor: (medicine: Medicine) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Update stock:', medicine.id)}
          >
            Update Stock
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log('Edit medicine:', medicine.id)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  // Quick stats
  const stats = [
    {
      title: 'Total Medicines',
      value: medicines.length,
      icon: <Package2 className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Low Stock Items',
      value: medicines.filter(m => m.status === 'low-stock').length,
      icon: <AlertTriangle className="h-6 w-6 text-warning-600" />,
    },
    {
      title: 'Out of Stock',
      value: medicines.filter(m => m.status === 'out-of-stock').length,
      icon: <AlertTriangle className="h-6 w-6 text-danger-600" />,
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Inventory</h1>
          <p className="text-gray-600">Manage medicine inventory and stock levels</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/pharmacy/add">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Add Medicine
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center">
            <div className="p-4 rounded-full bg-gray-50 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search medicines..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="antibiotics">Antibiotics</option>
                <option value="painkillers">Pain Relief</option>
                <option value="gastrointestinal">Gastrointestinal</option>
              </select>
              <Button
                variant="outline"
                leftIcon={<Filter size={16} />}
              >
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Medicines Table */}
      <Table
        columns={columns}
        data={medicines}
        emptyState={
          <div className="text-center py-8">
            <Package2 size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Medicines Found</h3>
            <p className="text-gray-500 mb-4">No medicines match your search criteria</p>
            <Link to="/pharmacy/add">
              <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                Add Medicine
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Pharmacy;