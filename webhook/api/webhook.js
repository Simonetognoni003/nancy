// webhook/api/webhook.js

import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const payload = JSON.stringify(req.body);
  const signature = req.headers['x-pyrus-sig'];
  const secret = process.env.PYRUS_SECURITY_KEY;

  // Verifica HMAC-SHA1
  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(payload);
  if (hmac.digest('hex') !== signature) {
    return res.status(401).end('Invalid signature');
  }

  console.log('✅ Webhook ricevuto:', req.body);

  // Rispondi subito con 200 OK
  res.status(200).json({ ok: true });
}
