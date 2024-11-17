/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOTPRESS_TOKEN: string;
  readonly VITE_BOTPRESS_BOT_ID: string;
  readonly VITE_BOTPRESS_WORKSPACE_ID: string;
  readonly VITE_ADMIN_EMAIL: string;
  readonly VITE_MASTER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
