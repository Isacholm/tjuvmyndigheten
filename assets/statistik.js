// Tabell och diagram 4.2b: bestulna efter inkomstdecil, kön och år.
// Värdena genereras deterministiskt så att de är desamma vid varje sidvisning.

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const SEXES = [['K', 'Kvinnor'], ['M', 'Män'], ['S', 'Samtliga']];

function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Varje cell är antingen ett tal eller en SCB-symbol: '..', '–', '0' eller '.'.
function buildData() {
  const rand = rng(42);
  const rows = [];
  for (let d = 1; d <= 10; d++) {
    for (const [sex] of SEXES) {
      const base = 3.1 + Math.pow(d, 1.55) * 1.35;
      const sexFactor = sex === 'K' ? 0.97 : sex === 'M' ? 1.03 : 1;
      const cells = YEARS.map((y, i) => {
        if (d === 1 && y < 2019) return '.';
        if (d === 1 && sex !== 'S' && y === 2019) return '..';
        if (d === 2 && sex === 'K' && y === 2017) return '..';
        let v = base * sexFactor * (1 + i * 0.018) * (0.92 + rand() * 0.16);
        if (y === 2019) v *= 1.21;
        if (y === 2021) v *= 0.63;
        if (d === 1) v *= 0.06;
        if (v < 0.05) return '–';
        if (v < 0.5) return '0';
        return Math.round(v * 10) / 10;
      });
      rows.push({ d, sex, cells });
    }
  }
  return rows;
}

const fmt = (v) => (typeof v === 'number' ? v.toFixed(1).replace('.', ',') : v);
const SEX_NAME = Object.fromEntries(SEXES);
const YEAR_LABEL = { 2019: '2019¹', 2021: '2021²', 2025: '2025*' };

function renderTable(el, rows) {
  el.innerHTML = `
    <p class="tbl-title"><strong>Tabell 4.2b</strong> Bestulna efter disponibel inkomst per konsumtionsenhet (decilgrupp), kön och år 2016–2025. Antal per 1 000 invånare (16+ år)</p>
    <div class="table-wrap"><table class="scb">
      <thead><tr><th>Decilgrupp</th><th>Kön</th>${YEARS.map((y) => `<th class="num">${YEAR_LABEL[y] || y}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr${r.sex === 'S' ? ' class="sum"' : ''}>
        <td>${r.sex === 'K' ? `${r.d}${r.d === 1 ? '³' : ''}` : ''}</td><td>${SEX_NAME[r.sex]}</td>
        ${r.cells.map((c) => `<td class="num">${fmt(c)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table></div>
    <div class="scb-notes">
      <p><strong>Teckenförklaring:</strong> <code>..</code> Uppgift ej tillgänglig eller för osäker för att anges · <code>–</code> Noll · <code>0</code> Mindre än 0,5 av enheten · <code>.</code> Logiskt omöjlig uppgift · <code>*</code> Preliminär uppgift</p>
      <p>¹ Tidsseriebrott. Från och med 2019 omfattar begreppet tillgrepp även tillgrepp som anmälts men inte genomförts.<br>
      ² Uppgiften påverkas av att en stor andel av befolkningen arbetade hemifrån, vilket försvårade verksamheten.<br>
      ³ Decilgrupp 1 omfattar till övervägande del hushåll som saknar egendom. Se avsnittet <em>Personer som saknar egendom</em>.</p>
      <p>Källa: Tjuvmyndighetens tillgreppsregister (TMR). Statistiken är officiell statistik i den mån den är officiell.</p>
      <p class="no-print">Ladda ner: <a href="#" id="dl-csv">CSV (semikolonavgränsad)</a> · <a href="#" id="dl-xls">Excel 97–2003 (.xls)</a> · <span id="dl-msg" role="status"></span></p>
    </div>`;

  document.getElementById('dl-csv').addEventListener('click', (e) => {
    e.preventDefault();
    const lines = [
      '"Tabell 4.2b Bestulna efter disponibel inkomst per konsumtionsenhet (decilgrupp), kön och år. Antal per 1 000 invånare (16+ år)"',
      '',
      ['"decilgrupp"', '"kön"', ...YEARS.map((y) => `"${y}"`)].join(';'),
      ...rows.map((r) => [`"${r.d}"`, `"${SEX_NAME[r.sex].toLowerCase()}"`, ...r.cells.map((c) => (typeof c === 'number' ? fmt(c) : `"${c}"`))].join(';')),
      '',
      '"Källa: Tjuvmyndighetens tillgreppsregister (TMR)"',
    ];
    const blob = new Blob([lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'TMR0402B_20261023.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  });
  document.getElementById('dl-xls').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('dl-msg').textContent = 'Formatet är inte längre tillgängligt. Använd CSV.';
  });
}

function renderChart(el, rows) {
  const W = 760, H = 430, L = 58, R = 58, T = 34, B = 70;
  const nums = rows.flatMap((r) => r.cells.filter((c) => typeof c === 'number'));
  const yMin = 3.7, yMax = Math.ceil(Math.max(...nums) + 1);
  const x = (i) => L + (i * (W - L - R)) / (YEARS.length - 1);
  const y = (v) => T + (H - T - B) * (1 - (v - yMin) / (yMax - yMin));
  const ticks = [];
  for (let v = yMin; v <= yMax; v += (yMax - yMin) / 7) ticks.push(v);

  // Nästan samma färg för alla serier, med avsikt.
  const color = (i) => `hsl(${168 + (i % 5)}, ${22 + (i % 4) * 3}%, ${34 + (i % 6) * 4}%)`;
  const lines = rows.map((r, i) => {
    let d = '';
    r.cells.forEach((c, j) => {
      if (typeof c !== 'number') return;
      const v = Math.max(c, yMin);
      d += `${d && typeof r.cells[j - 1] === 'number' ? 'L' : 'M'}${x(j).toFixed(1)},${y(v).toFixed(1)}`;
    });
    return `<path d="${d}" fill="none" stroke="${color(i)}" stroke-width="1.1" stroke-dasharray="${r.sex === 'S' ? '' : r.sex === 'K' ? '3 1' : '1 1'}"/>`;
  }).join('');

  const legend = rows.map((r, i) => {
    const col = i % 6, row = Math.floor(i / 6);
    const lx = L + col * 108, ly = H + 18 + row * 11;
    return `<line x1="${lx}" y1="${ly - 3}" x2="${lx + 10}" y2="${ly - 3}" stroke="${color(i)}" stroke-width="1.5"/>
      <text x="${lx + 13}" y="${ly}" font-size="7.5" fill="#555">D${r.d}${r.sex}</text>`;
  }).join('');

  el.innerHTML = `
    <p class="tbl-title"><strong>Diagram 4.2b</strong> Bestulna efter disponibel inkomst per konsumtionsenhet (decilgrupp), kön och år 2016–2025. Antal per 1 000 invånare samt index</p>
    <svg viewBox="0 0 ${W} ${H + 82}" role="img" aria-label="Diagram 4.2b. Uppgifterna finns i tabell 4.2b." style="width:100%;height:auto;background:#fbfbf8;border:1px solid var(--line)">
      <g font-family="Arial, sans-serif" fill="#444">
        ${ticks.map((v) => `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="#bbb" stroke-width="0.8"/>
          <text x="${L - 6}" y="${y(v) + 3}" font-size="8" text-anchor="end">${v.toFixed(2).replace('.', ',')}</text>`).join('')}
        ${ticks.map((v, i) => `<text x="${W - R + 6}" y="${y(v) + 3}" font-size="8">${(96.5 + i * 3.25).toFixed(1).replace('.', ',')}</text>`).join('')}
        ${YEARS.map((yr, i) => `<text transform="translate(${x(i) + 3},${H - B + 10}) rotate(-60)" font-size="8" text-anchor="end">${YEAR_LABEL[yr] || yr}</text>`).join('')}
        <text transform="translate(14,${(T + H - B) / 2}) rotate(-90)" font-size="8" text-anchor="middle">Antal bestulna per 1 000 invånare (16+ år), löpande priser</text>
        <text transform="translate(${W - 12},${(T + H - B) / 2}) rotate(90)" font-size="8" text-anchor="middle">Index (2016=100)</text>
        <line x1="${x(3) - 8}" x2="${x(3) - 8}" y1="${T}" y2="${H - B}" stroke="#888" stroke-dasharray="4 3"/>
        <text x="${x(3) - 5}" y="${T + 9}" font-size="7.5">Tidsseriebrott¹</text>
        <line x1="${L}" x2="${W - R}" y1="${H - B}" y2="${H - B}" stroke="#666"/>
        ${lines}
        <text x="${L}" y="${H + 4}" font-size="7.5" fill="#777">Förklaring av förkortningar, se bilaga 3. Y-axeln börjar inte på noll.</text>
        ${legend}
      </g>
    </svg>
    <p style="font-size:14px;color:var(--muted)">Uppgifterna i diagrammet finns även i tabell 4.2b.</p>`;
}

const data = buildData();
document.querySelectorAll('[data-scb="chart"]').forEach((el) => renderChart(el, data));
document.querySelectorAll('[data-scb="table"]').forEach((el) => renderTable(el, data));
