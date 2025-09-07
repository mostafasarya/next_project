# System Control Assets Documentation

## Overview

The System Control Assets page is a comprehensive showcase and control center for all system UI components used throughout the online store application. This page serves as both design system documentation and a live control panel for global styling.

## Features

### 🎛️ Master Controls
- **Icon Size Control**: Dynamically adjusts the size of all system control icons globally
- **Typography System**: Controls font family, size, weight, line height, and letter spacing across the entire application
- **Real-time Preview**: Live updates as you adjust controls

### 🎨 Component Showcase
- **System Icons**: 12 core system control icons with consistent theming
- **Interactive Controls**: Toggle switches, range inputs, tab systems, alignment controls
- **System Drawer**: Reusable drawer component with comprehensive controls
- **Drag & Drop**: Functional drag and drop demonstrations

### 📱 Responsive Design
- Mobile-first approach with responsive breakpoints
- Touch-friendly controls for mobile devices
- Adaptive layouts for different screen sizes

## Technical Implementation

### Architecture
- **React Functional Component**: Uses hooks for state management
- **CSS Custom Properties**: Global theming via CSS variables
- **TypeScript**: Full type safety and IntelliSense support
- **React Icons**: Consistent iconography using Heroicons library

### State Management
```typescript
// Typography System State
const [fontFamily, setFontFamily] = useState('system-ui');
const [fontSize, setFontSize] = useState(14);
const [fontWeight, setFontWeight] = useState(400);
const [lineHeight, setLineHeight] = useState(1.5);
const [letterSpacing, setLetterSpacing] = useState(0);
const [headingFontSize, setHeadingFontSize] = useState(24);
const [headingFontWeight, setHeadingFontWeight] = useState(600);

// Icon Size Control State
const [iconSize, setIconSize] = useState(48);
```

### Global CSS Variables
The component applies changes to CSS custom properties on the document root:

```css
:root {
  --font-family-base: 'system-ui';
  --font-size-base: '14px';
  --font-weight-base: '400';
  --line-height-base: '1.5';
  --letter-spacing-base: '0px';
  --font-size-heading: '24px';
  --font-weight-heading: '600';
  --icon-size-dynamic: '48px';
}
```

## Component Structure

### 1. Page Header
- Navigation back button
- Page title and description
- Clear visual hierarchy

### 2. Master Icon Size Control
- Prominent blue-themed container
- Range input with live value display
- Descriptive help text

### 3. System Icons Grid
- 12 core system control icons
- Consistent red theme
- Hover and active states
- Responsive grid layout

### 4. Interactive Controls Section
- Input range demonstrations
- Toggle switch examples
- Grid/scroll tab system
- Alignment controls

### 5. Typography System
- Font family selector
- Range controls for all typography properties
- Live preview samples
- Facebook-inspired design system

### 6. System Drawer Demo
- Reusable drawer component showcase
- Comprehensive control examples
- Push content effect on desktop
- Mobile-responsive behavior

### 7. Usage Guidelines
- Design principles
- Color palette
- Size variants
- State demonstrations

## CSS Architecture

### File Structure
```
SystemControlAssets.css
├── Root Variables & Initialization
├── Icon Size Control Section
├── Page Header Styles
├── Assets Sections
├── Icons Grid
├── Interactive Controls
├── Typography System Styles
├── System Buttons
├── Guidelines Section
└── Responsive Design
```

### Naming Convention
- BEM-like methodology for maintainability
- Semantic class names for clarity
- Consistent spacing and organization

### Key Features
- CSS custom properties for dynamic theming
- Mobile-first responsive design
- Accessibility-focused styling
- Clean, modern aesthetic

## Usage Examples

### Using System Control Icons
```tsx
import { HiCamera, HiPlus, HiCog } from 'react-icons/hi';

// Basic usage
<button className="system-control-icon camera">
  <HiCamera />
</button>

// With size variants
<button className="system-control-icon settings small">
  <HiCog />
</button>
```

### Typography Integration
```css
/* Global typography variables are automatically applied */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-heading);
  font-size: var(--font-size-heading);
}

p, span, div, label, input, button, select {
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-base);
  line-height: var(--line-height-base);
}
```

### System Drawer Usage
```tsx
import SystemDrawer from '../../components/SystemDrawer';

<SystemDrawer
  isOpen={showDrawer}
  onClose={() => setShowDrawer(false)}
  title="Control Panel"
  width={350}
  position="left"
  pushContent={true}
>
  {/* Drawer content */}
</SystemDrawer>
```

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **CSS Custom Properties**: Full support in modern browsers
- **React Icons**: Compatible with all modern React versions
- **Responsive Design**: Mobile-first approach with progressive enhancement

## Performance Considerations

- **CSS Custom Properties**: Efficient global theming without re-renders
- **React Icons**: Optimized SVG icons with tree-shaking support
- **Responsive Images**: Optimized loading for different screen sizes
- **State Management**: Efficient state updates with minimal re-renders

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all controls
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Clear focus indicators for all interactive elements

## Development Guidelines

### Adding New Icons
1. Import from `react-icons/hi`
2. Add to the icons grid with proper documentation
3. Use consistent `system-control-icon` class
4. Follow the established naming convention

### Extending Typography System
1. Add new state variables
2. Update the useEffect hook
3. Apply CSS custom properties
4. Update the control UI
5. Test across different components

### Customizing Styles
1. Modify CSS custom properties for global changes
2. Use component-specific classes for local changes
3. Maintain responsive design principles
4. Test across different screen sizes

## Troubleshooting

### Common Issues
- **Icons not displaying**: Check react-icons import and class names
- **Typography not applying**: Verify CSS custom properties are set
- **Responsive issues**: Check mobile breakpoints and viewport meta tag
- **Performance**: Monitor CSS custom property usage and state updates

### Debug Tools
- Browser DevTools for CSS custom properties inspection
- React DevTools for state management debugging
- Lighthouse for performance and accessibility auditing

## Contributing

1. Follow the established code style and documentation standards
2. Test changes across different screen sizes and browsers
3. Update documentation for any new features or changes
4. Ensure accessibility compliance for all new components

## License

This component is part of the online store application and follows the project's licensing terms.

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Maintainer**: System Design Team
