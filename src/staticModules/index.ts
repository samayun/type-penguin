/**
 * Auto Load module's routes using FileSystem
 */
import fs from 'fs';
import { resolve, join } from 'path';
import { Express, Router } from 'express';

function loadStaticModules(app: Express): {
  routes: any[];
  routers: Router[];
} {
  const routes: any = [];
  const modulePath = resolve(`${__dirname}`);
  const modules = fs.readdirSync(modulePath);

  const routers = modules
    .map((mod: string): Router | void => {
      const routePath = join(modulePath, mod);
      // If only module have routes/index.js means RESTful route
      // otherwise It may be utilities module or GraphQL based modules or other

      if (fs.existsSync(`${routePath}/routes/index.js`)) {
        routes.push(`${routePath}/routes/index.js`);
        return require(`${routePath}/routes/index`).default(app);
      }
    })
    .filter((mod: Router | void): mod is Router => !!mod);

  return {
    routes,
    routers,
  };
}

export default loadStaticModules;
