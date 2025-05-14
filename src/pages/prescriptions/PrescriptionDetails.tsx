import React from 'react';
import { useParams } from 'react-router-dom';

const PrescriptionDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Prescription Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Details for prescription {id} will be displayed here.</p>
      </div>
    </div>
  );
};

export default PrescriptionDetails;