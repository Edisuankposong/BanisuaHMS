import React from 'react';
import { Table } from '../../components/ui/Table';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Laboratory = () => {
  // Sample data structure for laboratory tests
  const labTests = [
    {
      id: 1,
      patientName: 'John Doe',
      testName: 'Blood Test',
      doctor: 'Dr. Smith',
      date: '2024-01-20',
      status: 'Pending'
    },
    // Add more sample data as needed
  ];

  const columns = [
    { header: 'Patient Name', accessor: 'patientName' },
    { header: 'Test Name', accessor: 'testName' },
    { header: 'Requesting Doctor', accessor: 'doctor' },
    { header: 'Date', accessor: 'date' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Laboratory Tests</h1>
        <Link to="/laboratory/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Test
          </Button>
        </Link>
      </div>

      <Card>
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tests..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <Table 
          columns={columns}
          data={labTests}
          onRowClick={(row) => window.location.href = `/laboratory/${row.id}`}
        />
      </Card>
    </div>
  );
};

export default Laboratory;