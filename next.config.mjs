/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    USERNAME: "samsul",
    PASSWORD: "mhl@123@2019",
    BASE_TOKEN_URL: "https://devldtax.mysoftheaven.com/api/token",
    BASE_URL: "https://devldtax.mysoftheaven.com",
    PAYMENT_BASE_URL: "https://dakhila-v2.limslrb.com",
    BASE_URL_V1: "https://ldtv2dev.apimanager.mysoftheaven.com/api/v1",
    BASE_URL_V1_BASE: "https://ldtv2dev.apimanager.mysoftheaven.com",
    BASE_PAYMENT_URL: "https://devldtax.mysoftheaven.com/paymentapi",
    // LDTAX_PORTAL_BASE: "http://localhost:3001",
    LDTAX_PORTAL_BASE: "https://manage-service.bangla.gov.bd",
    PORTAL_API: "https://devldtax-portal-admin-api.mysoftheaven.com/api",
    PORTAL_ASSET: "https://devldtax-portal-admin-api.mysoftheaven.com",
    LSG_PORTAL_API: "https://lsg-portal-api.mysoftheaven.com",
    // production url
    SSO_URL: "https://dev-bangla-dashboard.mysoftheaven.com",
    // dev url
    // SSO_URL: "http://localhost/bangla-text-backend",
    // dev url
    // SSO_LIVE_URL: "https://dev-bangla-dashboard.mysoftheaven.com",
    // SSO_CLIENT_ID: "3",
    // SSO_SECRET: "24MPgD51le3rUJ9hVlvXFLqm4mgk1dL17cE4Pl3r",
    // production url
    SSO_LIVE_URL: "https://dev-bangla-dashboard.mysoftheaven.com",
    SSO_CLIENT_ID: "3",
    SSO_SECRET: "nQJtqS6y5dsfX8lb3lTzxE0yc5Ekc6ke8NXf9xeG",
    SSO_AUTHORIZE_URL: "http://127.0.0.1:8080/oauth/authorize?",
    SSO_REDIRECT_URI: "http://localhost:3001",
    SSO_TOKEN_URL: "http://127.0.0.1:8080/oauth/token",
    LOGIN_URL: "/sso",
    OFFICE_URL: "https://ldtv2dev.mysoftheaven.com",
    OFFICE_LOGIN_URL: "http://ldtv2dev.mysoftheaven.com/login",
    ORG_API_URL: "https://ldtaxorgapi.mysoftheaven.com/api",
    ORG_USERNAME: "LdtaxOrg1",
    ORG_PASSWORD: "api@ldtaxOrg@2024",
    CHATBOT_URL: "http://127.0.0.1:5000/chat",
    REDIS_URL:
      "redis://default:AcLbAAIjcDEzNjFiZDNlYjdhYjU0ZGQ1OWZhZTUzN2MwZjNkMmVhY3AxMA@magical-mongoose-49883.upstash.io:6379",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-bangla-dashboard.mysoftheaven.com", // Corrected the hostname
        port: "", // No need to specify port if it's the default (80 for HTTP or 443 for HTTPS)
      },
      {
        protocol: "https",
        hostname: "dev-bangla-dashboard.mysoftheaven.comnull", // Corrected the hostname
        port: "", // No need to specify port if it's the default (80 for HTTP or 443 for HTTPS)
      },
      {
        protocol: "https",
        hostname: "dev-bangla-dashboard.mysoftheaven.comundefined", // Corrected the hostname
        port: "", // No need to specify port if it's the default (80 for HTTP or 443 for HTTPS)
      },
    ],
  },
};

export default nextConfig;
