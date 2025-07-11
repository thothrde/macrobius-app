// Simple className utility function
import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Fallback if clsx is not available
export function cnFallback(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

// Use fallback if clsx fails
try {
  // Test if clsx is available
  clsx('test')
} catch {
  // If clsx fails, replace cn with fallback
  module.exports = { cn: cnFallback }
}