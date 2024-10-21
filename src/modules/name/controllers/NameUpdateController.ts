import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NameService } from '../services/NameService';

const nameServiceInstance = new NameService();

export const updateName = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const name = await nameServiceInstance.update(parseInt(id), req.body);
  res.json(name);
});
