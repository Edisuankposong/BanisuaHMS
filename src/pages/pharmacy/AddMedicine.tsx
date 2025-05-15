import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface MedicineFormData {
  name: string;
  manufacturer: string;
  category: string;
  description: string;
  price: string;
  stock: string;
  reorderLevel: string;
  expiryDate: string;
  storageConditions: string;
  dosageForm: string;
  strength: string;
}

const AddMedicine = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    manufacturer: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    reorderLevel: '',
    expiryDate: '',
    storageConditions: '',
    dosageForm: '',
    strength: ''
  });

  const categories = [
    'Antibiotics',
    'Pain Relief',
    'Gastrointestinal',
    'Cardiovascular',
    'Respiratory',
    'Diabetes',
    'Vitamins & Supplements',
    'First Aid',
    'Other'
  ];

  const dosageForms = [
    'Tablet',
    'Capsule',
    'Syrup',
    'Injection',
    'Cream',
    'Ointment',
    'Drops',
    'Inhaler',
    'Other'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call to save medicine
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/pharmacy');
    } catch (error) {
      console.error('Error adding medicine:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-4"
          onClick={() => navigate('/pharmacy')}
        >
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Medicine</h1>
          <p className="text-gray-600">Add a new medicine to the inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card title="Basic Information">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medicine Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <input
                type="text"
                name="manufacturer"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.manufacturer}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dosage Form
              </label>
              <select
                name="dosageForm"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.dosageForm}
                onChange={handleInputChange}
              >
                <option value="">Select dosage form</option>
                {dosageForms.map(form => (
                  <option key={form} value={form}>{form}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Strength
              </label>
              <input
                type="text"
                name="strength"
                placeholder="e.g., 500mg, 50ml"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.strength}
                onChange={handleInputChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Card>

        {/* Inventory Information */}
        <Card title="Inventory Information">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reorder Level
              </label>
              <input
                type="number"
                name="reorderLevel"
                min="0"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.reorderLevel}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  required
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Storage Conditions
              </label>
              <input
                type="text"
                name="storageConditions"
                placeholder="e.g., Store in a cool, dry place below 25°C"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={formData.storageConditions}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Card>

        {/* Warning for low stock threshold */}
        {formData.stock !== '' && formData.reorderLevel !== '' && 
         parseInt(formData.stock) <= parseInt(formData.reorderLevel) && (
          <div className="flex items-center p-4 bg-warning-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-warning-400 mr-3" />
            <p className="text-sm text-warning-700">
              Initial stock quantity is at or below the reorder level. Consider increasing the stock quantity.
            </p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/pharmacy')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            leftIcon={<Save size={16} />}
          >
            Save Medicine
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;