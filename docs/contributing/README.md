# Contributing Guidelines

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 18+
- npm or yarn
- Git
- Code editor
- Supabase CLI (optional)

### Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/your-username/banisua-hms.git
```

3. Install dependencies:
```bash
npm install
```

4. Create a branch:
```bash
git checkout -b feature/your-feature
```

## Development Process

### Code Style

We follow these conventions:
- TypeScript for type safety
- ESLint for linting
- Prettier for formatting
- React best practices
- Component-driven development

### Commit Guidelines

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
- test: Adding tests
- chore: Maintenance

### Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure CI passes
4. Request review
5. Address feedback
6. Merge when approved

### Testing

Required tests:
- Unit tests
- Integration tests
- Component tests
- End-to-end tests

## Documentation

### Code Documentation

- JSDoc comments
- Type definitions
- Component props
- Function parameters
- Return values

Example:
```typescript
/**
 * Calculate patient age from date of birth
 * @param dateOfBirth - Patient's date of birth
 * @returns Age in years
 */
function calculateAge(dateOfBirth: Date): number {
  // Implementation
}
```

### Component Documentation

```typescript
interface Props {
  /** Patient's full name */
  name: string;
  /** Patient's unique identifier */
  id: string;
  /** Click handler for patient selection */
  onSelect: (id: string) => void;
}
```

## Review Process

### Code Review

Checklist:
- [ ] Follows style guide
- [ ] Includes tests
- [ ] Updates documentation
- [ ] Handles errors
- [ ] Performance considered

### Testing Review

Verify:
- Test coverage
- Edge cases
- Error scenarios
- Performance impact
- Security implications

## Release Process

### Version Control

We use Semantic Versioning:
- MAJOR.MINOR.PATCH
- Breaking.Feature.Fix

### Release Steps

1. Version bump
2. Update changelog
3. Create release branch
4. Run tests
5. Build artifacts
6. Create tag
7. Deploy

## Community

### Communication

Channels:
- GitHub Issues
- Pull Requests
- Discussion Forum
- Chat Platform

### Code of Conduct

We expect:
- Respectful communication
- Professional conduct
- Inclusive environment
- Constructive feedback
- Collaborative spirit

### Recognition

Contributors are:
- Credited in changelog
- Listed in contributors
- Thanked in releases
- Featured in documentation

## Project Structure

### Directory Organization

```
src/
├── components/        # Reusable components
├── pages/            # Page components
├── services/         # API services
├── stores/           # State management
├── types/            # TypeScript types
└── utils/            # Utility functions
```

### Component Structure

```typescript
// Component folder structure
ComponentName/
├── index.ts
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.types.ts
└── ComponentName.module.css
```

## Best Practices

### Code Quality

1. Type Safety
   - Use TypeScript
   - Define interfaces
   - Avoid any
   - Use generics

2. Performance
   - Optimize renders
   - Lazy loading
   - Code splitting
   - Bundle analysis

3. Security
   - Input validation
   - Output encoding
   - Authentication
   - Authorization

4. Accessibility
   - ARIA labels
   - Keyboard navigation
   - Color contrast
   - Screen readers

### State Management

1. Local State
   - useState
   - useReducer
   - Component state

2. Global State
   - Zustand
   - Context
   - Store pattern

### Error Handling

1. Frontend
```typescript
try {
  await api.request();
} catch (error) {
  handleError(error);
}
```

2. API
```typescript
function handleError(error: unknown) {
  if (error instanceof ApiError) {
    // Handle API errors
  } else {
    // Handle other errors
  }
}
```

## Tools and Resources

### Development Tools

- VS Code
- ESLint
- Prettier
- React DevTools
- Chrome DevTools

### Testing Tools

- Vitest
- React Testing Library
- Cypress
- Playwright

### Documentation Tools

- TypeDoc
- Storybook
- Markdown
- Diagrams

## Support

### Getting Help

1. Check documentation
2. Search issues
3. Ask questions
4. Join discussions

### Reporting Issues

Include:
- Description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots
- Environment details

## License

This project is licensed under the MIT License.