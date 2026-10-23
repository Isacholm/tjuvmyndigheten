// Kontrollera tjuvens behörighet (TMV 701). Svaret härleds ur numret, inget slås upp någonstans.

const form = document.getElementById('check');
const out = document.getElementById('check-result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fel = trnFel(form.trn.value);
  if (fel.length) {
    out.innerHTML = `<div class="errors"><h2 style="margin-top:0;font-size:19px">Registreringsnumret har fel format</h2><ul>${fel.map((f) => `<li>${f}</li>`).join('')}</ul></div>`;
    return;
  }
  const m = form.trn.value.match(/^TRN (\d{3})-(\d{3})$/);
  const digits = (m[1] + m[2]).split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  const trn = `TRN ${m[1]}-${m[2]}`;
  const year = 2020 + (sum % 6);

  const results = [
    ['receipt', 'Tjuven hade giltigt tillstånd',
      `${trn} hade giltigt inbrottstillstånd vid tidpunkten för tillgreppet. Tillgreppet har genomförts i enlighet med gällande föreskrifter. Ärendet föranleder ingen ytterligare åtgärd från myndighetens sida.`],
    ['errors', 'Registreringsnumret saknas i registret',
      `${trn} återfinns inte i tillgreppsregistret. Vederbörande kan ha bedrivit verksamhet utan tillstånd. Anmälan kan göras via e-tjänsten <a href="tjanst.html?id=703">Anmäl olicensierad tjuv</a> (TMV 703). Handläggningstid: 22 månader.`],
    ['box warn', 'Tillståndet hade löpt ut',
      `Tillståndet för ${trn} löpte ut i mars ${year}. Ansökan om förnyelse inkom dock i rätt tid, varför tillgreppet anses ha skett med behörighet.`],
  ];
  const [cls, title, text] = results[sum % 3];
  out.innerHTML = `<div class="${cls}"><h2 style="margin-top:0;font-size:19px">${title}</h2><p>${text}</p>
    <p style="font-size:14px;margin-bottom:0">Resultatet är preliminärt och kan komma att omprövas inom 36 månader.</p></div>`;
});
