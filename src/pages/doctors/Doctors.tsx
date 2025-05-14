import React from 'react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';

const Doctors: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
        <p className="text-gray-600">Manage hospital doctors and their information</p>
      </div>

      <Card>
        <div className="p-6">
          <Table 
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Specialization', accessor: 'specialization' },
              { header: 'Contact', accessor: 'contact' },
              { header: 'Status', accessor: 'status' }
            ]}
            data={[]} // Empty data array for now
          />
        </div>
      </Card>
    </div>
  );
};

export default Doctors;