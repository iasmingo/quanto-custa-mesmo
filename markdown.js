export function renderMarkdown(md) {
  const lines = md.split('\n');
  let html = '';
  let inTable = false;
  let tableHeader = true;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      if (inTable) { html += '</table>'; inTable = false; }
      html += `<h2>${line.slice(3)}</h2>`;
      continue;
    }
    if (line.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      if (inTable) { html += '</table>'; inTable = false; }
      html += `<h3>${line.slice(4)}</h3>`;
      continue;
    }

    if (/^\|[\s\-:|]+\|$/.test(line)) continue;

    if (line.startsWith('|') && line.endsWith('|')) {
      if (inList) { html += '</ul>'; inList = false; }
      if (!inTable) { inTable = true; tableHeader = true; html += '<table>'; }
      const cells = line.split('|').slice(1, -1);
      const tag = tableHeader ? 'th' : 'td';
      html += '<tr>' + cells.map(c => `<${tag}>${inline(c.trim())}</${tag}>`).join('') + '</tr>';
      tableHeader = false;
      continue;
    } else if (inTable) {
      html += '</table>';
      inTable = false;
    }

    if (line.startsWith('> ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<blockquote>${inline(line.slice(2))}</blockquote>`;
      continue;
    }

    if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inline(line.slice(2))}</li>`;
      continue;
    } else if (inList && line.trim() === '') {
      html += '</ul>';
      inList = false;
    }

    if (line.trim() === '') {
      html += '<br>';
      continue;
    }

    if (inList) { html += '</ul>'; inList = false; }
    html += `<p>${inline(line)}</p>`;
  }

  if (inList) html += '</ul>';
  if (inTable) html += '</table>';
  return html;
}

function inline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}