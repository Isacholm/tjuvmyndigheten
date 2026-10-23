// Bygger assets/teckensprak-data.js: en ordlista från webbplatsens ord till
// transkriberade tecken ur Svenskt teckenspråkslexikon.
//
//   node tools/teckensprak.mjs
//
// Kör om när texterna på webbplatsen ändras. Lexikonet läses från tools/lexicon-data.js,
// en kopia av https://raw.githubusercontent.com/zrajm/teckentranskription/master/lexicon-data.js.
// Ladda ner filen på nytt för att uppdatera lexikonet, eller ange en annan fil som argument.

import fs from 'fs';
import path from 'path';

const ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const SEP = '\u{10C960}'; // skiljetecken mellan sammansatta tecken

// lexicon-data.js läses som data, inte som kod.
const src = fs.readFileSync(process.argv[2] || path.join(ROOT, 'tools', 'lexicon-data.js'), 'utf8');
const tagStart = src.indexOf('let lexiconTags=[') + 16;
const tags = JSON.parse(src.slice(tagStart, src.indexOf(']\n', tagStart) + 1));
const rowStart = src.indexOf('let lexicon=[') + 12;
const rows = JSON.parse(src.slice(rowStart, src.indexOf(']].map(', rowStart) + 2));

const ODD = /ovanligt|finskt|Österberg|ålderdomligt|egennamn|bokstavering|handalfabetet|\/Stockholm|dialekt/i;
const dict = new Map(); // ord -> [straff, transkription]
for (const [, trans, ...rest] of rows) {
  if (trans.includes('#(')) continue; // bokstaverat med vanliga bokstäver – handalfabetet används i stället
  const words = rest.filter((v) => typeof v === 'string');
  const penalty = rest.filter((v) => typeof v === 'number' && ODD.test(tags[v])).length;
  words.forEach((w, i) => {
    const key = w.toLowerCase();
    if (/\s/.test(key)) return;
    const score = penalty * 10 + i;
    if (!dict.has(key) || dict.get(key)[0] > score) dict.set(key, [score, trans]);
  });
}
const get = (w) => dict.get(w)?.[1];

// Handalfabetet, för ord som saknas i lexikonet.
const alphabet = {};
for (const [, trans, ...rest] of rows) {
  const t = rest.filter((v) => typeof v === 'number').map((v) => tags[v]);
  const letter = rest.find((v) => typeof v === 'string')?.toLowerCase();
  if (!t.includes('/handalfabetet') || letter.length !== 1) continue;
  if (!alphabet[letter] || !t.some((x) => /ovanligt/.test(x))) alphabet[letter] = trans;
}
alphabet['é'] = alphabet.e;

const SUFFIXES = ['heterna', 'heten', 'ningarna', 'ningar', 'ningen', 'arnas', 'ernas', 'ornas',
  'arna', 'erna', 'orna', 'ande', 'ende', 'ades', 'aste', 'ast', 'are', 'ens', 'ets',
  'en', 'et', 'na', 'ar', 'er', 'or', 'ad', 'at', 'de', 'te', 'da', 'ta', 'a', 'e', 't', 's', 'n', 'r'];
const RESTORE = { heterna: 'het', heten: 'het', ningarna: 'ning', ningar: 'ning', ningen: 'ning' };

function lemma(w) {
  if (get(w)) return get(w);
  for (const suf of SUFFIXES) {
    if (!w.endsWith(suf) || w.length - suf.length < 2) continue;
    const stem = w.slice(0, -suf.length) + (RESTORE[suf] || '');
    for (const c of [stem, stem + 'a', stem + 'e', stem.replace(/(.)\1$/, '$1')]) if (get(c)) return get(c);
  }
}

const memo = new Map();
function compound(w) {
  if (memo.has(w)) return memo.get(w);
  let best = lemma(w) ? [lemma(w)] : null;
  for (let i = w.length - 3; i >= 3; i--) {
    const head = w.slice(0, i);
    const h = get(head) || (head.endsWith('s') && get(head.slice(0, -1))) || (get(head + 'a'));
    if (!h) continue;
    const tail = compound(w.slice(i));
    if (tail && (!best || tail.length + 1 < best.length)) best = [h, ...tail];
  }
  memo.set(w, best);
  return best;
}

// Samla alla ord från sidornas HTML och skriptens texter.
const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).map((f) => path.join(ROOT, f))
  .concat(fs.readdirSync(path.join(ROOT, 'assets')).filter((f) => f.endsWith('.js') && f !== 'teckensprak-data.js')
    .map((f) => path.join(ROOT, 'assets', f)));
const words = new Set();
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8').replace(/<(script|style)[^]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ');
  for (const m of text.matchAll(/[A-Za-zÅÄÖåäöÉé]+/g)) words.add(m[0].toLowerCase());
}

const out = {};
let found = 0;
for (const w of [...words].sort()) {
  const parts = compound(w);
  if (parts) { out[w] = parts.join(SEP); found++; }
}
fs.writeFileSync(path.join(ROOT, 'assets', 'teckensprak-data.js'),
  `// Transkriptioner ur Svenskt teckenspråkslexikon, Avdelningen för teckenspråk,
// Institutionen för lingvistik, Stockholms universitet (https://teckensprakslexikon.su.se/),
// via https://github.com/zrajm/teckentranskription.
// Licens: CC BY-NC-SA 4.0, https://creativecommons.org/licenses/by-nc-sa/4.0/deed.sv
// Bearbetad: urval av ord på webbplatsen, böjningar och sammansatta ord, samt handalfabetet.
// Bearbetningen delas under samma licens. Stockholms universitet står inte bakom webbplatsen.
// Genererad av tools/teckensprak.mjs – redigera inte för hand.
window.TECKEN = ${JSON.stringify(out)};
window.TECKEN_ALFABET = ${JSON.stringify(alphabet)};
`);
console.log(`${found} av ${words.size} ord fick tecken, resten bokstaveras (${Object.keys(alphabet).length} bokstäver)`);
