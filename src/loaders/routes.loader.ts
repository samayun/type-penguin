import loadAppModules from '@/modules';
import { Request, Response, NextFunction, Express } from 'express';

export const apiGlobalPrefix = '/api';

const routes = [
  {
    name: 'RongTV RestFul routes',
    type: 'module',
    prefix: apiGlobalPrefix,
    handler: loadAppModules,
  },

  {
    name: 'Home Route',
    path: '/',
    handler: (req: Request, res: Response) => {
      res.status(200).json({ message: 'All is well 🐧' });
    },
  },
  /**
   * 404 handler.
   */

  {
    name: 'Endpoint Not Found',
    path: '*',
    handler: (_: Request, response: Response, next: NextFunction) => {
      response.json({
        succcess: false,
        message: 'Endpoint Not Found',
      });
    },
  },
];

export default (app: Express): void => {
  routes.forEach((route) => {
    if (route.path === '/') {
      // root route
      app.get(route.path, route.handler);
    } else if (route.type === 'module') {
      // modular routes
      const { routers } = route.handler();

      routers.forEach(({ path, router }) => {
        app.use(route.prefix + path, router);
      });
    } else {
      // error handlers
      app.use(route.handler);
    }
  });
};
