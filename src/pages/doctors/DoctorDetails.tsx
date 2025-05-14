import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, Mail, Phone, Award, Clock, Briefcase } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  experience: number;
  qualification: string;
  schedule: {
    day: string;
    hours: string;
  }[];
  appointments: {
    id: string;
    patientName: string;
    date: string;
    time: string;
    status: string;
  }[];
}

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data loading - replace with actual API call
    const mockDoctor: Doctor = {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      email: 'sarah.johnson@medcore.com',
      phone: '(555) 123-4567',
      experience: 12,
      qualification: 'MD, FACC',
      schedule: [
        { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 1:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
      ],
      appointments: [
        {
          id: '1',
          patientName: 'John Davis',
          date: '2024-03-15',
          time: '10:00 AM',
          status: 'scheduled',
        },
        {
          id: '2',
          patientName: 'Emma Wilson',
          date: '2024-03-15',
          time: '11:00 AM',
          status: 'scheduled',
        },
      ],
    };

    setTimeout(() => {
      setDoctor(mockDoctor);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Not Found</h2>
        <p className="text-gray-600 mb-4">The doctor you're looking for doesn't exist or you don't have access.</p>
        <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('/doctors')}>
          Back to Doctors
        </Button>
      </div>
    );
  }

  const appointmentColumns = [
    {
      header: 'Patient',
      accessor: 'patientName',
    },
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Time',
      accessor: 'time',
    },
    {
      header: 'Status',
      accessor: (appointment: any) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          appointment.status === 'scheduled' 
            ? 'bg-primary-100 text-primary-800'
            : appointment.status === 'completed'
            ? 'bg-success-100 text-success-800'
            : 'bg-danger-100 text-danger-800'
        }`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
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
            onClick={() => navigate('/doctors')}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
            <p className="text-gray-600">{doctor.specialization}</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            leftIcon={<Edit size={16} />}
            onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="primary"
            leftIcon={<Calendar size={16} />}
            onClick={() => navigate('/appointments/add', { state: { doctorId: doctor.id } })}
          >
            Schedule Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card title="Contact Information" className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{doctor.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{doctor.phone}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Award size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-medium text-gray-900">{doctor.qualification}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Briefcase size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium text-gray-900">{doctor.experience} years</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Schedule */}
        <Card title="Weekly Schedule">
          <div className="space-y-3">
            {doctor.schedule.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="font-medium text-gray-900">{schedule.day}</span>
                <span className="text-gray-600">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <Card 
          title="Today's Appointments" 
          className="md:col-span-3"
          footer={
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Calendar size={16} />}
              onClick={() => navigate('/appointments', { state: { doctorId: doctor.id } })}
            >
              View All Appointments
            </Button>
          }
        >
          <Table
            columns={appointmentColumns}
            data={doctor.appointments}
            emptyState={
              <div className="text-center py-8">
                <Clock size={40} className="mx-auto text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-900">No Appointments</h3>
                <p className="text-gray-500">No appointments scheduled for today</p>
              </div>
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default DoctorDetails;