/**
 * Auto Load module's routes using FileSystem
 */
import fs from 'fs';
import { resolve, join } from 'path';
import { Router, RequestHandler } from 'express';

export interface IRoutePath {
  path: string;
  router: Router | RequestHandler[];
}

export default () => {
  const routes: any = [];
  const modulePath = resolve(`${__dirname}`);
  const modules = fs.readdirSync(modulePath);

  const routers = modules
    .map((mod: string): IRoutePath | void => {
      const routePath = join(modulePath, mod);
      // If only module have routes/index.js means RESTful route
      // otherwise It may be utilities module or GraphQL based modules or other

      if (fs.existsSync(`${routePath}/routes/index.js`)) {
        routes.push(`${routePath}/routes/index.js`);
        return require(`${routePath}/routes/index`).default();
      }
    })
    .filter((mod: IRoutePath | void): mod is IRoutePath => !!mod);

  return {
    routes,
    routers,
  };
};
