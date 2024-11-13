# Next.js Authentication Template 🚀

A ready-to-use authentication template for Next.js applications, providing pre-built login, registration, and user authentication features. This template helps developers set up secure, scalable authentication, allowing them to focus on building their main application features. 🔐

---

## Table of Contents 📚

1. [Project Overview](##project-overview)
2. [Technologies Used](#technologies-used)
3. [Installation & Setup](#installation-setup)
4. [Usage](#usage)
5. [Features](#features)
6. [Environment Variables / Configuration](#environment-variables-configuration)
7. [Testing](#testing)
8. [Contributing](#contributing)
9. [Contact Information](#contact-information)

---

## Project Overview 🌟

This project provides a fully functional, customizable authentication system for Next.js applications. It includes:
- Credential-based login, registration, and password reset functionality.
- OAuth login options (Google, GitHub) for flexible user authentication.
- Email verification during registration via Resend (or a preferred email provider).
- Validation on all forms for a secure user experience.

---
## Images:
<div><img src="https://github.com/user-attachments/assets/f78bc5cb-5264-4dce-9f11-6b7f36b78720" alt="image 1" width="200" >
<img src="https://github.com/user-attachments/assets/768373ec-2604-4b73-853c-e5eb339d1db2" alt="image 2" width="200"><img src="https://github.com/user-attachments/assets/9c50d568-6591-4427-ae26-50c5478ad33f" alt="image 3" width="200">
<img src="https://github.com/user-attachments/assets/30aa77a8-5da0-4d92-a085-02df3ef7faa2" alt="image 4" width="160">
</div>
<img src="https://github.com/user-attachments/assets/edd71f84-972a-4ff9-b8b6-ce8c73bf09a6" alt="image 5" width="160" >
<img src="https://github.com/user-attachments/assets/2e5105b1-ccfc-4a94-9625-f090c654d5ca" alt="image 7" width="160" >
<img src="https://github.com/user-attachments/assets/7d8f70f3-33d0-49ed-b6d9-05f031d2f090" alt="image 8" width="160" >
<img src="https://github.com/user-attachments/assets/40bb1aab-a9f8-4a13-a607-7d53e8711130" alt="image 6" width="160">

## Technologies Used 🛠️

- **Languages**: JavaScript, TypeScript
- **Frameworks and Libraries**: Next.js, React, NextAuth (for authentication), Prisma (for ORM)
- **Database**: Neondb (default) or a preferred database
- **Styling**: TailwindCSS, ShadCN/UI
- **Email Services**: Resend (for email-based features; customizable for other providers)
- **Form Handling**: React Hook Form

---

## Installation & Setup ⚙️

### Prerequisites

Make sure you have the following tools installed:

- **Node.js** (14.x or later)
- **npm** (included with Node.js)

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/nextjs-auth-template.git
    cd nextjs-auth-template
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Configuration**:
   - Rename `.env.example` to `.env` and fill in the required fields with your configuration values (see [Environment Variables / Configuration](https://github.com/jovdim/next-auth-template?tab=readme-ov-file#environment-variables--configuration-)) below for more details).

4. **Generate `AUTH_SECRET`**:

    The `AUTH_SECRET` is required to encrypt tokens and email verification hashes. To generate a random secret, run the following command:

    ```bash
    npx auth secret
    ```

    This will automatically add the generated secret to your `.env.local` file.


5. **Run the Development Server**:
    ```bash
    npm run dev
    ```
   The app should now be running at `http://localhost:3000`.

---

## Usage 🏁

This project serves as a complete authentication template. After setting up, the following features are ready for use:

- **Credential-Based Authentication**: Register, log in, and reset passwords using email and password.
- **OAuth-Based Authentication**: Choose from Google or GitHub for social login options.
- **Email Verification**: When users register, they will receive a verification email through Resend (or their preferred email provider) to confirm their email address before gaining access to the app.
- **Form Validation**: All fields are validated for security and usability.

### Key User Flows

1. **User Registration**: 
   - Users can register via email and password or OAuth (Google/GitHub).
   - After registration, they must verify their email via a verification link sent by Resend or the configured email provider.
2. **User Login**: Provides a login form for existing users, with options for credentials or OAuth.
3. **Password Reset**: Users can reset their password through email using Resend (or another configured provider).

---

## Features ✨

1. **Secure Authentication**: Pre-built user authentication that follows best practices.
2. **Validation and Error Handling**: User input validation and informative error messages.
3. **OAuth Integration**: Allows users to log in via GitHub and Google (easily changeable to other providers).
4. **Flexible Database Support**: Built with Prisma and configured to work with Neondb by default, but can be set up to work with any compatible database (e.g., PostgreSQL, MySQL, SQLite).
5. **Customizable Email Provider**: Resend is used by default for email-based features, but users can configure any preferred email provider.
6. **Easy Customization**: Modify or extend the authentication process with minimal configuration.

---

## Environment Variables / Configuration 🌍

The template requires certain environment variables to run correctly. Copy the `.env.example` file to `.env` and replace the placeholder values with your own:

- **Database Configuration**:
  - `DATABASE_URL`: Your database URL. By default, the project is set up for Neondb, but you can use any Prisma-supported database (e.g., PostgreSQL, MySQL, SQLite). Update the `DATABASE_URL` with your preferred database connection string.

- **OAuth Providers**:
  - `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`: Credentials for GitHub OAuth.
  - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Credentials for Google OAuth.
  - You can also easily replace these with any other OAuth provider (e.g., Facebook, Twitter) by updating the [NextAuth](https://next-auth.js.org/) configuration.

- **Email Service**:
  - `RESEND_API_KEY`: API key for Resend if email-based login is enabled. If you prefer a different email service, configure the NextAuth provider settings accordingly to integrate your chosen service.

### Note: Using Email Verification with Credentials

To fully experience the credential-based login system, you need to set up an account with Resend or configure a different email provider of your choice. This will enable users to receive email verifications, password reset emails, and other email-based interactions essential for user authentication.

---

## Testing 🧪

If you wish to test the template, we recommend setting up test credentials for OAuth and using a mock database to avoid any unintended data changes.

### Running Tests

If you plan to add tests or use testing libraries (e.g., Jest, Cypress), you can include instructions here. For now, any standard testing setup compatible with Next.js and your chosen tools should work with this template.

---

## Contributing 💡

We welcome contributions to enhance this project! Whether you want to add new features, improve existing ones, clean up the code, or help with documentation, your contributions are appreciated! Here's how you can get started:

### Steps to Contribute

1. **Fork the Repository**: Create your own fork by clicking the “Fork” button on GitHub.
  
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/nextjs-auth-template.git
   ```

3. **Create a Branch**:
   - Follow a naming convention such as `feature/your-feature`, `fix/issue-123`, or `refactor/code-cleanup`:
   ```bash
   git checkout -b feature/your-feature
   ```

4. **Implement Your Changes**:
   - Add your code following the existing conventions and code style.
   - Ensure that any new dependencies are essential and documented.
   - Run the project locally to verify that your changes work as expected.

5. **Write or Update Tests**:
   - If you add new functionality, include tests to cover it if possible. For example, if adding a new field to the authentication form, make sure it has appropriate validation and error-handling tests.

6. **Commit Your Changes**:
   - Use clear, descriptive commit messages:
   ```bash
   git add .
   git commit -m "Add feature: user profile page"
   ```

7. **Push to Your Forked Repository**:
   ```bash
   git push origin feature/your-feature
   ```

8. **Create a Pull Request**:
   - Go to the original repository and open a pull request. In the PR description, include:
     - A summary of the changes you made.
     - Any relevant issues your contribution fixes or improves.
     - Additional context for any design or implementation choices.

### Guidelines

- **Coding Style**: Follow the project’s coding style. Generally, stick to ESLint rules for JavaScript and Prettier for formatting.
- **Documentation**: Update README or other relevant documentation if your changes affect usage or require special setup.
- **Testing**: Ensure existing tests pass before submitting a pull request. Run `npm run test` (if tests are available) to verify.
- **Non-Feature Contributions**: If you’re working on code cleanups, refactoring, or improvements (not adding new features), please feel free to submit those too! All types of contributions are welcome. 🧹
  
---

## Contact Information 📧

If you have any questions, suggestions, or feedback, please reach out:

- **Email**: [jovdim77@gmail.com](mailto:jovdim77@gmail.com)
