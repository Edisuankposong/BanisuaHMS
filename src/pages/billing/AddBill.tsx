import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Save, Plus, Minus, Calculator } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InsuranceDetails {
  provider: string;
  policyNumber: string;
  coverage: number;
}

const AddBill = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<BillItem[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState(0);
  const [insuranceDetails, setInsuranceDetails] = useState<InsuranceDetails>({
    provider: '',
    policyNumber: '',
    coverage: 0
  });

  // Service categories with predefined prices
  const services = {
    consultation: [
      { name: 'General Consultation', price: 100 },
      { name: 'Specialist Consultation', price: 150 },
      { name: 'Emergency Consultation', price: 200 }
    ],
    procedures: [
      { name: 'Basic Health Checkup', price: 250 },
      { name: 'Blood Test', price: 150 },
      { name: 'X-Ray', price: 300 },
      { name: 'ECG', price: 200 }
    ],
    medications: [
      { name: 'Prescription Medications', price: 0 }, // Price varies
      { name: 'Injection Administration', price: 50 }
    ],
    facilities: [
      { name: 'Ward Charges (per day)', price: 500 },
      { name: 'ICU Charges (per day)', price: 1500 },
      { name: 'Operating Room', price: 1000 }
    ]
  };

  const addItem = () => {
    const newItem: BillItem = {
      id: `item_${Date.now()}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof BillItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate total
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = Number(updatedItem.quantity) * Number(updatedItem.unitPrice);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.075; // 7.5% tax
  };

  const calculateInsuranceCoverage = () => {
    if (paymentMethod !== 'insurance' || !insuranceDetails.coverage) return 0;
    const subtotal = calculateSubtotal();
    return (subtotal * insuranceDetails.coverage) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const insuranceCoverage = calculateInsuranceCoverage();
    return subtotal + tax - discount - insuranceCoverage;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement bill creation logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/billing');
    } catch (error) {
      console.error('Error creating bill:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Bill</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information */}
        <Card title="Patient Information">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select Patient</option>
                  <option value="1">John Davis (PAT001)</option>
                  <option value="2">Emma Wilson (PAT002)</option>
                  <option value="3">Robert Miller (PAT003)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bill Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Bill Items */}
        <Card title="Bill Items">
          <div className="p-6">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-start space-x-4">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit Price
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          ₦
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center pt-8">
                    <span className="px-4 font-medium">₦{item.total.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-danger-600 hover:text-danger-800"
                    >
                      <Minus size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={addItem}
                leftIcon={<Plus size={16} />}
              >
                Add Item
              </Button>
            </div>

            {/* Service Quick Add */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Add Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(services).map(([category, serviceList]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-gray-700 capitalize">{category}</h4>
                    {serviceList.map((service, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          const newItem: BillItem = {
                            id: `item_${Date.now()}`,
                            description: service.name,
                            quantity: 1,
                            unitPrice: service.price,
                            total: service.price
                          };
                          setItems([...items, newItem]);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        {service.name}
                        {service.price > 0 && <span className="float-right">₦{service.price}</span>}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Details */}
        <Card title="Payment Details">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="cash">Cash</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="insurance">Insurance</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {paymentMethod === 'insurance' && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      value={insuranceDetails.provider}
                      onChange={(e) => setInsuranceDetails({ ...insuranceDetails, provider: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      value={insuranceDetails.policyNumber}
                      onChange={(e) => setInsuranceDetails({ ...insuranceDetails, policyNumber: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coverage (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={insuranceDetails.coverage}
                      onChange={(e) => setInsuranceDetails({ ...insuranceDetails, coverage: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₦{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (7.5%)</span>
                  <span className="font-medium">₦{calculateTax().toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-danger-600">
                    <span>Discount</span>
                    <span>-₦{discount.toFixed(2)}</span>
                  </div>
                )}
                {paymentMethod === 'insurance' && insuranceDetails.coverage > 0 && (
                  <div className="flex justify-between text-sm text-primary-600">
                    <span>Insurance Coverage ({insuranceDetails.coverage}%)</span>
                    <span>-₦{calculateInsuranceCoverage().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₦{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/billing')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            leftIcon={<Save size={16} />}
          >
            Save Bill
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBill;