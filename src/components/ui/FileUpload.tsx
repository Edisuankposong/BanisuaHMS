import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

export const FileUpload = ({
  onFileSelect,
  maxFiles = 1,
  accept = {
    'application/pdf': ['.pdf'],
    'image/*': ['.png', '.jpg', '.jpeg'],
  },
  maxSize = 5242880, // 5MB
  className = '',
}: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    maxSize,
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-500'
          }`}
      >
        <input {...getInputProps()} />
        <Upload 
          className={`mx-auto h-12 w-12 ${
            isDragActive ? 'text-primary-500' : 'text-gray-400'
          }`}
        />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag 'n' drop files here, or click to select files"
          }
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Max file size: {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>

      {fileRejections.length > 0 && (
        <div className="mt-2">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-sm text-danger-600">
              {errors.map(error => (
                <p key={error.code}>{error.message}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;