import 'dotenv/config';
// import handlers from '@/modules';
import serverConfig from '@/config/server';
import loadStaticModules from '@/staticModules';
import app from '@/app';
import { apiGlobalPrefix } from '@/config/api';

const swaggerAutogen = require('@/common/penguin-swagger-autogen/index.js');

async function loadSwagger() {
  const routes = loadStaticModules(app).routes;

  const doc = {
    info: {
      version: '1.0.1',
      title: 'TypeScript API',
      description: 'Documentation automatically generated for PENGUIN TS',
    },
    host: `${serverConfig.host}:${serverConfig.port}`,
    basePath: apiGlobalPrefix,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  };

  const outputFile = './dist/swagger_output.json';

  // const endpointRoutes = handlers().routes;
  const endpointRoutes = loadStaticModules(app).routes;

  // semibasePath: [{ path: '/v1/categories, router: {...} }]
  // const semibasePath = handlers().routers;

  const generation = await swaggerAutogen()(outputFile, endpointRoutes, doc);
  console.log(endpointRoutes);
  if (generation.success) {
    console.log('All routes of application \n', Object.keys(generation.data.paths));
  }
}

loadSwagger();
