import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bed, Users, Settings } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';

interface WardBed {
  id: string;
  number: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  patientName?: string;
  admissionDate?: string;
}

interface WardDetails {
  id: string;
  name: string;
  type: 'general' | 'private' | 'semi-private' | 'icu' | 'emergency';
  capacity: number;
  occupiedBeds: number;
  description?: string;
  nurseInCharge: string;
  beds: WardBed[];
}

const WardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ward, setWard] = useState<WardDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWardDetails = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockWard: WardDetails = {
          id: id || '1',
          name: 'General Ward A',
          type: 'general',
          capacity: 20,
          occupiedBeds: 15,
          description: 'General medical ward for non-critical patients',
          nurseInCharge: 'Nurse Sarah Johnson',
          beds: Array.from({ length: 20 }, (_, i) => ({
            id: `bed-${i + 1}`,
            number: `A${i + 1}`,
            status: i < 15 ? 'occupied' : i === 15 ? 'maintenance' : 'available',
            patientName: i < 15 ? `Patient ${i + 1}` : undefined,
            admissionDate: i < 15 ? '2024-03-15' : undefined,
          })),
        };

        setWard(mockWard);
      } catch (error) {
        console.error('Error fetching ward details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWardDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!ward) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ward Not Found</h2>
        <p className="text-gray-600 mb-4">The ward you're looking for doesn't exist or you don't have access.</p>
        <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('/wards')}>
          Back to Wards
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success-100 text-success-800';
      case 'occupied':
        return 'bg-danger-100 text-danger-800';
      case 'reserved':
        return 'bg-warning-100 text-warning-800';
      case 'maintenance':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const bedColumns = [
    {
      header: 'Bed Number',
      accessor: 'number',
    },
    {
      header: 'Status',
      accessor: (bed: WardBed) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bed.status)}`}>
          {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Patient',
      accessor: (bed: WardBed) => bed.patientName || '-',
    },
    {
      header: 'Admission Date',
      accessor: (bed: WardBed) => bed.admissionDate || '-',
    },
    {
      header: 'Actions',
      accessor: (bed: WardBed) => (
        <div className="flex space-x-2">
          {bed.status === 'available' && (
            <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              Assign Patient
            </button>
          )}
          {bed.status === 'occupied' && (
            <button className="text-danger-600 hover:text-danger-800 text-sm font-medium">
              Discharge
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate('/wards')}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{ward.name}</h1>
            <div className="flex items-center mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getWardTypeColor(ward.type)}`}>
                {ward.type.charAt(0).toUpperCase() + ward.type.slice(1)}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-600 text-sm">
                Nurse in charge: {ward.nurseInCharge}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            leftIcon={<Settings size={16} />}
            onClick={() => console.log('Edit ward settings')}
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Ward Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
            <Bed size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Beds</p>
            <h3 className="text-xl font-bold text-gray-900">{ward.capacity}</h3>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-danger-100 text-danger-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Occupied Beds</p>
            <h3 className="text-xl font-bold text-gray-900">{ward.occupiedBeds}</h3>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
            <Bed size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Available Beds</p>
            <h3 className="text-xl font-bold text-gray-900">{ward.capacity - ward.occupiedBeds}</h3>
          </div>
        </Card>
      </div>

      {/* Ward Description */}
      {ward.description && (
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700">{ward.description}</p>
          </div>
        </Card>
      )}

      {/* Beds Table */}
      <Card title="Bed Management">
        <Table
          columns={bedColumns}
          data={ward.beds}
          keyExtractor={(bed) => bed.id}
        />
      </Card>
    </div>
  );
};

export default WardDetails;