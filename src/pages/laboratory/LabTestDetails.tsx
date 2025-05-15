// Update mock data in component
const mockLabTest: LabTest = {
  id: id || '1',
  patientName: 'Oluwaseun Adebayo',
  patientId: 'PAT-001',
  testName: 'Complete Blood Count (CBC)',
  testType: 'Blood Test',
  requestingDoctor: 'Dr. Olayinka Adeyemi',
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