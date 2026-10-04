export {};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "consent" | "config" | "js" | string,
      target: string,
      params?: Record<string, unknown> | unknown
    ) => void;
  }
}