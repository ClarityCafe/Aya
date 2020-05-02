import { NextApiHandler } from "next";

const handleError = (fn: NextApiHandler): NextApiHandler => async (req, res) => {
  try {
    return await fn(req, res);
  } catch ({ message }) {
    res.status(500).json({ code: 500, message });
  }
};

export default handleError;
