import type { NextApiRequest, NextApiResponse } from 'next';
//400
export function BadRequest(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(400, `Bad NextApiRequest`, req, res);
}
export function PassIncorrect(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(400, `Password is wrong`, req, res);
}
export function CodeIncorrect(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(400, `Verification number is incorrect`, req, res);
}
export function ConflictEmail(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(400, `This email is already registered`, req, res);
}
export function ConflictPhone(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(400, `This PhoneNumber is already registered`, req, res);
}
export function ConflictName(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(400, `This Name is already registered`, req, res);
}

//401
export function Unauthorized(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(401, `Please login`, req, res);
}
export function InvalidToken(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(401, 'Access Denied', req, res);
}
//403
export function PermissionDenied(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(403, `Don't have permission`, req, res);
}
export function NotAdmin(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(403, `You'r not admin`, req, res);
}
export function ThreeMonth(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(403, `You cannot join for 3 months after withdrawal`, req, res);
}
export function BlockMember(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(403, `You are a blocked member`, req, res);
}

//404
export function NotFound(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(404, `Not Found`, req, res);
}
export function NotMember(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(404, `This is a non-existent member`, req, res);
}
export function NotPost(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(404, `This is a non-existent post`, req, res);
}
export function NotComment(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(404, `This is a non-existent comment`, req, res);
}

//409

//429
export function TooManyRequests(req: NextApiRequest, res: NextApiResponse) {
  return errorHandler(429, `Too Many NextApiRequests`, req, res);
}

function errorHandler(status: number, message: string, req: NextApiRequest, res: NextApiResponse) {
  console.log({ status, message, path: `${req.method} ${req.url}` });

  return res.status(status).json({ status, message, path: `${req.method} ${req.url}` });
}
