import { NextApiRequest, NextApiResponse } from "next";

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(JSON.stringify(process.env.NODE_ENV));
};
