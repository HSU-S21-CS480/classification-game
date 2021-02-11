//https://developer.okta.com/blog/2018/11/15/node-express-typescript
//https://blog.logrocket.com/typescript-with-node-js-and-express/
import express from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import FileStore from 'session-file-store';
import bodyParser from 'body-parser';
import question from './routes/question';

const FileStoreObj = FileStore(session);
const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

// configure session management using a file-based schema
const cookie = { secure: false, httpOnly: false };
app.use(session({
   store: new FileStoreObj({ path: './session', ttl: 86400 }),
   secret: "super secret hash",
   resave: false,
   saveUninitialized: false,
   cookie
}));

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
      console.log("Enabling CORS");
      const origin = req.get('origin');
      res.header('Access-Control-Allow-Origin', origin);
   }

   res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, HEAD, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

   // intercept OPTIONS method
   if (req.method === 'OPTIONS') {
      res.sendStatus(204);
   } else {
      next();
   }
});

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// test route to make sure everything is working
router.get('/', (req, res) => {
   res.json({ message: 'hooray! welcome to our api!' });
});

question(router);


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);