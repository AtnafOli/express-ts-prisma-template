import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NameService } from '../services/NameService';

const nameServiceInstance = new NameService();

export const createName = asyncHandler(async (req: Request, res: Response) => {
  const name = await nameServiceInstance.create(req.body);
  res.status(201).json(name);
});
