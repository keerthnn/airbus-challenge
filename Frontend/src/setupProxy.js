const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://airbus-challenge.vercel.app',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove /api from the path
            },
        })
    );
};
