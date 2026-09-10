/** Centralised, typed access to the app's Vite env vars (see `.env` / `.env.local`). */

export const APP_NAME = import.meta.env.VITE_APP_NAME as string;
export const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION as string;
export const APP_LANG = (import.meta.env.VITE_APP_LANG as string) || 'en';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
export const CLIENT_ID = import.meta.env.VITE_BACKEND_CLIENT_ID as string;

export const SHAPE_REPOSITORY_URL = import.meta.env.VITE_SHAPE_REPOSITORY_URL as string;

export const ORGANIZATION_NAME = import.meta.env.VITE_ORGANIZATION_NAME as string | undefined;
export const ORGANIZATION_URL = import.meta.env.VITE_ORGANIZATION_URL as string | undefined;

/** When set, the login page offers this single Pod provider instead of the public list. */
export const DEFAULT_POD_PROVIDER = import.meta.env.VITE_POD_PROVIDER_BASE_URL as string | undefined;

export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string | undefined;
