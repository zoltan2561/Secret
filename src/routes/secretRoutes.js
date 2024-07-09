const express = require('express');
const router = express.Router();
const Secret = require('../models/secret');

router.post('/secret', async (req, res) => {
    const { secretText, ttl, maxReads } = req.body;
    try {
        const secret = await Secret.create({ secretText, ttl, maxReads });
        res.json({ secretUrl: `http://localhost:3000/api/secret/${secret.id}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create secret' });
    }
});

router.get('/secret/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const secret = await Secret.findOne({ where: { id } });
        if (!secret) {
            return res.status(404).json({ error: 'Secret not found' });
        }

        const currentTime = new Date();
        const expiryTime = new Date(secret.createdAt.getTime() + secret.ttl * 1000);

        if (currentTime > expiryTime || secret.reads >= secret.maxReads) {
            return res.status(410).json({ error: 'Secret has expired or reached read limit' });
        }

        secret.reads += 1;
        await secret.save();

        res.json({ secretText: secret.secretText });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve secret' });
    }
});

module.exports = router;
