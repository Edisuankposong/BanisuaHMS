// Mock patient data
export const patients: Patient[] = [
  {
    id: '1',
    firstName: 'Chidera',
    lastName: 'Okafor',
    email: 'chidera@banisua.com.ng',
    phone: '08037156489',
    gender: 'male',
    dateOfBirth: '1985-06-15',
    bloodGroup: 'O+',
    address: '15 Marian Road, State Housing Estate, Calabar',
    emergencyContact: {
      name: 'Adanna Okafor',
      relation: 'Wife',
      phone: '08055432198'
    },
    status: 'active',
    registrationDate: '2022-01-15',
    medicalHistory: [
      {
        id: '101',
        patientId: '1',
        condition: 'Hypertension',
        diagnosisDate: '2020-03-10',
        treatment: 'Prescribed lisinopril 10mg daily',
        notes: 'Patient responding well to medication'
      },
      {
        id: '102',
        patientId: '1',
        condition: 'Type 2 Diabetes',
        diagnosisDate: '2019-11-22',
        treatment: 'Diet control and metformin 500mg twice daily',
        notes: 'Regular monitoring of blood glucose levels'
      }
    ]
  },
  {
    id: '2',
    firstName: 'Amina',
    lastName: 'Ibrahim',
    email: 'amina@banisua.com.ng',
    phone: '07069875432',
    gender: 'female',
    dateOfBirth: '1990-08-20',
    bloodGroup: 'A+',
    address: '42 MCC Road, Calabar Municipal, Calabar',
    emergencyContact: {
      name: 'Ibrahim Musa',
      relation: 'Father',
      phone: '08023456789'
    },
    status: 'active',
    registrationDate: '2022-02-28',
    medicalHistory: [
      {
        id: '201',
        patientId: '2',
        condition: 'Asthma',
        diagnosisDate: '2015-05-18',
        treatment: 'Albuterol inhaler as needed',
        notes: 'Well-controlled, infrequent attacks'
      }
    ]
  },
  {
    id: '3',
    firstName: 'Oluwaseun',
    lastName: 'Adebayo',
    email: 'seun@banisua.com.ng',
    phone: '08134567890',
    gender: 'male',
    dateOfBirth: '1978-12-05',
    bloodGroup: 'B-',
    address: '78 Ndidem Usang Iso Road, Calabar South, Calabar',
    emergencyContact: {
      name: 'Folake Adebayo',
      relation: 'Wife',
      phone: '08098765432'
    },
    status: 'active',
    registrationDate: '2021-11-10',
    medicalHistory: [
      {
        id: '301',
        patientId: '3',
        condition: 'Osteoarthritis',
        diagnosisDate: '2018-09-30',
        treatment: 'Physical therapy and NSAIDs as needed',
        notes: 'Mostly affects knees, aggravated by cold weather'
      },
      {
        id: '302',
        patientId: '3',
        condition: 'Hypercholesterolemia',
        diagnosisDate: '2017-07-12',
        treatment: 'Atorvastatin 20mg daily and diet modifications',
        notes: 'Cholesterol levels improving with treatment'
      }
    ]
  },
  {
    id: '4',
    firstName: 'Adaobi',
    lastName: 'Uche',
    email: 'adaobi@banisua.com.ng',
    phone: '08082345678',
    gender: 'female',
    dateOfBirth: '1995-03-25',
    bloodGroup: 'AB+',
    address: '25 Ekpo Archibong Street, Big Qua Town, Calabar',
    emergencyContact: {
      name: 'Chinedu Uche',
      relation: 'Brother',
      phone: '07045678901'
    },
    status: 'active',
    registrationDate: '2022-03-15',
    medicalHistory: [
      {
        id: '401',
        patientId: '4',
        condition: 'Migraine',
        diagnosisDate: '2016-11-08',
        treatment: 'Sumatriptan for acute attacks, lifestyle modifications',
        notes: 'Triggers include stress and certain foods'
      }
    ]
  },
  {
    id: '5',
    firstName: 'Babajide',
    lastName: 'Ogunleye',
    email: 'jide@banisua.com.ng',
    phone: '08165432109',
    gender: 'male',
    dateOfBirth: '1965-09-10',
    bloodGroup: 'O-',
    address: '56 Calabar Road, Diamond Hill, Calabar',
    emergencyContact: {
      name: 'Yewande Ogunleye',
      relation: 'Daughter',
      phone: '07089876543'
    },
    status: 'active',
    registrationDate: '2021-08-05',
    medicalHistory: [
      {
        id: '501',
        patientId: '5',
        condition: 'Coronary Artery Disease',
        diagnosisDate: '2014-06-20',
        treatment: 'Aspirin, statins, and beta-blockers',
        notes: 'Had angioplasty in 2014, regular cardiology follow-ups'
      },
      {
        id: '502',
        patientId: '5',
        condition: 'GERD',
        diagnosisDate: '2018-02-15',
        treatment: 'Omeprazole 20mg daily and dietary changes',
        notes: 'Symptoms well-controlled with medication'
      }
    ]
  }
];

// Function to get patients
export const getPatients = () => {
  return Promise.resolve(patients);
};

// Function to get patient by ID
export const getPatientById = (id: string) => {
  const patient = patients.find(patient => patient.id === id);
  return Promise.resolve(patient || null);
};

// Function to search patients
export const searchPatients = (query: string) => {
  const lowerCaseQuery = query.toLowerCase();
  const filteredPatients = patients.filter(patient => 
    patient.firstName.toLowerCase().includes(lowerCaseQuery) || 
    patient.lastName.toLowerCase().includes(lowerCaseQuery) ||
    patient.email.toLowerCase().includes(lowerCaseQuery) ||
    patient.phone.includes(query)
  );
  return Promise.resolve(filteredPatients);
};