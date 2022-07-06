import { IRoutePath } from '@/modules';
import { categoryRepository } from '../services';
import { Request, Response, NextFunction, Router } from 'express';

export default (): IRoutePath => {
  const path = '/v1/categories';
  const router = Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json({
        error: false,
        message: 'categories retrieved successfully',
        result: await categoryRepository.getAll(),
      });
    } catch (error: any) {
      next(new Error(error.message));
    }
  });

  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json({
        error: false,
        message: 'category successfully',
        result: await categoryRepository.findById(req.params.id as unknown as number),
      });
    } catch (error: any) {
      next(new Error(error.message));
    }
  });
  return { path, router };
};
