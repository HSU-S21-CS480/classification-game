"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const body_parser_1 = __importDefault(require("body-parser"));
/*
const express = require('express');
const app = express();                 // define our app using express
const fileUpload = require('express-fileupload');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
*/
const app = express_1.default();
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_fileupload_1.default());
// configure session management using a file-based schema
const cookie = { secure: false, httpOnly: false };
app.use(express_session_1.default({
    store: new session_file_store_1.default({ path: './session', ttl: 86400 }),
    secret: "super secret hash",
    resave: false,
    saveUninitialized: false,
    cookie
}));
// ROUTES FOR OUR API
// =============================================================================
const router = express_1.default.Router();
// test route to make sure everything is working
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});
// ROUTES GO HERE
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// configure listening port
const port = process.env.PORT || 8080;
// configure release / debug settings
const runtime_mode = (process.env.mode === "release" ? "release" : "debug");
if (runtime_mode === "debug") {
    console.log("running in debug mode.");
}
// configure CORS from react (not safe for production)
app.use((req, res, next) => {
    if (runtime_mode === "debug") {
        const origin = req.get('origin');
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        next();
    }
});
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);
