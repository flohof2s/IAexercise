const router = require('express').Router();
const crypto = require('crypto');

// Nur Mock – keine echte Authentifizierung!
function validateCredentials({ username, password }) {
  return username === 'admin' && password === 'secret';
}

router.post('/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!validateCredentials({ username, password })) {
        return res.status(401).json({ message: 'Invalid credentials (mock)' });
    }

    // Fake-Session-Token
    const token = crypto.randomUUID();

    // Cookie setzen
    res.cookie('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        signed: true,
        maxAge: 1000 * 60 * 60, // 1h
    });

    res.status(200).json({ message: 'Logged in (mock)', token });
});

router.get('/me', (req, res) => {
    const token = req.signedCookies?.session;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    // Mock-User zurückgeben
    res.json({
        user: {
            id: 'u_1',
            username: 'admin',
            roles: ['ADMIN'],
        },
        session: token,
    });
});

router.post('/logout', (req, res) => {
    // Cookie löschen – Optionen müssen mit den Setz-Optionen übereinstimmen
    res.clearCookie('session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        signed: true,
    });
    res.status(200).json({ message: 'Logged out' });
});

module.exports = router;