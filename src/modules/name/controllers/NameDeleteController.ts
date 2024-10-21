import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NameService } from '../services/NameService';

const nameServiceInstance = new NameService();

export const deleteName = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await nameServiceInstance.delete(parseInt(id));
  res.status(204).send();
});
