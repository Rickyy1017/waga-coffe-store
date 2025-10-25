# Waga Coffee Store

A modern coffee e-commerce platform built with React, TypeScript, and Vite, featuring both cryptocurrency and card payments via Paystack.

## Features

- 🛒 Shopping cart functionality
- 💳 Card payments with Paystack integration
- ₿ Cryptocurrency payments (ETH/USDC)
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../waga-coffe-backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Paystack keys:
   ```
   PAYSTACK_SECRET_KEY=your_secret_key_here
   PAYSTACK_PUBLIC_KEY=your_public_key_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

## Paystack Integration

This project includes Paystack payment integration for card payments:

### Frontend Integration
- Uses `@paystack/inline-js` for payment initialization
- Redirects users to Paystack's hosted payment page
- Handles payment success/failure via webhooks

### Backend Integration
- `/api/pay` endpoint initializes Paystack transactions
- `/api/webhook` endpoint handles Paystack webhook events with signature verification
- Supports payment success and failure events

### Environment Variables
- `PAYSTACK_SECRET_KEY`: Your Paystack secret key (for backend API calls and webhook verification)
- `PAYSTACK_PUBLIC_KEY`: Your Paystack public key (for frontend integration)

### Webhook Configuration
Configure your Paystack dashboard to send webhooks to:
```
https://yourdomain.com/api/webhook
```

## Payment Flow

1. User selects card payment
2. Frontend calls `/api/pay` with email and amount
3. Backend initializes Paystack transaction
4. User is redirected to Paystack payment page
5. After payment, Paystack sends webhook to `/api/webhook`
6. Backend verifies webhook signature and updates order status

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### ESLint Configuration

This project uses ESLint for code quality. To expand the configuration:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
"# waga-coffe-store" 
