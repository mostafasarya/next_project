# HomePageCard Component

A reusable white card component that provides a consistent layout structure for content pages. This component extends from the store bar to the footer and maintains the same horizontal padding as the StoreBar component.

## Features

- ✅ **Consistent Layout**: Matches StoreBar horizontal padding and positioning
- ✅ **Responsive Design**: Adapts to different screen sizes and sidebar states
- ✅ **Flexible Content**: Accepts any React children or shows optional placeholder
- ✅ **Dynamic Spacing**: Adjusts margins based on store bar padding settings
- ✅ **Reusable**: Can be used across multiple pages for consistent design
- ✅ **Customizable**: Supports custom styling, className, and inline styles

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `undefined` | Content to display inside the card |
| `verticalPadding` | `number` | `16` | Vertical padding from store bar (affects margin-top) |
| `horizontalPadding` | `number` | `16` | Horizontal padding to match store bar layout |
| `showLogoSettings` | `boolean` | `false` | Whether logo settings sidebar is open (affects margin-left) |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | `{}` | Additional inline styles |
| `minHeight` | `string` | `'calc(100vh - 200px)'` | Minimum height of the card |
| `showPlaceholder` | `boolean` | `false` | Show placeholder content when no children |
| `placeholderTitle` | `string` | `'Homepage Content'` | Title for placeholder content |
| `placeholderDescription` | `string` | Default description | Description for placeholder content |

## Usage Examples

### Basic Usage with Custom Content

```tsx
import HomePageCard from '../components/HomePageCard';

const MyPage: React.FC = () => {
  return (
    <HomePageCard>
      <div>
        <h1>My Custom Content</h1>
        <p>This content will be displayed inside the white card.</p>
      </div>
    </HomePageCard>
  );
};
```

### With Store Bar Integration

```tsx
import HomePageCard from '../components/HomePageCard';

const MyStorePage: React.FC = () => {
  const [verticalPadding, setVerticalPadding] = useState(16);
  const [horizontalPadding, setHorizontalPadding] = useState(16);
  const [showLogoSettings, setShowLogoSettings] = useState(false);

  return (
    <HomePageCard
      verticalPadding={verticalPadding}
      horizontalPadding={horizontalPadding}
      showLogoSettings={showLogoSettings}
    >
      <div className="my-store-content">
        <h1>Welcome to My Store</h1>
        <p>Store content here...</p>
      </div>
    </HomePageCard>
  );
};
```

### With Placeholder Content

```tsx
import HomePageCard from '../components/HomePageCard';

const EmptyPage: React.FC = () => {
  return (
    <HomePageCard
      showPlaceholder={true}
      placeholderTitle="Page Under Construction"
      placeholderDescription="This page is currently being built. Check back soon!"
    />
  );
};
```

### With Custom Styling

```tsx
import HomePageCard from '../components/HomePageCard';

const CustomStyledPage: React.FC = () => {
  return (
    <HomePageCard
      className="my-custom-card"
      style={{ 
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
      minHeight="500px"
    >
      <div>Custom styled content</div>
    </HomePageCard>
  );
};
```

## CSS Classes

The component provides several utility classes for content styling:

### Layout Classes
- `.content-section` - Standard section spacing (32px bottom margin)
- `.text-center` - Center align text
- `.text-left` - Left align text  
- `.text-right` - Right align text

### Spacing Classes
- `.mb-16`, `.mb-24`, `.mb-32` - Bottom margins
- `.mt-16`, `.mt-24`, `.mt-32` - Top margins

### Usage
```tsx
<HomePageCard>
  <div className="content-section text-center">
    <h1 className="mb-24">Welcome</h1>
    <p className="mb-16">Description text</p>
  </div>
</HomePageCard>
```

## Responsive Behavior

The component automatically adjusts for different screen sizes:

- **Desktop**: Respects sidebar margins and full horizontal padding
- **Mobile**: Removes left margin and reduces padding to 16px
- **Typography**: Scales down placeholder text on mobile devices

## Integration with Other Components

This component is designed to work seamlessly with:

- **StoreBar**: Matches horizontal padding and positioning
- **EditorBarDrawer**: Responds to logo settings sidebar state
- **PlatformBar**: Positions correctly below the platform bar
- **Footer**: Extends properly to the footer without overlapping

## File Structure

```
src/components/
├── HomePageCard.tsx          # Main component
├── HomePageCard.css          # Component styles
└── README-HomePageCard.md    # This documentation
```

## Migration from Direct Implementation

If you have existing white card implementations, you can easily migrate:

### Before
```tsx
<div 
  className="homepage-white-card"
  style={{
    marginTop: `${60 + (verticalPadding * 2)}px`,
    marginLeft: showLogoSettings ? '300px' : '0',
    // ... more styles
  }}
>
  <div className="homepage-card-content">
    {/* content */}
  </div>
</div>
```

### After
```tsx
<HomePageCard
  verticalPadding={verticalPadding}
  showLogoSettings={showLogoSettings}
>
  {/* content */}
</HomePageCard>
```

## Best Practices

1. **Consistent Spacing**: Always pass the same `verticalPadding` and `horizontalPadding` used in your StoreBar
2. **Sidebar Awareness**: Pass `showLogoSettings` state to ensure proper margin adjustment
3. **Content Organization**: Use the provided utility classes for consistent spacing
4. **Mobile Optimization**: Test your content at different screen sizes
5. **Accessibility**: Ensure your content inside the card follows accessibility guidelines

## Examples in the Codebase

- **StoreHomePage**: Uses HomePageCard with placeholder content
- Perfect template for implementing in other pages that need consistent layout
