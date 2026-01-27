#!/bin/bash

# Sharon K Varghese Portfolio - Quick Setup Script
# This script automates the setup process for the portfolio

echo "🚀 Sharon K Varghese Portfolio Setup"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Create React App
echo "📦 Creating React application..."
npx create-react-app sharon-portfolio

# Navigate to project directory
cd sharon-portfolio

# Install dependencies
echo "📦 Installing dependencies..."
npm install lucide-react

# Create src directory structure
echo "📁 Setting up project structure..."

# Copy portfolio component to App.js
echo "📄 Setting up portfolio component..."
cat > src/App.js << 'EOF'
// Portfolio component code will be copied here
// Copy the contents of portfolio.jsx to this file
EOF

# Copy index.css
cat > src/index.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Space Grotesk', 'Rajdhani', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #05070f;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #00f5ff, #a855f7);
  border-radius: 5px;
}

::selection {
  background: rgba(0, 245, 255, 0.3);
  color: #fff;
}

*:focus-visible {
  outline: 2px solid #00f5ff;
  outline-offset: 2px;
}
EOF

# Create placeholder for resume
echo "📄 Creating resume placeholder..."
mkdir -p public
touch public/resume.pdf

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the contents of portfolio.jsx to src/App.js"
echo "2. Place your resume.pdf in the public/ folder"
echo "3. Run 'npm start' to start the development server"
echo "4. Visit http://localhost:3000 to view your portfolio"
echo ""
echo "📚 For deployment instructions, see FIREBASE_DEPLOYMENT.md"
echo ""
