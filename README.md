# Frontend Challenge - Car Inventory

## Project Overview

This project is a car inventory management application built with React, TypeScript, and Vite. It allows users to manage car data with features like sorting, searching, adding, editing and deleting and view the details of a car.

![Car Inventory Application Screenshot](https://i2.paste.pics/ff26ff3f739729b38566b8422d87573b.png?trs=69d13b3b092b22161d69516e322efd6ec959a6beced76d2c72ce340e6036c94b&rand=yYPdxjrmCz)

---

## Execution

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server (This runs both frontend + local server):
   ```sh
   npm run dev:server
   ```
3. Run tests:
   ```sh
   npm run test
   ```

---

## Technical Documentation

### Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling the application with utility-first CSS classes, enabling rapid UI development and consistent design.
- **json-server**: For simulating a backend API in local environment.
- **Vitest**: For testing.
- **Shadcn**: UI library used for building accessible and customizable UI components. It provides a set of pre-designed components that are easy to integrate and extend.

### Technical Decisions

1. **State Management**:

   - Used a custom `AppContext` for managing global state. This approach ensures a clean separation of concerns and makes the state accessible across the application without prop drilling. Leveraged React's Context API for lightweight state management, avoiding the need for external libraries like Redux for this project.

2. **Testing**:

   - Unit tests for hooks and components using Vitest and React Testing Library.

3. **Project Structure**:
   - This structure ensures a clear separation of concerns, making the codebase easier to navigate, maintain, and extend
   - **`public/`**: Contains static assets.
   - **`src/`**: The main source code of the application.
     - **`components/`**: Reusable UI components, divided into `common` (shared components like Layout) and `ui` (specific UI elements like buttons and inputs added by shadcn).
     - **`context/`**: Contains the setup for global state management using React Context API.
     - **`features/`**: Feature-specific modules, each encapsulating logic, components, and hooks for a specific functionality (e.g., search, add, update, delete).
     - **`pages/`**: Contains the main application pages, such as `App` for listing cars and `Details` for viewing car details.
     - **`types/`**: TypeScript type definitions.
     - **`utils/`**: Utility functions for common tasks.
     - **`App.tsx`**: The main application component that serves as the root of the React app.
     - **`main.tsx`**: The entry point for the React application, where the app is rendered.
   - **`functions/`**: Contains Cloudflare Workers for backend API logic, including mock data and API endpoints.
   - **`data/`**: Stores the local database used by `json-server` to simulate a backend.

---

## AI Tool Usage Documentation

### Tools Used

- **GitHub Copilot** and **ChatGPT**: Used in generating the structure of the project, configuration files, repetitive patterns and debugging.
- **v0**: Served as a reference for the initial design and layout of the application, helping to establish a foundation for the user interface.

---

## Performance Optimizations

- **Code Splitting**: Reduced initial load time by lazy-loading routes.
- **Memoization**: Prevented unnecessary re-renders in components using `useCallback`.
- **Debouncing**: Improved search performance by implementing a debounce mechanism in the `Search` component. This ensures that the search function is not triggered on every keystroke but only after the user has stopped typing for a specified duration. This enhances the user experience by preventing unnecessary re-renders and network requests.
- Used **Lighthouse** for testing performance.

---

## Accessibility Features

- ARIA roles and labels are added to interactive elements.
- Keyboard navigation is supported for forms, buttons, table rows.
- Tested using tools with Lighthouse.

---

## Self-Review and Refactoring

- **Issues Found**:.
  - Identified gaps in error handling for some API calls. Added proper error messages and fallback mechanisms to ensure a smoother user experience in case of failures.
  - Encountered 404 errors with Cloudflare functions after deplyment. Investigated and resolved deployment configuration issues to ensure proper routing and API functionality.
  - Observed unnecessary re-renders in the application when modifying data in `json-server`.
- **Improvements**:
  - Restructured project files and folders to enhance readability and maintainability. Grouped related components, hooks, and utilities into dedicated directories. Updated import paths accordingly to reflect the new structure.
  - Improved code comments and documentation to make the codebase easier to understand.
  - Enhanced naming conventions for variables and functions to better reflect their purpose and improve code clarity.
  - Removed unused code and dependencies.
  - Added error boundaries for better error handling.

---

## CI/CD

### Tools Used

- GitHub Actions for automated unit testing.

---

## Deployment

The application is deployed using **Cloudflare Pages**. To simulate the backend, a `/functions` folder has been created to handle API requests using Cloudflare Workers. This setup allows the frontend and backend to be hosted together seamlessly.

### Tools Used

- Cloudflare Pipeline for deployment.

---

## Author

**Name**: Sabrina Fernández Zambrano
