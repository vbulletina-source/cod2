# Script Evaluation Table

A React application for sales call audits with 7 evaluation stages, built with TailwindCSS, shadcn/ui components, and framer-motion animations.

## Features

- **7 Evaluation Stages**: Welcome & Confirmation, Initial Objections, Identification of Needs, Product Presentation, Preparation for Courses, Price & Objection Handling, Completion of Sale
- **Interactive Components**: Checkboxes, dropdowns, text areas, and expandable cards
- **Scoring System**: 1-5 scale scoring for each stage
- **Summary Dashboard**: Total score tracking and completion percentage
- **JSON Export**: Save evaluation data as JSON file
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Expand/collapse animations using framer-motion

## Prerequisites

Before running this project, you need to install Node.js:

### Install Node.js on macOS

1. **Using Homebrew** (recommended):
   ```bash
   # Install Homebrew if you don't have it
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js
   brew install node
   ```

2. **Using the official installer**:
   - Download from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow the instructions

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Usage

1. **Expand Stages**: Click on any stage header to expand and view details
2. **Complete Checklists**: Check off items as they are completed during the call
3. **Add Scores**: Select a score from 1-5 for each stage
4. **Add Comments**: Provide detailed feedback in the comments section
5. **View Summary**: Monitor total score and completion percentage at the bottom
6. **Export Data**: Click "Export to JSON" to save the evaluation

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # React entry point
├── index.css        # Global styles with TailwindCSS
└── lib/
    └── utils.js     # Utility functions
```

## Technologies Used

- **React 18** - Frontend framework
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Component library (custom implementation)
- **framer-motion** - Animation library
- **Vite** - Build tool and development server
- **Lucide React** - Icon library

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.