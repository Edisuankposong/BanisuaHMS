import { useState } from 'react';
import { Download, Filter, BarChart2, PieChart, TrendingUp, Users, FileText, DollarSign, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      data: [30000, 40000, 35000, 50000, 49000, 60000, 70000, 91000, 85000, 95000, 80000, 100000],
    },
  ];

  // Appointment Trends Chart Options
  const appointmentChartOptions: ApexOptions = {
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
    colors: ['#3b82f6', '#22c55e'],
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
    legend: {
      position: 'top',
    },
  };

  const appointmentChartSeries = [
    {
      name: 'Scheduled',
      data: [44, 55, 57, 56, 61, 58, 63],
    },
    {
      name: 'Completed',
      data: [35, 41, 36, 26, 45, 48, 52],
    },
  ];

  // Lab Results Trend Chart Options
  const labResultsChartOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#f97316', '#3b82f6'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: '#64748b',
        },
      },
    },
    yaxis: [
      {
        labels: {
          style: {
            colors: '#64748b',
          },
        },
      },
      {
        opposite: true,
        labels: {
          style: {
            colors: '#64748b',
          },
        },
      },
    ],
    grid: {
      borderColor: '#f1f5f9',
    },
    tooltip: {
      theme: 'light',
    },
    legend: {
      position: 'top',
    },
  };

  const labResultsChartSeries = [
    {
      name: 'Tests Conducted',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201],
    },
    {
      name: 'Processing Time (hrs)',
      type: 'line',
      data: [23, 42, 35, 27, 43, 22, 17],
    },
  ];

  // Medication Usage Chart Options
  const medicationChartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false,
      },
    },
    labels: ['Antibiotics', 'Pain Relief', 'Cardiovascular', 'Respiratory', 'Others'],
    colors: ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6'],
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

  const medicationChartSeries = [35, 25, 20, 15, 5];

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
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={14} />}
            onClick={() => handleExport(report.id, 'pdf')}
          >
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={14} />}
            onClick={() => handleExport(report.id, 'csv')}
          >
            CSV
          </Button>
        </div>
      ),
    },
  ];

  const handleExport = async (reportId: string, format: 'pdf' | 'csv') => {
    try {
      // TODO: Implement export functionality
      console.log(`Exporting report ${reportId} as ${format}`);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">View and analyze hospital performance metrics</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <div className="flex space-x-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="rounded-lg border-gray-300"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="rounded-lg border-gray-300"
            />
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border-gray-300"
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
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <DollarSign className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">$125,000</p>
            <p className="text-xs text-success-600">+8.2% from last month</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <Users className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Patients</p>
            <p className="text-2xl font-bold text-gray-900">1,256</p>
            <p className="text-xs text-success-600">+12.5% from last month</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-50 mr-4">
            <Calendar className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Appointments</p>
            <p className="text-2xl font-bold text-gray-900">856</p>
            <p className="text-xs text-success-600">+5.1% from last month</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-danger-50 mr-4">
            <TrendingUp className="h-6 w-6 text-danger-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Growth Rate</p>
            <p className="text-2xl font-bold text-gray-900">15.2%</p>
            <p className="text-xs text-success-600">+2.3% from last month</p>
          </div>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card title="Monthly Revenue Trend">
        <Chart
          options={revenueChartOptions}
          series={revenueChartSeries}
          type="area"
          height={350}
        />
      </Card>

      {/* Appointment and Lab Results Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Appointment Trends">
          <Chart
            options={appointmentChartOptions}
            series={appointmentChartSeries}
            type="bar"
            height={350}
          />
        </Card>

        <Card title="Laboratory Test Analysis">
          <Chart
            options={labResultsChartOptions}
            series={labResultsChartSeries}
            type="line"
            height={350}
          />
        </Card>
      </div>

      {/* Medication Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Medication Usage Distribution">
          <Chart
            options={medicationChartOptions}
            series={medicationChartSeries}
            type="donut"
            height={350}
          />
        </Card>

        <div className="lg:col-span-2">
          <Card title="Generated Reports">
            <Table
              columns={reportColumns}
              data={reports}
              emptyState={
                <div className="text-center py-8">
                  <FileText size={40} className="mx-auto text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No Reports</h3>
                  <p className="text-gray-500">No reports have been generated yet</p>
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;