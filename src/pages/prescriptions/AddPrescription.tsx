import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

const AddPrescription = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState<Medicine>({
    id: '',
    name: '',
    dosage: '',
    frequency: '',
    duration: '',
    notes: ''
  });

  const handleAddMedicine = () => {
    if (currentMedicine.name && currentMedicine.dosage && currentMedicine.frequency && currentMedicine.duration) {
      setMedicines([...medicines, { ...currentMedicine, id: Date.now().toString() }]);
      setCurrentMedicine({
        id: '',
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        notes: ''
      });
    }
  };

  const handleRemoveMedicine = (id: string) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement prescription creation logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/prescriptions');
    } catch (error) {
      console.error('Error creating prescription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Prescription</h1>
          <p className="text-gray-600">Add a new prescription for a patient</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Selection */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search patient by name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {selectedPatient && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-sm text-gray-600">ID: {selectedPatient.id}</p>
                    <p className="text-sm text-gray-600">Age: {selectedPatient.age} years</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Medicines */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Medicines</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  value={currentMedicine.name}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  value={currentMedicine.dosage}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, dosage: e.target.value })}
                  placeholder="e.g., 500mg"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <input
                  type="text"
                  value={currentMedicine.frequency}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, frequency: e.target.value })}
                  placeholder="e.g., Twice daily"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  value={currentMedicine.duration}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, duration: e.target.value })}
                  placeholder="e.g., 7 days"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <input
                  type="text"
                  value={currentMedicine.notes}
                  onChange={(e) => setCurrentMedicine({ ...currentMedicine, notes: e.target.value })}
                  placeholder="Additional instructions..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleAddMedicine}
              leftIcon={<Plus size={16} />}
            >
              Add Medicine
            </Button>

            {medicines.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Added Medicines</h3>
                <div className="space-y-3">
                  {medicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{medicine.name}</p>
                        <p className="text-sm text-gray-600">
                          {medicine.dosage} - {medicine.frequency} for {medicine.duration}
                        </p>
                        {medicine.notes && (
                          <p className="text-sm text-gray-500 mt-1">{medicine.notes}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicine(medicine.id)}
                        className="text-gray-400 hover:text-danger-500"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Notes */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter diagnosis..."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Any additional notes..."
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/prescriptions')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            Create Prescription
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPrescription;