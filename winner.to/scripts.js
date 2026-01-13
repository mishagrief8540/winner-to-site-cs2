const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/winner', { useNewUrlParser: true, useUnifiedTopology: true });

// Маршруты
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');

app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);

app.listen(PORT, () => {
    console.log(Сервер запущен на http://localhost:${PORT});
});