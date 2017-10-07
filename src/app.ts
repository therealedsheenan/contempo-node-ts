/**
 * Module dependencies.
 */
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as mongoose from "mongoose";
import * as session from "express-session";


const app = express();
const isProduction = process.env.NODE_ENV === "production";

// setup
// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs/access.log"), {flags: "a"})

// setup the logger
// app.use(logger("dev", {stream: accessLogStream}))
app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "sheenan-tenepre",
    cookie: { maxAge: 60000 },
    resave: false, saveUninitialized: false
  })
);

// mongo database
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(
    "mongodb://localhost/contempo-node-ts",
    {useMongoClient: true}
  );
  mongoose.set("debug", true);
}

// models here

// passport strategy

// routes
import routes from "./routes/";
app.use(routes);

app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;