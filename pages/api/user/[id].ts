import { getUser } from "~/lib/database";
import methods from "~/lib/methods";

export default methods({
  async get(req, res) {
    const { id } = req.query;

    try {
      const result = await getUser(id as string);
      res.json(result);
    } catch (e) {
      res.status(404).json({
        code: 404,
        message: "Resource does not exist",
      });
    }
  },
});
