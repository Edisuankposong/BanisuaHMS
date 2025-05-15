// Update mock data in component
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'General Checkup - Oluwaseun Adebayo',
    start: new Date(2024, 2, 15, 9, 30),
    end: new Date(2024, 2, 15, 10, 0),
    resourceId: 'doc1',
    type: 'appointment',
    patient: {
      name: 'Oluwaseun Adebayo',
      id: 'PAT001'
    },
    doctor: {
      name: 'Dr. Olayinka Adeyemi',
      id: 'DOC001'
    },
    status: 'scheduled'
  }
];

const resources: Resource[] = [
  {
    id: 'doc1',
    title: 'Dr. Olayinka Adeyemi',
    type: 'doctor'
  },
  {
    id: 'doc2',
    title: 'Dr. Babajide Ogunleye',
    type: 'doctor'
  }
];

export default resources