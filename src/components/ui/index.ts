// Explicit lowercase imports to avoid case sensitivity conflicts
// Fixed: Use named exports instead of default exports for shadcn/ui components
export { Button, buttonVariants } from './button';
export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './card';
// Note: Input component doesn't exist, removed invalid import

// Additional shadcn/ui components with named exports
export { Alert, AlertDescription, AlertTitle } from './alert';
export { Badge, badgeVariants } from './badge';
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
export { Progress } from './progress';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

// Custom UI components (these may use default exports)
export { default as ExerciseRenderer } from './ExerciseRenderer';
export { default as ImageModal } from './ImageModal';