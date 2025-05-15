import { format, formatDistance, parseISO, isValid } from 'date-fns';

export const formatDate = (date: string | Date, formatStr = 'PPP') => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, formatStr) : '';
};

export const formatRelativeTime = (date: string | Date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? formatDistance(parsedDate, new Date(), { addSuffix: true }) : '';
};

export const isDateInPast = (date: string | Date) => {
  if (!date) return false;
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? parsedDate < new Date() : false;
};

export const getAge = (dateOfBirth: string | Date) => {
  if (!dateOfBirth) return '';
  const parsedDate = typeof dateOfBirth === 'string' ? parseISO(dateOfBirth) : dateOfBirth;
  if (!isValid(parsedDate)) return '';
  
  const today = new Date();
  let age = today.getFullYear() - parsedDate.getFullYear();
  const m = today.getMonth() - parsedDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < parsedDate.getDate())) {
    age--;
  }
  
  return age;
};