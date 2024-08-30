import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: Application) {
  app.use(
    '',
    createProxyMiddleware({
      target: 'https://www.medocpharm.com',
      changeOrigin: true,
      secure: false,
    })
  );
}
