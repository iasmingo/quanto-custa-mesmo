import { SYSTEM_PROMPT } from './prompt.js';
import { renderMarkdown } from './markdown.js';

const apiKeyInput = document.getElementById('apiKey');
const productInput = document.getElementById('product');
const btn = document.getElementById('btn');
const loading = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');
const examplesEl = document.getElementById('examples');

// Persist API key
apiKeyInput.value = localStorage.getItem('qcm_api_key') || '';
apiKeyInput.addEventListener('input', () => {
  localStorage.setItem('qcm_api_key', apiKeyInput.value);
});

// Enter to submit
productInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') analyze();
});

btn.addEventListener('click', analyze);

// Example chips
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    productInput.value = chip.dataset.product;
    analyze();
  });
});

async function analyze() {
  const key = apiKeyInput.value.trim();
  const product = productInput.value.trim();

  if (!key) { errorEl.textContent = 'Cole sua API key da DeepSeek nas configurações acima.'; return; }
  if (!product) { errorEl.textContent = 'Digite um produto para analisar.'; return; }

  errorEl.textContent = '';
  resultEl.classList.remove('visible');
  examplesEl.style.display = 'none';
  loading.classList.add('visible');
  btn.disabled = true;

  try {
    const analysis = await fetchAnalysis(key, product);
    resultEl.innerHTML = renderMarkdown(analysis);
    resultEl.classList.add('visible');
  } catch (e) {
    errorEl.textContent = `Erro: ${e.message}`;
    examplesEl.style.display = '';
  } finally {
    loading.classList.remove('visible');
    btn.disabled = false;
  }
}

async function fetchAnalysis(key, product) {
  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Analise o custo real de: ${product}. Considere o mercado brasileiro (preços, disponibilidade e contexto do Brasil).` }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `Erro ${res.status}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}