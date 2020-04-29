import { NextApiHandler } from "next";

const handleError = (fn: NextApiHandler): NextApiHandler => (req, res) => {
  try {
    return fn(req, res);
  } catch ({ message }) {
    res.status(500).json({ code: 500, message });
  }
};

export default handleError;
