declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production"

    readonly NUXT_TIGRIS_ACCESS_KEY_ID: string
    readonly NUXT_TIGRIS_ENDPOINT: string
    readonly NUXT_TIGRIS_REGION: string
    readonly NUXT_TIGRIS_SECRET_ACCESS_KEY: string
    readonly NUXT_TIGRIS_BUCKET: string
    readonly NUXT_PUBLIC_TIGRIS_BUCKET: string
    readonly NUXT_PUBLIC_TIGRIS_ENDPOINT: string

    readonly NUXT_KINDE_CLIENT_ID: string
    readonly NUXT_KINDE_CLIENT_SECRET: string
    readonly NUXT_KINDE_AUTH_DOMAIN: string
    readonly NUXT_KINDE_REDIRECT_URL: string
    readonly NUXT_KINDE_LOGOUT_REDIRECT_URL: string
    readonly NUXT_KINDE_POST_LOGIN_REDIRECT_URL: string
    readonly NUXT_KINDE_PASSWORD: string

    readonly NUXT_PUBLIC_SITE_URL: string

    readonly NUXT_TURSO_URL: string
    readonly NUXT_TURSO_AUTH_TOKEN: string
  }
}

interface ImportMetaEnv {
  readonly NODE_ENV: "development" | "production"

  readonly NUXT_TIGRIS_ACCESS_KEY_ID: string
  readonly NUXT_TIGRIS_ENDPOINT: string
  readonly NUXT_TIGRIS_REGION: string
  readonly NUXT_TIGRIS_SECRET_ACCESS_KEY: string
  readonly NUXT_TIGRIS_BUCKET: string
  readonly NUXT_PUBLIC_TIGRIS_BUCKET: string
  readonly NUXT_PUBLIC_TIGRIS_ENDPOINT: string

  readonly NUXT_KINDE_CLIENT_ID: string
  readonly NUXT_KINDE_CLIENT_SECRET: string
  readonly NUXT_KINDE_AUTH_DOMAIN: string
  readonly NUXT_KINDE_REDIRECT_URL: string
  readonly NUXT_KINDE_LOGOUT_REDIRECT_URL: string
  readonly NUXT_KINDE_POST_LOGIN_REDIRECT_URL: string
  readonly NUXT_KINDE_PASSWORD: string

  readonly NUXT_PUBLIC_SITE_URL: string

  readonly NUXT_TURSO_URL: string
  readonly NUXT_TURSO_AUTH_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
