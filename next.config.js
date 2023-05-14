/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.externals.push({
            "bufferutil": "bufferutil",
            "utf-8-validate": "utf-8-validate",
        });

        return config;
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
