const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const sessions = require('express-session');
require('dotenv').config();
const {MongoStore} = require('connect-mongo');
const AuthRouter = require('./routes/authRoute');
const createRequestRouter = require('./routes/createRequestRoute');
const adminRouter = require('./routes/AdminRoutes');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', 
credentials:true
}))
connectDB();
app.use(express.urlencoded({ extended: true }));

app.use(sessions({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));


app.use('/api/auth',AuthRouter);
app.use('/api/services/request',createRequestRouter);
// admin routes
app.use("/api/admin",adminRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
