// webhook/api/webhook.js
export default function handler(req, res) {
  console.log('HEADERS:', req.headers);
  console.log('BODY:', req.body);

  // Se vuoi vedere il raw body (Buffer), scommenta:
  // console.log('RAW BODY:', req.rawBody);

  // Risposta di test: você voo?
  return res.status(200).json({
    ok: true,
    headers: req.headers,
    body: req.body
  });
}
