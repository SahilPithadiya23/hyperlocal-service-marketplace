const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const homeRoutes = require('./routes/home.routes');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend's origin
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);

app.get('/', (req, res) => {    
    res.send('Hello World!');
});

module.exports = app;