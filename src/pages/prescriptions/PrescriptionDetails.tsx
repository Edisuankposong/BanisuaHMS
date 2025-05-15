import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Download, FileText, User, Calendar, Stethoscope } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

interface Prescription {
  id: string;
  date: string;
  patientName: string;
  patientId: string;
  doctor: string;
  diagnosis: string;
  medicines: Medicine[];
  notes?: string;
  status: 'active' | 'completed';
}

const PrescriptionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrescription = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockPrescription: Prescription = {
          id: id || '1',
          date: '2024-03-15',
          patientName: 'John Davis',
          patientId: 'PAT001',
          doctor: 'Dr. Sarah Johnson',
          diagnosis: 'Hypertension',
          status: 'active',
          medicines: [
            {
              name: 'Lisinopril',
              dosage: '10mg',
              frequency: 'Once daily',
              duration: '30 days',
              notes: 'Take in the morning'
            },
            {
              name: 'Amlodipine',
              dosage: '5mg',
              frequency: 'Once daily',
              duration: '30 days',
              notes: 'Take in the evening'
            }
          ],
          notes: 'Monitor blood pressure regularly. Follow-up appointment in 4 weeks.'
        };

        setPrescription(mockPrescription);
      } catch (error) {
        console.error('Error fetching prescription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Not Found</h2>
        <p className="text-gray-600 mb-4">The prescription you're looking for doesn't exist or you don't have access.</p>
        <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('/prescriptions')}>
          Back to Prescriptions
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate('/prescriptions')}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prescription Details</h1>
            <div className="flex items-center mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                prescription.status === 'active' 
                  ? 'bg-success-100 text-success-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-600 text-sm">
                Prescription ID: {prescription.id}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            leftIcon={<Printer size={16} />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
            onClick={() => console.log('Download prescription')}
          >
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card className="md:col-span-2">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="font-medium text-gray-900">{prescription.patientName}</p>
                    <p className="text-sm text-gray-500">ID: {prescription.patientId}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-900">{prescription.date}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Stethoscope size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Prescribed By</p>
                    <p className="font-medium text-gray-900">{prescription.doctor}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Diagnosis</p>
                    <p className="font-medium text-gray-900">{prescription.diagnosis}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Status Card */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1 ${
                  prescription.status === 'active' 
                    ? 'bg-success-100 text-success-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </p>
              </div>
              {prescription.status === 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Mark as completed')}
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Medicines */}
        <Card className="md:col-span-3">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Prescribed Medicines</h2>
            <div className="space-y-4">
              {prescription.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">
                        {medicine.dosage} - {medicine.frequency} for {medicine.duration}
                      </p>
                      {medicine.notes && (
                        <p className="text-sm text-gray-500 mt-1">{medicine.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Notes */}
        {prescription.notes && (
          <Card className="md:col-span-3">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h2>
              <p className="text-gray-700 whitespace-pre-line">{prescription.notes}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PrescriptionDetails;