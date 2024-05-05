/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    APP_NAME: string;
    FULL_NAME: string;
    DOMAIN_NAME: string;
    BRANCH_NAME: string;
    ORIGIN: string;

    ADMIN: string;

    SESSION_SECRET: string;
    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
    ACCESS_TOKEN_DURATION: string;

    // PWD_HASH: string;

    POSTGRES_DB: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_ENDPOINT: string;

    DATABASE_URL: string;

    CLOUDFLARE_SITE_KEY: string;
    CLOUDFLARE_SECRET_KEY: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    // GOOGLE_REDIRECT_URL: string;

    FACEBOOK_CLIENT_ID: string;
  }
}
