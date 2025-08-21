# ICP Web Extension Test dApp

A React-based dApp for testing ICP web extension functionalities with wallet providers.

## Features

- 🔗 **Provider Discovery**: Automatically detect and connect to ICP wallet providers
- 👛 **Account Management**: Request and display available accounts from connected wallets
- 🔐 **Delegation Creation**: Generate secure delegation identities for canister interactions
- 🧠 **Neuron Queries**: Fetch and display neuron information from NNS governance canister
- 📊 **Redux State Management**: Centralized state management with debugging capabilities
- 🎨 **Modern UI**: Professional interface with provider logos and visual feedback

## Technologies Used

- **React 19** with functional components and hooks
- **Redux Toolkit** for state management
- **@dfinity/agent** for ICP blockchain interactions
- **@dfinity/identity** for identity management
- **@dfinity/nns** for NNS governance canister interactions
- **Vite** for fast development and building

## Development

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/samufacanha2/icp-test.git
cd icp-test

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:gh-pages` - Build specifically for GitHub Pages
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. The GitHub Action will automatically build and deploy to GitHub Pages
3. Enable GitHub Pages in repository settings, using the `gh-pages` branch

### Manual Deployment

```bash
# Build for GitHub Pages
npm run build

# The built files will be in the `docs` directory
# Upload the `docs` directory to your hosting provider
```

## Usage

1. **Request Providers**: Click to discover available ICP wallet extensions
2. **Select Provider**: Choose from the list of discovered providers (logos included)
3. **Request Accounts**: Fetch account information from the selected wallet
4. **Create Delegation**: Generate a delegation identity for secure interactions  
5. **Query Neurons**: Make a canister call to retrieve neuron information

All activities are logged in real-time for debugging purposes.

## Architecture

The application is built with a modular component architecture using Redux for state management:

```
src/
├── components/           # React components
│   ├── ProvidersStep.jsx    # Provider discovery and selection
│   ├── AccountsStep.jsx     # Account fetching with progress feedback
│   ├── DelegationStep.jsx   # Delegation creation
│   ├── NeuronsStep.jsx      # Neuron data display
│   ├── LogsStep.jsx         # Activity logging
│   ├── ErrorDisplay.jsx    # Global error handling
│   └── LoadingIndicator.jsx # Loading state management
├── store/               # Redux store and slices
│   ├── index.js            # Store configuration
│   ├── providersSlice.js   # Provider state management
│   ├── accountsSlice.js    # Account state management
│   ├── delegationSlice.js  # Delegation state management
│   ├── neuronsSlice.js     # Neuron state management
│   └── logsSlice.js        # Logging state management
├── App.jsx              # Main application component
├── App.css              # Application styles
└── main.jsx             # Application entry point
```

## Browser Extension Testing

This dApp is specifically designed to test the following ICP web extension standards:

- **ICRC-94**: Provider discovery and announcement
- **ICRC-27**: Account information requests  
- **ICRC-34**: Delegation creation and management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
