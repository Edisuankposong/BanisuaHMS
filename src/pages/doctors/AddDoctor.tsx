import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    qualification: '',
    experience: '',
    gender: '',
    schedule: [
      { day: 'Monday', startTime: '', endTime: '', isAvailable: false },
      { day: 'Tuesday', startTime: '', endTime: '', isAvailable: false },
      { day: 'Wednesday', startTime: '', endTime: '', isAvailable: false },
      { day: 'Thursday', startTime: '', endTime: '', isAvailable: false },
      { day: 'Friday', startTime: '', endTime: '', isAvailable: false },
    ],
  });

  const specializations = [
    'Cardiologist',
    'Dermatologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Neurologist',
    'Oncologist',
    'Pediatrician',
    'Psychiatrist',
    'Surgeon',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScheduleChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/doctors');
    } catch (error) {
      console.error('Error adding doctor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate('/doctors')}
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
          <p className="text-gray-600">Add a new doctor to the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Basic Information */}
          <Card title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Professional Information */}
          <Card title="Professional Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.specialization}
                  onChange={handleInputChange}
                >
                  <option value="">Select specialization</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                  Qualification
                </label>
                <input
                  type="text"
                  id="qualification"
                  name="qualification"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder="e.g., MD, MBBS"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <Card title="Weekly Schedule">
            <div className="space-y-4">
              {formData.schedule.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-24">
                    <span className="text-sm font-medium text-gray-700">{day.day}</span>
                  </div>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={day.isAvailable}
                      onChange={(e) => handleScheduleChange(index, 'isAvailable', e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Available</span>
                  </label>

                  {day.isAvailable && (
                    <>
                      <div>
                        <input
                          type="time"
                          value={day.startTime}
                          onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div>
                        <input
                          type="time"
                          value={day.endTime}
                          onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate('/doctors')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              leftIcon={<Plus size={16} />}
            >
              Add Doctor
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;