# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the Application

```bash
npm start
```

The calculator will open automatically in your browser at `http://localhost:8080`

### Step 3: Start Calculating!

- Click numbers and operators
- Press `=` to see results
- View your calculation history on the right
- Use keyboard for faster input

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Enter numbers |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Calculate |
| `.` | Decimal point |
| `Escape` | Clear all |
| `Backspace` | Delete last digit |

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check code style
npm run lint

# Fix code style automatically
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Run tests with coverage
npm run test:coverage
```

## 📂 Project Structure

```
calculator/
├── src/
│   ├── domain/          # 🧠 Business logic
│   ├── application/     # 🎯 Use cases
│   ├── infrastructure/  # 🔌 Data storage
│   └── interfaces/      # 🎮 UI controllers
├── public/              # 🌐 Web files
└── tests/               # 🧪 Test files
```

## 🎨 Modifying the UI

Edit these files:
- `public/index.html` - HTML structure
- `public/styles.css` - Styling
- `src/interfaces/web/index.js` - UI logic

## 🧠 Adding Business Logic

Follow this order:

1. **Domain First** (`src/domain/`)
   ```javascript
   // Add entities, value objects, or services
   class MyEntity { ... }
   ```

2. **Use Case Second** (`src/application/use-cases/`)
   ```javascript
   class MyUseCase {
     async execute(dto) { ... }
   }
   ```

3. **Infrastructure** (`src/infrastructure/`)
   ```javascript
   class MyRepository extends Repository { ... }
   ```

4. **Interface Last** (`src/interfaces/web/`)
   ```javascript
   // Add UI controls
   ```

## 🔍 Understanding the Code

### Example: How a Calculation Works

```javascript
// 1. User clicks "5 + 3 ="

// 2. UI captures input
UIManager.handleEquals()

// 3. Controller receives request
CalculatorController.calculate("5", "+", "3")

// 4. Use case executes
PerformCalculation.execute(dto)

// 5. Domain service calculates
CalculatorService.calculate(5, ADD, 3) → 8

// 6. Entity created
new Calculation(5, ADD, 3, 8)

// 7. Saved to storage
LocalStorageRepository.save(calculation)

// 8. Result returned to UI
{ success: true, data: { result: 8 } }
```

## 📖 Documentation

- **README.md** - Full project documentation
- **docs/ARCHITECTURE.md** - Architecture deep dive
- **CONTRIBUTING.md** - How to contribute
- **PROJECT_SUMMARY.md** - What's included

## ❓ Common Questions

### Q: Where do I add a new operation (e.g., square root)?

**A:** Follow the layers:
1. Add to `Operator` value object (domain)
2. Add logic to `CalculatorService` (domain)
3. Use case automatically works
4. Add UI button (interfaces)

### Q: How do I change from localStorage to a database?

**A:** Only modify infrastructure:
1. Create new repository implementation
2. Update dependency injection in `src/interfaces/web/index.js`
3. No changes needed to domain or application!

### Q: Can I use TypeScript?

**A:** Yes! The architecture supports it:
1. Add TypeScript dependencies
2. Rename `.js` to `.ts`
3. Add type annotations
4. Update build config

### Q: How do I test my code?

**A:** 
```bash
# Create test file matching source structure
# tests/domain/services/MyService.test.js

import { MyService } from '../../../src/domain/services/MyService.js';

describe('MyService', () => {
  it('should work', () => {
    const service = new MyService();
    expect(service.doSomething()).toBe(expected);
  });
});
```

## 🎯 Next Steps

1. ✅ Explore the code structure
2. ✅ Read `docs/ARCHITECTURE.md`
3. ✅ Try modifying the UI
4. ✅ Add a new feature following clean architecture
5. ✅ Write tests for your changes

## 🐛 Troubleshooting

### Server won't start
```bash
# Make sure dependencies are installed
npm install

# Try a different port
npx http-server ./public -p 3000
```

### Tests failing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm test
```

### Linting errors
```bash
# Auto-fix most issues
npm run lint:fix
npm run format
```

## 🆘 Need Help?

1. Check the documentation in `/docs`
2. Read the layer-specific `CLAUDE.md` files
3. Look at existing code for examples
4. Open an issue on GitHub

## 🎉 You're Ready!

Start building amazing features while maintaining clean architecture principles.

**Happy coding! 🚀**
