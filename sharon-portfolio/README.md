# Sharon K Varghese - Premium Portfolio

A high-end, futuristic React.js portfolio website designed for FAANG-grade software engineering roles.

## 🎯 Features

- **Premium Futuristic Design**: Dark-mode-first cyber-minimal aesthetic with neon accents
- **Interactive 3D Background**: Canvas-based particle system with connection effects
- **Custom Cursor**: Magnetic cursor effects with glow trail
- **Smooth Animations**: Scroll-triggered reveals, hover effects, and micro-interactions
- **Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Performance Optimized**: Lightweight, fast-loading, accessibility-focused
- **Resume Download**: Frontend-only PDF download functionality

## 🚀 Tech Stack

- React.js (single-component architecture)
- Lucide React Icons
- CSS3 Animations
- Canvas API for background effects
- No external UI libraries (pure React + CSS)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm installed

### Steps

1. **Create React App**
```bash
npx create-react-app sharon-portfolio
cd sharon-portfolio
```

2. **Install Dependencies**
```bash
npm install lucide-react
```

3. **Replace App.js**
- Copy the contents of `portfolio.jsx` to `src/App.js`

4. **Update src/index.css**
```css
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
```

5. **Add Resume PDF**
- Place your `resume.pdf` file in the `public/` folder
- Rename it exactly as `resume.pdf` for the download feature to work

6. **Run Development Server**
```bash
npm start
```

Visit `http://localhost:3000` to see your portfolio.

## 🎨 Customization

### Colors
The color palette is defined in the component styles:
- Primary Neon (Cyan): `#00f5ff`
- Secondary Neon (Violet): `#a855f7`
- Accent (Green): `#22c55e`
- Background: `#05070f`
- Surface: `#0b0f1a`

### Fonts
Currently using:
- Space Grotesk (primary)
- Rajdhani (secondary)

To change fonts, update the Google Fonts import in the component's style block.

### Content
All personal information is defined in the component's data structures:
- Skills array
- Experience array
- Projects array
- Education array

Simply modify these arrays to update content.

## 🌐 Deployment

### Firebase Hosting (Recommended)

1. **Build the project**
```bash
npm run build
```

2. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

3. **Login to Firebase**
```bash
firebase login
```

4. **Initialize Firebase**
```bash
firebase init hosting
```

Select:
- Use existing project or create new one
- Public directory: `build`
- Single-page app: `Yes`
- GitHub deploys: `No`

5. **Deploy**
```bash
firebase deploy
```

### Alternative Deployment Options

**Netlify**
```bash
npm run build
# Drag and drop the 'build' folder to netlify.com
```

**Vercel**
```bash
npm run build
npx vercel --prod
```

**GitHub Pages**
1. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/portfolio"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add scripts to `package.json`:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

4. Deploy:
```bash
npm run deploy
```

## ⚡ Performance Optimization

The portfolio is built with performance in mind:

- **Lazy Loading**: Heavy assets load on demand
- **Optimized Animations**: CSS-based animations for better performance
- **Minimal Bundle**: Single-component architecture reduces bundle size
- **Canvas Optimization**: Particle system with efficient rendering
- **Responsive Images**: Properly sized assets for different viewports

### Expected Lighthouse Scores
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All sections use CSS Grid with `repeat(auto-fit, minmax())` for automatic responsiveness.

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 File Structure

```
sharon-portfolio/
├── public/
│   ├── index.html
│   ├── resume.pdf          # Your resume file
│   └── favicon.ico
├── src/
│   ├── App.js              # Main portfolio component
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔧 Troubleshooting

**Resume Download Not Working?**
- Ensure `resume.pdf` is in the `public/` folder
- Check browser console for errors
- Verify file name is exactly `resume.pdf` (case-sensitive)

**Animations Laggy?**
- Reduce particle count in ThreeBackground component (line 32)
- Disable cursor trail on mobile devices
- Check browser hardware acceleration is enabled

**Custom Cursor Not Showing?**
- The cursor is hidden on touch devices by default
- Ensure JavaScript is enabled
- Check for CSS conflicts with `cursor: none`

## 🎨 Design Philosophy

This portfolio follows these principles:

1. **Futuristic Aesthetic**: Cyber-minimal with controlled neon accents
2. **Performance First**: Fast loading, smooth interactions
3. **Content Hierarchy**: Clear visual flow guiding the user
4. **Professional Polish**: Attention to spacing, typography, and details
5. **Memorable Experience**: Unique interactions that stand out

## 📞 Support

For questions or issues:
- Email: sharonvarghese935@gmail.com
- GitHub: [@sh46on](https://github.com/sh46on)
- LinkedIn: [Sharon Varghese](https://www.linkedin.com/in/sharon-varghese-38ba58325/)

## 📝 License

This portfolio template is open-source and free to use for personal projects.

---

**Built with precision. Designed for impact. Coded for performance.**