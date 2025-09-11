import pkg from './package.json';

export default {
    expo: {
        name: 'ArcherBC2-Web',
        slug: 'ArcherBC2-Web',
        version: pkg.version, // sync with package.json
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        assetBundlePatterns: ['**/*'],
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },
        plugins: [
            'expo-router',
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor: '#ffffff',
                },
            ],
            'expo-font',
            'expo-web-browser',
        ],
        experiments: {
            typedRoutes: true,
            baseUrl: '/archerbc2-web',
        },
    },
};
