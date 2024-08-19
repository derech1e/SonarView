/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
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
    }
}

module.exports = nextConfig
