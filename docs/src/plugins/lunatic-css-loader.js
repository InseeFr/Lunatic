/**
 * Custom plugin to handle Lunatic specificities
 */
export default async function lunaticCssLoader() {
	return {
		configureWebpack(config, isServer, utils, content) {
			return {
				module: {
					// Lunatic uses sass imports "./*.scss"
					rules: [
						{
							test: /\.s[ac]ss$/i,
							use: ['style-loader', 'css-loader', 'sass-loader'],
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
