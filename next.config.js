/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.externals.push({
            "bufferutil": "bufferutil",
            "utf-8-validate": "utf-8-validate",
        });

        return config;
    },
    logging: {
        fetches: {
            fullUrl: true,
        }
    },
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    }
}

module.exports = nextConfig
