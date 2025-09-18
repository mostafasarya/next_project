# ProductsGrid Component

A reusable component for displaying products in a responsive grid layout with advanced controls.

## Features

- **Responsive Grid Layout**: Auto-fill, fixed columns (1-5), with customizable spacing
- **Drag & Drop Reordering**: Reorder products by dragging
- **Layout Controls**: Desktop/Mobile specific layout controls
- **Product Management**: Add, remove products with callbacks
- **Customizable UI**: Control visibility of buttons, drag handles, etc.
- **Empty States**: Configurable empty state messages and icons

## Basic Usage

```tsx
import ProductsGrid from './ProductsGrid';

const MyPage = () => {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Product Name',
      category: 'Category',
      price: '$29.99',
      beforePrice: '$39.99',
      saveAmount: '$10.00',
      description: 'Product description',
      image: '🎁',
      variants: [
        { type: 'Size', options: ['S', 'M', 'L'] },
        { type: 'Color', options: ['Red', 'Blue'] }
      ]
    }
  ]);

  return (
    <ProductsGrid
      products={products}
      onProductRemove={(id) => setProducts(prev => prev.filter(p => p.id !== id))}
      onProductAdd={() => console.log('Add product')}
      onProductReorder={setProducts}
    />
  );
};
```

## Advanced Usage

```tsx
<ProductsGrid
  products={products}
  onProductRemove={handleRemove}
  onProductAdd={handleAdd}
  onProductReorder={handleReorder}
  
  // Layout Control
  gridLayout={customGridLayout}
  mobileLayout={customMobileLayout}
  onGridLayoutChange={setGridLayout}
  onMobileLayoutChange={setMobileLayout}
  
  // UI Controls
  showAddButton={true}
  showLayoutControl={true}
  showRemoveButtons={true}
  enableDragAndDrop={true}
  
  // Customization
  className="my-custom-grid"
  emptyStateTitle="No items yet"
  emptyStateSubtitle="Add your first item"
  emptyStateIcon="📦"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `products` | `Product[]` | Required | Array of products to display |
| `onProductRemove` | `(id: string) => void` | Optional | Callback when product is removed |
| `onProductAdd` | `() => void` | Optional | Callback when add button is clicked |
| `onProductReorder` | `(products: Product[]) => void` | Optional | Callback when products are reordered |
| `showAddButton` | `boolean` | `true` | Show/hide the add products button |
| `showLayoutControl` | `boolean` | `true` | Show/hide layout control button |
| `showRemoveButtons` | `boolean` | `true` | Show/hide remove buttons on products |
| `enableDragAndDrop` | `boolean` | `true` | Enable/disable drag and drop reordering |
| `gridLayout` | `GridLayout` | Optional | External grid layout state |
| `mobileLayout` | `MobileLayout` | Optional | External mobile layout state |
| `className` | `string` | `''` | Additional CSS class |
| `emptyStateTitle` | `string` | `'No products yet'` | Empty state title |
| `emptyStateSubtitle` | `string` | `'Add products to get started'` | Empty state subtitle |
| `emptyStateIcon` | `string` | `'📦'` | Empty state icon |

## Product Interface

```tsx
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  beforePrice?: string;
  saveAmount?: string;
  description: string;
  image: string;
  variants?: Array<{
    type: string;
    options: string[];
  }>;
}
```

## Usage Examples

### Simple Product List
```tsx
<ProductsGrid
  products={products}
  showLayoutControl={false}
  enableDragAndDrop={false}
/>
```

### Admin Panel with Full Controls
```tsx
<ProductsGrid
  products={products}
  onProductRemove={handleDelete}
  onProductAdd={openProductSelector}
  onProductReorder={saveNewOrder}
  showAddButton={true}
  showLayoutControl={true}
  showRemoveButtons={true}
  enableDragAndDrop={true}
/>
```

### Read-Only Display
```tsx
<ProductsGrid
  products={products}
  showAddButton={false}
  showLayoutControl={false}
  showRemoveButtons={false}
  enableDragAndDrop={false}
  emptyStateTitle="No products available"
  emptyStateIcon="🛍️"
/>
```
