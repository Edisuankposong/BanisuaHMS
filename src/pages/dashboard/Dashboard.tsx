import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { useAuthStore } from '../../stores/authStore';
import { 
  Users, CalendarClock, Stethoscope, Receipt, 
  TrendingUp, FileText, Bed, AlertTriangle 
} from 'lucide-react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data - in a real app this would come from API calls
  const stats = {
    totalPatients: 1256,
    newPatients: 34,
    todayAppointments: 48,
    pendingBills: 23,
    occupiedBeds: 86,
    totalBeds: 120,
    activeDoctors: 36,
    revenue: 12850,
  };
  
  // Mock alerts
  const alerts = [
    { id: 1, message: 'Low stock for Paracetamol (500mg)', type: 'warning' },
    { id: 2, message: 'ICU Bed 4 needs maintenance', type: 'info' },
    { id: 3, message: 'Emergency patient admitted to Ward B', type: 'urgent' },
  ];
  
  // Chart options
  const patientChartOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#3b82f6', '#14b8a6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    grid: {
      borderColor: '#f1f5f9',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: '#334155',
      },
    },
    tooltip: {
      theme: 'light',
    },
  };
  
  const patientChartSeries = [
    {
      name: 'Inpatients',
      data: [30, 40, 45, 50, 55, 60, 65],
    },
    {
      name: 'Outpatients',
      data: [45, 52, 68, 74, 83, 90, 102],
    },
  ];
  
  const revenueChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#3b82f6'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return '$' + value;
        },
        style: {
          colors: '#64748b',
        },
      },
    },
    grid: {
      borderColor: '#f1f5f9',
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: function (value) {
          return '$' + value;
        },
      },
    },
  };
  
  const revenueChartSeries = [
    {
      name: 'Revenue',
      data: [1800, 2200, 1900, 2400, 2100, 1700, 1500],
    },
  ];
  
  const appointmentChartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
    },
    labels: ['Completed', 'Scheduled', 'Cancelled', 'No-show'],
    colors: ['#22c55e', '#3b82f6', '#f97316', '#ef4444'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#334155',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'light',
    },
  };
  
  const appointmentChartSeries = [45, 30, 15, 10];
  
  // Upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Davis',
      time: '09:30 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Regular Checkup',
    },
    {
      id: 2,
      patientName: 'Emma Wilson',
      time: '10:15 AM',
      doctor: 'Dr. Michael Brown',
      type: 'Follow-up',
    },
    {
      id: 3,
      patientName: 'Robert Miller',
      time: '11:00 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Consultation',
    },
    {
      id: 4,
      patientName: 'Sophia Thompson',
      time: '02:30 PM',
      doctor: 'Dr. David Clark',
      type: 'Lab Results',
    },
  ];
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="flex items-start">
          <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Patients</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.totalPatients}</h3>
            <p className="text-xs text-success-600">+{stats.newPatients} new this week</p>
          </div>
        </Card>
        
        <Card className="flex items-start">
          <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
            <CalendarClock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.todayAppointments}</h3>
            <p className="text-xs text-primary-600">
              <Link to="/appointments" className="hover:underline">View all</Link>
            </p>
          </div>
        </Card>
        
        <Card className="flex items-start">
          <div className="p-3 rounded-full bg-danger-100 text-danger-600 mr-4">
            <Receipt size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Bills</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.pendingBills}</h3>
            <p className="text-xs text-danger-600">Needs attention</p>
          </div>
        </Card>
        
        <Card className="flex items-start">
          <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
            <Bed size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Beds Occupied</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.occupiedBeds}/{stats.totalBeds}</h3>
            <p className="text-xs">{Math.round((stats.occupiedBeds / stats.totalBeds) * 100)}% occupancy</p>
          </div>
        </Card>
      </div>
      
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <Card className="mb-6" title="Recent Alerts">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`flex items-start p-3 rounded-lg ${
                  alert.type === 'warning' 
                    ? 'bg-warning-50 text-warning-700'
                    : alert.type === 'urgent'
                    ? 'bg-danger-50 text-danger-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Patient Statistics (Last 7 Months)">
          <Chart 
            options={patientChartOptions}
            series={patientChartSeries}
            type="area"
            height={300}
          />
        </Card>
        
        <Card title="Weekly Revenue">
          <Chart 
            options={revenueChartOptions}
            series={revenueChartSeries}
            type="bar"
            height={300}
          />
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Appointment Status */}
        <Card title="Appointment Status">
          <Chart 
            options={appointmentChartOptions}
            series={appointmentChartSeries}
            type="donut"
            height={300}
          />
        </Card>
        
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <Card 
            title="Today's Appointments" 
            footer={
              <Link to="/appointments" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all appointments
              </Link>
            }
          >
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                    <p className="text-sm text-gray-500">{appointment.type} with {appointment.doctor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-900 font-medium">{appointment.time}</span>
                    <Link to={`/appointments/${appointment.id}`} className="block text-xs text-primary-600 hover:text-primary-700 mt-1">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link 
          to="/patients/add"
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center flex-col text-center"
        >
          <Users size={24} className="text-primary-600 mb-2" />
          <span className="text-gray-900 font-medium">New Patient</span>
        </Link>
        
        <Link 
          to="/appointments/add"
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center flex-col text-center"
        >
          <CalendarClock size={24} className="text-secondary-600 mb-2" />
          <span className="text-gray-900 font-medium">New Appointment</span>
        </Link>
        
        <Link 
          to="/prescriptions/add"
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center flex-col text-center"
        >
          <FileText size={24} className="text-success-600 mb-2" />
          <span className="text-gray-900 font-medium">New Prescription</span>
        </Link>
        
        <Link 
          to="/billing/add"
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center flex-col text-center"
        >
          <Receipt size={24} className="text-danger-600 mb-2" />
          <span className="text-gray-900 font-medium">Create Invoice</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;