# Development Guide

## Project Structure

```
banisua-hms/
├── docs/               # Documentation
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── stores/        # State management
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── supabase/          # Database migrations
└── package.json       # Project configuration
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Lucide React
- **Charts**: ApexCharts
- **Forms**: React Hook Form
- **Calendar**: React Big Calendar
- **File Handling**: React Dropzone

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Run linter:
```bash
npm run lint
```

## Component Guidelines

### File Structure

```typescript
// Component.tsx
import { useState, useEffect } from 'react';
import { ComponentProps } from './types';

export const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Implementation
};

export default Component;
```

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile`)
- Files: PascalCase for components (e.g., `UserProfile.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth`)
- Utils: camelCase (e.g., `formatDate`)

### State Management

Use Zustand for:
- Global state
- Authentication
- Theme/preferences
- Shared data

Example:
```typescript
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### Error Handling

```typescript
try {
  await api.request();
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API errors
  } else {
    // Handle other errors
  }
}
```

## Database Guidelines

### Migrations

- One migration per logical change
- Descriptive names
- Always include rollback logic
- Test migrations locally

### Row Level Security

```sql
-- Example RLS policy
CREATE POLICY "Users can view own data"
  ON table_name
  FOR SELECT
  USING (auth.uid() = user_id);
```

## Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
import { renderWithProviders } from '../test-utils';
import { UserProfile } from './UserProfile';

describe('UserProfile integration', () => {
  it('loads user data', async () => {
    renderWithProviders(<UserProfile />);
    expect(await screen.findByText('User')).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Code Splitting

```typescript
const Component = lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
}
```

### Memoization

```typescript
const MemoizedComponent = memo(({ prop }: Props) => {
  return <div>{prop}</div>;
});
```

### Image Optimization

- Use appropriate formats (WebP)
- Lazy loading
- Responsive images
- Proper sizing

## Deployment

### Build Process

```bash
npm run build
```

### Environment Variables

Required variables:
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### CI/CD Pipeline

1. Code quality checks
2. Build verification
3. Test execution
4. Deployment
5. Post-deployment verification

## Contributing

### Git Workflow

1. Create feature branch
2. Make changes
3. Run tests
4. Create pull request
5. Code review
6. Merge

### Commit Messages

Format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Tests
- chore: Maintenance