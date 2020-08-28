const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://ec2-18-219-225-191.us-east-2.compute.amazonaws.com:8080',
			pathRewrite: { '^/api': '/api' },
			headers: { 'X-Forwarded-Prefix': '/' },
			changeOrigin: false
		}),
	)
}
