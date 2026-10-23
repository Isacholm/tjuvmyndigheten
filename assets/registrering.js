// Registrera yrkestjuv (TMV 104). Uppgifterna kontrolleras i webbläsaren, inget skickas eller sparas någonstans.
// E-tjänsten är stängd: efter kontrollen hänvisas sökanden till blankett TMV 104.

const norm = (t) => t.trim().replace(/\s+/g, ' ').toLowerCase();
const form = document.getElementById('reg');
const errorBox = document.getElementById('errors');
const receipt = document.getElementById('kvitto');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors = [];
  const err = (field, msg) => errors.push([field, msg]);
  const namn = form.namn.value.trim();
  const namnof = form.namnof.value.trim();
  if (!namn) err('namn', 'Namn saknas.');
  if (!namnof) err('namnof', 'Namnoförtydligande saknas.');
  else if (namn && norm(namnof) !== norm(namn)) err('namnof', 'Namnoförtydligandet överensstämmer inte med namnet.');
  if (!form.adress.value.trim()) err('adress', 'Verksamhetsadress saknas.');
  if (!form.typ.value) err('typ', 'Ange typ av verksamhet.');
  if (!form.kommun.value.trim()) err('kommun', 'Ange kommun för tillståndsområdet.');
  if (!form.tidigare.value) err('tidigare', 'Ange om du tidigare har varit registrerad som yrkestjuv.');
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

  // Uppgifterna har kontrollerats. E-tjänsten är dock stängd, varför ansökan lämnas på blankett.
  receipt.className = 'box warn';
  receipt.style.maxWidth = '680px';
  receipt.innerHTML = `
    <h2 style="margin-top:0">E-tjänsten är tillfälligt stängd</h2>
    <p>Uppgifterna i ansökan har kontrollerats och befunnits vara formellt riktiga. Ansökan kan dock inte tas emot, då e-tjänsten för närvarande är stängd.</p>
    <p>Ansökan ska i stället lämnas på blankett TMV 104, med tillhörande bilagor, i någon av myndighetens <a href="doda-brevlador.html">döda brevlådor</a>. De uppgifter som har lämnats i e-tjänsten sparas inte och ska därför lämnas på nytt.</p>
    <p class="no-print" style="margin-bottom:0"><a class="btn" href="tjanst.html?id=104">Skriv ut blankett TMV 104</a></p>`;
  form.hidden = true;
  receipt.hidden = false;
  receipt.focus();
  window.scrollTo({ top: receipt.offsetTop - 16 });
});
