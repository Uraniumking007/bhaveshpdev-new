# Admin Components Refactoring

## Overview

The Admin component has been refactored from a single 1122-line file into a modular, maintainable component architecture. The refactoring follows React best practices with proper separation of concerns.

## Component Structure

```
src/components/admin/
├── AdminLayout.tsx          # Main layout wrapper with responsive sidebar
├── AdminSidebar.tsx         # Navigation sidebar with save button
├── AdminHeader.tsx          # Mobile header with hamburger menu
├── AdminMain.tsx            # Main content area wrapper
├── SectionHeader.tsx        # Reusable section header with add button
├── EmptyState.tsx           # Empty state component with add CTA
├── ConfirmModal.tsx         # Confirmation modal for destructive actions
├── FormModal.tsx            # Modal wrapper for forms
├── FormInput.tsx            # Text input with icon support
├── FormTextarea.tsx         # Textarea with validation
├── FormSelect.tsx           # Select dropdown
├── FormCheckbox.tsx         # Checkbox with label
├── FormDatePicker.tsx       # Date picker for date inputs
├── types.ts                 # Shared TypeScript types
├── utils/
│   ├── validators.ts        # Form validation utilities
│   └── formatters.ts        # Date/text formatting utilities
├── tabs/
│   ├── ProjectsTab.tsx      # Projects management tab
│   ├── TechnologiesTab.tsx  # Technologies management tab
│   ├── CategoriesTab.tsx    # Categories management tab
│   ├── CertificationsTab.tsx # Certifications management tab
│   └── TimelineTab.tsx      # Timeline management tab
└── index.ts                 # Central export point
```

## Key Features

### 1. Modular Architecture

- **Layout Components**: Separate components for layout, sidebar, header, and main content
- **Form Components**: Reusable form input components with consistent styling
- **Tab Components**: Each tab is isolated in its own file
- **Utility Files**: Shared validators and formatters

### 2. Type Safety

- All components properly typed with TypeScript
- Shared types in `types.ts`
- Prop interfaces for all components
- Type imports using `import type` for better tree-shaking

### 3. Design System

**Colors:**
- Primary: blue-600 to blue-700
- Success: green-600
- Warning/Danger: red-600
- Background: gray-50
- Surface: white
- Border: gray-200
- Text: gray-900, gray-500, gray-400

**Typography:**
- Headers: text-2xl font-bold
- Section titles: text-lg font-semibold
- Body: text-sm
- Labels: text-sm font-medium

**Spacing:**
- Card padding: p-5 or p-6
- Form gaps: gap-4
- Section gaps: gap-4 or gap-6

### 4. Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Collapsible sidebar on mobile
- Touch-friendly button sizes (min 44px)

### 5. Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus indicators (ring-2 ring-blue-500)
- Screen reader support
- Semantic HTML

## Usage

### Basic Usage

```astro
---
import AdminApp from '../components/AdminRefactored';
---

<AdminApp title="Admin - Static Data Editor" client:load />
```

### Using Individual Components

```tsx
import { AdminLayout, AdminSidebar, AdminMain } from '../components/admin';
import { ProjectsTab } from '../components/admin/tabs/ProjectsTab';
import type { TabType } from '../components/admin';

function MyAdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  
  return (
    <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title="Admin">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} {...sidebarProps} />
      <AdminMain title="Admin" {...mainProps}>
        <ProjectsTab {...tabProps} />
      </AdminMain>
    </AdminLayout>
  );
}
```

### Using Form Components

```tsx
import { FormInput, FormTextarea, FormSelect, FormCheckbox, FormDatePicker } from '../components/admin';

function MyForm() {
  const [name, setName] = useState('');
  
  return (
    <div className="space-y-4">
      <FormInput
        label="Project Name"
        value={name}
        onChange={setName}
        placeholder="Enter project name"
        required
      />
      
      <FormTextarea
        label="Description"
        value={description}
        onChange={setDescription}
        rows={3}
      />
      
      <FormSelect
        label="Type"
        value={type}
        onChange={setType}
        options={[
          { value: 'work', label: 'Work' },
          { value: 'education', label: 'Education' }
        ]}
      />
      
      <FormCheckbox
        label="Featured"
        checked={isFeatured}
        onChange={setIsFeatured}
      />
      
      <FormDatePicker
        label="Date"
        value={date}
        onChange={setDate}
      />
    </div>
  );
}
```

### Using Modals

```tsx
import { ConfirmModal, FormModal } from '../components/admin';

function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleDelete = () => {
    // Perform deletion
    setIsOpen(false);
  };
  
  return (
    <ConfirmModal
      isOpen={isOpen}
      title="Delete Project?"
      message="This action cannot be undone."
      onConfirm={handleDelete}
      onCancel={() => setIsOpen(false)}
      variant="danger"
    />
  );
}

function EditModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <FormModal isOpen={isOpen} title="Edit Project" onClose={() => setIsOpen(false)} size="lg">
      <form>
        {/* Form fields */}
      </form>
    </FormModal>
  );
}
```

### Using Utilities

```tsx
import { validators, formatters } from '../components/admin';

function validateEmail(email: string) {
  return validators.required(email) || validators.email(email);
}

function formatDate(dateString: string) {
  return formatters.formatDate(dateString);
}

function formatRelative(dateString: string) {
  return formatters.formatRelativeTime(dateString);
}
```

## Component Props Reference

### AdminLayout

```tsx
interface AdminLayoutProps {
  children: ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  title: string;
}
```

### AdminSidebar

```tsx
interface AdminSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  data: StaticData;
  unsavedChanges: boolean;
  saveStatus: SaveStatus;
  onSave: () => void;
  onCloseMobile?: () => void;
}
```

### FormInput

```tsx
interface FormInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'url' | 'email' | 'number';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
}
```

### FormTextarea

```tsx
interface FormTextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}
```

### FormSelect

```tsx
interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}
```

### FormCheckbox

```tsx
interface FormCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}
```

### FormDatePicker

```tsx
interface FormDatePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}
```

### ConfirmModal

```tsx
interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning';
}
```

### FormModal

```tsx
interface FormModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

## Data Structure

### StaticData

```tsx
type StaticData = {
  projects: Project[];
  technologies: Technology[];
  categories: Category[];
  certifications: Certification[];
  timeline: TimelineItem[];
};
```

### TabType

```tsx
type TabType = 'projects' | 'technologies' | 'categories' | 'certifications' | 'timeline';
```

### SaveStatus

```tsx
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
```

## API Integration

### Fetching Data

```tsx
useEffect(() => {
  fetch('/api/admin/static-data')
    .then(res => res.json())
    .then(setData)
    .finally(() => setLoading(false));
}, []);
```

### Saving Data

```tsx
const handleSave = async () => {
  setSaveStatus('saving');
  try {
    const res = await fetch('/api/admin/static-data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSaveStatus('saved');
      setUnsavedChanges(false);
    } else {
      setSaveStatus('error');
    }
  } catch {
    setSaveStatus('error');
  }
};
```

## Best Practices

1. **Use the refactored components** instead of the original Admin.tsx
2. **Import from index** for cleaner imports: `import { FormInput } from '../components/admin'`
3. **Follow the type system** - all components are properly typed
4. **Use validators** for form validation: `validators.required()`, `validators.email()`, etc.
5. **Use formatters** for displaying dates: `formatters.formatDate()`, `formatters.formatRelativeTime()`
6. **Preserve unsaved changes tracking** - warn before navigation
7. **Use appropriate modal variants** - `danger` for deletion, `warning` for caution
8. **Keep components focused** - each component has a single responsibility
9. **Follow Tailwind design system** - use the specified colors and spacing
10. **Test responsive behavior** - ensure mobile, tablet, and desktop work correctly

## Migration from Original Admin.tsx

### Before

```tsx
// Everything in one file - 1122 lines
export default function Admin({ title }: { title: string }) {
  // All state, logic, and components mixed together
}
```

### After

```tsx
// Modular, maintainable structure
import AdminApp from './AdminRefactored';

export default AdminApp;
```

## Future Enhancements

Potential improvements for future iterations:

1. **Add data table component** with sorting, filtering, and pagination
2. **Add search functionality** across all tabs
3. **Add undo/redo** functionality
4. **Add keyboard shortcuts** for common actions
5. **Add optimistic updates** for better UX
6. **Add drag-and-drop** for reordering
7. **Add bulk actions** (delete multiple, etc.)
8. **Add autosave** with debouncing
9. **Add conflict resolution** for collaborative editing
10. **Add audit log** for tracking changes

## Contributing

When adding new features:

1. Create reusable components in appropriate folders
2. Follow the existing design system
3. Use TypeScript with proper types
4. Add JSDoc comments for public APIs
5. Update this README with new components
6. Test on mobile, tablet, and desktop
7. Ensure accessibility compliance
