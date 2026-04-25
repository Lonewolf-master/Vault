#!/usr/bin/env node
require('dotenv').config();
const axios = require('axios');

const GROQ_KEY = process.env.GROQ_API_KEY;
const XAI_KEY = process.env.XAI_API_KEY;

function mask(key) {
  if (!key) return 'NOT SET';
  if (key.length <= 8) return key;
  return `${key.slice(0,4)}...${key.slice(-4)}`;
}

function extractText(resp) {
  if (!resp || !resp.data) return null;
  const d = resp.data;
  if (d.choices && d.choices.length) {
    const c = d.choices[0];
    if (c.message && (c.message.content || c.message)) return c.message.content || c.message;
    if (c.text) return c.text;
  }
  if (d.content && Array.isArray(d.content) && d.content[0] && d.content[0].text) return d.content[0].text;
  if (d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts && d.candidates[0].content.parts[0]) return d.candidates[0].content.parts[0].text;
  return typeof d === 'string' ? d : JSON.stringify(d).slice(0,1000);
}

async function testGroq(modelId) {
  console.log(`\nTesting Groq model: ${modelId}`);
  if (!GROQ_KEY) {
    console.log('  SKIP: GROQ_API_KEY not set in .env');
    return { status: 'skipped' };
  }

  try {
    const payload = {
      model: modelId,
      messages: [
        { role: 'system', content: `Smoke test for ${modelId}` },
        { role: 'user', content: `Please reply exactly: OK ${modelId}` }
      ],
      temperature: 0,
      max_tokens: 50
    };

    const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', payload, {
      headers: { Authorization: `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
      timeout: 20000
    });

    const text = extractText(res);
    console.log('  Response:', text);
    return { status: 'ok', text };
  } catch (err) {
    if (err.response) {
      console.log('  Error:', err.response.status, '-', JSON.stringify(err.response.data).slice(0,400));
    } else {
      console.log('  Network/Error:', err.message);
    }
    return { status: 'error', error: err.message };
  }
}

async function testGrok(modelId) {
  console.log(`\nTesting xAI Grok model: ${modelId}`);
  if (!XAI_KEY || XAI_KEY.includes('your_')) {
    console.log('  SKIP: XAI_API_KEY not set in .env');
    return { status: 'skipped' };
  }

  try {
    const payload = {
      model: modelId,
      messages: [
        { role: 'system', content: `Smoke test for ${modelId}` },
        { role: 'user', content: `Please reply exactly: OK ${modelId}` }
      ],
      temperature: 0,
      max_tokens: 50
    };

    const res = await axios.post('https://api.x.ai/v1/chat/completions', payload, {
      headers: { Authorization: `Bearer ${XAI_KEY}`, 'Content-Type': 'application/json' },
      timeout: 20000
    });

    const text = extractText(res);
    console.log('  Response:', text);
    return { status: 'ok', text };
  } catch (err) {
    if (err.response) {
      console.log('  Error:', err.response.status, '-', JSON.stringify(err.response.data).slice(0,400));
    } else {
      console.log('  Network/Error:', err.message);
    }
    return { status: 'error', error: err.message };
  }
}

async function main() {
  console.log('Smoke test script — validating Meta (Groq) and Grok (xAI)');
  console.log('GROQ_API_KEY:', mask(GROQ_KEY));
  console.log('XAI_API_KEY :', mask(XAI_KEY));

  const results = {
    meta: await testGroq('llama-3.3-70b-versatile'),
    gemma: await testGroq('gemma2-9b-it'),
    grok: await testGrok('grok-beta')
  };

  console.log('\nSummary:');
  Object.entries(results).forEach(([k, v]) => {
    console.log(` - ${k}: ${v.status}` + (v.text ? `, sample: ${String(v.text).slice(0,120)}` : ''));
  });

  // Exit code 0 even if APIs failed; this is a smoke test only
  process.exit(0);
}

main();
