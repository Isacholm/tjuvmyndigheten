// Stöldgodsdeklaration (TMV 301). Allt räknas i webbläsaren, inget skickas någonstans.

const KOFOT_SCHABLON = 450;
const KOFOT_MAX = 3;
const AVGIFT = 0.30;
const DISTANSTILLAGG = 0.02;

const kr = (n) => `${n.toLocaleString('sv-SE')} kr`;
const TRN_RE = /^TRN\s?\d{3}-\d{3}$/i;

function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
}

function readInt(form, name) {
  const v = form[name].value.trim();
  return v === '' ? null : Number(v);
}

const form = document.getElementById('dekl');
const errorBox = document.getElementById('errors');
const receipt = document.getElementById('kvitto');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors = [];
  const err = (field, msg) => errors.push([field, msg]);

  const trn = form.trn.value.trim();
  const antal = readInt(form, 'antal');
  const varde = readInt(form, 'varde');
  const ater = readInt(form, 'ater') ?? 0;
  const distans = readInt(form, 'distans') ?? 0;
  const kofot = readInt(form, 'kofot') ?? 0;
  const bestulen = form.bestulen.value;
  const fortsatt = form.fortsatt.value;

  if (!TRN_RE.test(trn)) err('trn', 'Tjuvregistreringsnummer saknas eller har fel format. Ange numret som TRN 123-456.');
  if (antal === null || !Number.isInteger(antal) || antal < 0) err('antal', 'Ange totalt antal genomförda tillgrepp som ett heltal.');
  if (varde === null || !Number.isInteger(varde) || varde < 0) err('varde', 'Ange sammanlagt uppskattat godsvärde i hela kronor.');
  for (const [name, v] of [['ater', ater], ['distans', distans], ['kofot', kofot]]) {
    if (!Number.isInteger(v) || v < 0) err(name, 'Värdet måste vara ett heltal som är noll eller större.');
  }
  if (antal === 0 && varde > 0) err('varde', 'Godsvärde kan inte uppstå utan tillgrepp. Om godset har uppstått på annat sätt, kontakta en annan myndighet.');
  if (varde !== null && ater > varde) err('ater', 'Återlämnat gods får inte överstiga totalt godsvärde. Om du har lämnat tillbaka mer än du har tagit, kontakta Visselblåsarfunktionen.');
  if (antal !== null && distans > antal) err('distans', 'Antalet tillgrepp på distans får inte överstiga totalt antal tillgrepp.');
  if (!bestulen) err('bestulen', 'Ange om du har blivit bestulen på stöldgods.');
  if (!fortsatt) err('fortsatt', 'Ange om du har för avsikt att fortsätta verksamheten.');
  if (!form.intyg.checked) err('intyg', 'Du måste intyga att uppgifterna är riktiga. Intygandet är obligatoriskt även om heder och samvete saknas.');

  if (errors.length) {
    errorBox.querySelector('ul').innerHTML = errors.map(([field, msg]) => {
      const target = form[field].id || form[field][0]?.closest('.field')?.querySelector('input')?.id || field;
      return `<li><a href="#${target}">${msg}</a></li>`;
    }).join('');
    errorBox.hidden = false;
    errorBox.focus();
    return;
  }
  errorBox.hidden = true;

  const netto = varde - ater;
  const avgift = Math.round(netto * AVGIFT);
  const tillagg = distans > 0 ? Math.round(netto * DISTANSTILLAGG) : 0;
  const avdragKofot = Math.min(kofot, KOFOT_MAX) * KOFOT_SCHABLON;
  const attBetala = Math.max(0, avgift + tillagg - avdragKofot);
  const arende = `TM-2026-${String(Math.floor(Math.random() * 1e7)).padStart(7, '0')}`;
  const ko = 40000 + Math.floor(Math.random() * 20000);
  const idag = new Date();

  const notes = [];
  if (kofot > KOFOT_MAX) notes.push(`Avdrag medges för högst ${KOFOT_MAX} kofötter per beskattningsår. Överskjutande kofötter (${kofot - KOFOT_MAX} st) har inte beaktats.`);
  if (ater > 0) notes.push('Återlämnande av misstag har registrerats. Upprepade misstag kan föranleda en kontroll av din yrkesskicklighet.');
  if (distans > 0) notes.push('Distanstillägg har tagits ut enligt TMFS 2019:12.');
  if (bestulen === 'ja') notes.push('Du har angett att du blivit bestulen på stöldgods. Gör en separat <a href="tjanst.html?id=404">anmälan om förlorat stöldgods</a> (TMV 404).');
  if (fortsatt === 'nej') notes.push('Kom ihåg att avregistrera din verksamhet. Avregistreringen har en handläggningstid på 14 månader, under vilken du förväntas fortsätta verksamheten.');
  if (fortsatt === 'vetej') notes.push('Du kommer att kallas till ett motiverande samtal med en handläggare.');
  if (antal === 0) notes.push('Du har inte genomfört några tillgrepp under beskattningsåret. Om detta beror på långa handläggningstider kan du <a href="tjanst.html?id=108">ansöka om förtur</a>.');

  receipt.innerHTML = `
    <h2>Din deklaration har kommit in</h2>
    <p>Spara eller skriv ut denna kvittens. Den är ditt enda bevis på att deklarationen har lämnats.</p>
    <dl>
      <dt>Ärendenummer</dt><dd>${arende}</dd>
      <dt>Deklarant</dt><dd>${trn.toUpperCase()}</dd>
      <dt>Inkommen</dt><dd>${idag.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}</dd>
      <dt>Plats i kön</dt><dd>${ko.toLocaleString('sv-SE')}</dd>
      <dt>Beräknat beslut</dt><dd>${addMonths(idag, 19)}</dd>
    </dl>
    <h3>Preliminär beräkning</h3>
    <div class="table-wrap"><table>
      <tbody>
        <tr><td>Sammanlagt godsvärde</td><td class="num">${kr(varde)}</td></tr>
        <tr><td>Avgår: återlämnat av misstag</td><td class="num">−${kr(ater)}</td></tr>
        <tr><td>Tillgreppsavgift (30 %)</td><td class="num">${kr(avgift)}</td></tr>
        <tr><td>Distanstillägg (2 %)</td><td class="num">${kr(tillagg)}</td></tr>
        <tr><td>Avdrag för kofötter (${Math.min(kofot, KOFOT_MAX)} st × ${KOFOT_SCHABLON} kr)</td><td class="num">−${kr(avdragKofot)}</td></tr>
        <tr><th>Preliminär tillgreppsavgift att betala</th><th class="num">${kr(attBetala)}</th></tr>
      </tbody>
    </table></div>
    ${notes.length ? `<h3>Upplysningar</h3><ul>${notes.map((n) => `<li>${n}</li>`).join('')}</ul>` : ''}
    <p>Beräkningen är preliminär. Slutlig tillgreppsavgift fastställs i beslutet. Betalning ska ske kontant och får inte ske med tillgripna medel.</p>
    <p class="no-print"><button class="btn" type="button" onclick="window.print()">Skriv ut kvittens</button>
      <button class="btn secondary" type="button" onclick="location.reload()">Lämna en ny deklaration</button></p>`;
  form.hidden = true;
  receipt.hidden = false;
  receipt.focus();
  window.scrollTo({ top: receipt.offsetTop - 16 });
});
