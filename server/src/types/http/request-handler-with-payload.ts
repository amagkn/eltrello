import { Request, Response, NextFunction } from 'express';
import { UserDocument } from '../user.interface';

interface RequestWithPayloadInterface extends Request {
  user?: UserDocument;
}

export type RequestHandlerWithPayload = (
  req: RequestWithPayloadInterface,
  res: Response,
  next: NextFunction
) => void;
