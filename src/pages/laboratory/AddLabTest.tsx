import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, FileText } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface LabTestFormData {
  patientId: string;
  testName: string;
  testType: string;
  requestingDoctor: string;
  priority: string;
  notes: string;
}

const AddLabTest = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LabTestFormData>({
    patientId: '',
    testName: '',
    testType: '',
    requestingDoctor: '',
    priority: 'normal',
    notes: ''
  });

  const testTypes = [
    'Blood Test',
    'Urine Analysis',
    'X-Ray',
    'CT Scan',
    'MRI',
    'ECG',
    'Ultrasound',
    'Biopsy'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement lab test creation logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      navigate('/laboratory');
    } catch (error) {
      console.error('Error creating lab test:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate('/laboratory')}
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Request Laboratory Test</h1>
          <p className="text-gray-600">Create a new laboratory test request</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
                Patient
              </label>
              <select
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Select patient</option>
                <option value="1">John Davis</option>
                <option value="2">Emma Wilson</option>
                <option value="3">Michael Brown</option>
              </select>
            </div>

            <div>
              <label htmlFor="requestingDoctor" className="block text-sm font-medium text-gray-700 mb-2">
                Requesting Doctor
              </label>
              <select
                id="requestingDoctor"
                name="requestingDoctor"
                value={formData.requestingDoctor}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Select doctor</option>
                <option value="1">Dr. Sarah Johnson</option>
                <option value="2">Dr. Michael Brown</option>
                <option value="3">Dr. David Clark</option>
              </select>
            </div>

            <div>
              <label htmlFor="testType" className="block text-sm font-medium text-gray-700 mb-2">
                Test Type
              </label>
              <select
                id="testType"
                name="testType"
                value={formData.testType}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Select test type</option>
                {testTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-2">
                Test Name
              </label>
              <input
                type="text"
                id="testName"
                name="testName"
                value={formData.testName}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter specific test name"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title="Additional Information">
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 pl-10"
                  placeholder="Add any relevant notes or instructions..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/laboratory')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                leftIcon={<Plus size={16} />}
              >
                Create Test Request
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AddLabTest;