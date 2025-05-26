# Installation Guide

This guide will help you set up Banisua HMS on your system.

## Prerequisites

Before installation, ensure you have:

- Node.js 18.0 or higher
- npm or yarn package manager
- Git (optional, for version control)
- Supabase account
- Text editor (VS Code recommended)

## Installation Steps

1. **Clone the Repository**

```bash
git clone https://github.com/your-repo/banisua-hms.git
cd banisua-hms
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Database Setup**

- Connect to Supabase using the "Connect to Supabase" button
- Migrations will run automatically

5. **Start Development Server**

```bash
npm run dev
```

## Configuration

### Supabase Setup

1. Create a new Supabase project
2. Copy the project URL and anon key
3. Update `.env` file with credentials
4. Run migrations

### User Roles

Configure the following roles in Supabase:

- Admin
- Doctor
- Nurse
- Pharmacist
- Lab Technician
- Receptionist

## Verification

1. Access the application at `http://localhost:5173`
2. Log in with demo credentials:
   - Admin: admin@banisua.com.ng
   - Password: password

## Troubleshooting

Common installation issues:

1. **Node Version Mismatch**
   - Use `nvm` to switch to Node.js 18
   - Run `node -v` to verify version

2. **Environment Variables**
   - Ensure `.env` file exists
   - Check variable names match exactly

3. **Database Connection**
   - Verify Supabase credentials
   - Check network connectivity

## Next Steps

- [User Guide](../user-guide/README.md)
- [Development Guide](../development/README.md)
- [API Documentation](../api-reference/README.md)