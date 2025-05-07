// api/webhook.js

export default async function handler(req, res) {
  // 1) Leggi il corpo raw
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks).toString();
  console.log('RAW BODY:', rawBody);

  // 2) Prova a fare il parse JSON
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    console.error('JSON parse error:', err);
    return res.status(400).send('Invalid JSON');
  }
  console.log('PARSED BODY:', payload);

  // 3) (qui rimetterai la verifica HMAC usando process.env.PYRUS_SECRET)
  // per ora rispondiamo semplicemente echo:
  return res.status(200).json({
    ok: true,
    raw: rawBody,
    body: payload
  });
}
