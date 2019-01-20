module.exports = {
    pwa: {
        workboxOptions: {
            include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/, /\.ico$/,],
            runtimeCaching: [
                {
                    urlPattern: new RegExp('/favicon.ico'),
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'icons'
                    },
                },
                {
                    urlPattern: new RegExp('^https://api\.flickr\.com'),
                    handler: 'networkFirst',
                    options: {
                        networkTimeoutSeconds: 20,
                        cacheName: 'api-cache',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: new RegExp('.*\.(png|jpg|jpeg|gif)'),
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'flickr-images',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                        cacheExpiration: { maxEntries: 1000, maxAgeSeconds: 12 * 60 * 60 }
                    }
                },
                {
                    urlPattern: new RegExp('^https://stackpath\.bootstrapcdn\.com/'),
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'bootstrap',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: new RegExp('^https://code\.jquery\.com/'),
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'jquery',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                }
            ]
        }
    }
}