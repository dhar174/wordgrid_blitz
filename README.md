# WordGrid Blitz Game

WordGrid Blitz is a fast-paced, interactive word puzzle game built with TypeScript. Challenge your vocabulary and quick-thinking skills as you search for words in a dynamic grid before time runs out!

## Features

- **Dynamic Word Grid:** Every game session presents a new randomized letter grid for endless replay value.
- **Fast-Paced Gameplay:** Race against the clock to find as many words as possible.
- **TypeScript Powered:** The codebase is fully written in TypeScript for improved reliability and maintainability.
- **Responsive UI:** Optimized for desktop and mobile play.
- **Intuitive Controls:** Simple, user-friendly interface makes it easy to jump right into the action.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhar174/wordgrid_blitz.git
   cd wordgrid_blitz
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in your browser:**  
   Visit `http://localhost:3000` (or as indicated in your terminal) to play the game locally.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The optimized build will be output in the `dist` or `build` directory.

## Gameplay

- **Goal:** Find and submit as many valid words as you can before time runs out.
- **How to Play:**
  1. Select adjacent letters to form words.
  2. Words must meet the minimum length (usually 3 or more letters).
  3. Submit the word to score points.
  4. Continue finding words until the timer ends.

## Project Structure

```plaintext
/
├── src/             # Main TypeScript source code
│   ├── components/  # UI components
│   ├── utils/       # Utility functions
│   ├── game/        # Game logic
│   └── ...          # Other modules
├── public/          # Static assets and HTML template
├── package.json
├── tsconfig.json
└── ...
```


## Author

- GitHub: [dhar174](https://github.com/dhar174)

---

Enjoy playing WordGrid Blitz and challenge yourself or your friends!
