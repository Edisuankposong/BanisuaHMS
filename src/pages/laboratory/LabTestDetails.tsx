import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Download, Printer, Clock, User, 
  Stethoscope, FileCheck, Upload, AlertTriangle 
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import FileUpload from '../../components/ui/FileUpload';

interface LabTest {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  testType: string;
  requestingDoctor: string;
  requestDate: string;
  priority: string;
  status: 'requested' | 'collected' | 'in-progress' | 'completed';
  results?: string;
  resultFiles?: Array<{
    name: string;
    url: string;
    type: string;
    uploadedAt: string;
  }>;
  notes?: string;
  completedDate?: string;
}

const LabTestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [labTest, setLabTest] = useState<LabTest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLabTest = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockLabTest: LabTest = {
          id: id || '1',
          patientName: 'John Davis',
          patientId: 'PAT-001',
          testName: 'Complete Blood Count (CBC)',
          testType: 'Blood Test',
          requestingDoctor: 'Dr. Sarah Johnson',
          requestDate: '2024-03-15T09:30:00',
          priority: 'urgent',
          status: 'completed',
          results: 'All parameters within normal range. No significant abnormalities detected.',
          resultFiles: [
            {
              name: 'CBC_Results.pdf',
              url: '#',
              type: 'application/pdf',
              uploadedAt: '2024-03-15T14:30:00'
            },
            {
              name: 'Blood_Analysis.jpg',
              url: '#',
              type: 'image/jpeg',
              uploadedAt: '2024-03-15T14:30:00'
            }
          ],
          notes: 'Patient fasting for 12 hours before test.',
          completedDate: '2024-03-15T14:30:00'
        };

        setLabTest(mockLabTest);
      } catch (error) {
        console.error('Error fetching lab test:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLabTest();
  }, [id]);

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Mock file upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update lab test with new files
      if (labTest) {
        const newFiles = files.map(file => ({
          name: file.name,
          url: '#',
          type: file.type,
          uploadedAt: new Date().toISOString()
        }));

        setLabTest({
          ...labTest,
          resultFiles: [...(labTest.resultFiles || []), ...newFiles]
        });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadError('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!labTest) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lab Test Not Found</h2>
        <p className="text-gray-600 mb-4">The laboratory test you're looking for doesn't exist or you don't have access.</p>
        <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('/laboratory')}>
          Back to Laboratory
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested':
        return 'bg-blue-100 text-blue-800';
      case 'collected':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate('/laboratory')}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{labTest.testName}</h1>
            <div className="flex items-center mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(labTest.status)}`}>
                {labTest.status.charAt(0).toUpperCase() + labTest.status.slice(1)}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-600 text-sm">
                Test ID: {labTest.id}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          {labTest.status === 'completed' && (
            <>
              <Button
                variant="outline"
                leftIcon={<Printer size={16} />}
                onClick={() => console.log('Print results')}
              >
                Print
              </Button>
              <Button
                variant="outline"
                leftIcon={<Download size={16} />}
                onClick={() => console.log('Download results')}
              >
                Download
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Test Information */}
        <Card title="Test Information" className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <FileText size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Test Type</p>
                  <p className="font-medium text-gray-900">{labTest.testType}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium text-gray-900">{formatDate(labTest.requestDate)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Stethoscope size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Requesting Doctor</p>
                  <p className="font-medium text-gray-900">{labTest.requestingDoctor}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <User size={18} className="text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium text-gray-900">{labTest.patientName}</p>
                  <p className="text-sm text-gray-500">ID: {labTest.patientId}</p>
                </div>
              </div>
              {labTest.completedDate && (
                <div className="flex items-start">
                  <FileCheck size={18} className="text-gray-400 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Completed Date</p>
                    <p className="font-medium text-gray-900">{formatDate(labTest.completedDate)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Status Card */}
        <Card title="Status">
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Status</p>
                <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1 ${getStatusColor(labTest.status)}`}>
                  {labTest.status.charAt(0).toUpperCase() + labTest.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-1 ${
                  labTest.priority === 'urgent' 
                    ? 'bg-red-100 text-red-800'
                    : labTest.priority === 'high'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {labTest.priority.charAt(0).toUpperCase() + labTest.priority.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Upload */}
        {labTest.status !== 'completed' && (
          <Card title="Upload Results" className="md:col-span-3">
            <div className="p-6">
              <FileUpload
                onFileSelect={handleFileUpload}
                maxFiles={5}
                accept={{
                  'application/pdf': ['.pdf'],
                  'image/*': ['.png', '.jpg', '.jpeg'],
                  'text/csv': ['.csv'],
                }}
                maxSize={10485760} // 10MB
              />

              {isUploading && (
                <div className="mt-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Uploading files...</p>
                </div>
              )}

              {uploadError && (
                <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-danger-400 mr-2" />
                    <p className="text-sm text-danger-700">{uploadError}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Results */}
        {labTest.status === 'completed' && (
          <Card title="Test Results" className="md:col-span-3">
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{labTest.results}</p>
              </div>

              {labTest.resultFiles && labTest.resultFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Attached Files</h3>
                  <div className="space-y-3">
                    {labTest.resultFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              Uploaded {formatDate(file.uploadedAt)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Download size={14} />}
                          onClick={() => console.log('Download file:', file.name)}
                        >
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Notes */}
        {labTest.notes && (
          <Card title="Additional Notes" className="md:col-span-3">
            <div className="p-6">
              <p className="text-gray-700">{labTest.notes}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LabTestDetails;