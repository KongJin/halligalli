import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';

export const snc = nc({
  onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
    //@ts-ignore
    let status: number = err.status || 500;

    const message: string = err.message || 'internal server error';
    console.log({ err });
    return res.status(status).json({ status, message, pass: `${req.method} ${req.url}` });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).json({
      message: 'page is not found... or is it',
      pass: `${req.method} ${req.url}`,
    });
  },
});
