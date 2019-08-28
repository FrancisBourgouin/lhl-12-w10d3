import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import express from "express";
import uuidv4 from "uuid/v4";
import { authenticate, UserDatabase, UserEntry } from "./helpers";

const app = express();
const saltRounds = 10;
const port = 3000;

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
  keys: ["Iliketocookpotatoesinthedark", "Lifeishardwhenthepotatoesarenotfreshandmushy"],
  name: "supersession"
}));

app.set("view engine", "ejs");

const saltedPassword1: string = bcrypt.hashSync("password1", saltRounds);
const saltedPockPock: string  = bcrypt.hashSync("pockpock", saltRounds);

const userDatabaseIsh: UserDatabase = {
  e2718294: {
    fullname: "Pequeno Chicken de la Pampa",
    id: "e2718294",
    password: saltedPockPock, // "pockpock"
    username: "Chicken"
  } as UserEntry,
  pi31415: {
    fullname: "Francis Bourgouin",
    id: "pi31415",
    password: saltedPassword1, // "password1"
    username: "Francis"
  } as UserEntry
};

console.log(userDatabaseIsh);

app.get("/", (req, res) => {
  let username = "Guest";
  let fullname = "Mister Guest";

  const { session } = req;
  if (session && session.userId && userDatabaseIsh[session.userId]) {
    username = userDatabaseIsh[session.userId].username;
    fullname = userDatabaseIsh[session.userId].fullname;
  }

  const templateVars = {username, fullname};
  res.render("home", templateVars);
});

app.post("/login", (req, res) => {
  const authentication = authenticate(req.body.username, req.body.password, userDatabaseIsh);
  const valid = authentication.valid;
  const userId = authentication.id;
  const { session } = req;
  if (valid && session) {
    session.userId = userId;
  } else if (session) {
    delete session.userId;
  }
  res.redirect("/");
});

app.post("/register", (req, res) => {
  const userId = uuidv4().slice(0, 8);
  const {username, fullname, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  userDatabaseIsh[userId] = {
    id: userId,
    fullname,
    password: hashedPassword,
    username,
  };

  console.log("new user created with info : ", userDatabaseIsh[userId]);
  if (req.session) {
    req.session.userId = userId;
  }

  res.redirect("/");
});

app.listen(port, () => console.log(`Express server running on port ${port}`));

const randomArray = [1, 2, 3, 4, 5];
