module.exports = (ctx) => ({
	plugins: {
		'postcss-preset-env': { stage: 0 },
		'cssnano': ctx.env === 'production' ? { autoprefixer: false } : false
	}
})
