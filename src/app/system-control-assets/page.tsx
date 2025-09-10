/**
 * ==========================================================================
 * SYSTEM CONTROL ASSETS PAGE
 * ==========================================================================
 * 
 * A comprehensive showcase and control center for all system UI components
 * used throughout the online store application. This page serves as both
 * a design system documentation and a live control panel for global styling.
 * 
 * FEATURES:
 * - Dynamic icon size control affecting all system icons globally
 * - Typography system controls (font family, size, weight, spacing)
 * - Interactive component demonstrations (toggles, ranges, tabs)
 * - Reusable SystemDrawer component showcase
 * - Drag & drop functionality examples
 * - Live preview of all system controls
 * 
 * TECHNICAL IMPLEMENTATION:
 * - Uses CSS custom properties for global theming
 * - React state management for all interactive controls
 * - useEffect hooks to apply changes to document root
 * - Responsive design with mobile-first approach
 * - Integration with react-icons library for consistency
 * 
 * @author System Design Team
 * @version 1.0.0
 * @since 2024
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SystemDrawer from '../../components/SystemDrawer';
import StyleTextUser from '../../components/StyleTextUser';
import StyleButton, { ButtonStyles, defaultButtonStyles } from '../../components/StyleButton';
import StyledButton from '../../components/StyledButton';
import ProductContainerDisplay from '../../components/ProductContainerDisplay';
import './SystemControlAssets.css';

// React Icons imports - Heroicons library for consistent iconography
import { 
  HiCamera,           // Camera icon for image uploads
  HiPlus,             // Add/create new items
  HiX,                // Delete/remove items (X icon)
  HiCog,              // Settings/configuration
  HiPencil,           // Edit/modify content
  HiViewGrid,         // Grid layout view
  HiDocumentText,     // Text content
  HiViewGridAdd,      // Add grid items
  HiSelector,         // Drag and drop selection
  HiLink,             // Link/URL connections
  HiTrash as HiOutlineTrash, // Alternative trash icon
  HiTrash,            // Trash icon for delete actions
  HiRefresh,          // Refresh/reload content
  HiViewList,         // List view layout
  HiMenu,             // Menu/hamburger icon
  HiChevronDown,      // Dropdown/collapsible indicator
  HiArrowsExpand,     // Dimensions/resize control
  HiEye,              // Visibility/show-hide control
  HiViewBoards,       // Card/board control layout
  HiArrowLeft,        // Left arrow navigation
  HiArrowRight        // Right arrow navigation
} from 'react-icons/hi';
import { TbCircleLetterB } from 'react-icons/tb';

/**
 * SystemControlAssets Component
 * 
 * Main component that renders the system control assets page with all
 * interactive controls and demonstrations.
 * 
 * @returns {JSX.Element} The complete system control assets page
 */
const SystemControlAssets: React.FC = () => {
  const router = useRouter();
  
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // Interactive Control States
  const [toggleState, setToggleState] = useState(false);                    // Main toggle switch state
  const [rangeValue, setRangeValue] = useState(50);                         // Main range input value
  const [activeTab, setActiveTab] = useState('grid');                       // Active tab selection
  const [activeAlignment, setActiveAlignment] = useState('left');            // Text alignment selection
  const [draggedItem, setDraggedItem] = useState<string | null>(null);       // Drag & drop state
  
  // System Drawer States
  const [showDrawer, setShowDrawer] = useState(false);                       // Drawer visibility
  const [drawerRangeValue, setDrawerRangeValue] = useState(75);              // Drawer range input
  const [opacityValue, setOpacityValue] = useState(85);                     // Opacity control
  const [scaleValue, setScaleValue] = useState(120);                        // Scale control
  const [radiusValue, setRadiusValue] = useState(12);                       // Border radius control
  const [spacingValue, setSpacingValue] = useState(16);                     // Spacing control
  const [drawerToggle, setDrawerToggle] = useState(false);                  // Drawer toggle switch
  const [drawerGridTab, setDrawerGridTab] = useState('grid');               // Drawer grid tab
  const [drawerAlignment, setDrawerAlignment] = useState('left');            // Drawer alignment
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);            // Collapsible section
  const [collapsibleRange, setCollapsibleRange] = useState(50);             // Collapsible range
  const [dropdownValue, setDropdownValue] = useState('option1');           // Dropdown selection
  const [textFieldValue, setTextFieldValue] = useState('');                 // Text input value
  const [tabsValue, setTabsValue] = useState('tab1');                      // Custom tabs
  const [topRangeValue, setTopRangeValue] = useState(60);                   // Top range control

  // Typography System State - Controls global typography across the app
  const [fontFamily, setFontFamily] = useState('system-ui');                // Font family selection
  const [fontSize, setFontSize] = useState(14);                             // Base font size (px)
  const [fontWeight, setFontWeight] = useState(400);                       // Base font weight
  const [lineHeight, setLineHeight] = useState(1.5);                       // Line height multiplier
  const [letterSpacing, setLetterSpacing] = useState(0);                    // Letter spacing (px)
  const [headingFontSize, setHeadingFontSize] = useState(24);              // Heading font size (px)
  const [headingFontWeight, setHeadingFontWeight] = useState(600);         // Heading font weight

  // Icon Size Control State - Controls all system icons globally
  const [iconSize, setIconSize] = useState(48);                             // Default icon size (px)

  // Color Palette State - Controls color theme across the application
  const [selectedColorTheme, setSelectedColorTheme] = useState('red');      // Selected color theme
  const [customColor, setCustomColor] = useState('#ef4444');               // Custom color picker value
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);          // Color palette drawer state
  
  // Simple Text Control state
  const [simpleTextValue, setSimpleTextValue] = useState('Sample Text');
  const [simpleTextStyles, setSimpleTextStyles] = useState({
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#374151',
    fontWeight: '400',
    bottomSpacing: 8,
    isBold: false,
    textAlign: 'left'
  });

  // StyleButton Demo state
  const [showStyleButtonEditor, setShowStyleButtonEditor] = useState(false);
  const [demoButtonStyles, setDemoButtonStyles] = useState<ButtonStyles>({
    ...defaultButtonStyles,
    text: 'DEMO BUTTON',
    linkType: 'custom-url',
    customUrl: 'https://example.com',
    openInNewTab: false
  });

  // Color Palette Definitions - Predefined color themes
  const colorThemes = {
    red: { primary: '#ef4444', light: '#fef2f2', dark: '#dc2626', name: 'Red' },
    blue: { primary: '#3b82f6', light: '#eff6ff', dark: '#1d4ed8', name: 'Blue' },
    green: { primary: '#10b981', light: '#ecfdf5', dark: '#059669', name: 'Green' },
    purple: { primary: '#8b5cf6', light: '#f3e8ff', dark: '#7c3aed', name: 'Purple' },
    orange: { primary: '#f97316', light: '#fff7ed', dark: '#ea580c', name: 'Orange' },
    pink: { primary: '#ec4899', light: '#fdf2f8', dark: '#db2777', name: 'Pink' }
  };

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  // Color Palette Handlers
  const handleColorThemeChange = (theme: string) => {
    setSelectedColorTheme(theme);
    const themeColors = colorThemes[theme as keyof typeof colorThemes];
    if (themeColors) {
      setCustomColor(themeColors.primary);
      // Apply color theme to CSS custom properties
      document.documentElement.style.setProperty('--system-primary-color', themeColors.primary);
      document.documentElement.style.setProperty('--system-light-color', themeColors.light);
      document.documentElement.style.setProperty('--system-dark-color', themeColors.dark);
    }
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    // Apply custom color to CSS custom properties
    document.documentElement.style.setProperty('--system-primary-color', color);
    // Generate light and dark variants
    const lightColor = lightenColor(color, 0.9);
    const darkColor = darkenColor(color, 0.2);
    document.documentElement.style.setProperty('--system-light-color', lightColor);
    document.documentElement.style.setProperty('--system-dark-color', darkColor);
  };

  const toggleColorPalette = () => {
    setColorPaletteOpen(!colorPaletteOpen);
  };

  // Color utility functions
  const lightenColor = (color: string, factor: number): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.min(255, Math.floor(r + (255 - r) * factor));
    const newG = Math.min(255, Math.floor(g + (255 - g) * factor));
    const newB = Math.min(255, Math.floor(b + (255 - b) * factor));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };

  const darkenColor = (color: string, factor: number): string => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const newR = Math.max(0, Math.floor(r * (1 - factor)));
    const newG = Math.max(0, Math.floor(g * (1 - factor)));
    const newB = Math.max(0, Math.floor(b * (1 - factor)));
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  };
  
  /**
   * Handles drag start event for drag & drop functionality
   * @param {string} item - The item being dragged
   */
  const handleDragStart = (item: string) => {
    setDraggedItem(item);
  };

  /**
   * Handles drag end event for drag & drop functionality
   */
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // ==========================================================================
  // EFFECTS - GLOBAL STYLING CONTROL
  // ==========================================================================
  
  /**
   * Typography System Effect
   * 
   * Applies typography settings to CSS custom properties on the document root.
   * These variables control typography across the entire application.
   * 
   * Variables Applied:
   * - --font-family-base: Font family for all text elements
   * - --font-size-base: Base font size for body text
   * - --font-weight-base: Base font weight for body text
   * - --line-height-base: Line height multiplier
   * - --letter-spacing-base: Letter spacing in pixels
   * - --font-size-heading: Font size for headings
   * - --font-weight-heading: Font weight for headings
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--font-family-base', fontFamily);
      root.style.setProperty('--font-size-base', `${fontSize}px`);
      root.style.setProperty('--font-weight-base', fontWeight.toString());
      root.style.setProperty('--line-height-base', lineHeight.toString());
      root.style.setProperty('--letter-spacing-base', `${letterSpacing}px`);
      root.style.setProperty('--font-size-heading', `${headingFontSize}px`);
      root.style.setProperty('--font-weight-heading', headingFontWeight.toString());
    }
  }, [fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, headingFontSize, headingFontWeight]);

  /**
   * Icon Size Control Effect
   * 
   * Applies icon size settings to CSS custom properties on the document root.
   * This variable controls the size of all system control icons globally.
   * 
   * Variables Applied:
   * - --icon-size-dynamic: Base size for all system control icons
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--icon-size-dynamic', `${iconSize}px`);
    }
  }, [iconSize]);

  /**
   * Color Palette Effect
   * 
   * Initializes the color theme on component mount and applies
   * the selected color theme to CSS custom properties.
   */
  useEffect(() => {
    const themeColors = colorThemes[selectedColorTheme as keyof typeof colorThemes];
    if (themeColors) {
      document.documentElement.style.setProperty('--system-primary-color', themeColors.primary);
      document.documentElement.style.setProperty('--system-light-color', themeColors.light);
      document.documentElement.style.setProperty('--system-dark-color', themeColors.dark);
    }
  }, [selectedColorTheme]);

  // ==========================================================================
  // RENDER
  // ==========================================================================
  
  return (
    <div className="system-control-assets-page">
      {/* ======================================================================
           PAGE HEADER
           ====================================================================== */}
      <div className="page-header">
        <button className="back-btn" onClick={() => router.push('/design')}>
          <span className="back-icon">←</span>
          Back to Design
        </button>
        <h1 className="page-title">System Control Assets</h1>
        <p className="page-subtitle">
          Comprehensive showcase and control center for all system UI components. 
          This page serves as both design system documentation and live control panel 
          for global styling across the application.
        </p>
      </div>

      {/* ======================================================================
           CONTROL ICONS SECTION
           ====================================================================== */}
      <div className="assets-section">
        {/* Master Icon Size Control - Controls all system icons globally */}
        <div className="icon-size-control">
          <h3 className="control-title">Master Icon Size Control</h3>
          <div className="size-control-container">
            <label className="size-control-label">
              Global Icon Size
              <span className="size-control-value">{iconSize}px</span>
            </label>
            <input
              type="range"
              min="24"
              max="120"
              value={iconSize}
              onChange={(e) => setIconSize(parseInt(e.target.value))}
              className="size-control-range"
            />
            <div className="size-control-info">
              <span className="size-info-text">
                Master control that dynamically adjusts the size of all system control icons 
                across the entire application. Changes are applied globally via CSS custom properties.
              </span>
            </div>
          </div>
        </div>

        {/* System Icons Grid - 12 Core System Control Icons */}
        <div className="icons-grid">
          {/* Camera Icon - Used for image uploads and photo capture */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon camera">
                <HiCamera />
              </button>
            </div>
            <span className="icon-label">Camera</span>
          </div>

          {/* Add Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon add">
                <HiPlus />
              </button>
            </div>
            <span className="icon-label">Add</span>
          </div>

          {/* Delete Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon delete">
                <HiX />
              </button>
            </div>
            <span className="icon-label">Delete</span>
          </div>

          {/* Settings Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon settings">
                <HiCog />
              </button>
            </div>
            <span className="icon-label">Settings</span>
          </div>

          {/* Edit Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon edit">
                <HiPencil />
              </button>
            </div>
            <span className="icon-label">Edit</span>
          </div>

          {/* Layout Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon layout">
                <HiViewGrid />
              </button>
            </div>
            <span className="icon-label">Layout</span>
          </div>

          {/* Add Text Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon add-text">
                <HiDocumentText />
              </button>
            </div>
            <span className="icon-label">Add Text</span>
          </div>

          {/* Add Button Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon add-button">
                <TbCircleLetterB />
              </button>
            </div>
            <span className="icon-label">Add Button</span>
          </div>

          {/* Drag and Drop Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon drag-drop">
                <HiSelector />
              </button>
            </div>
            <span className="icon-label">Drag & Drop</span>
          </div>

          {/* Link Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon link">
                <HiLink />
              </button>
            </div>
            <span className="icon-label">Link</span>
          </div>

          {/* Trash Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon trash">
                <HiOutlineTrash />
              </button>
            </div>
            <span className="icon-label">Trash</span>
          </div>

          {/* Flip Icon */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon flip">
                <HiRefresh />
              </button>
            </div>
            <span className="icon-label">Flip</span>
          </div>

          {/* Dimensions Icon - Controls sizing and dimensions */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon dimensions">
                <HiArrowsExpand />
              </button>
            </div>
            <span className="icon-label">Dimensions</span>
          </div>

          {/* Color Control Icon - Controls colors and themes */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon color-control">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {/* Color palette circle */}
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                  {/* Color dots/swatches */}
                  <circle cx="8" cy="8" r="2" fill="#ef4444"/>
                  <circle cx="16" cy="8" r="2" fill="#3b82f6"/>
                  <circle cx="8" cy="16" r="2" fill="#10b981"/>
                  <circle cx="16" cy="16" r="2" fill="#f59e0b"/>
                  {/* Center color picker indicator */}
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <span className="icon-label">Color Control</span>
          </div>

          {/* Visibility Control Icon - Controls what to show and hide */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon visibility">
                <HiEye />
              </button>
            </div>
            <span className="icon-label">Visibility</span>
          </div>

          {/* Card Control Icon - Controls card layouts and arrangements */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon card-control">
                <HiViewBoards />
              </button>
            </div>
            <span className="icon-label">Card Control</span>
          </div>

          {/* Left Arrow Icon - Navigation and back functionality */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon left-arrow">
                <HiArrowLeft />
              </button>
            </div>
            <span className="icon-label">Left Arrow</span>
          </div>

          {/* Right Arrow Icon - Navigation and forward functionality */}
          <div className="icon-item">
            <div className="icon-container">
              <button className="system-control-icon right-arrow">
                <HiArrowRight />
              </button>
            </div>
            <span className="icon-label">Right Arrow</span>
          </div>
        </div>
      </div>

      {/* ======================================================================
           INTERACTIVE CONTROLS SECTION
           ====================================================================== */}
      <div className="assets-section">
        <h2 className="section-title">Interactive Controls</h2>
        <p className="section-description">
          Demonstration of interactive UI components used throughout the application. 
          These controls showcase the design system's interactive elements with 
          consistent styling and behavior patterns.
        </p>
        
        {/* Input Range */}
        <div className="control-group">
          <h3 className="control-title">Input Range</h3>
          <div className="control-demo">
            <div className="range-container">
              <label className="range-label">Value: {rangeValue}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={rangeValue}
                onChange={(e) => setRangeValue(parseInt(e.target.value))}
                className="system-range"
              />
              <div className="range-markers">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="control-group">
          <h3 className="control-title">Toggle Switch</h3>
          <div className="control-demo">
            <div className="toggle-container">
              <label className="toggle-label">
                <span>Enable Feature</span>
                <div 
                  className={`system-toggle ${toggleState ? 'active' : ''}`}
                  onClick={() => setToggleState(!toggleState)}
                >
                  <div className="toggle-slider"></div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Grid/Scroll Tabs */}
        <div className="control-group">
          <h3 className="control-title">Grid/Scroll Tabs</h3>
          <div className="control-demo">
            <div className="tab-container">
              <button 
                className={`system-tab ${activeTab === 'grid' ? 'active' : ''}`}
                onClick={() => setActiveTab('grid')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
                </svg>
                Grid View
              </button>
              <button 
                className={`system-tab ${activeTab === 'scroll' ? 'active' : ''}`}
                onClick={() => setActiveTab('scroll')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                </svg>
                Scroll View
              </button>
            </div>
          </div>
        </div>

        {/* Alignment Tabs */}
        <div className="control-group">
          <h3 className="control-title">Alignment Controls</h3>
          <div className="control-demo">
            <div className="alignment-tabs">
              <button 
                className={`alignment-tab ${activeAlignment === 'left' ? 'active' : ''}`}
                onClick={() => setActiveAlignment('left')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 19h18v2H3v-2zm0-6h12v2H3v-2zm0-6h18v2H3v-2zm0-6h12v2H3v-2z"/>
                </svg>
                Left
              </button>
              <button 
                className={`alignment-tab ${activeAlignment === 'center' ? 'active' : ''}`}
                onClick={() => setActiveAlignment('center')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 19h18v2H3v-2zm3-6h12v2H6v-2zm-3-6h18v2H3v-2zm3-6h12v2H6v-2z"/>
                </svg>
                Center
              </button>
              <button 
                className={`alignment-tab ${activeAlignment === 'right' ? 'active' : ''}`}
                onClick={() => setActiveAlignment('right')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 19h18v2H3v-2zm6-6h12v2H9v-2zm-6-6h18v2H3v-2zm6-6h12v2H9v-2z"/>
                </svg>
                Right
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drag and Drop Demo Section */}
      <div className="assets-section">
        <h2 className="section-title">Drag & Drop Components</h2>
        <div className="drag-drop-demo">
          <div className="drag-area">
            <h4>Draggable Items</h4>
            <div className="draggable-items">
              {['Item 1', 'Item 2', 'Item 3'].map((item) => (
                <div
                  key={item}
                  className={`draggable-item ${draggedItem === item ? 'dragging' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragEnd={handleDragEnd}
                >
                  <span className="drag-handle">⋮⋮</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="drop-area">
            <h4>Drop Zone</h4>
            <div className="drop-zone">
              Drop items here
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================
           SYSTEM DRAWER & TYPOGRAPHY SECTION
           ====================================================================== */}
      <div className="assets-section">
        <h2 className="section-title">System Drawer & Typography</h2>
        <p className="section-description">
          Advanced control systems including the reusable SystemDrawer component 
          and comprehensive typography management. These systems provide global 
          control over the application's visual design.
        </p>
        
        {/* Typography System Controls - Master Typography Management */}
        <div className="control-group typography-system">
          <h3 className="control-title">Master Typography System</h3>
          <p className="control-description">
            Master typography controls that affect all text elements across the website. 
            Inspired by Facebook's design system with responsive font scaling. Changes 
            are applied globally via CSS custom properties and affect all components 
            including SystemDrawer and EditorBarDrawer (while preserving white text color).
          </p>
          
          <div className="typography-controls">
            {/* Font Family */}
            <div className="typography-control-group">
              <label className="typography-label">Font Family</label>
              <select 
                value={fontFamily} 
                onChange={(e) => setFontFamily(e.target.value)}
                className="typography-select"
              >
                <option value="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">System UI (Facebook-like)</option>
                <option value="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">Apple System</option>
                <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica</option>
                <option value="'Inter', sans-serif">Inter</option>
                <option value="'SF Pro Display', -apple-system, sans-serif">SF Pro Display</option>
              </select>
            </div>

            {/* Base Font Size */}
            <div className="typography-control-group">
              <label className="typography-label">
                Base Font Size
                <span className="typography-value">{fontSize}px</span>
              </label>
              <input
                type="range"
                min="12"
                max="18"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="typography-range"
              />
            </div>

            {/* Font Weight */}
            <div className="typography-control-group">
              <label className="typography-label">
                Font Weight
                <span className="typography-value">{fontWeight}</span>
              </label>
              <input
                type="range"
                min="300"
                max="700"
                step="100"
                value={fontWeight}
                onChange={(e) => setFontWeight(parseInt(e.target.value))}
                className="typography-range"
              />
            </div>

            {/* Line Height */}
            <div className="typography-control-group">
              <label className="typography-label">
                Line Height
                <span className="typography-value">{lineHeight}</span>
              </label>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                className="typography-range"
              />
            </div>

            {/* Letter Spacing */}
            <div className="typography-control-group">
              <label className="typography-label">
                Letter Spacing
                <span className="typography-value">{letterSpacing}px</span>
              </label>
              <input
                type="range"
                min="-1"
                max="2"
                step="0.1"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                className="typography-range"
              />
            </div>

            {/* Heading Font Size */}
            <div className="typography-control-group">
              <label className="typography-label">
                Heading Font Size
                <span className="typography-value">{headingFontSize}px</span>
              </label>
              <input
                type="range"
                min="18"
                max="32"
                value={headingFontSize}
                onChange={(e) => setHeadingFontSize(parseInt(e.target.value))}
                className="typography-range"
              />
            </div>

            {/* Heading Font Weight */}
            <div className="typography-control-group">
              <label className="typography-label">
                Heading Font Weight
                <span className="typography-value">{headingFontWeight}</span>
              </label>
              <input
                type="range"
                min="400"
                max="800"
                step="100"
                value={headingFontWeight}
                onChange={(e) => setHeadingFontWeight(parseInt(e.target.value))}
                className="typography-range"
              />
            </div>
          </div>

          {/* Typography Samples */}
          <div className="typography-samples">
            <h4 className="sample-title">Live Typography Preview</h4>
            <div className="typography-sample-grid">
              <div className="typography-sample">
                <h1 className="sample-heading">Main Heading</h1>
                <h2 className="sample-subheading">Subheading Text</h2>
                <p className="sample-body">
                  This is body text that demonstrates the current typography settings. 
                  It will update in real-time as you adjust the controls above. This text 
                  represents how content will appear across the website.
                </p>
                <p className="sample-small">Small text for secondary information and captions.</p>
              </div>
              <div className="typography-sample">
                <h2 className="sample-heading">Facebook-Style Typography</h2>
                <p className="sample-body">
                  Clean, readable typography optimized for both desktop and mobile experiences. 
                  These settings affect all text across the website including buttons, forms, and content.
                </p>
                <button className="sample-button">Sample Button Text</button>
                <div className="sample-form">
                  <input type="text" placeholder="Sample input field" className="sample-input" />
                </div>
              </div>
            </div>
          </div>
        </div>

         {/* Color Palette System - Master Color Theme Management */}
         <div className="control-group color-palette-system">
           <div className="color-palette-controls">
             {/* Custom Color Picker */}
             <div className="custom-color-control">
               <label className="color-label">Custom Color</label>
               <div className="custom-color-input-group">
                 <input
                   type="color"
                   value={customColor}
                   onChange={(e) => handleCustomColorChange(e.target.value)}
                   className="color-picker-input"
                   title="Choose custom color"
                 />
                 <input
                   type="text"
                   value={customColor}
                   onChange={(e) => handleCustomColorChange(e.target.value)}
                   className="color-hex-input"
                   placeholder="#ef4444"
                   maxLength={7}
                 />
               </div>
             </div>

           </div>
         </div>

        <div className="control-group">
          <h3 className="control-title">Reusable Drawer Component</h3>
          <div className="control-demo">
            <button 
              className="system-btn primary"
              onClick={() => setShowDrawer(true)}
            >
              <HiMenu />
              Open Drawer Demo
            </button>
          </div>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '14px', marginTop: '12px' }}>
            Click to see the reusable drawer component with sample content
          </p>
        </div>

        {/* StyleTextUser Control Component */}
        <div className="control-group">
          <h3 className="control-title">StyleTextUser Control</h3>
          <div className="control-demo">
            <div className="styletextuser-demo">
              <h4 className="demo-subtitle">Reusable Text Input with Style Controls</h4>
              <p className="demo-description">
                A comprehensive text input component with integrated style editor. 
                Click the edit icon to open the style drawer and customize font properties.
              </p>
              <StyleTextUser
                value={simpleTextValue}
                onChange={setSimpleTextValue}
                styles={simpleTextStyles}
                onStylesChange={setSimpleTextStyles}
                placeholder="Enter your text here..."
                className="demo-text-control"
              />
              <div className="demo-info">
                <p><strong>Features:</strong></p>
                <ul>
                  <li>Real-time text editing</li>
                  <li>Font size, family, color, and weight controls</li>
                  <li>Text alignment options</li>
                  <li>Bold toggle</li>
                  <li>Bottom spacing control</li>
                  <li>Reusable across different components</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Styles Section */}
      <div className="assets-section">
        <h2 className="section-title">System Buttons</h2>
        <div className="buttons-grid">
          <button className="system-btn primary">Primary Button</button>
          <button className="system-btn secondary">Secondary Button</button>
          <button className="system-btn outline">Outline Button</button>
          <button className="system-btn primary">
            <HiPlus />
            Icon Button
          </button>
          <button className="system-btn primary small">Small Button</button>
        </div>
      </div>

      {/* Product Container Display Component */}
      <div className="assets-section">
        <h2 className="section-title">Product Container Display Component</h2>
        
        <div className="control-group">
          <h3 className="control-title">Unified Product Card</h3>
          <div className="control-demo">
            <div className="product-container-display-demo">
              <h4 className="demo-subtitle">Complete Product Display in Single Card</h4>
              
              <ProductContainerDisplay className="demo-product-display" />
              
              <div className="demo-info">
                <p><strong>Component Specifications:</strong></p>
                <ul>
                  <li><strong>Parent Container:</strong> 475px width with single unified card</li>
                  <li><strong>Image Section:</strong> Full width with 457px height</li>
                  <li><strong>Details Section:</strong> Complete product information below image</li>
                  <li><strong>Default Text:</strong> 14px font size throughout</li>
                  <li><strong>Product Elements:</strong> Name, price, reviews, descriptions, sizes, quantity, add to cart</li>
                  <li><strong>Size Variants:</strong> Selectable sizes with availability status</li>
                  <li><strong>Quantity Counter:</strong> Plus/minus controls with validation</li>
                  <li><strong>Unified Design:</strong> Single card with image and details merged seamlessly</li>
                  <li><strong>Clean Layout:</strong> Organized vertical flow from image to details</li>
                  <li><strong>Responsive Design:</strong> Adapts to mobile screens while maintaining proportions</li>
                </ul>
              </div>

              <div className="demo-code-example">
                <h4>Usage Example:</h4>
                <pre className="code-block">
{`import ProductContainerDisplay from './ProductContainerDisplay';

// Basic usage
<ProductContainerDisplay />

// With custom className
<ProductContainerDisplay className="custom-display" />

// Component Features:
// - Single unified card design (475px width)
// - Image section: Full width at 457px height
// - Details section: Complete product information
// - 14px default text size for all elements
// - Clean vertical layout flow
// - Size selection and quantity management
// - Responsive mobile adaptation`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* StyleButton Component Demo */}
      <div className="assets-section">
        <h2 className="section-title">StyleButton Component</h2>
        <p className="section-description">
          Advanced reusable button styling component with comprehensive controls for text, icons, 
          backgrounds, borders, dimensions, hover effects, and link functionality. This component 
          can be integrated into any part of the application.
        </p>
        
        <div className="control-group">
          <h3 className="control-title">Interactive Button Demo</h3>
          <div className="control-demo">
            <div className="stylebutton-demo">
              <h4 className="demo-subtitle">Customizable Button with Full Styling Controls</h4>
              <p className="demo-description">
                Click the "Open StyleButton Editor" to access comprehensive styling controls including 
                button types, text/icon options, backgrounds, borders, dimensions, hover effects, and link functionality.
              </p>
              
              {/* Demo Button Container */}
              <div className="demo-button-container">
                <div 
                  className="demo-button-wrapper"
                  style={{
                    display: 'flex',
                    justifyContent: demoButtonStyles.alignment === 'center' ? 'center' : 
                                   demoButtonStyles.alignment === 'right' ? 'flex-end' : 'flex-start',
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    border: '2px dashed #e5e7eb'
                  }}
                >
                  <StyledButton
                    styles={demoButtonStyles}
                    onClick={() => {
                      if (demoButtonStyles.linkType === 'custom-url' && demoButtonStyles.customUrl) {
                        if (demoButtonStyles.openInNewTab) {
                          window.open(demoButtonStyles.customUrl, '_blank');
                        } else {
                          window.location.href = demoButtonStyles.customUrl;
                        }
                      } else {
                        alert(`Button clicked! Action: ${demoButtonStyles.linkType}`);
                      }
                    }}
                    className="demo-styled-button"
                  />
                </div>
              </div>

              {/* StyleButton Editor Trigger */}
              <div className="demo-controls">
                <button 
                  className="system-btn primary"
                  onClick={() => setShowStyleButtonEditor(true)}
                >
                  <HiPencil />
                  Open StyleButton Editor
                </button>
              </div>

              {/* Feature List */}
              <div className="demo-info">
                <p><strong>StyleButton Features:</strong></p>
                <ul>
                  <li><strong>Button Types:</strong> Text only, Icon only, Text & Icon</li>
                  <li><strong>20+ Icons:</strong> Cart, Heart, Arrows, User, Settings, etc. with size & color control</li>
                  <li><strong>Text Controls:</strong> Font size, family, color, weight, bold toggle</li>
                  <li><strong>Background:</strong> Solid colors or gradients with direction control</li>
                  <li><strong>Border:</strong> Width, color, style (solid, dashed, dotted)</li>
                  <li><strong>Dimensions:</strong> Height, width options, border radius, alignment</li>
                  <li><strong>Hover Effects:</strong> Background and text color changes with transition</li>
                  <li><strong>Link Actions:</strong> Add to cart, wishlist, or navigate to pages</li>
                  <li><strong>Search Integration:</strong> Find products, collections, catalogs by name/ID</li>
                  <li><strong>Reusable:</strong> Import and use in any component</li>
                </ul>
              </div>

              {/* Usage Example */}
              <div className="demo-code-example">
                <h4>Usage Example:</h4>
                <pre className="code-block">
{`import StyleButton, { ButtonStyles, defaultButtonStyles, createButtonStyles } from './StyleButton';
import StyledButton from './StyledButton';

// Option 1: Use elegant defaults
const [buttonStyles, setButtonStyles] = useState<ButtonStyles>(defaultButtonStyles);

// Option 2: Override specific properties
const [customStyles, setCustomStyles] = useState<ButtonStyles>(
  createButtonStyles({
    text: 'Buy Now',
    iconType: 'heart',
    backgroundColor: '#3b82f6'
  })
);

// Use the styling controls
<StyleButton
  isOpen={showEditor}
  onClose={() => setShowEditor(false)}
  buttonStyles={buttonStyles}
  onStylesChange={setButtonStyles}
  title="Button Editor"
/>

// Render the styled button
<StyledButton styles={buttonStyles} onClick={handleClick} />`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="assets-section">
        <h2 className="section-title">Usage Guidelines</h2>
        <div className="guidelines-content">
          <div className="guideline-item">
            <h4>Clean Design</h4>
            <p>All system controls use a clean, minimal design with subtle colors and smooth interactions.</p>
            <div className="color-palette">
              <div className="color-swatch primary-red" title="Primary: #ef4444"></div>
              <div className="color-swatch light-red" title="Light: #fef2f2"></div>
              <div className="color-swatch dark-red" title="Dark: #dc2626"></div>
            </div>
          </div>
          
          <div className="guideline-item">
            <h4>Icon Size</h4>
            <p>Icons scale dynamically based on the master size control. This shows the small variant.</p>
            <div className="size-demo">
              <button className="system-control-icon camera small">
                <HiCamera />
              </button>
            </div>
          </div>

          <div className="guideline-item">
            <h4>States</h4>
            <p>All controls support normal, hover, active, and disabled states with subtle visual feedback.</p>
            <div className="states-demo">
              <button className="system-control-icon settings">
                <HiCog />
              </button>
              <button className="system-control-icon settings hover">
                <HiCog />
              </button>
              <button className="system-control-icon settings active">
                <HiCog />
              </button>
              <button className="system-control-icon settings" disabled>
                <HiCog />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Drawer Demo */}
              <SystemDrawer
          isOpen={showDrawer}
          onClose={() => setShowDrawer(false)}
          title="Drawer Demo"
          width={350}
          position="left"
          pushContent={true}
        >
        {/* Top Range Input */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Primary Control</h4>
          <div className="drawer-range-container">
            <div className="drawer-range-label">
              <span>Main Value</span>
              <span className="drawer-range-value">{topRangeValue}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={topRangeValue}
              onChange={(e) => setTopRangeValue(parseInt(e.target.value))}
              className="drawer-range"
            />
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Toggle Switch</h4>
          <div className="drawer-form-group">
            <label className="toggle-label">
              <span>Enable Feature</span>
              <div 
                className={`system-control-toggle ${drawerToggle ? 'active' : ''}`}
                onClick={() => setDrawerToggle(!drawerToggle)}
              >
                <div className="toggle-slider"></div>
              </div>
            </label>
          </div>
        </div>

        {/* Grid Tabs */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Grid Layout</h4>
          <div className="system-control-tabs">
            <button 
              className={`system-control-tab ${drawerGridTab === 'grid' ? 'active' : ''}`}
              onClick={() => setDrawerGridTab('grid')}
            >
              <HiViewGrid />
              Grid
            </button>
            <button 
              className={`system-control-tab ${drawerGridTab === 'list' ? 'active' : ''}`}
              onClick={() => setDrawerGridTab('list')}
            >
              <HiViewList />
              List
            </button>
          </div>
        </div>

        {/* Alignment Control */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Text Alignment</h4>
          <div className="alignment-tabs">
            <button 
              className={`alignment-tab ${drawerAlignment === 'left' ? 'active' : ''}`}
              onClick={() => setDrawerAlignment('left')}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>⊣</span>
              Left
            </button>
            <button 
              className={`alignment-tab ${drawerAlignment === 'center' ? 'active' : ''}`}
              onClick={() => setDrawerAlignment('center')}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>⊢⊣</span>
              Center
            </button>
            <button 
              className={`alignment-tab ${drawerAlignment === 'right' ? 'active' : ''}`}
              onClick={() => setDrawerAlignment('right')}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>⊢</span>
              Right
            </button>
          </div>
        </div>

        {/* Collapsible Tab with Range */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Advanced Settings</h4>
          <div className="collapsible-container">
            <button 
              className={`collapsible-header ${collapsibleOpen ? 'open' : ''}`}
              onClick={() => setCollapsibleOpen(!collapsibleOpen)}
            >
              <span>Advanced Options</span>
              <HiChevronDown className="collapsible-icon" />
            </button>
            {collapsibleOpen && (
              <div className="collapsible-content">
                <div className="drawer-range-container">
                  <div className="drawer-range-label">
                    <span>Advanced Setting</span>
                    <span className="drawer-range-value">{collapsibleRange}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={collapsibleRange}
                    onChange={(e) => setCollapsibleRange(parseInt(e.target.value))}
                    className="drawer-range"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dropdown List */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Dropdown Selection</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Choose Option</label>
            <select 
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              className="drawer-form-select"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        </div>

        {/* Text Field */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Text Input</h4>
          <div className="drawer-form-group">
            <label className="drawer-form-label">Enter Text</label>
            <input 
              type="text" 
              className="drawer-form-input" 
              placeholder="Type something..."
              value={textFieldValue}
              onChange={(e) => setTextFieldValue(e.target.value)}
            />
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="drawer-section">
          <h4 className="drawer-section-title">Tab Selection</h4>
          <div className="custom-tabs">
            <button 
              className={`custom-tab ${tabsValue === 'tab1' ? 'active' : ''}`}
              onClick={() => setTabsValue('tab1')}
            >
              Tab 1
            </button>
            <button 
              className={`custom-tab ${tabsValue === 'tab2' ? 'active' : ''}`}
              onClick={() => setTabsValue('tab2')}
            >
              Tab 2
            </button>
            <button 
              className={`custom-tab ${tabsValue === 'tab3' ? 'active' : ''}`}
              onClick={() => setTabsValue('tab3')}
            >
              Tab 3
            </button>
          </div>
        </div>
      </SystemDrawer>

      {/* StyleButton Component Demo */}
      <StyleButton
        isOpen={showStyleButtonEditor}
        onClose={() => setShowStyleButtonEditor(false)}
        buttonStyles={demoButtonStyles}
        onStylesChange={setDemoButtonStyles}
        title="StyleButton Demo Editor"
        width={450}
        position="right"
      />
    </div>
  );
};

/**
 * ==========================================================================
 * EXPORT
 * ==========================================================================
 * 
 * Default export of the SystemControlAssets component.
 * This component serves as the main entry point for the system control assets page.
 * 
 * @exports SystemControlAssets - Main component for system control assets showcase
 */
export default SystemControlAssets;