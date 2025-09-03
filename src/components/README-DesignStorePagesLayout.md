# DesignStorePagesLayout Component

A reusable layout component that provides a complete design store interface with navigation, editor controls, store branding, and footer.

## Features

- ✅ **PlatformBar**: Top navigation with back button and title
- ✅ **EditorBarDrawer**: Editor toolbar with sidebar and controls
- ✅ **StoreBar**: Store branding with logo and action buttons
- ✅ **Mobile Simulator**: Mobile preview functionality
- ✅ **Footer**: Professional footer component
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **State Management**: Complete state management included
- ✅ **Internationalization**: Multi-language support
- ✅ **Cart & Wishlist**: Shopping cart and wishlist functionality
- ✅ **Authentication**: Sign in/sign up modals
- ✅ **Search**: Product search functionality

## Usage

### Basic Usage

```tsx
import DesignStorePagesLayout from '../components/DesignStorePagesLayout';

const MyPage: React.FC = () => {
  return (
    <DesignStorePagesLayout>
      <div>
        <h1>My Page Content</h1>
        <p>This is my page content wrapped in the layout.</p>
      </div>
    </DesignStorePagesLayout>
  );
};
```

### With Custom Title and Back Button

```tsx
import DesignStorePagesLayout from '../components/DesignStorePagesLayout';

const MyPage: React.FC = () => {
  return (
    <DesignStorePagesLayout 
      title="My Custom Page"
      showBackButton={true}
      backUrl="/design"
    >
      <div>
        <h1>My Page Content</h1>
        <p>This page has a custom title and back button.</p>
      </div>
    </DesignStorePagesLayout>
  );
};
```

### With Custom Back Handler

```tsx
import DesignStorePagesLayout from '../components/DesignStorePagesLayout';
import { useRouter } from 'next/navigation';

const MyPage: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    // Custom back button logic
    router.push('/custom-back-url');
  };

  return (
    <DesignStorePagesLayout 
      title="My Page"
      showBackButton={true}
      onBackClick={handleBackClick}
    >
      <div>
        <h1>My Page Content</h1>
        <p>This page has a custom back button handler.</p>
      </div>
    </DesignStorePagesLayout>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | The content to be rendered inside the layout |
| `title` | `string` | `undefined` | Title to display in the PlatformBar |
| `showBackButton` | `boolean` | `true` | Whether to show the back button |
| `backUrl` | `string` | `'/profile'` | URL to navigate to when back button is clicked |
| `onBackClick` | `() => void` | `undefined` | Custom function to handle back button click |

## Included Components

### PlatformBar
- Fixed top navigation bar
- Back button with custom URL or handler
- Page title display
- Notification and profile buttons

### EditorBarDrawer
- Editor toolbar with action buttons
- Sidebar with store pages navigation
- Logo settings modal
- Language settings modal
- Mobile simulator trigger

### StoreBar
- Store logo with upload functionality
- Action buttons (cart, wishlist, search, language, account)
- Cart drawer with product management
- Wishlist drawer
- Search overlay
- Authentication modals

### Mobile Simulator
- Mobile device frame
- Real store preview in iframe
- Responsive design testing

### Footer
- Professional footer with four columns
- Social media links
- Company information
- Support links
- Responsive design

## State Management

The layout includes complete state management for:

- **Logo Settings**: Shape, size, padding controls
- **Language**: Multi-language support with 10 languages
- **Cart**: Product management with quantity controls
- **Wishlist**: Product wishlist functionality
- **Authentication**: Sign in/sign up state
- **Search**: Product search functionality
- **Sidebar**: Open/close state
- **Modals**: Various modal states

## Styling

The layout uses utility classes for consistent styling:

- `.content-wrapper`: Wraps page content with consistent spacing
- `.page-header`: Styled page headers
- `.page-content`: Styled content containers
- `.fade-in`: Fade-in animation
- `.slide-in-left`: Slide-in animation
- `.scale-in`: Scale-in animation

## Example Pages

### Example Layout Page
Visit `/example-layout` to see a working example of the layout component.

### Design Store Page
The original `/design` page now uses this layout internally.

## Responsive Design

The layout is fully responsive with breakpoints:

- **Desktop**: > 768px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px

## Internationalization

Supports 10 languages:
- English
- Arabic
- French
- German
- Portuguese
- Turkish
- Hindi
- Italian
- Russian
- Japanese

## File Structure

```
src/components/
├── DesignStorePagesLayout.tsx      # Main layout component
├── DesignStorePagesLayout.css      # Layout styles
├── PlatformBar.tsx                 # Top navigation bar
├── EditorBarDrawer.tsx             # Editor toolbar and sidebar
├── StoreBar.tsx                    # Store branding and actions
├── Footer.tsx                      # Footer component
├── MobileSimulator.tsx             # Mobile preview
└── README-DesignStorePagesLayout.md # This documentation
```

## Migration from DesignStorePage

If you're currently using the DesignStorePage component, you can easily migrate to the layout:

### Before
```tsx
// Old way - all logic in one component
const MyPage = () => {
  // All state management here
  return (
    <div className="design-store-page">
      <PlatformBar />
      <EditorBarDrawer />
      <StoreBar />
      <div className="main-content">
        {/* My content */}
      </div>
      <Footer />
    </div>
  );
};
```

### After
```tsx
// New way - clean and reusable
const MyPage = () => {
  return (
    <DesignStorePagesLayout title="My Page">
      {/* My content */}
    </DesignStorePagesLayout>
  );
};
```

## Benefits

1. **Reusability**: Use the same layout across multiple pages
2. **Consistency**: Ensures consistent UI across all pages
3. **Maintainability**: Centralized state management
4. **Performance**: Optimized component structure
5. **Scalability**: Easy to extend and modify
6. **Developer Experience**: Simple API with comprehensive features
