import { Express, Request, Response, NextFunction, Router } from 'express';

export default (routes: Express) => {
  const router = Router();
  routes.use('/v1/settings', router);

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json({
        error: false,
        message: 'settings retrieved successfully',
        result: [
          {
            id: 1,
            name: 'Settings 1',
            description: 'Settings 1 description',
            created_at: '2020-01-01',
            updated_at: '2020-01-01',
          },
          {
            id: 2,
            name: 'Settings 2',
            description: 'Settings 2 description',
            created_at: '2020-01-01',
            updated_at: '2020-01-01',
          },
        ],
      });
    } catch (error: any) {
      next(new Error(error.message));
    }
  });

  return router;
};
