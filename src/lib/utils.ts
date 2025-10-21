// Lightweight utility to merge class names without external deps
export type ClassValue = string | number | null | false | undefined | ClassDictionary | ClassArray;
interface ClassDictionary {
  [id: string]: any;
}
interface ClassArray extends Array<ClassValue> {}

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  const toVal = (mix: ClassValue): void => {
    if (!mix) return;
    if (typeof mix === "string" || typeof mix === "number") {
      classes.push(String(mix));
      return;
    }
    if (Array.isArray(mix)) {
      mix.forEach(toVal);
      return;
    }
    if (typeof mix === "object") {
      for (const k in mix as ClassDictionary) {
        if ((mix as ClassDictionary)[k]) classes.push(k);
      }
    }
  };
  inputs.forEach(toVal);
  return classes.join(" ");
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Scroll to element with smooth behavior
 */
export function scrollToElement(elementId: string): void {
  if (typeof document === "undefined") return;
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    return false;
  }
}

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

/**
 * Check if the code is running on the client side
 */
export const isClient = typeof window !== "undefined";

/**
 * Get the current theme preference
 */
export function getThemePreference(): "light" | "dark" | "system" {
  if (!isClient) return "system";

  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Set theme preference
 */
export function setThemePreference(theme: "light" | "dark" | "system"): void {
  if (!isClient) return;

  localStorage.setItem("theme", theme);

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    document.documentElement.classList.toggle("dark", systemTheme === "dark");
  } else {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }
}
