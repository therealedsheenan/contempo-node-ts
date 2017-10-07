import * as express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.json({
    title: "Contempo-node-ts",
    description: "Just another node express boilerplate using typescript."
  });
});

export default router;
