import { useState } from 'react';
import { Download, Filter, BarChart2, PieChart, TrendingUp, Users, FileText, DollarSign } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('all');

  // Revenue Chart Options
  const revenueChartOptions: ApexOptions = {
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
    colors: ['#3b82f6'],
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
        formatter: function (value) {
          return '$' + value.toLocaleString();
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
          return '$' + value.toLocaleString();
        },
      },
    },
  };

  const revenueChartSeries = [
    {
      name: 'Revenue',
      data: [30000, 40000, 35000, 50000, 49000, 60000, 70000],
    },
  ];

  // Patient Distribution Chart Options
  const patientChartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
    },
    labels: ['Outpatient', 'Inpatient', 'Emergency', 'Surgery'],
    colors: ['#3b82f6', '#22c55e', '#f97316', '#ef4444'],
    legend: {
      position: 'bottom',
      labels: {
        colors: '#334155',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: 'light',
    },
  };

  const patientChartSeries = [45, 30, 15, 10];

  // Department Performance Chart Options
  const departmentChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#3b82f6'],
    xaxis: {
      categories: ['Cardiology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Oncology'],
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
    tooltip: {
      theme: 'light',
    },
  };

  const departmentChartSeries = [
    {
      name: 'Patients',
      data: [120, 90, 85, 70, 65],
    },
  ];

  // Mock data for reports table
  const reports = [
    {
      id: '1',
      name: 'Monthly Revenue Report',
      type: 'Financial',
      date: '2024-03-01',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Patient Satisfaction Survey',
      type: 'Patient Care',
      date: '2024-03-05',
      status: 'completed',
    },
    {
      id: '3',
      name: 'Staff Performance Review',
      type: 'HR',
      date: '2024-03-10',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Inventory Status Report',
      type: 'Operations',
      date: '2024-03-15',
      status: 'completed',
    },
  ];

  const reportColumns = [
    {
      header: 'Report Name',
      accessor: 'name',
    },
    {
      header: 'Type',
      accessor: 'type',
    },
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Status',
      accessor: (report: any) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          report.status === 'completed' 
            ? 'bg-success-100 text-success-800'
            : 'bg-warning-100 text-warning-800'
        }`}>
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (report: any) => (
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download size={14} />}
          onClick={() => console.log('Download report:', report.id)}
        >
          Download
        </Button>
      ),
    },
  ];

  // Quick stats
  const stats = [
    {
      title: 'Total Patients',
      value: '1,256',
      change: '+12.5%',
      icon: <Users className="h-6 w-6 text-primary-600" />,
    },
    {
      title: 'Revenue',
      value: '$125,000',
      change: '+8.2%',
      icon: <DollarSign className="h-6 w-6 text-success-600" />,
    },
    {
      title: 'Appointments',
      value: '856',
      change: '+5.1%',
      icon: <FileText className="h-6 w-6 text-warning-600" />,
    },
    {
      title: 'Growth Rate',
      value: '15.2%',
      change: '+2.3%',
      icon: <TrendingUp className="h-6 w-6 text-danger-600" />,
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View and analyze hospital performance metrics</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            Filters
          </Button>
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="flex items-center">
            <div className="p-3 rounded-full bg-gray-50 mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-xs ${
                stat.change.startsWith('+') ? 'text-success-600' : 'text-danger-600'
              }`}>
                {stat.change} from last period
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Revenue Trend">
          <Chart
            options={revenueChartOptions}
            series={revenueChartSeries}
            type="area"
            height={350}
          />
        </Card>

        <Card title="Patient Distribution">
          <Chart
            options={patientChartOptions}
            series={patientChartSeries}
            type="donut"
            height={350}
          />
        </Card>
      </div>

      <Card title="Department Performance">
        <Chart
          options={departmentChartOptions}
          series={departmentChartSeries}
          type="bar"
          height={300}
        />
      </Card>

      {/* Reports Table */}
      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-medium text-gray-900">Generated Reports</h2>
            <div className="mt-4 md:mt-0">
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Reports</option>
                <option value="financial">Financial</option>
                <option value="patient">Patient Care</option>
                <option value="hr">HR</option>
                <option value="operations">Operations</option>
              </select>
            </div>
          </div>
        </div>
        <Table
          columns={reportColumns}
          data={reports}
          keyExtractor={(report) => report.id}
        />
      </Card>
    </div>
  );
};

export default Reports;