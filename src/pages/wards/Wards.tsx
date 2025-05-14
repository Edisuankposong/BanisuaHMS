import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Plus, Search, Users, ArrowUpRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { Ward } from '../../types';

const Wards = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for wards
  const wards: Ward[] = [
    {
      id: '1',
      name: 'General Ward A',
      type: 'general',
      capacity: 20,
      occupiedBeds: 15
    },
    {
      id: '2',
      name: 'ICU',
      type: 'icu',
      capacity: 10,
      occupiedBeds: 8
    },
    {
      id: '3',
      name: 'Private Ward B',
      type: 'private',
      capacity: 8,
      occupiedBeds: 4
    },
    {
      id: '4',
      name: 'Emergency Ward',
      type: 'emergency',
      capacity: 12,
      occupiedBeds: 10
    }
  ];

  const getOccupancyColor = (occupied: number, total: number) => {
    const percentage = (occupied / total) * 100;
    if (percentage >= 90) return 'text-danger-600';
    if (percentage >= 75) return 'text-warning-600';
    return 'text-success-600';
  };

  const getWardTypeColor = (type: string) => {
    switch (type) {
      case 'icu':
        return 'bg-danger-100 text-danger-800';
      case 'emergency':
        return 'bg-warning-100 text-warning-800';
      case 'private':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const columns = [
    {
      header: 'Ward Name',
      accessor: (ward: Ward) => (
        <div>
          <div className="font-medium text-gray-900">{ward.name}</div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getWardTypeColor(ward.type)}`}>
            {ward.type.charAt(0).toUpperCase() + ward.type.slice(1)}
          </span>
        </div>
      ),
    },
    {
      header: 'Capacity',
      accessor: (ward: Ward) => (
        <div>
          <div className="font-medium text-gray-900">{ward.occupiedBeds}/{ward.capacity}</div>
          <div className={`text-sm ${getOccupancyColor(ward.occupiedBeds, ward.capacity)}`}>
            {Math.round((ward.occupiedBeds / ward.capacity) * 100)}% Occupied
          </div>
        </div>
      ),
    },
    {
      header: 'Available Beds',
      accessor: (ward: Ward) => (
        <span className="font-medium text-gray-900">
          {ward.capacity - ward.occupiedBeds}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (ward: Ward) => (
        <div className="flex items-center space-x-3">
          <Link
            to={`/wards/${ward.id}`}
            className="text-sm text-primary-600 hover:text-primary-900 font-medium"
          >
            View Details
          </Link>
        </div>
      ),
    },
  ];

  // Quick stats cards
  const stats = [
    {
      title: 'Total Beds',
      value: wards.reduce((acc, ward) => acc + ward.capacity, 0),
      icon: <Bed className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Occupied Beds',
      value: wards.reduce((acc, ward) => acc + ward.occupiedBeds, 0),
      icon: <Users className="h-6 w-6 text-warning-600" />,
    },
    {
      title: 'Available Beds',
      value: wards.reduce((acc, ward) => acc + (ward.capacity - ward.occupiedBeds), 0),
      icon: <ArrowUpRight className="h-6 w-6 text-success-600" />,
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wards Management</h1>
          <p className="text-gray-600">Manage hospital wards and bed allocations</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => console.log('Add new ward')}
          >
            Add Ward
          </Button>
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search wards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </Card>

      {/* Wards Table */}
      <Table
        columns={columns}
        data={wards}
        keyExtractor={(ward) => ward.id}
        emptyState={
          <div className="text-center py-8">
            <Bed size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Wards Found</h3>
            <p className="text-gray-500 mb-4">No wards match your search criteria</p>
          </div>
        }
      />
    </div>
  );
};

export default Wards;