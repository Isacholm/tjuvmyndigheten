// Gemensamt sidhuvud, sidfot och e-tjänstregister för Tjuvmyndigheten.

const NAV = [
  ['e-tjanster.html', 'E-tjänster'],
  ['stoldgodsdeklaration.html', 'Stöldgodsdeklaration'],
  ['arbeta-som-tjuv.html', 'Arbeta som tjuv'],
  ['bestulen.html', 'Har du blivit bestulen?'],
  ['handlaggningstider.html', 'Handläggningstider'],
  ['om-myndigheten.html', 'Om myndigheten'],
];

const CATEGORIES = {
  tillstand: 'Tillstånd och licenser',
  deklaration: 'Deklaration och redovisning',
  anmalan: 'Anmälningar och ärenden',
  arbete: 'För dig som arbetar som tjuv',
  bestulen: 'För dig som blivit bestulen',
  ovrigt: 'Övriga e-tjänster',
};

// id = blankettnummer (TMV xxx). time = normal handläggningstid.
const SERVICES = [
  // Tillstånd och licenser
  { id: '101', cat: 'tillstand', title: 'Ansök om inbrottstillstånd', time: '14–22 månader',
    desc: 'Ansök om tillstånd för planerat tillgrepp i annans bostad eller lokal.',
    extra: '<p>Ansökan ska vara myndigheten tillhanda senast 24 månader före det planerade tillgreppet. Ansökningar som inkommer senare än så behandlas i den ordning de inkommer, men beslutet kan komma att avse ett tillgrepp som redan genomförts.</p><p>Tillståndet är personligt och kan inte överlåtas. Tillståndet gäller endast den adress som anges i ansökan.</p>' },
  { id: '202', cat: 'tillstand', title: 'Förnya ficktjuvslicens', time: '9–11 månader',
    desc: 'Förnya din behörighet att bedriva ficktjuveriverksamhet i offentliga miljöer.',
    extra: '<p>Licensen gäller i fem år. Vid förnyelse krävs ett godkänt praktiskt prov i kollektivtrafik. Provet bokas separat och har för närvarande en kötid på 7 månader.</p><p>Du får fortsätta bedriva verksamhet under handläggningstiden om ansökan om förnyelse kommit in innan den tidigare licensen löpt ut.</p>' },
  { id: '103', cat: 'tillstand', title: 'Ansök om snattericertifikat', time: '31 veckor',
    desc: 'För dig som vill bedriva småskalig tillgreppsverksamhet.',
    extra: '<p>Certifikatet omfattar tillgrepp av varor till ett sammanlagt värde av högst ett halvt prisbasbelopp per kalenderår. Verksamhet som överstiger detta belopp kräver registrering som yrkestjuv (TMV 104).</p>' },
  { id: '104', cat: 'tillstand', title: 'Registrera yrkestjuv', time: '12–16 månader',
    desc: 'Anmäl att du avser bedriva organiserad tillgreppsverksamhet.',
    extra: '<p>Registrerade yrkestjuvar tilldelas ett tjuvregistreringsnummer (TRN) och är skyldiga att lämna årsredovisning för stöldverksamhet (TMV 307).</p>' },
  { id: '105', cat: 'tillstand', title: 'Ansök om utökat tillgreppsområde', time: '18 månader',
    desc: 'Utöka din befintliga licens till fler kommuner eller regioner.',
    extra: '<p>Varje ytterligare kommun prövas separat. Ansökan om utökning till Gotland handläggs av myndighetens regionkontor i Visby, som för närvarande är obemannat.</p>' },
  { id: '106', cat: 'tillstand', title: 'Ansök om nattligt verksamhetstillstånd', time: '10 månader',
    desc: 'För verksamhet som bedrivs utanför ordinarie kontorstid.',
    extra: '<p>Ordinarie kontorstid avser vardagar 08.00–16.30. Tillgrepp som genomförs utanför denna tid utan nattligt verksamhetstillstånd kan medföra en förseningsavgift.</p>' },
  { id: '107', cat: 'tillstand', title: 'Ansök om tillfällig stölddispens', time: '11 månader',
    desc: 'För enstaka tillgrepp vid särskilda tillfällen.',
    extra: '<p>Med särskilda tillfällen avses exempelvis bröllop, studentfirande och större idrottsevenemang. Ansökan ska ha kommit in senast nio månader före tillfället.</p>' },
  { id: '108', cat: 'tillstand', title: 'Ansök om förtur i inbrottskön', time: '18–20 månader',
    desc: 'För dig som har särskilt brådskande tillgreppsbehov.',
    extra: '<p>Ansökningar om förtur handläggs i turordning. Förtur kan inte beviljas för handläggningen av ansökan om förtur.</p>' },

  // Deklaration och redovisning
  { id: '301', cat: 'deklaration', title: 'Lämna stöldgodsdeklaration', time: '19 månader', start: 'stoldgodsdeklaration.html',
    desc: 'Redovisa tillgripen egendom under föregående beskattningsår.',
    extra: '<p>Stöldgodsdeklarationen ska lämnas senast den 2 maj året efter beskattningsåret. Deklarationen kan lämnas digitalt.</p><div class="box warn"><p><strong>Observera:</strong> Att inte deklarera sitt stöldgods kan medföra en administrativ sanktionsavgift. Själva stölden omfattas inte av denna bestämmelse.</p></div>' },
  { id: '302', cat: 'deklaration', title: 'Begär avdrag för kofot', time: '7–9 månader',
    desc: 'Gör avdrag för arbetsredskap som används i tillgreppsverksamhet.',
    extra: '<p>Schablonavdrag medges med 450 kronor per kofot, för högst tre kofötter per beskattningsår. Kofoten ska vara besiktigad enligt TMFS 2026:4. Kvitto i original ska bifogas. Kvittot får inte vara tillgripet.</p>' },
  { id: '303', cat: 'deklaration', title: 'Redovisa oredovisade tillgångar', time: '24 månader',
    desc: 'Rätta tidigare inlämnade stöldgodsdeklarationer.',
    extra: '<p>Om du frivilligt rättar en tidigare deklaration kan sanktionsavgiften sättas ned. Rättelsen ska avse egendom du faktiskt har tillgripit. Egendom du har övervägt att tillgripa redovisas inte.</p>' },
  { id: '404', cat: 'deklaration', title: 'Anmäl förlorat stöldgods', time: '13 månader',
    desc: 'För dig som själv blivit bestulen på tillgripen egendom.',
    extra: '<p>Anmälan avser egendom som du själv har tillgripit och därefter förlorat. Har du blivit bestulen på egendom som du ägt på annat sätt, se <a href="bestulen.html">Har du blivit bestulen?</a></p>' },
  { id: '505', cat: 'deklaration', title: 'Ansök om återbäring', time: '3–5 år',
    desc: 'Begär återbetalning av för mycket inbetald tillgreppsavgift.',
    extra: '<p>Återbäring betalas ut till det konto du har anmält. Konton som är öppnade i annans namn godtas inte.</p>' },
  { id: '306', cat: 'deklaration', title: 'Registrera tillgrepp som bisyssla', time: '8 månader',
    desc: 'För dig som stjäl vid sidan av ordinarie anställning.',
    extra: '<p>Din arbetsgivare kan komma att underrättas om bisysslan om den bedöms vara förtroendeskadlig.</p>' },
  { id: '307', cat: 'deklaration', title: 'Lämna årsredovisning för stöldverksamhet', time: '15 månader',
    desc: 'Obligatoriskt för registrerade yrkestjuvar.',
    extra: '<p>Årsredovisningen ska innehålla resultaträkning, balansräkning och en förvaltningsberättelse. Förvaltningsberättelsen får inte innehålla uppgifter om var godset förvaras.</p>' },
  { id: '308', cat: 'deklaration', title: 'Begär uppskov med stöldgodsdeklaration', time: '26 månader',
    desc: 'För dig som ännu inte hunnit inventera årets tillgrepp.',
    extra: '<p>Beslut om uppskov meddelas i regel efter att den ordinarie deklarationstiden har löpt ut.</p>' },

  // Anmälningar och ärenden
  { id: '401', cat: 'anmalan', title: 'Anmäl misslyckat inbrott', time: '7 månader',
    desc: 'Rapportera tillgrepp som inte kunnat genomföras enligt plan.',
    extra: '<p>Ett misslyckat inbrott förbrukar inte ditt inbrottstillstånd, under förutsättning att anmälan kommit in inom tre arbetsdagar.</p>' },
  { id: '402', cat: 'anmalan', title: 'Anmäl konkurrerande tjuv', time: '14–18 månader',
    desc: 'Om en annan tjuv redan hunnit före till din tilldelade egendom.',
    extra: '<h2>Har någon annan stulit det du tänkte stjäla?</h2><p>Som registrerad yrkestjuv har du rätt till en förutsägbar och konkurrensneutral tillgreppsmarknad.</p><p>Om en annan verksamhetsutövare har tillgripit egendom som omfattas av ditt tillstånd kan du lämna in en konkurrensanmälan.</p><div class="box warn"><p>Observera att Tjuvmyndigheten inte kan garantera att egendomen finns kvar när ärendet är färdigbehandlat.</p></div>' },
  { id: '403', cat: 'anmalan', title: 'Rapportera arbetsplatsolycka', time: '11 månader',
    desc: 'För dig som skadat dig under tillgreppsverksamhet.',
    extra: '<p>Med arbetsplats avses den bostad eller lokal där tillgreppet genomfördes. Fastighetsägaren underrättas inte.</p>' },
  { id: '405', cat: 'anmalan', title: 'Begär omprövning av beslag', time: '20 månader',
    desc: 'Om arbetsredskap eller verksamhetstillgångar omhändertagits.',
    extra: '<p>Omprövning kan endast begäras för beslag som gjorts av Tjuvmyndigheten. Beslag som gjorts av andra myndigheter omfattas inte av myndighetens ansvarsområde.</p>' },
  { id: '406', cat: 'anmalan', title: 'Anmäl ändrad tjuvadress', time: '5 månader',
    desc: 'Uppdatera din registrerade verksamhetsadress.',
    extra: '<p>Om du saknar fast adress kan du ange den adress där du senast genomförde ett tillgrepp.</p>' },
  { id: '407', cat: 'anmalan', title: 'Anmäl tillgrepp utanför tillståndsområde', time: '9 månader',
    desc: 'Självrättelse för verksamhet som bedrivits i fel kommun.',
    extra: '<p>Tillgrepp som genomförts i en kommun som gränsar till ditt tillståndsområde kan i vissa fall godkännas i efterhand.</p>' },
  { id: '408', cat: 'anmalan', title: 'Rapportera bristande stöldutbyte', time: '12 månader',
    desc: 'När resultatet av ett tillgrepp understiger förväntningarna.',
    extra: '<p>Myndigheten sammanställer uppgifterna i den årliga rapporten om stöldutbyte. Enskilda tillgrepp kompenseras inte.</p>' },
  { id: '409', cat: 'anmalan', title: 'Anmäl otillåten konkurrens', time: '16 månader',
    desc: 'När olicensierade tjuvar påverkar den lokala marknaden.',
    extra: '<p>Anmälan kan göras anonymt. Anonyma anmälare kan inte få återkoppling i ärendet.</p>' },

  // För dig som arbetar som tjuv
  { id: '601', cat: 'arbete', title: 'Ansök om tillfällig tillgreppsersättning', time: '6–10 månader',
    desc: 'Sjukpenning för dig som skadat dig under ett tillgrepp.',
    extra: '<p>Du kan ha rätt till tillfällig tillgreppsersättning om din arbetsförmåga är nedsatt med minst 25 procent. För att få ersättning krävs läkarintyg och giltig tjuvlicens.</p><p>Ersättning lämnas inte för den första dagen (karensdag) eller för dagar då tillgrepp ändå genomförts.</p>' },
  { id: '602', cat: 'arbete', title: 'Ansök om arbetslöshetsersättning', time: '8 månader',
    desc: 'För dig som varit utan tillgreppsuppdrag under en längre period.',
    extra: '<p>Du kan ha rätt till ersättning om du aktivt söker minst sex nya tillgreppsmöjligheter per månad. Sökta tillgreppsmöjligheter redovisas i en aktivitetsrapport senast den 14:e varje månad.</p>' },

  // För dig som blivit bestulen
  { id: '701', cat: 'bestulen', title: 'Kontrollera tjuvens behörighet', time: 'Direkt*', start: 'bestulen.html#kontroll',
    desc: 'Kontrollera att din tjuv hade giltigt tillstånd.',
    extra: '<p>* Resultatet är preliminärt och kan komma att omprövas inom 36 månader.</p>' },
  { id: '702', cat: 'bestulen', title: 'Begär tillgreppskvitto', time: '6–8 veckor',
    desc: 'Begär kvitto på genomfört tillgrepp.',
    extra: '<p>Som bestulen har du rätt att begära ett tillgreppskvitto. Kvittot visar datum, uppskattat värde och den ansvariga tjuvens registreringsnummer.</p>' },
  { id: '703', cat: 'bestulen', title: 'Anmäl olicensierad tjuv', time: '22 månader',
    desc: 'Om du misstänker att du blivit bestulen av en olicensierad tjuv.',
    extra: '<p>Observera att Tjuvmyndigheten inte hanterar återlämnande av egendom.</p>' },
  { id: '704', cat: 'bestulen', title: 'Spärra ditt stöldgods', time: '4 månader',
    desc: 'Spärra stulen egendom så att den inte kan stjälas igen av någon annan.',
    extra: '<p>Har du blivit av med din cykel? Spärra den i Tjuvmyndighetens register så att den inte kan stjälas igen av någon annan. Spärren gäller från och med beslutsdatum.</p>' },

  // Övriga e-tjänster
  { id: '801', cat: 'ovrigt', title: 'Beställ tjuvlegitimation', time: '40 veckor',
    desc: 'Beställ ett officiellt legitimationskort som visar att du är behörig att bedriva tillgreppsverksamhet.',
    extra: '<p>Legitimationen hämtas personligen på något av myndighetens servicekontor. Ta med giltig legitimation.</p>' },
  { id: '802', cat: 'ovrigt', title: 'Mina tillgrepp', time: '–',
    desc: 'En personlig översikt över tidigare stölder, pågående ärenden, licenser och deklarationer.',
    extra: '<p>Mina tillgrepp är för närvarande stängt på grund av att uppgifterna i tjänsten har tillgripits.</p>' },
  { id: '803', cat: 'ovrigt', title: 'Tillgreppskalendern', time: '–',
    desc: 'Se när din nästa tilldelade stöld ska genomföras.',
    extra: '<p>Planerade tillgrepp kan inte avbokas senare än fem arbetsdagar före genomförandet. Ombokning kan göras en gång per tillstånd.</p>' },
  { id: '804', cat: 'ovrigt', title: 'Anmäl jäv vid stöld', time: '2 år',
    desc: 'Om du känner personen du planerar att stjäla från kan du behöva anmäla jäv.',
    extra: '<p>Jäv föreligger om du är släkt med, har ett nära personligt förhållande till eller har ett ekonomiskt intresse i den egendom som ska tillgripas. Tillgreppet får inte genomföras innan jävsfrågan har prövats.</p>' },
  { id: '805', cat: 'ovrigt', title: 'Visselblåsarfunktionen', time: '9 månader',
    desc: 'Rapportera tjuvar som bryter mot myndighetens interna regler.',
    extra: '<p>Det kan exempelvis gälla tjuvar som lämnar tillbaka stöldgods, genomför tillgrepp utan tillstånd eller uppträder ärligt i tjänsten.</p>' },
  { id: '806', cat: 'ovrigt', title: 'Klaga hos Tjuvombudsmannen', time: '30 månader',
    desc: 'Om du anser att du behandlats orättvist av myndigheten.',
    extra: '<p>Tjuvombudsmannen är en oberoende tillsynsfunktion som granskar att tjuvar behandlas rättvist av myndigheten. Tjuvombudsmannen kan inte ändra myndighetens beslut.</p>' },
];

const NEWS = [
  { date: '2026-10-23', type: 'Pressmeddelande', title: 'Tjuvmyndigheten stärker samverkan med andra myndigheter',
    body: `<p>Tjuvmyndigheten har beslutat att inleda ett myndighetsövergripande samverkansarbete i syfte att förbättra informationsutbytet kring egendomsöverföringar.</p>
      <p>Bakgrunden är att flera verksamhetsutövare har upplevt svårigheter i kontakten med Polismyndigheten.</p>
      <p>– Vi ser ett tydligt behov av ökad samsyn. Det är olyckligt att en verksamhet som har godkänts av en myndighet kan ifrågasättas av en annan, säger Tjuvmyndighetens tillförordnade generaltjuvdirektör.</p>
      <p>Som ett första steg har myndigheten tillsatt en arbetsgrupp som ska utreda förutsättningarna för att bilda en styrgrupp. Styrgruppen ska i sin tur ta fram ett förslag till en gemensam samverkansmodell.</p>
      <p>Arbetet beräknas pågå till 2031.</p>
      <p>Polismyndigheten har inte tillfrågats om att delta.</p>` },
  { date: '2026-10-20', title: 'Nya regler för avdrag på kofötter träder i kraft den 1 januari',
    body: 'Från och med den 1 januari 2027 ska kofötter som används yrkesmässigt besiktigas vart tredje år för att vara avdragsgilla. Kofötter som köpts före 2020 omfattas av en övergångsregel. Läs mer i TMFS 2026:4.' },
  { date: '2026-10-17', title: 'Ny handlingsplan för jämställdhetsintegrering',
    body: 'Tjuvmyndigheten har beslutat om en ny handlingsplan för jämställdhetsintegrering för perioden 2026–2028. Bland annat införs lottning vid tilldelning av tillgreppsobjekt. <a href="om-myndigheten.html#jamstalldhet">Läs mer om vårt jämställdhetsarbete</a>' },
  { date: '2026-10-14', title: 'Tjuvmyndigheten varnar för oseriösa aktörer – allt fler stölder genomförs utan tillstånd',
    body: 'Andelen tillgrepp som genomförs utan giltigt tillstånd har ökat för tredje året i rad. Myndigheten uppmanar allmänheten att alltid kontrollera tjuvens behörighet.' },
  { date: '2026-10-02', title: 'Förlängda handläggningstider efter rekordmånga ansökningar om inbrottstillstånd',
    body: 'Under september kom det in fler ansökningar om inbrottstillstånd än under hela förra året. Handläggningstiden förlängs därför tillfälligt till 14–22 månader. Myndigheten beklagar eventuella olägenheter.' },
  { date: '2026-09-24', title: 'Ny rapport: Var tredje tjuv upplever att det blivit svårare att stjäla',
    body: 'I myndighetens årliga enkät uppger 34 procent av de registrerade yrkestjuvarna att det blivit svårare att stjäla. De vanligaste orsakerna är bättre lås, fler kameror och längre handläggningstider.' },
  { date: '2026-09-12', title: 'Vi byter lås på huvudkontoret',
    body: 'Under vecka 39 kan besökare uppleva begränsad tillgänglighet. Nycklar lämnas inte ut.' },
  { date: '2026-08-29', title: 'Myndighetens årsredovisning för 2025',
    body: 'Årsredovisningen kan för närvarande inte lokaliseras. Den som har information ombeds behålla den för sig själv.' },
];

// Visas på varje e-tjänstsida i respektive kategori.
const GOOD_TO_KNOW = {
  tillstand: ['Viktigt att veta innan du ansöker',
    'Ett beviljat tillstånd från Tjuvmyndigheten innebär inte automatiskt att verksamheten är tillåten enligt andra myndigheters regelverk. Du ansvarar själv för att inhämta eventuella kompletterande tillstånd från berörda myndigheter. Tjuvmyndigheten kan inte lämna besked om vilka övriga tillstånd som kan krävas.'],
  deklaration: ['Viktigt att veta om deklarationen',
    'Stöldgodsdeklarationen lämnas endast till Tjuvmyndigheten. Myndigheten lämnar inte ut uppgifter ur deklarationen till andra myndigheter och kan därför inte bekräfta för andra myndigheter att deklarationen har lämnats.'],
  anmalan: ['Viktigt att veta om ditt ärende',
    'Tjuvmyndigheten handlägger endast ärenden inom myndighetens eget ansvarsområde. Har ditt ärende samband med åtgärder från en annan myndighet, exempelvis ett gripande, ska du vända dig till den myndigheten.'],
  arbete: ['Viktigt att veta om ersättningen',
    'Ersättning från Tjuvmyndigheten samordnas inte med ersättningar från andra myndigheter. Tid i häkte eller kriminalvård räknas inte som aktivt sökande av tillgreppsmöjligheter.'],
  bestulen: ['Viktigt att veta',
    'Tjuvmyndigheten utreder inte brott. Vill du göra en polisanmälan ska du vända dig till Polismyndigheten. Tjuvmyndigheten kan inte vidarebefordra din anmälan.'],
  ovrigt: ['Viktigt att veta',
    'Handlingar som utfärdas av Tjuvmyndigheten, exempelvis tjuvlegitimation och tillgreppskvitto, godtas endast av Tjuvmyndigheten.'],
};

const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
const fmtDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
const svc = (id) => SERVICES.find((s) => s.id === id);
const svcUrl = (s) => `tjanst.html?id=${s.id}`;

function renderChrome() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const header = document.getElementById('site-header');
  if (header) {
    header.outerHTML = `
      <a class="skip" href="#main">Till innehållet</a>
      <div class="utility"><div class="wrap">
        <a href="#">Lyssna</a><a href="#">Lättläst</a><a href="#">Teckenspråk</a><a href="#">Other languages</a>
      </div></div>
      <header class="site"><div class="wrap">
        <a class="logo" href="./"><img src="assets/logo.svg" alt=""><span class="name">Tjuvmyndigheten<small>För en effektivare egendomsöverföring</small></span></a>
        <div class="tools">
          <form class="search" role="search">
            <input name="q" type="search" placeholder="Sök på webbplatsen" aria-label="Sök på webbplatsen">
            <button type="submit">Sök</button>
          </form>
          <a class="login" href="tjanst.html?id=802">Mina tillgrepp</a>
        </div>
      </div></header>
      <nav class="main" aria-label="Huvudmeny"><div class="wrap"><ul>
        ${NAV.map(([href, label]) => `<li><a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
      </ul></div></nav>
      <div class="notice" role="status"><div class="wrap">
        <strong>Driftstörning:</strong> E-tjänsten Mina tillgrepp är tillfälligt otillgänglig. Servern har tillgripits och vi arbetar med att återta den.
      </div></div>`;
    const form = document.querySelector('form.search');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.q.value = '';
      form.q.placeholder = 'Inga träffar. Vi har redan tagit dem.';
    });
  }
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.outerHTML = `
      <footer><div class="wrap">
        <div class="grid">
          <div><h4>Tjuvmyndigheten</h4><p style="margin:0">Det som är ditt är vårt.</p></div>
          <div><h4>Genvägar</h4><ul>
            <li><a href="e-tjanster.html">Alla e-tjänster</a></li>
            <li><a href="handlaggningstider.html">Handläggningstider</a></li>
            <li><a href="nyheter.html">Nyheter</a></li>
            <li><a href="vanliga-fragor.html">Vanliga frågor</a></li>
            <li><a href="om-myndigheten.html#kontakt">Kontakta oss</a></li>
          </ul></div>
          <div><h4>Om webbplatsen</h4><ul>
            <li><a href="#">Tillgänglighetsredogörelse</a></li>
            <li><a href="#">Kakor – vi tar dem</a></li>
            <li><a href="#">Så behandlar vi dina personuppgifter (som våra egna)</a></li>
          </ul></div>
          <div><h4>Följ oss</h4><ul><li>Vi följer dig.</li></ul></div>
        </div>
        <p class="fine">Webbplatsen drivs med <a href="https://fqa.9front.org/">9front</a>. Driftmiljön har upphandlats i enlighet med gällande regelverk.<br>Tjuvmyndigheten är inte en statlig myndighet och har ingen koppling till Polismyndigheten.</p>
      </div></footer>`;
  }
}

function card(s) {
  return `<div class="card"><span class="tag">TMV ${s.id}</span><h3><a href="${svcUrl(s)}">${s.title}</a></h3><p>${s.desc}</p></div>`;
}

function renderPopular(el) {
  el.innerHTML = el.dataset.ids.split(',').map((id) => card(svc(id))).join('');
}

function renderNews(el) {
  const n = Number(el.dataset.limit) || NEWS.length;
  el.innerHTML = NEWS.slice(0, n).map((a) =>
    `<li><time datetime="${a.date}">${fmtDate(a.date)}</time><a href="nyheter.html#${a.date}">${a.title}</a></li>`).join('');
}

function renderNewsArticles(el) {
  el.innerHTML = NEWS.map((a) =>
    `<article class="news-item" id="${a.date}"><time datetime="${a.date}">${a.type || 'Nyhet'} | ${fmtDate(a.date)}</time><h2>${a.title}</h2>${a.body.startsWith('<') ? a.body : `<p>${a.body}</p>`}</article>`).join('');
}

function renderCatalogue(el) {
  el.innerHTML = Object.entries(CATEGORIES).map(([cat, name]) => `
    <h2 id="${cat}">${name}</h2>
    <div class="table-wrap"><table class="catalogue">
      <thead><tr><th>Blankett</th><th>E-tjänst</th><th>Beskrivning</th></tr></thead>
      <tbody>${SERVICES.filter((s) => s.cat === cat).map((s) =>
        `<tr><td><span class="tag">TMV ${s.id}</span></td><td><a href="${svcUrl(s)}">${s.title}</a></td><td>${s.desc}</td></tr>`).join('')}
      </tbody></table></div>`).join('');
}

function renderTimes(el) {
  const rows = [...SERVICES].sort((a, b) => a.id.localeCompare(b.id)).filter((s) => s.time !== '–');
  el.innerHTML = `<div class="table-wrap"><table>
    <thead><tr><th>Blankett</th><th>Ärendetyp</th><th>Normal handläggningstid</th></tr></thead>
    <tbody>${rows.map((s) => `<tr><td><span class="tag">TMV ${s.id}</span></td><td><a href="${svcUrl(s)}">${s.title}</a></td><td>${s.time}</td></tr>`).join('')}</tbody>
    <caption>Uppdaterad 1 oktober 2026. Handläggningstiden avser den tid det tar att avgöra 80 procent av ärendena. Övriga 20 procent avgörs inte.</caption>
  </table></div>`;
}

function renderService(el) {
  const s = svc(new URLSearchParams(location.search).get('id'));
  if (!s) {
    el.innerHTML = `<div class="crumbs"><a href="./">Startsida</a><span aria-hidden="true">›</span><a href="e-tjanster.html">E-tjänster</a></div>
      <h1>E-tjänsten kunde inte hittas</h1><p class="ingress">Blankettnumret saknas eller har tillgripits. Se <a href="e-tjanster.html">alla e-tjänster</a>.</p>`;
    return;
  }
  document.title = `${s.title} – Tjuvmyndigheten`;
  el.innerHTML = `
    <div class="crumbs"><a href="./">Startsida</a><span aria-hidden="true">›</span><a href="e-tjanster.html">E-tjänster</a><span aria-hidden="true">›</span><a href="e-tjanster.html#${s.cat}">${CATEGORIES[s.cat]}</a></div>
    <h1>${s.title}</h1>
    <div class="meta"><span>Blankett <strong>TMV ${s.id}</strong></span><span>Handläggningstid <strong>${s.time}</strong></span></div>
    <div class="cols">
      <div class="prose">
        <p class="ingress">${s.desc}</p>
        ${s.extra || ''}
        <div class="box info"><h3>${GOOD_TO_KNOW[s.cat][0]}</h3><p>${GOOD_TO_KNOW[s.cat][1]}</p></div>
        <h2>Det här behöver du</h2>
        <ul>
          <li>Giltig tjuvlicens eller tjuvregistreringsnummer (TRN)</li>
          <li>Kvitton och intyg i original</li>
          <li>Ifylld förteckning över bilagor (TMV 900)</li>
        </ul>
        <h2>Så går det till</h2>
        <ol class="steps">
          <li>Fyll i e-tjänsten eller blanketten TMV ${s.id}.</li>
          <li>Bifoga de handlingar som efterfrågas.</li>
          <li>Skicka in ärendet. Du får en bekräftelse på att ärendet har kommit in.</li>
          <li>Invänta beslut. Du kan inte påskynda handläggningen genom att kontakta oss.</li>
        </ol>
        <p class="no-print">${s.start
          ? `<a class="btn" href="${s.start}">Starta e-tjänsten</a>`
          : `<button class="btn" type="button" id="start">Starta e-tjänsten</button>`}</p>
        <div class="box warn" id="closed" hidden><p><strong>E-tjänsten är tillfälligt stängd.</strong> Du kan i stället skicka in blanketten TMV ${s.id} per post. Blanketten beställs via e-tjänsten.</p></div>
      </div>
      <aside>
        <div class="box"><h3>Har du frågor?</h3><p>Läs våra <a href="vanliga-fragor.html">vanliga frågor</a>.</p></div>
        <div class="box"><h3>Relaterat</h3><ul style="margin:0;padding-left:18px">
          ${SERVICES.filter((o) => o.cat === s.cat && o.id !== s.id).slice(0, 4).map((o) => `<li><a href="${svcUrl(o)}">${o.title}</a></li>`).join('')}
        </ul></div>
      </aside>
    </div>`;
  const btn = document.getElementById('start');
  if (btn) btn.addEventListener('click', () => { document.getElementById('closed').hidden = false; });
}

const RENDERERS = { popular: renderPopular, news: renderNews, articles: renderNewsArticles,
                    catalogue: renderCatalogue, times: renderTimes, service: renderService };

renderChrome();
document.querySelectorAll('[data-render]').forEach((el) => RENDERERS[el.dataset.render](el));
