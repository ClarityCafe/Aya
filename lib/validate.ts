import Joi from "@hapi/joi";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type Locations = "body" | "query";

interface ValidateOptions {
  schema: Joi.Schema;
  location?: Locations;
}

interface ValidatedNextApiRequestBody<S> extends NextApiRequest {
  body: S;
}

interface ValidatedNextApiRequestQuery<S extends {}> extends NextApiRequest {
  query: S;
}

type ValidatedNextApiRequest<S, L extends Locations> = L extends "body"
  ? ValidatedNextApiRequestBody<S>
  : ValidatedNextApiRequestQuery<S>;

type ValidatedNextApiHandler<S, L extends Locations> = (
  req: ValidatedNextApiRequest<S, L>,
  res: NextApiResponse
) => void;

const validate = <S = any, L extends Locations = "body">(
  { schema, location = "body" }: ValidateOptions,
  handler: ValidatedNextApiHandler<S, L>
): NextApiHandler => (req, res) => {
  const { error, value } = schema.validate(req[location]);
  req.body = value; // Joi changes some values depending on schema, set that as body

  if (!error) return handler(req as ValidatedNextApiRequest<S, L>, res);
  else res.status(400).json({ code: 400, message: error.message });
};

export default validate;
