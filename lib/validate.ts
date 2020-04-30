import Joi from "@hapi/joi";
import { NextApiHandler } from "next";

type Locations = "body" | "query";

interface ValidateOptions {
  schema: Joi.Schema;
  location?: Locations;
}

const validate = (
  { schema, location = "body" }: ValidateOptions,
  handler: NextApiHandler
): NextApiHandler => (req, res) => {
  const { error, value } = schema.validate(req[location]);
  req.body = value; // Joi changes some values depending on schema, set that as body

  if (!error) return handler(req, res);
  else res.status(400).json({ code: 400, message: error.message });
};

export default validate;
