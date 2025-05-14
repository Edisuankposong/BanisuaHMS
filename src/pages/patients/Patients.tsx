import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Plus, RefreshCw } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { getPatients, searchPatients } from '../../mocks/patientData';
import { Patient } from '../../types';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setIsLoading(true);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error loading patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      if (searchQuery.trim() === '') {
        loadPatients();
      } else {
        const results = await searchPatients(searchQuery);
        setPatients(results);
      }
    } catch (error) {
      console.error('Error searching patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: (patient: Patient) => (
        <div>
          <div className="font-medium text-gray-900">
            {patient.firstName} {patient.lastName}
          </div>
          <div className="text-gray-500 text-xs">ID: {patient.id}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: (patient: Patient) => (
        <div>
          <div>{patient.email}</div>
          <div className="text-gray-500">{patient.phone}</div>
        </div>
      ),
    },
    {
      header: 'Gender',
      accessor: (patient: Patient) => (
        <span className="capitalize">{patient.gender}</span>
      ),
    },
    {
      header: 'Blood Group',
      accessor: 'bloodGroup',
    },
    {
      header: 'Status',
      accessor: (patient: Patient) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          patient.status === 'active' 
            ? 'bg-success-100 text-success-800' 
            : patient.status === 'discharged' 
            ? 'bg-warning-100 text-warning-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (patient: Patient) => (
        <div className="flex space-x-2">
          <Link 
            to={`/patients/${patient.id}`}
            className="text-sm text-primary-600 hover:text-primary-800"
          >
            View
          </Link>
        </div>
      ),
    },
  ];

  const handleRowClick = (patient: Patient) => {
    navigate(`/patients/${patient.id}`);
  };

  const emptyState = (
    <div className="text-center py-8">
      <div className="text-gray-400 mb-2">
        <Users size={40} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">No patients found</h3>
      <p className="text-gray-500 mb-4">Try adjusting your search or add a new patient</p>
      <Link to="/patients/add">
        <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
          Add Patient
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage and view patient information</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/patients/add">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Add Patient
            </Button>
          </Link>
        </div>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSearch}
              leftIcon={<Search size={16} />}
            >
              Search
            </Button>
            <Button
              variant="outline"
              onClick={loadPatients}
              leftIcon={<RefreshCw size={16} />}
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      <Table
        columns={columns}
        data={patients}
        isLoading={isLoading}
        emptyState={emptyState}
        onRowClick={handleRowClick}
        keyExtractor={(patient) => patient.id}
      />
    </div>
  );
};

// Import for the empty state
function Users(props: { size: number, className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default Patients;