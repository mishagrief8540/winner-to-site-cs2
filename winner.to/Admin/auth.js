const express = require('express');
const router = express.Router();

// Регистрация пользователя
router.post('/register', (req, res) => {
    // Логика регистрации
    res.send('Register route');
});

// Вход пользователя
router.post('/login', (req, res) => {
    // Логика входа
    res.send('Login route');
});

module.exports = router;