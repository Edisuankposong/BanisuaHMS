import { useState } from 'react';
import { 
  FileText, Calendar, Receipt, Flask, Pill, 
  Clock, AlertTriangle, Download, Eye, Plus 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'appointments' | 'billing'>('overview');

  // Mock data for patient
  const patient = {
    id: 'PAT001',
    name: 'John Davis',
    age: 35,
    bloodGroup: 'O+',
    nextAppointment: '2024-03-20 10:30 AM',
    upcomingTests: 2,
    pendingBills: 1
  };

  // Mock data for appointments
  const appointments = [
    {
      id: '1',
      date: '2024-03-20',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Regular Checkup',
      status: 'scheduled'
    },
    {
      id: '2',
      date: '2024-03-15',
      time: '02:00 PM',
      doctor: 'Dr. Michael Brown',
      type: 'Follow-up',
      status: 'completed'
    }
  ];

  // Mock data for lab results
  const labResults = [
    {
      id: '1',
      testName: 'Complete Blood Count',
      date: '2024-03-15',
      status: 'completed',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      testName: 'Lipid Panel',
      date: '2024-03-10',
      status: 'completed',
      doctor: 'Dr. Michael Brown'
    }
  ];

  // Mock data for prescriptions
  const prescriptions = [
    {
      id: '1',
      date: '2024-03-15',
      doctor: 'Dr. Sarah Johnson',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' }
      ],
      status: 'active'
    },
    {
      id: '2',
      date: '2024-03-01',
      doctor: 'Dr. Michael Brown',
      medications: [
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '5 days' }
      ],
      status: 'completed'
    }
  ];

  // Mock data for bills
  const bills = [
    {
      id: '1',
      date: '2024-03-15',
      description: 'Consultation Fee',
      amount: 150.00,
      status: 'pending'
    },
    {
      id: '2',
      date: '2024-03-10',
      description: 'Laboratory Tests',
      amount: 250.00,
      status: 'paid'
    }
  ];

  const appointmentColumns = [
    {
      header: 'Date & Time',
      accessor: (appointment: any) => (
        <div>
          <div className="font-medium text-gray-900">{appointment.date}</div>
          <div className="text-sm text-gray-500">{appointment.time}</div>
        </div>
      )
    },
    {
      header: 'Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Type',
      accessor: 'type'
    },
    {
      header: 'Status',
      accessor: (appointment: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          appointment.status === 'scheduled' 
            ? 'bg-primary-100 text-primary-800'
            : 'bg-success-100 text-success-800'
        }`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: (appointment: any) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={14} />}
          >
            View
          </Button>
          {appointment.status === 'scheduled' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Reschedule:', appointment.id)}
            >
              Reschedule
            </Button>
          )}
        </div>
      )
    }
  ];

  const labResultColumns = [
    {
      header: 'Test Name',
      accessor: 'testName'
    },
    {
      header: 'Date',
      accessor: 'date'
    },
    {
      header: 'Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Status',
      accessor: (result: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
          {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: (result: any) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={14} />}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={14} />}
          >
            Download
          </Button>
        </div>
      )
    }
  ];

  const prescriptionColumns = [
    {
      header: 'Date',
      accessor: 'date'
    },
    {
      header: 'Doctor',
      accessor: 'doctor'
    },
    {
      header: 'Medications',
      accessor: (prescription: any) => (
        <div>
          {prescription.medications.map((med: any, index: number) => (
            <div key={index} className="text-sm">
              <span className="font-medium">{med.name}</span> - {med.dosage}, {med.frequency}
            </div>
          ))}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (prescription: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          prescription.status === 'active' 
            ? 'bg-primary-100 text-primary-800'
            : 'bg-success-100 text-success-800'
        }`}>
          {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: (prescription: any) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={14} />}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={14} />}
          >
            Download
          </Button>
        </div>
      )
    }
  ];

  const billColumns = [
    {
      header: 'Date',
      accessor: 'date'
    },
    {
      header: 'Description',
      accessor: 'description'
    },
    {
      header: 'Amount',
      accessor: (bill: any) => `$${bill.amount.toFixed(2)}`
    },
    {
      header: 'Status',
      accessor: (bill: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          bill.status === 'paid' 
            ? 'bg-success-100 text-success-800'
            : 'bg-warning-100 text-warning-800'
        }`}>
          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: (bill: any) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={14} />}
          >
            View
          </Button>
          {bill.status === 'pending' && (
            <Button
              variant="primary"
              size="sm"
            >
              Pay Now
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {patient.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => console.log('Book appointment')}
          >
            Book Appointment
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <Calendar className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Next Appointment</p>
            <p className="text-lg font-bold text-gray-900">{patient.nextAppointment}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <Flask className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Upcoming Tests</p>
            <p className="text-lg font-bold text-gray-900">{patient.upcomingTests}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-danger-50 mr-4">
            <AlertTriangle className="h-6 w-6 text-danger-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Bills</p>
            <p className="text-lg font-bold text-gray-900">{patient.pendingBills}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <Pill className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
            <p className="text-lg font-bold text-gray-900">
              {prescriptions.filter(p => p.status === 'active').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
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
              activeTab === 'records'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('records')}
          >
            Medical Records
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
              activeTab === 'billing'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('billing')}
          >
            Billing
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <Card title="Upcoming Appointments">
            <Table
              columns={appointmentColumns}
              data={appointments.filter(a => a.status === 'scheduled')}
              emptyState={
                <div className="text-center py-8">
                  <Calendar size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Upcoming Appointments</h3>
                  <p className="text-gray-500 mb-4">You don't have any scheduled appointments</p>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus size={16} />}
                    onClick={() => console.log('Book appointment')}
                  >
                    Book Appointment
                  </Button>
                </div>
              }
            />
          </Card>

          {/* Recent Lab Results */}
          <Card title="Recent Lab Results">
            <Table
              columns={labResultColumns}
              data={labResults}
              emptyState={
                <div className="text-center py-8">
                  <Flask size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Lab Results</h3>
                  <p className="text-gray-500">You don't have any recent lab results</p>
                </div>
              }
            />
          </Card>

          {/* Active Prescriptions */}
          <Card title="Active Prescriptions">
            <Table
              columns={prescriptionColumns}
              data={prescriptions.filter(p => p.status === 'active')}
              emptyState={
                <div className="text-center py-8">
                  <Pill size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Active Prescriptions</h3>
                  <p className="text-gray-500">You don't have any active prescriptions</p>
                </div>
              }
            />
          </Card>
        </div>
      )}

      {activeTab === 'records' && (
        <div className="space-y-6">
          {/* Lab Results */}
          <Card title="Lab Results">
            <Table
              columns={labResultColumns}
              data={labResults}
              emptyState={
                <div className="text-center py-8">
                  <Flask size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Lab Results</h3>
                  <p className="text-gray-500">You don't have any lab results</p>
                </div>
              }
            />
          </Card>

          {/* Prescriptions */}
          <Card title="Prescriptions">
            <Table
              columns={prescriptionColumns}
              data={prescriptions}
              emptyState={
                <div className="text-center py-8">
                  <Pill size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Prescriptions</h3>
                  <p className="text-gray-500">You don't have any prescriptions</p>
                </div>
              }
            />
          </Card>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <Card title="All Appointments">
            <Table
              columns={appointmentColumns}
              data={appointments}
              emptyState={
                <div className="text-center py-8">
                  <Calendar size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Appointments</h3>
                  <p className="text-gray-500 mb-4">You don't have any appointments</p>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Plus size={16} />}
                    onClick={() => console.log('Book appointment')}
                  >
                    Book Appointment
                  </Button>
                </div>
              }
            />
          </Card>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-6">
          <Card title="Bills">
            <Table
              columns={billColumns}
              data={bills}
              emptyState={
                <div className="text-center py-8">
                  <Receipt size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Bills</h3>
                  <p className="text-gray-500">You don't have any bills</p>
                </div>
              }
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;