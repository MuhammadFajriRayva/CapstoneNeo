const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const schedulesRoutes = require('./routes/schedulesRoutes');
app.use('/schedules', schedulesRoutes);

// Middleware 404
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan'});
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Terjadi kesalahan pada server';
    res.status(statusCode).json({
        success: false,
        message,
    });
});

module.exports = app;
