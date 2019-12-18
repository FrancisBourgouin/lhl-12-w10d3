"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const express_1 = __importDefault(require("express"));
const v4_1 = __importDefault(require("uuid/v4"));
const helpers_1 = require("./helpers");
const app = express_1.default();
const saltRounds = 10;
const port = 3000;
app.use(express_1.default.static("public"));
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    keys: ["Iliketocookpotatoesinthedark", "Lifeishardwhenthepotatoesarenotfreshandmushy"],
    name: "supersession"
}));
app.set("view engine", "ejs");
const saltedPassword1 = bcrypt_1.default.hashSync("password1", saltRounds);
const saltedPockPock = bcrypt_1.default.hashSync("pockpock", saltRounds);
const userDatabaseIsh = {
    e2718294: {
        fullname: "Pequeno Chicken de la Pampa",
        id: "e2718294",
        password: saltedPockPock,
        username: "Chicken"
    },
    pi31415: {
        fullname: "Francis Bourgouin",
        id: "pi31415",
        password: saltedPassword1,
        username: "Francis"
    }
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
    const templateVars = { username, fullname };
    res.render("home", templateVars);
});
app.post("/login", (req, res) => {
    const authentication = helpers_1.authenticate(req.body.username, req.body.password, userDatabaseIsh);
    const valid = authentication.valid;
    const userId = authentication.id;
    const { session } = req;
    if (valid && session) {
        session.userId = userId;
    }
    else if (session) {
        delete session.userId;
    }
    res.redirect("/");
});
app.post("/register", (req, res) => {
    const userId = v4_1.default().slice(0, 8);
    const { username, fullname, password } = req.body;
    const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
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
