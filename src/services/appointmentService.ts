import { Appointment } from '../types';

// Mock appointments data
const appointments: Appointment[] = [];

export const appointmentService = {
  // Get all appointments
  getAppointments: async (filters?: Record<string, any>): Promise<Appointment[]> => {
    try {
      let filteredAppointments = [...appointments];

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filteredAppointments = filteredAppointments.filter(appointment => 
              appointment[key as keyof Appointment] === value
            );
          }
        });
      }

      return filteredAppointments;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Get appointment by ID
  getAppointmentById: async (id: string): Promise<Appointment | null> => {
    try {
      const appointment = appointments.find(a => a.id === id);
      return appointment || null;
    } catch (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }
  },

  // Create new appointment
  createAppointment: async (appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> => {
    try {
      const newAppointment: Appointment = {
        id: `APT${Math.random().toString(36).substr(2, 9)}`,
        ...appointmentData,
        status: 'scheduled'
      };

      appointments.push(newAppointment);
      return newAppointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Update appointment
  updateAppointment: async (id: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
    try {
      const index = appointments.findIndex(a => a.id === id);
      if (index === -1) throw new Error('Appointment not found');

      const updatedAppointment = {
        ...appointments[index],
        ...appointmentData
      };

      appointments[index] = updatedAppointment;
      return updatedAppointment;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  // Cancel appointment
  cancelAppointment: async (id: string): Promise<void> => {
    try {
      const index = appointments.findIndex(a => a.id === id);
      if (index === -1) throw new Error('Appointment not found');

      appointments[index].status = 'cancelled';
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }
};