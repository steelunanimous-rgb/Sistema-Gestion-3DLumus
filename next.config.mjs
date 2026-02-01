/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        ORACLE_DATABASE_URL: process.env.ORACLE_DATABASE_URL,
        DATABASE_URL: process.env.DATABASE_URL,
    }
};

export default nextConfig;
