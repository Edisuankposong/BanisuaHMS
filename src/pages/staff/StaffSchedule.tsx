import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  shifts: Shift[];
}

interface Shift {
  id: string;
  staffId: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'morning' | 'afternoon' | 'night';
}

const StaffSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  // Mock data
  const staff: Staff[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'Doctor',
      department: 'Cardiology',
      shifts: [
        {
          id: 'shift1',
          staffId: '1',
          date: new Date(2024, 2, 15),
          startTime: '09:00',
          endTime: '17:00',
          type: 'morning',
        },
      ],
    },
    {
      id: '2',
      name: 'Nurse Smith',
      role: 'Nurse',
      department: 'General',
      shifts: [
        {
          id: 'shift2',
          staffId: '2',
          date: new Date(2024, 2, 15),
          startTime: '08:00',
          endTime: '16:00',
          type: 'morning',
        },
      ],
    },
  ];

  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getShiftForDay = (staffId: string, date: Date) => {
    const staffMember = staff.find(s => s.id === staffId);
    return staffMember?.shifts.find(shift => isSameDay(shift.date, date));
  };

  const getShiftColor = (type: string) => {
    switch (type) {
      case 'morning':
        return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'afternoon':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'night':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Schedule</h1>
          <p className="text-gray-600">Manage staff rotations and shifts</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            onClick={() => console.log('Add shift')}
          >
            Add Shift
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-primary-100 text-primary-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Staff on Duty</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-warning-100 text-warning-600 mr-4">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Current Shift</p>
            <p className="text-2xl font-bold text-gray-900">Morning</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-4 rounded-full bg-success-100 text-success-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Next Shift</p>
            <p className="text-2xl font-bold text-gray-900">8 Staff</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          {/* Schedule Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronRight size={16} />
              </Button>
              <span className="text-sm font-medium text-gray-900">
                {format(weekStart, 'MMMM d, yyyy')}
              </span>
            </div>

            <div className="mt-4 md:mt-0">
              <select
                value={selectedStaff || ''}
                onChange={(e) => setSelectedStaff(e.target.value || null)}
                className="rounded-lg border-gray-300 text-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Staff</option>
                {staff.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  {weekDays.map((day, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {format(day, 'EEE d/M')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staff
                  .filter(s => !selectedStaff || s.id === selectedStaff)
                  .map((staffMember) => (
                    <tr key={staffMember.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{staffMember.name}</div>
                          <div className="text-sm text-gray-500">{staffMember.role}</div>
                        </div>
                      </td>
                      {weekDays.map((day, index) => {
                        const shift = getShiftForDay(staffMember.id, day);
                        return (
                          <td key={index} className="px-6 py-4 whitespace-nowrap">
                            {shift ? (
                              <div className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium border ${getShiftColor(shift.type)}`}>
                                {shift.startTime} - {shift.endTime}
                              </div>
                            ) : (
                              <div className="text-gray-400 text-sm">Off duty</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StaffSchedule;