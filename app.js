require('dotenv').config();
require('express-async-errors');

//extra securities packages

const helmet =require('helmet');
const cors =require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//express
const express = require('express');
const app = express();
const tokenValidate = require('./middleware/authentication');


//Swagger 
const swagger = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

app.use(express.json());
// extra packages
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, 
}));
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
const loginRouter = require('./routes/auth.js')
const jobRouter = require('./routes/jobs');

app.get('/', (req, res) => {
  res.send(`<h1>Jobs API</h1><a href="/api-docs">Documentation</a>`);
});
app.use('/api-docs',swagger.serve,swagger.setup(swaggerDocument));
app.use('/api/v1/auth',loginRouter);
app.use('/api/v1/jobs',tokenValidate,jobRouter);
app.use(notFoundMiddleware);  
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log("database connected.."));
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}. ..`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
