import methods from "~/lib/methods";

export default methods({
  post(req, res) {
    res.status(503).json({ code: 503, message: "WIP" });
  },
});
