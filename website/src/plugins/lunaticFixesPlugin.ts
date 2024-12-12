/**
 * Custom plugin to handle Lunatic specificities
 */
export default async function lunaticFixes() {
    return {
        name: 'fix-lunatic-plugin',
        configureWebpack() {
            return {
                module: {
                    rules: [
                        {
                            test: /\.m?js$/,
                            resolve: {
                                // Webpack expect fully qualified name (extension included) when importing ES module, remove this behaviour
                                fullySpecified: false,
                            },
                        },
                    ],
                },
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
