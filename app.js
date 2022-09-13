require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const tokenValidate = require('./middleware/authentication');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

app.use(express.json());
// extra packages

// routes
const loginRouter = require('./routes/auth.js')
const jobRouter = require('./routes/jobs');

app.get('/', (req, res) => {
  res.send('jobs api');
});
app.use('/api/v1/auth',loginRouter);
app.use('/api/v1/jobs',tokenValidate,jobRouter);
app.use(notFoundMiddleware);  
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(console.log("database connected.."));
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
