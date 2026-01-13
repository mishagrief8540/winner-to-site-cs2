const express = require('express');
const router = express.Router();

// Пример маршрута для получения привилегий
router.get('/privileges', (req, res) => {
    res.json([
        { name: "Low", price: 20, duration: "2 недели" },
        { name: "Nice", price: 100, duration: "1 месяц" },
        { name: "Escape", price: 200, duration: "1 месяц" },
    ]);
});

module.exports = router;