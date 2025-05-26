# API Reference

This document provides detailed information about the Banisua HMS API endpoints and their usage.

## Authentication

All API requests require authentication using JWT tokens.

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "role": "doctor"
  }
}
```

## Patients

### Get Patient List

```http
GET /api/patients
Authorization: Bearer {token}
```

### Get Patient Details

```http
GET /api/patients/:id
Authorization: Bearer {token}
```

### Create Patient

```http
POST /api/patients
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "dateOfBirth": "1990-01-01"
}
```

## Appointments

### Get Appointments

```http
GET /api/appointments
Authorization: Bearer {token}
```

### Create Appointment

```http
POST /api/appointments
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientId": "patient_id",
  "doctorId": "doctor_id",
  "date": "2024-03-15",
  "time": "10:00",
  "type": "consultation"
}
```

## Prescriptions

### Get Prescriptions

```http
GET /api/prescriptions
Authorization: Bearer {token}
```

### Create Prescription

```http
POST /api/prescriptions
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientId": "patient_id",
  "medications": [
    {
      "name": "Medicine Name",
      "dosage": "10mg",
      "frequency": "twice daily",
      "duration": "7 days"
    }
  ]
}
```

## Laboratory

### Get Lab Tests

```http
GET /api/lab-tests
Authorization: Bearer {token}
```

### Create Lab Test

```http
POST /api/lab-tests
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientId": "patient_id",
  "testType": "blood_test",
  "requestingDoctor": "doctor_id",
  "notes": "Fasting required"
}
```

## Error Handling

All endpoints return standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

Error Response Format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Webhooks

### Available Events

- patient.created
- appointment.scheduled
- prescription.created
- lab_test.completed

### Webhook Format

```json
{
  "event": "event.name",
  "data": {
    "id": "record_id",
    "timestamp": "2024-03-15T10:00:00Z",
    "details": {}
  }
}
```

## Development Guidelines

1. Use TypeScript for type safety
2. Follow RESTful conventions
3. Include proper error handling
4. Add comprehensive logging
5. Maintain test coverage