import express from 'express';

/**
 * app instance initialization
 */
const app = express();

/**
 * load all application routes from loaders directory
 * routeLoader is a function takes app instance as argument
 * And bind all routes to app instance using filesystem import
 */

import loadApplicationRoute from '@/loaders/routes.loader';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

const options = {
  explorer: true,
  info: {
    version: '1.0.1',
    title: 'RONG API',
    description: 'Documentation automatically generated for RongTV.',
  },
  host: `localhost:5001`,
  basePath: '/api',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],

  // customCss: '.swagger-ui .topbar { display: none }',
};

app.use('/swagger', (req, res) => {
  res.json({
    swaggerDocument,
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

loadApplicationRoute(app);

export default app;
