// Stöldgodsdeklaration (TMV 301). Uppgifterna kontrolleras i webbläsaren, inget skickas någonstans.
// E-tjänsten är stängd: efter kontrollen hänvisas deklaranten till blankett TMV 301.

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

  const antal = readInt(form, 'antal');
  const varde = readInt(form, 'varde');
  const ater = readInt(form, 'ater') ?? 0;
  const distans = readInt(form, 'distans') ?? 0;
  const kofot = readInt(form, 'kofot') ?? 0;
  const bestulen = form.bestulen.value;
  const fortsatt = form.fortsatt.value;

  for (const f of trnFel(form.trn.value)) err('trn', `Tjuvregistreringsnummer: ${f}`);
  if (antal === null || !Number.isInteger(antal) || antal < 0) err('antal', 'Ange totalt antal genomförda tillgrepp som ett heltal.');
  if (varde === null || !Number.isInteger(varde) || varde < 0) err('varde', 'Ange sammanlagt uppskattat godsvärde i hela kronor.');
  for (const [name, v] of [['ater', ater], ['distans', distans], ['kofot', kofot]]) {
    if (!Number.isInteger(v) || v < 0) err(name, 'Värdet måste vara ett heltal som är noll eller större.');
  }
  if (antal === 0 && varde > 0) err('varde', 'Godsvärde kan inte uppstå utan tillgrepp. Har godset uppkommit på annat sätt ska kontakt tas med annan myndighet.');
  if (varde !== null && ater > varde) err('ater', 'Återlämnat gods får inte överstiga totalt godsvärde. Har mer gods återlämnats än vad som har tillgripits ska Visselblåsarfunktionen kontaktas.');
  if (antal !== null && distans > antal) err('distans', 'Antalet tillgrepp på distans får inte överstiga totalt antal tillgrepp.');
  if (!bestulen) err('bestulen', 'Ange om du har blivit bestulen på stöldgods.');
  if (!fortsatt) err('fortsatt', 'Ange om du har för avsikt att fortsätta verksamheten.');
  if (!form.intyg.checked) err('intyg', 'Uppgifternas riktighet ska intygas. Intygandet är obligatoriskt även i de fall heder och samvete saknas.');

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

  // Uppgifterna har kontrollerats. E-tjänsten är dock stängd, varför deklarationen lämnas på blankett.
  receipt.className = 'box warn';
  receipt.style.maxWidth = '680px';
  receipt.innerHTML = `
    <h2 style="margin-top:0">E-tjänsten är tillfälligt stängd</h2>
      <p>Uppgifterna i deklarationen har kontrollerats och befunnits vara formellt riktiga. Deklarationen kan dock inte tas emot, då e-tjänsten för närvarande är stängd.</p>
      <p>Deklarationen ska i stället lämnas på blankett TMV 301, med tillhörande bilagor, i någon av myndighetens <a href="doda-brevlador.html">döda brevlådor</a>. De uppgifter som har lämnats i e-tjänsten sparas inte och ska därför lämnas på nytt.</p>
      <p class="no-print" style="margin-bottom:0"><a class="btn" href="tjanst.html?id=301">Skriv ut blankett TMV 301</a></p>`;
  form.hidden = true;
  receipt.hidden = false;
  receipt.focus();
  window.scrollTo({ top: receipt.offsetTop - 16 });
});
