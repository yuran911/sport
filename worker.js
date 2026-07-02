export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const body = await request.json();
      const text = body.text;
      if (!text) {
        return new Response('Missing text', { status: 400, headers: corsHeaders });
      }

      const tgRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text })
      });

      if (!tgRes.ok) {
        const errText = await tgRes.text();
        return new Response('Telegram error: ' + errText, { status: 502, headers: corsHeaders });
      }

      return new Response('OK', { status: 200, headers: corsHeaders });
    } catch (e) {
      return new Response('Error: ' + e.message, { status: 500, headers: corsHeaders });
    }
  }
};
