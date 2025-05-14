import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, FilePlus, CalendarPlus, FileText, HeartPulse,
  ClipboardList, Phone, Mail, MapPin, Clock, User, UserRound, Droplet
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { getPatientById } from '../../mocks/patientData';
import { Patient, MedicalHistory } from '../../types';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPatient = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const data = await getPatientById(id);
          setPatient(data);
        }
      } catch (error) {
        console.error('Error loading patient:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPatient();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Not Found</h2>
        <p className="text-gray-600 mb-4">The patient you're looking for doesn't exist or you don't have access.</p>
        <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('/patients')}>
          Back to Patients
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const statusColor = patient.status === 'active' 
    ? 'bg-success-100 text-success-800' 
    : patient.status === 'discharged' 
    ? 'bg-warning-100 text-warning-800'
    : 'bg-danger-100 text-danger-800';

  const historyColumns = [
    {
      header: 'Condition',
      accessor: 'condition',
    },
    {
      header: 'Diagnosis Date',
      accessor: (history: MedicalHistory) => formatDate(history.diagnosisDate),
    },
    {
      header: 'Treatment',
      accessor: 'treatment',
    },
    {
      header: 'Notes',
      accessor: 'notes',
    },
  ];

  // Mock appointments for this patient
  const appointments = [
    {
      id: '1',
      date: '2023-01-15',
      time: '09:30 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Regular Checkup',
      status: 'completed',
    },
    {
      id: '2',
      date: '2023-02-20',
      time: '10:15 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Follow-up',
      status: 'completed',
    },
    {
      id: '3',
      date: '2023-03-28',
      time: '02:30 PM',
      doctor: 'Dr. Michael Brown',
      type: 'Consultation',
      status: 'completed',
    },
    {
      id: '4',
      date: '2023-06-15',
      time: '11:00 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Regular Checkup',
      status: 'scheduled',
    },
  ];

  const appointmentColumns = [
    {
      header: 'Date & Time',
      accessor: (appointment: any) => (
        <div>
          <div className="font-medium">{formatDate(appointment.date)}</div>
          <div className="text-gray-500 text-sm">{appointment.time}</div>
        </div>
      ),
    },
    {
      header: 'Doctor',
      accessor: 'doctor',
    },
    {
      header: 'Type',
      accessor: 'type',
    },
    {
      header: 'Status',
      accessor: (appointment: any) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          appointment.status === 'completed' 
            ? 'bg-success-100 text-success-800' 
            : appointment.status === 'scheduled' 
            ? 'bg-primary-100 text-primary-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (appointment: any) => (
        <Link 
          to={`/appointments/${appointment.id}`}
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          View
        </Link>
      ),
    },
  ];

  // Mock prescriptions for this patient
  const prescriptions = [
    {
      id: '1',
      date: '2023-01-15',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension',
      medicines: 3,
    },
    {
      id: '2',
      date: '2023-02-20',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Upper Respiratory Infection',
      medicines: 2,
    },
    {
      id: '3',
      date: '2023-03-28',
      doctor: 'Dr. Michael Brown',
      diagnosis: 'Seasonal Allergies',
      medicines: 1,
    },
  ];

  const prescriptionColumns = [
    {
      header: 'Date',
      accessor: (prescription: any) => formatDate(prescription.date),
    },
    {
      header: 'Doctor',
      accessor: 'doctor',
    },
    {
      header: 'Diagnosis',
      accessor: 'diagnosis',
    },
    {
      header: 'Medicines',
      accessor: (prescription: any) => `${prescription.medicines} items`,
    },
    {
      header: 'Actions',
      accessor: (prescription: any) => (
        <Link 
          to={`/prescriptions/${prescription.id}`}
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          View
        </Link>
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
            onClick={() => navigate('/patients')}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <div className="flex items-center mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-600 text-sm">
                Patient ID: {patient.id}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            leftIcon={<Edit size={16} />}
            onClick={() => navigate(`/patients/edit/${patient.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            leftIcon={<FilePlus size={16} />}
            onClick={() => navigate('/prescriptions/add', { state: { patientId: patient.id } })}
          >
            New Prescription
          </Button>
          <Button
            variant="primary"
            leftIcon={<CalendarPlus size={16} />}
            onClick={() => navigate('/appointments/add', { state: { patientId: patient.id } })}
          >
            New Appointment
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'appointments'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'prescriptions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('prescriptions')}
          >
            Prescriptions
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'medical-history'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('medical-history')}
          >
            Medical History
          </button>
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Info */}
          <Card title="Personal Information" className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{patient.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{patient.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{patient.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <UserRound size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium text-gray-900 capitalize">{patient.gender}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} years)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Droplet size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium text-gray-900">{patient.bloodGroup || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ClipboardList size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium text-gray-900">{formatDate(patient.registrationDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Emergency Contact */}
          <Card title="Emergency Contact">
            {patient.emergencyContact ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="font-medium text-gray-900">{patient.emergencyContact.relation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{patient.emergencyContact.phone}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No emergency contact information provided.</p>
            )}
          </Card>

          {/* Recent Medical History */}
          <Card 
            title="Medical History" 
            subtitle="Recent conditions and diagnoses"
            className="md:col-span-2"
            footer={
              <button 
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => setActiveTab('medical-history')}
              >
                View full medical history
              </button>
            }
          >
            {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
              <div className="space-y-4">
                {patient.medicalHistory.slice(0, 2).map((history) => (
                  <div key={history.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">{history.condition}</h4>
                      <span className="text-sm text-gray-500">{formatDate(history.diagnosisDate)}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{history.treatment}</p>
                    {history.notes && <p className="text-sm text-gray-500 mt-1">{history.notes}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No medical history available.</p>
            )}
          </Card>

          {/* Upcoming Appointments */}
          <Card 
            title="Upcoming Appointments" 
            footer={
              <button 
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => setActiveTab('appointments')}
              >
                View all appointments
              </button>
            }
          >
            {appointments.filter(a => a.status === 'scheduled').length > 0 ? (
              <div className="space-y-3">
                {appointments
                  .filter(a => a.status === 'scheduled')
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 2)
                  .map((appointment) => (
                    <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{formatDate(appointment.date)}</h4>
                          <p className="text-sm text-gray-700">{appointment.time} - {appointment.type}</p>
                          <p className="text-sm text-gray-500">{appointment.doctor}</p>
                        </div>
                        <Link 
                          to={`/appointments/${appointment.id}`}
                          className="text-xs text-primary-600 hover:text-primary-800"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-3">No upcoming appointments</p>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<CalendarPlus size={16} />}
                  onClick={() => navigate('/appointments/add', { state: { patientId: patient.id } })}
                >
                  Schedule Appointment
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Appointment History</h3>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<CalendarPlus size={16} />}
              onClick={() => navigate('/appointments/add', { state: { patientId: patient.id } })}
            >
              New Appointment
            </Button>
          </div>
          <Table 
            columns={appointmentColumns} 
            data={appointments}
            emptyState={
              <div className="text-center py-8">
                <CalendarClock size={40} className="mx-auto text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No Appointments</h3>
                <p className="text-gray-500 mb-4">This patient doesn't have any appointments yet</p>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<CalendarPlus size={16} />}
                  onClick={() => navigate('/appointments/add', { state: { patientId: patient.id } })}
                >
                  Schedule Appointment
                </Button>
              </div>
            }
          />
        </div>
      )}

      {activeTab === 'prescriptions' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Prescription History</h3>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FilePlus size={16} />}
              onClick={() => navigate('/prescriptions/add', { state: { patientId: patient.id } })}
            >
              New Prescription
            </Button>
          </div>
          <Table 
            columns={prescriptionColumns} 
            data={prescriptions}
            emptyState={
              <div className="text-center py-8">
                <FileText size={40} className="mx-auto text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No Prescriptions</h3>
                <p className="text-gray-500 mb-4">This patient doesn't have any prescriptions yet</p>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<FilePlus size={16} />}
                  onClick={() => navigate('/prescriptions/add', { state: { patientId: patient.id } })}
                >
                  Create Prescription
                </Button>
              </div>
            }
          />
        </div>
      )}

      {activeTab === 'medical-history' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Complete Medical History</h3>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FilePlus size={16} />}
              onClick={() => navigate('/medical-history/add', { state: { patientId: patient.id } })}
            >
              Add Entry
            </Button>
          </div>
          {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
            <Table 
              columns={historyColumns} 
              data={patient.medicalHistory}
            />
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-200">
              <HeartPulse size={40} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-medium text-gray-900">No Medical History</h3>
              <p className="text-gray-500 mb-4">No medical history records found for this patient</p>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<FilePlus size={16} />}
                onClick={() => navigate('/medical-history/add', { state: { patientId: patient.id } })}
              >
                Add Medical History
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function CalendarClock(props: { size: number, className: string }) {
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
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <path d="M18 16h.01" />
      <path d="M18 20h.01" />
      <path d="M22 16h.01" />
      <path d="M22 20h.01" />
      <circle cx="13" cy="16" r="1" />
      <circle cx="13" cy="20" r="1" />
      <circle cx="9" cy="16" r="1" />
      <circle cx="9" cy="20" r="1" />
    </svg>
  );
}

export default PatientDetails;