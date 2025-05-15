import { useState } from 'react';
import { FileText, Search, Filter, Plus, Folder, Tag, Download, Eye, Trash2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import FileUpload from '../../components/ui/FileUpload';
import { Document } from '../../types';

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock documents data
  const documents: Document[] = [
    {
      id: '1',
      title: 'Patient Consent Form',
      description: 'Standard patient consent form template',
      category: 'medical',
      fileUrl: '#',
      fileName: 'consent_form.pdf',
      fileType: 'application/pdf',
      fileSize: 245760, // 240KB
      uploadedBy: 'Dr. Sarah Johnson',
      uploadedAt: '2024-03-15T10:30:00',
      accessLevel: 'restricted',
      allowedRoles: ['admin', 'doctor', 'nurse'],
      tags: ['forms', 'consent', 'patient']
    },
    {
      id: '2',
      title: 'Hospital Policy Manual',
      description: 'Updated hospital policies and procedures',
      category: 'administrative',
      fileUrl: '#',
      fileName: 'policy_manual_2024.pdf',
      fileType: 'application/pdf',
      fileSize: 1048576, // 1MB
      uploadedBy: 'Admin User',
      uploadedAt: '2024-03-14T15:45:00',
      accessLevel: 'public',
      tags: ['policy', 'guidelines']
    }
  ];

  const categories = [
    { value: 'medical', label: 'Medical Records' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'financial', label: 'Financial' },
    { value: 'legal', label: 'Legal' },
    { value: 'other', label: 'Other' }
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const columns = [
    {
      header: 'Document',
      accessor: (doc: Document) => (
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-gray-400 mr-3" />
          <div>
            <div className="font-medium text-gray-900">{doc.title}</div>
            <div className="text-sm text-gray-500">{doc.fileName}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: (doc: Document) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
        </span>
      ),
    },
    {
      header: 'Size',
      accessor: (doc: Document) => formatFileSize(doc.fileSize),
    },
    {
      header: 'Uploaded',
      accessor: (doc: Document) => (
        <div>
          <div className="text-sm text-gray-900">
            {new Date(doc.uploadedAt).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500">by {doc.uploadedBy}</div>
        </div>
      ),
    },
    {
      header: 'Access',
      accessor: (doc: Document) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          doc.accessLevel === 'public'
            ? 'bg-success-100 text-success-800'
            : doc.accessLevel === 'private'
            ? 'bg-danger-100 text-danger-800'
            : 'bg-warning-100 text-warning-800'
        }`}>
          {doc.accessLevel.charAt(0).toUpperCase() + doc.accessLevel.slice(1)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: (doc: Document) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={14} />}
            onClick={() => window.open(doc.fileUrl, '_blank')}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={14} />}
            onClick={() => console.log('Download:', doc.id)}
          >
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 size={14} />}
            onClick={() => console.log('Delete:', doc.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    try {
      // Mock upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Uploading files:', files);
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Upload and manage hospital documents</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setShowUploadModal(true)}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-50 mr-4">
            <FileText className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Documents</p>
            <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-secondary-50 mr-4">
            <Folder className="h-6 w-6 text-secondary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Categories</p>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-50 mr-4">
            <Tag className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Tags</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border-gray-300"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
            >
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Table
        columns={columns}
        data={documents}
        emptyState={
          <div className="text-center py-8">
            <FileText size={40} className="mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium text-gray-900">No Documents</h3>
            <p className="text-gray-500 mb-4">No documents match your search criteria</p>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={() => setShowUploadModal(true)}
            >
              Upload Document
            </Button>
          </div>
        }
      />

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Document</h2>
            <FileUpload
              onFileSelect={handleFileUpload}
              maxFiles={5}
              accept={{
                'application/pdf': ['.pdf'],
                'application/msword': ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                'image/*': ['.png', '.jpg', '.jpeg'],
              }}
              maxSize={10485760} // 10MB
            />
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleFileUpload([])}
                isLoading={isUploading}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;