
This document outlines the folder structure and purpose of each directory in the VitalBridge React Native project.
## Folder Structure

```
src/
│
├── assets/                # Static assets
├── components/            # Reusable UI components
├── screens/               # Screen-level components
├── navigation/            # Navigation configuration
├── services/              # External service integrations
├── store/                 # State management
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
├── theme/                 # App theme and styling
├── config/                # App configuration
└── context/               # React Context providers
```

## Detailed Breakdown

### `assets/`
**Purpose**: Contains all static assets used throughout the application.

**Subdirectories**:
- `images/` - All image files (PNG, JPG, SVG, etc.)
- `icons/` - Icon files and icon sets
- `fonts/` - Custom font files

**What to store here**:
- App logos and branding images
- Illustrations and graphics
- Icon libraries (Feather, Material Icons, etc.)
- Custom font files (TTF, OTF)

---

### `components/`
**Purpose**: Reusable UI components that are presentational/dumb components.

**Subdirectories**:
- `common/` - Basic UI elements (Button, Input, Loader, Card)
- `layout/` - Layout components (Header, Footer, ScreenWrapper)
- `feedback/` - User feedback components (Toast, Modal, Snackbar)

**What to store here**:
- Reusable UI components that don't contain business logic
- Styled components that can be used across multiple screens
- Presentational components that receive props and render UI

---

### `screens/`
**Purpose**: Screen-level components (smart components) that contain business logic.

**Subdirectories**:
- `Auth/` - Authentication screens (Login, Register, ForgotPassword)
- `Dashboard/` - Main dashboard and overview screens
- `Patients/` - Patient management screens
- `Devices/` - BLE device connection and management screens
- `Settings/` - App settings and configuration screens

**What to store here**:
- Screen components that combine multiple smaller components
- Components that handle user interactions and business logic
- Components that connect to Redux store or use custom hooks
- Navigation-specific components

---

### `navigation/`
**Purpose**: Navigation configuration and setup.

**Files**:
- `RootNavigator.js` - Root navigation container
- `AuthNavigator.js` - Authentication flow navigator
- `AppNavigator.js` - Main app navigator (after auth)

**What to store here**:
- Navigation stack configurations
- Tab navigator setups
- Navigation utilities and helpers
- Route definitions and deep linking configs

---

### `services/`
**Purpose**: External service integrations and API communications.

**Subdirectories**:
- `api/` - HTTP client and API endpoints
  - `client.js` - Axios setup and configuration
  - `endpoints.js` - API endpoint definitions
- `ble/` - Bluetooth Low Energy functionality
  - `bleManager.js` - BLE device management
  - `bleService.js` - BLE service operations
  - `bleHelpers.js` - BLE utility functions
- `storage/` - Local storage management
  - `asyncStorage.js` - Async storage utilities

**What to store here**:
- API client configurations
- Service layer abstractions
- External integrations (BLE, payments, analytics)
- Data persistence logic

---

### `store/`
**Purpose**: Global state management using Redux Toolkit.

**Files**:
- `index.js` - Redux store configuration
- `rootReducer.js` - Root reducer combining all slices

**Subdirectories**:
- `slices/` - Redux Toolkit slices
  - `authSlice.js` - Authentication state
  - `patientSlice.js` - Patient data state
  - `deviceSlice.js` - Device connection state
  - `appSlice.js` - Global app state
- `middleware/` - Custom Redux middleware
  - `logger.js` - Logging middleware

**What to store here**:
- Redux store configuration
- State slices for different domains
- Custom middleware and enhancers
- State selectors and utilities

---

###  `hooks/`
**Purpose**: Custom React hooks for reusable logic.

**Files**:
- `useBLE.js` - Bluetooth Low Energy operations
- `useAuth.js` - Authentication logic
- `useDebounce.js` - Debouncing utility

**What to store here**:
- Custom hooks that encapsulate complex logic
- Hooks that combine multiple React hooks
- Business logic extracted from components
- Reusable stateful logic

---

###  `utils/`
**Purpose**: Pure utility functions and helpers.

**Files**:
- `helpers.js` - General helper functions
- `constants.js` - App constants and enums
- `validators.js` - Form validation functions
- `formatters.js` - Data formatting utilities

**What to store here**:
- Pure functions without side effects
- Validation logic
- Data transformation functions
- Constants and configuration values
- Date/time utilities
- String manipulation functions

---

###  `theme/`
**Purpose**: App theme, colors, and styling configuration.

**Files**:
- `colors.js` - Color palette definitions
- `typography.js` - Font configurations
- `index.js` - Theme export and configuration

**What to store here**:
- Color schemes and palettes
- Typography definitions
- Spacing and sizing scales
- Theme configurations for react-native-paper
- Style constants and design tokens

---

###  `config/`
**Purpose**: Application configuration and environment settings.

**Files**:
- `env.js` - Environment variables and configurations
- `settings.js` - App settings and feature flags

**What to store here**:
- Environment-specific configurations
- API endpoints and URLs
- Feature flags
- App settings and constants
- Build configurations

---

###  `context/`
**Purpose**: React Context providers for global state.

**Files**:
- `AppContext.js` - Global app context provider

**What to store here**:
- React Context providers
- Context values and reducers
- Global state that doesn't require Redux
- Theme and localization contexts

---

## Architecture Principles

1. **Separation of Concerns**: Each folder has a specific responsibility
2. **Scalability**: Structure supports app growth and team collaboration
3. **Maintainability**: Clear organization makes code easier to maintain
4. **Reusability**: Components and utilities are designed for reuse
5. **Testability**: Structure supports unit and integration testing

## Best Practices

- Keep components in `components/` presentational and reusable
- Place business logic in `screens/` or custom hooks
- Use `services/` for all external communications
- Store global state in `store/` using Redux Toolkit
- Keep `utils/` pure and side-effect free
- Use TypeScript interfaces for better type safety
- Follow consistent naming conventions across folders

## Getting Started

1. Install dependencies: `npm install` or `yarn install`
2. Configure environment variables in `config/env.js`
3. Set up Redux store in `store/index.js`
4. Configure navigation in `navigation/`
5. Start building screens and components

---

*This structure follows React Native best practices and is designed to support scalable, maintainable application development.*
