require('dotenv').config();
const express = require('express');
const { setupSwagger } = require("./config/swagger");
const schedulesRoutes = require('./routes/schedulesRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api/schedules', schedulesRoutes);
app.use('/api/auth', authRoutes);
setupSwagger(app);

app.get('/health', (req,res)=>{
    res.json({status:'OK', timestamp: new Date().toISOString() });
});

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










