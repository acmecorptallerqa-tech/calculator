# Calculator Project - Documentation Index

Welcome to the Calculator project! This index will help you find exactly what you need.

## 🚀 Getting Started

**New to the project?** Start here:

1. **[INSTALLATION.md](INSTALLATION.md)** - Install and set up the project
2. **[QUICK_START.md](QUICK_START.md)** - Get running in 3 minutes
3. **[README.md](README.md)** - Project overview and features

## 📚 Documentation by Topic

### For New Developers

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [README.md](README.md) | Project overview, features, setup | First thing to read |
| [QUICK_START.md](QUICK_START.md) | Fast-track guide | Want to start immediately |
| [INSTALLATION.md](INSTALLATION.md) | Detailed installation steps | Having setup issues |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | What's included in the project | Want a quick overview |

### For Understanding Architecture

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [CLAUDE.md](CLAUDE.md) | Global architecture contract | Before writing any code |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Deep dive into clean architecture | Want detailed explanation |
| [docs/DIAGRAMS.md](docs/DIAGRAMS.md) | Visual architecture diagrams | Learn better visually |
| [src/domain/CLAUDE.md](src/domain/CLAUDE.md) | Domain layer rules | Working with business logic |
| [src/application/CLAUDE.md](src/application/CLAUDE.md) | Application layer rules | Creating use cases |
| [src/infrastructure/CLAUDE.md](src/infrastructure/CLAUDE.md) | Infrastructure layer rules | Adding external services |
| [src/interfaces/CLAUDE.md](src/interfaces/CLAUDE.md) | Interface layer rules | Building UI or APIs |

### For Contributors

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute properly | Before making changes |
| [LICENSE](LICENSE) | Project license (MIT) | Before using/contributing |

## 📖 Documentation by Role

### 👨‍💻 I'm a Developer

**Just want to code?**
1. [INSTALLATION.md](INSTALLATION.md) - Set up environment
2. [QUICK_START.md](QUICK_START.md) - Start coding
3. [CONTRIBUTING.md](CONTRIBUTING.md) - Follow best practices

**Want to understand the architecture?**
1. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Read this first
2. [docs/DIAGRAMS.md](docs/DIAGRAMS.md) - Visual learner? Start here
3. [CLAUDE.md](CLAUDE.md) - Understand the rules

### 🏗️ I'm an Architect

**Evaluating the architecture?**
1. [CLAUDE.md](CLAUDE.md) - Core principles
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Complete explanation
3. [docs/DIAGRAMS.md](docs/DIAGRAMS.md) - Visual representation
4. [architecture.json](architecture.json) - Machine-readable rules

### 🎨 I'm a Designer/Frontend Developer

**Working on UI?**
1. [QUICK_START.md](QUICK_START.md) - Get it running
2. [src/interfaces/CLAUDE.md](src/interfaces/CLAUDE.md) - Interface layer rules
3. `public/styles.css` - Styling
4. `public/index.html` - HTML structure

### 🧪 I'm a QA/Tester

**Writing tests?**
1. [INSTALLATION.md](INSTALLATION.md) - Setup testing environment
2. `tests/` directory - Example tests
3. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Understand what to test
4. Run `npm test` - Execute tests

## 🗂️ Project Structure Guide

```
calculator/
│
├── 📄 Documentation (Start Here)
│   ├── README.md              → Project overview
│   ├── QUICK_START.md         → Fast-track guide
│   ├── INSTALLATION.md        → Setup instructions
│   ├── PROJECT_SUMMARY.md     → What's included
│   ├── CONTRIBUTING.md        → How to contribute
│   └── INDEX.md              → This file!
│
├── 📁 docs/
│   ├── ARCHITECTURE.md        → Architecture deep dive
│   └── DIAGRAMS.md           → Visual diagrams
│
├── 📁 src/
│   ├── domain/               → Business logic
│   │   └── CLAUDE.md         → Domain rules
│   ├── application/          → Use cases
│   │   └── CLAUDE.md         → Application rules
│   ├── infrastructure/       → External services
│   │   └── CLAUDE.md         → Infrastructure rules
│   └── interfaces/           → UI/API layer
│       └── CLAUDE.md         → Interface rules
│
├── 📁 public/                → Web files
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── 📁 tests/                 → Test files
│
└── ⚙️ Configuration
    ├── package.json
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── jest.config.js
    └── architecture.json
```

## 🎯 Quick Navigation by Task

### "I want to..."

#### ...understand the project
→ [README.md](README.md) → [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

#### ...install and run it
→ [INSTALLATION.md](INSTALLATION.md) → [QUICK_START.md](QUICK_START.md)

#### ...understand clean architecture
→ [CLAUDE.md](CLAUDE.md) → [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) → [docs/DIAGRAMS.md](docs/DIAGRAMS.md)

#### ...add a new feature
→ [CONTRIBUTING.md](CONTRIBUTING.md) → [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) → Layer-specific CLAUDE.md

#### ...modify the UI
→ `public/index.html` → `public/styles.css` → [src/interfaces/CLAUDE.md](src/interfaces/CLAUDE.md)

#### ...add business logic
→ [src/domain/CLAUDE.md](src/domain/CLAUDE.md) → Existing domain files for examples

#### ...create a use case
→ [src/application/CLAUDE.md](src/application/CLAUDE.md) → `src/application/use-cases/` for examples

#### ...add external service integration
→ [src/infrastructure/CLAUDE.md](src/infrastructure/CLAUDE.md) → Existing repository for example

#### ...write tests
→ `tests/` directory → [CONTRIBUTING.md](CONTRIBUTING.md) testing section

#### ...deploy to production
→ [INSTALLATION.md](INSTALLATION.md) → "Build for Production" section

## 📋 Cheat Sheets

### Architecture Rules (Quick Reference)

```
Dependency Rule: interfaces → application → domain
                             ↗
                infrastructure

✅ DO:
- Put business logic in domain
- Create use cases in application
- Implement external I/O in infrastructure
- Keep interfaces thin

❌ DON'T:
- Import infrastructure into domain
- Put business logic in controllers
- Let use cases depend on each other
- Mix concerns across layers
```

### Commands (Quick Reference)

```bash
npm install          # Install dependencies
npm start           # Start development server
npm test            # Run tests
npm run lint        # Check code style
npm run format      # Format code
```

### File Locations (Quick Reference)

```
Business Rule?       → src/domain/
New Feature?         → src/application/use-cases/
Database/API?        → src/infrastructure/
UI Change?           → public/ or src/interfaces/
Test?                → tests/ (mirror src/ structure)
```

## 🔍 Search Guide

### Looking for specific information?

| Topic | Find it in |
|-------|-----------|
| Setup/Installation | [INSTALLATION.md](INSTALLATION.md) |
| Quick commands | [QUICK_START.md](QUICK_START.md) |
| Architecture explanation | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Visual diagrams | [docs/DIAGRAMS.md](docs/DIAGRAMS.md) |
| Layer rules | `src/*/CLAUDE.md` files |
| Contributing guidelines | [CONTRIBUTING.md](CONTRIBUTING.md) |
| Project features | [README.md](README.md) |
| What's included | [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) |
| Code examples | Source files in `src/` |
| Test examples | Files in `tests/` |

## 🆘 Troubleshooting

Having issues? Check these in order:

1. **Installation problems** → [INSTALLATION.md](INSTALLATION.md) "Troubleshooting" section
2. **Architecture questions** → [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. **"Where does this code go?"** → [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Layer-specific questions** → Respective `CLAUDE.md` in that layer
5. **Examples** → Look at existing code in that layer

## 📞 Getting Help

Still stuck? Here's the process:

1. ✅ Check this INDEX.md for relevant documentation
2. ✅ Read the specific documentation file
3. ✅ Look at code examples in `src/` and `tests/`
4. ✅ Check [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
5. ✅ Open an issue on GitHub with:
   - What you're trying to do
   - What you've tried
   - Error messages
   - Which documentation you've read

## 🎓 Learning Path

### Beginner Path

1. [README.md](README.md) - Understand what this is
2. [INSTALLATION.md](INSTALLATION.md) - Get it running
3. [QUICK_START.md](QUICK_START.md) - Try it out
4. Play with the calculator in your browser
5. Look at `public/` files to see the UI
6. Read [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) basics

### Intermediate Path

1. Complete Beginner Path
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Full read
3. [docs/DIAGRAMS.md](docs/DIAGRAMS.md) - Visual understanding
4. Read source code in order: domain → application → infrastructure → interfaces
5. [CONTRIBUTING.md](CONTRIBUTING.md) - Learn to contribute
6. Try adding a small feature

### Advanced Path

1. Complete Intermediate Path
2. Read all layer-specific `CLAUDE.md` files
3. Study `architecture.json` rules
4. Read all source code and tests
5. Understand dependency injection in `src/interfaces/web/index.js`
6. Contribute a major feature following clean architecture

## 📚 External Resources

### Clean Architecture
- [Clean Architecture Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Robert C. Martin
- [Clean Architecture Book](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)

### Domain-Driven Design
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/) by Eric Evans

### JavaScript/ES6+
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/)

## ✅ Quick Checklist

Before you start coding, make sure you've:

- [ ] Read [README.md](README.md)
- [ ] Installed the project ([INSTALLATION.md](INSTALLATION.md))
- [ ] Run the app successfully
- [ ] Read [CLAUDE.md](CLAUDE.md) architecture rules
- [ ] Understand the layer you'll be working in (read that layer's CLAUDE.md)
- [ ] Looked at existing code examples
- [ ] Read [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📝 Documentation Maintenance

This index is maintained alongside the project. If you add new documentation:

1. Add it to the appropriate section above
2. Update the relevant table
3. Add to "Quick Navigation by Task" if applicable
4. Consider adding to a learning path

---

**Happy coding! 🚀**

*Last updated: Project creation*
