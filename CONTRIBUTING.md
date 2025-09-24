# Contributing to TypeFinger

Thank you for your interest in contributing to TypeFinger! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue using the bug report template. Include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue using the feature request template and:

- Clearly describe the feature
- Explain why it would be valuable
- Suggest an implementation approach if possible

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm run test`)
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

#### Pull Request Guidelines

- Follow the coding style of the project
- Include tests for new features
- Update documentation as needed
- Keep PRs focused on a single change
- Link any related issues

## Development Setup

1. Clone your fork of the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and configure as needed
4. Run the development server: `npm run dev`

## Coding Standards

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Ensure accessibility in UI components

## Testing

- Write tests for new features
- Ensure all tests pass before submitting a PR
- Test across different browsers if making UI changes

## Documentation

- Update README.md if necessary
- Document new features or API changes
- Use JSDoc comments for functions and components

## License

By contributing to TypeFinger, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).