import { Express, Request, Response, NextFunction, Router } from 'express';

export default (routes: Express) => {
  const router = Router();
  routes.use('/v1/users', router);

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json({
        error: false,
        message: 'Users retrieved successfully',
        result: [
          {
            id: 1,
            name: 'User 1',
            description: 'User 1 description',
            created_at: '2020-01-01',
            updated_at: '2020-01-01',
          },
          {
            id: 2,
            name: 'User 2',
            description: 'User 2 description',
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
