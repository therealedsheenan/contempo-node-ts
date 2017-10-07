import * as express from "express";

import home from "./home";

const router = express.Router();

router.use("/", home);


// beautify error api response
// returns object for error message
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors: any, key: string){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

export default router;
