# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn** (v1.22.0 or higher)

### Check Your Installation

```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show v6.0.0 or higher
```

### Installing Node.js

If you don't have Node.js installed:

- **Windows/Mac**: Download from [nodejs.org](https://nodejs.org/)
- **Linux (Ubuntu/Debian)**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **macOS (Homebrew)**:
  ```bash
  brew install node
  ```

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd calculator
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

This will install:
- Development dependencies (ESLint, Prettier, Jest, Babel)
- HTTP server for local development
- Testing utilities

### 3. Verify Installation

```bash
npm test
```

If tests pass, installation was successful! ✅

## Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

This will:
1. Start an HTTP server on port 8080
2. Automatically open your browser
3. Navigate to `http://localhost:8080`

### Alternative: Manual Server

If port 8080 is busy, start on a different port:

```bash
npx http-server ./public -p 3000 -o
```

### Alternative: Use Any Static Server

The app is pure client-side, so any static server works:

```bash
# Python 3
python -m http.server 8080 --directory public

# Python 2
python -m SimpleHTTPServer 8080

# PHP
php -S localhost:8080 -t public
```

## Verifying the Setup

### 1. Open the Application

Navigate to `http://localhost:8080` in your browser.

You should see:
- ✅ Calculator interface with buttons
- ✅ Display showing "0"
- ✅ History panel on the right
- ✅ Professional styling with gradient background

### 2. Test Basic Functionality

- Click numbers: `5`, `+`, `3`, `=`
- Result should show: `8`
- History should update with "5 + 3 = 8"

### 3. Test Keyboard Input

- Press `7`, `*`, `6`, `Enter`
- Result should show: `42`
- History should update

### 4. Test Error Handling

- Try dividing by zero: `5`, `÷`, `0`, `=`
- Should display: "Error: Cannot divide by zero"

## Development Tools Setup

### ESLint (Code Linting)

Check for code issues:
```bash
npm run lint
```

Fix automatically:
```bash
npm run lint:fix
```

### Prettier (Code Formatting)

Check formatting:
```bash
npm run format:check
```

Auto-format:
```bash
npm run format
```

### Jest (Testing)

Run tests:
```bash
npm test
```

Watch mode (auto-run on changes):
```bash
npm run test:watch
```

Coverage report:
```bash
npm run test:coverage
```

## IDE Setup

### Visual Studio Code

Recommended extensions:

1. **ESLint** (`dbaeumer.vscode-eslint`)
2. **Prettier** (`esbenp.prettier-vscode`)
3. **Jest** (`Orta.vscode-jest`)

Install all at once:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension Orta.vscode-jest
```

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### JetBrains WebStorm

WebStorm has built-in support for:
- ESLint (enabled by default)
- Prettier (File → Settings → Languages & Frameworks → JavaScript → Prettier)
- Jest (automatically detected)

## Troubleshooting

### Port Already in Use

If port 8080 is busy:

```bash
# Use a different port
npx http-server ./public -p 8081 -o
```

### Permission Denied (npm install)

On Linux/Mac, don't use `sudo` with npm. Instead:

```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
```

### Module Not Found Errors

Clear npm cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Tests Failing

```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
npm test
```

### Browser Compatibility Issues

Minimum browser requirements:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, you may need to add polyfills.

### localStorage Not Available

If you see errors about localStorage:
- Ensure you're not in private/incognito mode
- Check browser settings allow localStorage
- Try a different browser

## Build for Production

While this app runs client-side, you can optimize for production:

### Option 1: Use as-is

Copy the `public/` and `src/` directories to your web server.

### Option 2: Bundle with Webpack (Optional)

Install webpack:
```bash
npm install --save-dev webpack webpack-cli
```

Create `webpack.config.js` and configure bundling.

### Option 3: Deploy to Static Hosting

Deploy to:
- **Netlify**: Drag and drop the `public/` folder
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Push to `gh-pages` branch
- **AWS S3**: Upload to S3 bucket with static hosting

## Environment Setup

### Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests in watch mode
npm run test:watch
```

### Production

```bash
# Install production dependencies only
npm install --production

# Serve with any static server
# No build step required!
```

## Next Steps

Once installed:

1. ✅ Read `README.md` for project overview
2. ✅ Check `QUICK_START.md` for usage guide
3. ✅ Review `docs/ARCHITECTURE.md` for architecture details
4. ✅ Read `CONTRIBUTING.md` before making changes

## Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review the documentation in `/docs`
3. Check the example tests in `/tests`
4. Open an issue on GitHub

## Uninstalling

To remove the project:

```bash
# Remove node_modules
rm -rf node_modules

# Remove the entire project
cd ..
rm -rf calculator
```

---

**Installation Complete! 🎉**

You're ready to start using and developing the calculator application.

Run `npm start` to begin!
