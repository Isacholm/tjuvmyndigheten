// Kontrollera tjuvens behörighet (TMV 701). Svaret hämtas ur en liten fiktiv förteckning, inget slås upp någonstans.
// Nummer som inte finns i förteckningen saknas i registret.

const GILTIGT = 'Tjuven hade giltigt tillstånd';
const REGISTER = {
  'TRN 123-456': ['box info', 'EXEMPELTJUV', 'TRN 123-456 tillhör myndighetens exempeltjuv. Numret används i myndighetens anvisningar för att visa formatet och avser inte en faktisk yrkestjuv. Exempeltjuven innehar inte något tillstånd, varför tillgrepp som har genomförts under detta nummer har skett utan behörighet.'],
  'TRN 314-159': ['receipt', GILTIGT, 'TRN 314-159 innehade vid tidpunkten för tillgreppet giltigt inbrottstillstånd (TMV 101) avseende Uppsala kommun, giltigt till och med den 30 juni 2027. Tillgreppet har genomförts i enlighet med gällande föreskrifter. Ärendet föranleder ingen ytterligare åtgärd från myndighetens sida.'],
  'TRN 271-828': ['receipt', GILTIGT, 'TRN 271-828 innehade vid tidpunkten för tillgreppet giltig ficktjuvslicens (TMV 202) avseende Stockholms tunnelbana, giltig till och med den 31 mars 2029. Licensen omfattar inte pendeltåg.'],
  'TRN 161-803': ['receipt', GILTIGT, 'TRN 161-803 innehade vid tidpunkten för tillgreppet giltigt snattericertifikat (TMV 103) avseende Malmö kommun. Certifikatet omfattar tillgrepp till ett sammanlagt värde av högst ett halvt prisbasbelopp per kalenderår. Myndigheten kan inte lämna besked om huruvida beloppet har överskridits.'],
  'TRN 602-214': ['receipt', GILTIGT, 'TRN 602-214 innehade vid tidpunkten för tillgreppet giltigt inbrottstillstånd (TMV 101) avseende Göteborgs kommun samt nattligt verksamhetstillstånd (TMV 106). Tillgreppet har genomförts i enlighet med gällande föreskrifter, även om det har skett utanför ordinarie kontorstid.'],
  'TRN 141-421': ['box warn', 'Tillståndet hade löpt ut', 'Tillståndet för TRN 141-421 löpte ut i mars 2025. Ansökan om förnyelse inkom dock i rätt tid, varför tillgreppet anses ha skett med behörighet.'],
  'TRN 173-205': ['errors', 'Tillståndet hade löpt ut', 'Tillståndet för TRN 173-205 löpte ut i september 2024. Någon ansökan om förnyelse har inte inkommit, varför vederbörande saknade behörighet vid tidpunkten för tillgreppet. Anmälan kan göras via e-tjänsten <a href="tjanst.html?id=703">Anmäl olicensierad tjuv</a> (TMV 703).'],
  'TRN 109-109': ['box warn', 'Tillståndet omfattade inte tillgreppet', 'TRN 109-109 innehar endast tillstånd för tillgrepp ur kakburk (TMV 109). Tillståndet omfattar inte tillgrepp i bostad, varför tillgreppet har skett utan tillstånd. Avsåg tillgreppet kakor bedöms tillgreppet ha skett med behörighet, under förutsättning att den sista kakan har lämnats kvar.'],
  'TRN 404-404': ['box warn', 'Registerposten kunde inte hittas', 'TRN 404-404 återfinns i tillgreppsregistret. Registerposten har dock förlagts, varför myndigheten inte kan lämna besked om vederbörandes behörighet.'],
};


const form = document.getElementById('check');
const out = document.getElementById('check-result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fel = trnFel(form.trn.value);
  if (fel.length) {
    out.innerHTML = `<div class="errors"><h2 style="margin-top:0;font-size:19px">Registreringsnumret har fel format</h2><ul>${fel.map((f) => `<li>${f}</li>`).join('')}</ul></div>`;
    return;
  }
  const trn = form.trn.value;
  const [cls, title, text] = REGISTER[trn] || ['errors', 'Registreringsnumret saknas i registret',
    `${trn} återfinns inte i tillgreppsregistret. Vederbörande kan ha bedrivit verksamhet utan tillstånd. Anmälan kan göras via e-tjänsten <a href="tjanst.html?id=703">Anmäl olicensierad tjuv</a> (TMV 703). Handläggningstid: 22 månader.`];
  out.innerHTML = `<div class="${cls}"><h2 style="margin-top:0;font-size:19px">${title}</h2><p>${text}</p>
    <p style="font-size:14px;margin-bottom:0">Resultatet är preliminärt och kan komma att omprövas inom 36 månader.</p></div>`;
});
