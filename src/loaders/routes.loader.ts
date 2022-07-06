import { apiGlobalPrefix } from '@/config/api';
import loadAppModules, { IRoutePath } from '@/modules';
import { Request, Response, NextFunction, Express } from 'express';

type RouteType = {
  name: string;
  type?: string;
  path?: string;
  prefix?: string;
  handler: IRoutePath | any;
};

const routes: RouteType[] = [
  {
    name: 'RestFul routes',
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
    } else if (route.type === 'static') {
      // static module's routes
      route.handler(app);
    } else if (route.type === 'module') {
      // modular routes
      const { routers } = route.handler();

      routers.forEach((router: any) => {
        if (route.prefix) {
          app.use(`${route.prefix}${router.path}`, router.router);
        } else {
          app.use(router.path, router.router);
        }
      });
    } else {
      // error handlers
      app.use(route.handler);
    }
  });
};
