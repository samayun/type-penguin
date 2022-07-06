import { IRoutePath } from '@/modules';

import { Request, Response, NextFunction, Router } from 'express';

export default (): IRoutePath => {
  const path = '/v1/tests';
  const router = Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json({
        error: false,
        message: 'Test retrieved successfully',
        result: [
          {
            id: 1,
            name: 'Test 1',
            description: 'Test 1 description',
            created_at: '2020-01-01',
            updated_at: '2020-01-01',
          },
        ],
      });
    } catch (error: any) {
      next(new Error(error.message));
    }
  });

  return { path, router };
};
