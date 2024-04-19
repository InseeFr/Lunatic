/**
 * Custom plugin to handle Lunatic specificities
 */
export default async function lunaticFixes() {
    return {
        name: 'fix-lunatic-plugin',
        configureWebpack() {
            return {
                resolve: {
                    // antlr4 use node modules, this avoid errors
                    fallback: {
                        fs: false,
                        os: false,
                        path: false,
                    },
                },
            };
        },
    };
}
