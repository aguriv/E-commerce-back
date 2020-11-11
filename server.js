require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const db = require("./db");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db.mongoose.connection }),
  })
);

userRoutes(app);
productRoutes(app);
categoryRoutes(app);

app.listen(process.env.APP_PORT, () => {
  console.log("Estas llegando a buen puerto");
});
