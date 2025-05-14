import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, Download } from 'lucide-react';

const BillDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Bill Details</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Bill Number:</span>
                <p className="font-medium">BILL-{id}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Date:</span>
                <p className="font-medium">January 15, 2025</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                  Paid
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Patient ID:</span>
                <p className="font-medium">PAT-001</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Contact:</span>
                <p className="font-medium">+1 234 567 8900</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Consultation Fee</td>
                  <td className="px-6 py-4 whitespace-nowrap">1</td>
                  <td className="px-6 py-4 whitespace-nowrap">$150.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">$150.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Laboratory Tests</td>
                  <td className="px-6 py-4 whitespace-nowrap">2</td>
                  <td className="px-6 py-4 whitespace-nowrap">$50.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">$100.00</td>
                </tr>
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">Subtotal:</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">$250.00</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">Tax (10%):</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">$25.00</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right text-lg font-semibold">Total:</td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold">$275.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;