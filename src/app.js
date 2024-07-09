const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const secretRoutes = require('./routes/secretRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', secretRoutes);

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, '../public')));

// Fő útvonal kiszolgálása
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
