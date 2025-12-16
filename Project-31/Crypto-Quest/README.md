# CryptoQuest 🛡️

An interactive, gamified cryptography learning platform built with React, TypeScript, and Vite. Master encryption, hashing, and secure protocols through hands-on challenges and visual simulations.

![CryptoQuest](https://img.shields.io/badge/cryptography-learning-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![WebCrypto](https://img.shields.io/badge/WebCrypto-API-green)

## 🎯 Project Overview

CryptoQuest teaches cryptography progressively through:
- **Interactive Playground**: Experiment with AES-GCM, RSA, SHA-256, HMAC, and more
- **Cipher Challenges**: Solve puzzles from Caesar cipher to modern cryptographic problems
- **Protocol Simulators**: Visualize TLS handshakes and JWT token flows
- **Gamification**: Earn XP, level up, track streaks, and collect achievements
- **Security Notes**: Learn common mistakes and best practices

## ✨ Features

### Core Functionality
- ✅ **Crypto Playground**: Live encryption/decryption, hashing, signing
  - AES-GCM symmetric encryption with PBKDF2 key derivation
  - RSA-OAEP asymmetric encryption (2048-bit keys)
  - SHA-256 and SHA-512 hashing
  - HMAC message authentication
- ✅ **6 Cipher Challenges**: Classic (Caesar, Vigenère) and modern cryptography
- ✅ **2 Protocol Simulators**: TLS handshake and JWT token visualization
- ✅ **Progression System**: XP tracking, levels, streaks stored in IndexedDB
- ✅ **Responsive Design**: Mobile-first, dark theme with cyber aesthetics
- ✅ **Smooth Animations**: Framer Motion for polished UX

### Security & Education
- All crypto operations use browser's native WebCrypto API
- Security warnings and best practices displayed throughout
- Real-world vulnerability explanations (IV reuse, weak keys, etc.)
- No external crypto libraries for core functionality (uses @noble/curves for Ed25519 only)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm))

### Installation & Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd cryptoquest

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
cryptoquest/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── NavBar.tsx       # Navigation with active indicators
│   │   ├── CryptoCard.tsx   # Card component for features
│   │   ├── ProgressBar.tsx  # XP progress visualization
│   │   ├── LevelBadge.tsx   # User level display
│   │   └── XPNotification.tsx
│   ├── pages/               # Route pages
│   │   ├── Home.tsx         # Landing + onboarding
│   │   ├── Playground.tsx   # Crypto operations sandbox
│   │   ├── Challenges.tsx   # Puzzle challenges
│   │   ├── Simulators.tsx   # Protocol visualizations
│   │   └── Profile.tsx      # User stats & progress
│   ├── lib/
│   │   ├── crypto/
│   │   │   ├── webCryptoUtils.ts    # WebCrypto wrappers
│   │   │   └── classicCiphers.ts    # Educational ciphers
│   │   └── storage/
│   │       └── progressStorage.ts   # IndexedDB persistence
│   ├── data/
│   │   └── challenges.ts    # Challenge definitions
│   ├── index.css            # Design system & theme
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── README.md                # This file
├── package.json             # Dependencies & scripts
└── vite.config.ts           # Vite configuration
```

## 🧪 Testing

Currently includes manual testing workflow. To add automated tests:

```bash
# Install test dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Run tests
npm test
```

### Test Coverage Goals
- [x] WebCrypto utility functions (encryption round-trip tests)
- [ ] Challenge validation logic
- [ ] UI component rendering
- [ ] IndexedDB storage operations

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy! ✨

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Replit

1. Import GitHub repo to Replit
2. Replit will auto-detect Vite configuration
3. Click "Run" to build and serve

### Environment Variables

This app runs entirely client-side with no backend. **No environment variables required** for basic functionality.

Optional (future enhancements):
- `VITE_API_URL`: If adding backend API
- `VITE_SUPABASE_URL`: For cloud persistence
- `VITE_SUPABASE_ANON_KEY`: For authentication

## 🔒 Security & Privacy

### Data Storage
- All user progress stored **locally** in browser IndexedDB
- No data transmitted to external servers
- No authentication or user tracking
- Private by design

### Cryptographic Operations
- Uses browser's native **WebCrypto API** (hardware-accelerated, audited)
- All crypto operations happen client-side
- Educational demos only—not production crypto library
- Clear warnings about insecure practices (e.g., Caesar cipher)

### Security Notes in UI
Each feature includes:
- ⚠️ Common mistakes (IV reuse, weak keys, etc.)
- ✅ Best practices (key sizes, algorithm choices)
- 🔍 When to use (and not use) each primitive

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 + TypeScript 5 |
| **Build Tool** | Vite 6 |
| **Styling** | TailwindCSS (custom cyber theme) |
| **Animations** | Framer Motion |
| **Crypto** | WebCrypto API + @noble/curves |
| **Storage** | IndexedDB (via idb) |
| **Icons** | Lucide React |
| **State** | React Hooks + TanStack Query |

## 📚 Educational Content

### Challenges Included
1. **Caesar Cipher** - Classic shift cipher (Easy)
2. **Vigenère Cipher** - Polyalphabetic substitution (Medium)
3. **Frequency Analysis** - Break substitution cipher (Medium)
4. **Hash Functions** - Understand irreversibility (Easy)
5. **AES Security** - Learn about IV reuse (Medium)
6. **RSA Key Size** - Modern security standards (Hard)

### Playground Operations
- **AES-GCM**: Authenticated encryption with PBKDF2 key derivation
- **Hashing**: SHA-256 and SHA-512 with hex output
- **RSA-OAEP**: Public-key encryption (2048-bit)
- **HMAC**: Message authentication codes

### Protocol Simulators
- **TLS Handshake**: 6-step visualization of secure connection establishment
- **JWT Tokens**: Creation and verification flow with signature validation

## 🎨 Design System

Custom dark theme with cyber-security aesthetic:
- **Colors**: Dark base with cyan/teal primary, purple accents
- **Typography**: Inter (UI) + JetBrains Mono (code)
- **Animations**: Smooth transitions, glow effects, matrix-inspired patterns
- **Components**: All use semantic design tokens (no hardcoded colors)

## 🔄 Future Enhancements

### Priority Features
- [ ] Diffie-Hellman key exchange simulator
- [ ] Ed25519 digital signatures in playground
- [ ] Argon2 password hashing demo
- [ ] OAuth 2.0 flow simulator
- [ ] Certificate validation visualizer
- [ ] Code review arena (spot vulnerabilities)
- [ ] Leaderboard (with optional backend)
- [ ] Daily quests system
- [ ] Badge collection
- [ ] PWA support for offline use

### Testing & CI/CD
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] GitHub Actions workflow (included stub)
- [ ] Automated security scanning

### Content Expansion
- [ ] 10+ more challenges (AES ECB vs GCM, timing attacks, etc.)
- [ ] Video explanations for complex topics
- [ ] Code snippet export (copy working examples)
- [ ] Shareable challenge links

## 📝 Adding New Content

### Add a Challenge

Edit `src/data/challenges.ts`:

```typescript
{
  id: 'new-challenge-id',
  title: 'Challenge Name',
  description: 'Short description',
  difficulty: 'easy' | 'medium' | 'hard',
  category: 'classic' | 'modern' | 'protocol',
  xpReward: 100,
  prompt: 'The puzzle text',
  hint1: 'First hint',
  hint2: 'Second hint',
  solution: 'expected answer',
  explanation: 'Why this matters...',
  validateSolution: (input: string) => {
    // Custom validation logic
    return input.toLowerCase() === 'expected answer';
  }
}
```

### Add a Playground Operation

Edit `src/lib/crypto/webCryptoUtils.ts` and add UI in `src/pages/Playground.tsx`

### Add a Simulator

Edit `src/pages/Simulators.tsx` to add new protocol visualization

## 🤝 Contributing

This is an educational project. Contributions welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Style
- Use TypeScript strictly (no `any`)
- Follow existing component patterns
- Add security warnings for crypto operations
- Keep UI components small and focused

## 📄 License

MIT License - Feel free to use for learning and teaching!

## 🙏 Acknowledgments

- WebCrypto API documentation and examples
- Lovable.dev for rapid prototyping
- The crypto community for educational resources
- shadcn/ui for component inspiration (not used in final build)

## 📞 Support

For bugs or feature requests, please open an issue on GitHub.

---

**Built with ❤️ for crypto education**

🔗 [Live Demo](YOUR_DEPLOYMENT_URL) | 📚 [Documentation](https://docs.lovable.dev)
