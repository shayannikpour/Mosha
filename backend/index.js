const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const instructorRoutes = require('./routes/instructor');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/instructor', instructorRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Mosha backend running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));