// Gemensamt sidhuvud, sidfot och e-tjänstregister för Tjuvmyndigheten.

const NAV = [
  ['e-tjanster.html', 'E-tjänster'],
  ['stoldgodsdeklaration.html', 'Stöldgodsdeklaration'],
  ['arbeta-som-tjuv.html', 'Arbeta som tjuv'],
  ['bestulen.html', 'Har du blivit bestulen?'],
  ['handlaggningstider.html', 'Handläggningstider'],
  ['nyheter.html', 'Nyheter'],
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
    desc: 'Ansökan om tillstånd för planerat tillgrepp i annans bostad eller lokal.',
    extra: '<p>Ansökan ska vara myndigheten tillhanda senast 24 månader före det planerade tillgreppet. Ansökningar som inkommer därefter handläggs i den ordning de inkommer, varvid beslutet kan komma att avse ett tillgrepp som redan har genomförts.</p><p>Tillståndet är personligt och kan inte överlåtas. Tillståndet gäller uteslutande den adress som anges i ansökan.</p>' },
  { id: '202', cat: 'tillstand', title: 'Förnya ficktjuvslicens', time: '9–11 månader',
    desc: 'Förnyelse av behörighet att bedriva ficktjuveriverksamhet i offentliga miljöer.',
    extra: '<p>Licensen äger giltighet i fem år. Förnyelse förutsätter ett godkänt praktiskt prov i kollektivtrafik. Provet bokas separat och har för närvarande en kötid om 7 månader.</p><p>Verksamheten får fortgå under handläggningstiden, under förutsättning att ansökan om förnyelse har inkommit innan den tidigare licensen har löpt ut.</p>' },
  { id: '103', cat: 'tillstand', title: 'Ansök om snattericertifikat', time: '31 veckor',
    desc: 'Avser den som har för avsikt att bedriva tillgreppsverksamhet i mindre omfattning.',
    extra: '<p>Certifikatet omfattar tillgrepp av varor till ett sammanlagt värde av högst ett halvt prisbasbelopp per kalenderår. Verksamhet som överstiger nämnda belopp förutsätter registrering som yrkestjuv (TMV 104).</p>' },
  { id: '104', cat: 'tillstand', title: 'Registrera yrkestjuv', time: '12–16 månader',
    desc: 'Anmälan om avsikt att bedriva organiserad tillgreppsverksamhet.',
    extra: '<p>Registrerade yrkestjuvar tilldelas ett tjuvregistreringsnummer (TRN). Det åligger registrerade yrkestjuvar att årligen ge in årsredovisning för stöldverksamhet (TMV 307).</p>' },
  { id: '105', cat: 'tillstand', title: 'Ansök om utökat tillgreppsområde', time: '18 månader',
    desc: 'Utökning av befintlig licens till att omfatta ytterligare kommuner eller regioner.',
    extra: '<p>Varje ytterligare kommun blir föremål för separat prövning. Ansökan om utökning till Gotland handläggs av myndighetens regionkontor i Visby, vilket för närvarande är obemannat.</p>' },
  { id: '106', cat: 'tillstand', title: 'Ansök om nattligt verksamhetstillstånd', time: '10 månader',
    desc: 'För verksamhet som bedrivs utanför ordinarie kontorstid.',
    extra: '<p>Ordinarie kontorstid avser vardagar 08.00–16.30. Tillgrepp som genomförs utanför nämnda tid utan nattligt verksamhetstillstånd kan föranleda en förseningsavgift.</p>' },
  { id: '107', cat: 'tillstand', title: 'Ansök om tillfällig stölddispens', time: '11 månader',
    desc: 'Avser enstaka tillgrepp i samband med särskilda tillfällen.',
    extra: '<p>Med särskilda tillfällen avses exempelvis bröllop, studentfirande och större idrottsevenemang. Ansökan ska ha inkommit senast nio månader före det aktuella tillfället.</p>' },
  { id: '108', cat: 'tillstand', title: 'Ansök om förtur i inbrottskön', time: '18–20 månader',
    desc: 'Avser den som har ett särskilt brådskande tillgreppsbehov.',
    extra: '<p>Ansökningar om förtur handläggs i turordning. Förtur kan inte beviljas för handläggningen av ansökan om förtur.</p>' },
  { id: '109', cat: 'tillstand', title: 'Ansök om tillstånd för tillgrepp ur kakburk', time: '6–8 veckor',
    desc: 'Ansökan om tillstånd att tillgripa kakor ur kakburk i hemmet, på arbetsplatsen eller i fikarum.',
    extra: '<p>Tillståndet omfattar kakor som förvaras i kakburk, på kakfat eller i kakask. För kakor som förvaras i skafferi erfordras <a href="tjanst.html?id=101">inbrottstillstånd</a> (TMV 101). Tillgrepp i fikarum på arbetsplatsen får endast ske under ordinarie fikatid.</p><p>Tillgrepp som genomförs utanför ordinarie kontorstid förutsätter därutöver <a href="tjanst.html?id=106">nattligt verksamhetstillstånd</a> (TMV 106).</p><p>Tillståndet omfattar högst en kaka per tillfälle. Den sista kakan omfattas inte av tillståndet.</p><p>Den som blir <a href="tjanst.html?id=403">fångad med fingrarna i kakburken</a> ska rapportera händelsen som en arbetsplatsolycka (TMV 403).</p>' },

  // Deklaration och redovisning
  { id: '301', cat: 'deklaration', title: 'Lämna stöldgodsdeklaration', time: '19 månader', start: 'stoldgodsdeklaration.html',
    desc: 'Redovisning av egendom som har tillgripits under föregående beskattningsår.',
    extra: '<p>Stöldgodsdeklarationen ska ha inkommit senast den 2 maj året efter beskattningsåret. Deklarationen kan ges in digitalt.</p><div class="box warn"><p><strong>Observera:</strong> Underlåtenhet att deklarera stöldgods kan föranleda en administrativ sanktionsavgift. Själva tillgreppet omfattas inte av denna bestämmelse.</p></div>' },
  { id: '302', cat: 'deklaration', title: 'Begär avdrag för kofot', time: '7–9 månader',
    desc: 'Avdrag för arbetsredskap som nyttjas i tillgreppsverksamhet.',
    extra: '<p>Schablonavdrag medges med 450 kronor per kofot, för högst tre kofötter per beskattningsår. Kofoten ska vara besiktigad i enlighet med TJUVFS 2026:4. Kvitto i original ska bifogas. Kvittot får inte vara tillgripet.</p>' },
  { id: '303', cat: 'deklaration', title: 'Redovisa oredovisade tillgångar', time: '24 månader',
    desc: 'Rättelse av tidigare ingivna stöldgodsdeklarationer.',
    extra: '<p>Vid frivillig rättelse av en tidigare deklaration kan sanktionsavgiften komma att nedsättas. Rättelsen ska avse egendom som faktiskt har tillgripits. Egendom som deklaranten enbart har övervägt att tillgripa ska inte redovisas.</p>' },
  { id: '404', cat: 'deklaration', title: 'Anmäl förlorat stöldgods', time: '13 månader',
    desc: 'Avser den som själv har blivit bestulen på tillgripen egendom.',
    extra: '<p>Anmälan avser egendom som anmälaren själv har tillgripit och därefter förlorat. Avser förlusten egendom som innehafts på annan grund, se <a href="bestulen.html">Har du blivit bestulen?</a></p>' },
  { id: '505', cat: 'deklaration', title: 'Ansök om återbäring', time: '3–5 år',
    desc: 'Återbetalning av för mycket inbetald tillgreppsavgift.',
    extra: '<p>Återbäring utbetalas till anmält konto. Konton som har öppnats i annans namn godtas inte.</p>' },
  { id: '306', cat: 'deklaration', title: 'Registrera tillgrepp som bisyssla', time: '8 månader',
    desc: 'Avser den som bedriver tillgreppsverksamhet vid sidan av ordinarie anställning.',
    extra: '<p>Arbetsgivaren kan komma att underrättas om bisysslan därest denna bedöms vara förtroendeskadlig.</p>' },
  { id: '307', cat: 'deklaration', title: 'Lämna årsredovisning för stöldverksamhet', time: '15 månader',
    desc: 'Obligatoriskt för registrerade yrkestjuvar.',
    extra: '<p>Årsredovisningen ska innehålla resultaträkning, balansräkning och en förvaltningsberättelse. Förvaltningsberättelsen får inte innehålla uppgift om var godset förvaras.</p>' },
  { id: '308', cat: 'deklaration', title: 'Begär uppskov med stöldgodsdeklaration', time: '26 månader',
    desc: 'Avser den som ännu inte har hunnit inventera årets tillgrepp.',
    extra: '<p>Beslut om uppskov meddelas i regel efter att den ordinarie deklarationstiden har löpt ut.</p>' },

  // Anmälningar och ärenden
  { id: '401', cat: 'anmalan', title: 'Anmäl misslyckat inbrott', time: '7 månader',
    desc: 'Rapportering av tillgrepp som inte har kunnat genomföras enligt plan.',
    extra: '<p>Ett misslyckat inbrott medför inte att inbrottstillståndet förbrukas, under förutsättning att anmälan har inkommit inom tre arbetsdagar.</p>' },
  { id: '402', cat: 'anmalan', title: 'Anmäl konkurrerande tjuv', time: '14–18 månader',
    desc: 'Avser fall där annan tjuv har tillgripit egendom som tilldelats anmälaren.',
    extra: '<h2>Har någon annan stulit det du tänkte stjäla?</h2><p>Registrerade yrkestjuvar äger rätt till en förutsägbar och konkurrensneutral tillgreppsmarknad.</p><p>Har annan verksamhetsutövare tillgripit egendom som omfattas av ditt tillstånd kan en konkurrensanmälan ges in.</p><div class="box warn"><p>Observera att Tjuvmyndigheten inte kan garantera att egendomen finns i behåll när ärendet har slutbehandlats.</p></div>' },
  { id: '403', cat: 'anmalan', title: 'Rapportera arbetsplatsolycka', time: '11 månader',
    desc: 'Avser den som har ådragit sig skada i tillgreppsverksamhet.',
    extra: '<p>Med arbetsplats avses den bostad eller lokal där tillgreppet genomfördes. Fastighetsägaren underrättas inte.</p>' },
  { id: '405', cat: 'anmalan', title: 'Begär omprövning av beslag', time: '20 månader',
    desc: 'Avser fall där arbetsredskap eller verksamhetstillgångar har omhändertagits.',
    extra: '<p>Omprövning kan endast begäras avseende beslag som har verkställts av Tjuvmyndigheten. Beslag som har verkställts av annan myndighet faller utanför myndighetens ansvarsområde.</p>' },
  { id: '406', cat: 'anmalan', title: 'Anmäl ändrad tjuvadress', time: '5 månader',
    desc: 'Ändring av registrerad verksamhetsadress.',
    extra: '<p>Saknar anmälaren fast adress kan den adress där det senaste tillgreppet genomfördes anges.</p>' },
  { id: '407', cat: 'anmalan', title: 'Anmäl tillgrepp utanför tillståndsområde', time: '9 månader',
    desc: 'Självrättelse avseende verksamhet som har bedrivits i fel kommun.',
    extra: '<p>Tillgrepp som har genomförts i en kommun som gränsar till tillståndsområdet kan i vissa fall godkännas i efterhand.</p>' },
  { id: '408', cat: 'anmalan', title: 'Rapportera bristande stöldutbyte', time: '12 månader',
    desc: 'Avser fall där utbytet av ett tillgrepp understiger förväntningarna.',
    extra: '<p>Uppgifterna sammanställs i myndighetens årliga rapport om stöldutbyte. Ersättning för enskilda tillgrepp utgår inte.</p>' },
  { id: '409', cat: 'anmalan', title: 'Anmäl otillåten konkurrens', time: '16 månader',
    desc: 'Avser fall där olicensierade tjuvar påverkar den lokala marknaden.',
    extra: '<p>Anmälan kan göras anonymt. Anonyma anmälare kan inte erhålla återkoppling i ärendet.</p>' },

  // För dig som arbetar som tjuv
  { id: '601', cat: 'arbete', title: 'Ansök om tillfällig tillgreppsersättning', time: '6–10 månader',
    desc: 'Sjukpenning för den som har ådragit sig skada i samband med ett tillgrepp.',
    extra: '<p>Rätt till tillfällig tillgreppsersättning kan föreligga därest arbetsförmågan är nedsatt med minst 25 procent. För ersättning erfordras läkarintyg samt giltig tjuvlicens.</p><p>Ersättning utgår inte för den första dagen (karensdag) eller för dagar då tillgrepp likväl har genomförts.</p>' },
  { id: '602', cat: 'arbete', title: 'Ansök om arbetslöshetsersättning', time: '8 månader',
    desc: 'Avser den som har varit utan tillgreppsuppdrag under en längre period.',
    extra: '<p>Rätt till ersättning kan föreligga under förutsättning att sökanden aktivt söker minst sex nya tillgreppsmöjligheter per kalendermånad. Sökta tillgreppsmöjligheter redovisas i en aktivitetsrapport senast den 14:e varje månad.</p>' },

  // För dig som blivit bestulen
  { id: '701', cat: 'bestulen', title: 'Kontrollera tjuvens behörighet', time: 'Direkt*', start: 'bestulen.html#kontroll',
    desc: 'Kontroll av att vederbörande innehade giltigt tillstånd.',
    extra: '<p>* Resultatet är preliminärt och kan komma att omprövas inom 36 månader.</p>' },
  { id: '702', cat: 'bestulen', title: 'Begär tillgreppskvitto', time: '6–8 veckor',
    desc: 'Begäran om kvitto avseende genomfört tillgrepp.',
    extra: '<p>Den som har blivit bestulen äger rätt att begära ett tillgreppskvitto. Av kvittot framgår datum för tillgreppet, uppskattat värde samt den ansvariga tjuvens registreringsnummer.</p>' },
  { id: '703', cat: 'bestulen', title: 'Anmäl olicensierad tjuv', time: '22 månader',
    desc: 'Avser fall där tillgreppet misstänks ha genomförts av en olicensierad tjuv.',
    extra: '<p>Observera att återlämnande av egendom inte omfattas av Tjuvmyndighetens uppdrag.</p>' },
  { id: '704', cat: 'bestulen', title: 'Spärra ditt stöldgods', time: '4 månader',
    desc: 'Spärr av tillgripen egendom i syfte att förhindra att den på nytt tillgrips av annan.',
    extra: '<p>Tillgripen egendom, exempelvis en cykel, kan spärras i Tjuvmyndighetens register i syfte att förhindra att den på nytt tillgrips av annan. Spärren gäller från och med beslutsdagen.</p>' },

  // Övriga e-tjänster
  { id: '801', cat: 'ovrigt', title: 'Beställ tjuvlegitimation', time: '40 veckor',
    desc: 'Beställning av officiellt legitimationskort som utvisar behörighet att bedriva tillgreppsverksamhet.',
    extra: '<p>Legitimationen ska avhämtas personligen vid något av myndighetens servicekontor. Giltig legitimation ska uppvisas vid avhämtning.</p>' },
  { id: '802', cat: 'ovrigt', title: 'Mina tillgrepp', time: '–',
    desc: 'Personlig översikt avseende tidigare tillgrepp, pågående ärenden, licenser och deklarationer.',
    extra: '<p>Mina tillgrepp är för närvarande stängt i avvaktan på att uppgifterna i tjänsten har återfunnits.</p>' },
  { id: '803', cat: 'ovrigt', title: 'Tillgreppskalendern', time: '–',
    desc: 'Uppgift om när nästa tilldelade tillgrepp ska genomföras.',
    extra: '<p>Planerade tillgrepp kan inte avbokas senare än fem arbetsdagar före genomförandet. Ombokning medges en gång per tillstånd.</p>' },
  { id: '804', cat: 'ovrigt', title: 'Anmäl jäv vid stöld', time: '2 år',
    desc: 'Anmälan om jäv i fall där personlig relation föreligger till den som ska bestjälas.',
    extra: '<p>Jäv föreligger om den som avser att genomföra tillgreppet är släkt med eller har ett nära personligt förhållande till vederbörande, eller har ett ekonomiskt intresse i den egendom som ska tillgripas. Tillgreppet får inte verkställas innan jävsfrågan har prövats.</p>' },
  { id: '805', cat: 'ovrigt', title: 'Visselblåsarfunktionen', time: '9 månader',
    desc: 'Rapportering av tjuvar som bryter mot myndighetens interna regler.',
    extra: '<p>Rapporteringen kan exempelvis avse tjuvar som återlämnar stöldgods, genomför tillgrepp utan tillstånd eller uppträder ärligt i tjänsten.</p>' },
  { id: '806', cat: 'ovrigt', title: 'Klaga hos Tjuvombudsmannen', time: '30 månader',
    desc: 'Avser den som anser sig ha blivit orättvist behandlad av myndigheten.',
    extra: '<p>Tjuvombudsmannen är en oberoende tillsynsfunktion som granskar att tjuvar behandlas rättvist av myndigheten. Tjuvombudsmannen saknar befogenhet att ändra myndighetens beslut.</p>' },
];

const NEWS = [
  { date: '2026-10-23', type: 'Pressmeddelande', title: 'Tjuvmyndigheten stärker samverkan med andra myndigheter',
    body: `<p>Tjuvmyndigheten har beslutat att inleda ett myndighetsövergripande samverkansarbete i syfte att förbättra informationsutbytet kring egendomsöverföringar.</p>
      <p>Beslutet har föranletts av att flera verksamhetsutövare har upplevt svårigheter i kontakten med Polismyndigheten.</p>
      <p>– Myndigheten ser ett tydligt behov av ökad samsyn. Det är olyckligt att en verksamhet som har godkänts av en myndighet kan ifrågasättas av en annan, säger Tjuvmyndighetens tillförordnade generaltjuvdirektör.</p>
      <p>Som ett första steg har myndigheten tillsatt en arbetsgrupp med uppdrag att utreda förutsättningarna för att bilda en styrgrupp. Det åligger i sin tur styrgruppen att ta fram ett förslag till en gemensam samverkansmodell.</p>
      <p>Arbetet beräknas pågå till och med 2031.</p>
      <p>Polismyndigheten har inte tillfrågats om deltagande.</p>` },
  { date: '2026-10-22', type: 'Pressmeddelande', title: 'Tjuvmyndigheten förbättrar tillgängligheten på webbplatsen',
    body: `<p>Tjuvmyndigheten har vidtagit ett flertal åtgärder i syfte att öka webbplatsens tillgänglighet. Målsättningen är att var och en, oavsett funktionsförmåga, ska kunna ta del av information om tillgreppsverksamhet på lika villkor.</p>
      <p>Under <strong>Lättläst</strong> återges texten i dubbel storlek och i ett typsnitt som av myndighetens interna utredning har bedömts vara särskilt lättläst. Innehållet har inte förenklats, då det redan bedöms vara enkelt.</p>
      <p>Under <strong>Teckenspråk</strong> återges webbplatsen i sin helhet i transkriberat svenskt teckenspråk. Ord som saknar etablerat tecken bokstaveras. Videor med teckenspråkstolk kan inte tillhandahållas, då upphandlingen av tolktjänster har blivit föremål för överprövning.</p>
      <p>Funktionen <strong>Lyssna</strong> återger sidans innehåll i morsekod. Uppläsningen av startsidan tar cirka 15 minuter i anspråk. Valet av morsekod har motiverats av att det är det enda uppläsningsformat som inte förutsätter en extern tjänst. Besökarnas uppgifter tillgrips därmed inte av annan.</p>
      <p>– Tillgänglighet är en rättighet. Var och en ska ha samma möjlighet att förstå vad som har tagits ifrån dem, säger Tjuvmyndighetens tillförordnade generaltjuvdirektör.</p>
      <p>Information på andra språk är under uppbyggnad. <a href="other-languages.html">Läs mer om andra språk</a></p>
      <p>Myndigheten mottar gärna synpunkter avseende webbplatsens tillgänglighet. Synpunkter lämnas till <a href="tjanst.html?id=806">Tjuvombudsmannen</a>.</p>` },
  { date: '2026-10-20', title: 'Nya regler för avdrag på kofötter träder i kraft den 1 januari',
    body: 'Från och med den 1 januari 2027 ska kofötter som nyttjas yrkesmässigt besiktigas vart tredje år för att avdrag ska medges. För kofötter som har förvärvats före 2020 gäller en övergångsbestämmelse. Se vidare TJUVFS 2026:4.' },
  { date: '2026-10-17', title: 'Ny handlingsplan för jämställdhetsintegrering',
    body: 'Tjuvmyndigheten har beslutat om en ny handlingsplan för jämställdhetsintegrering avseende perioden 2026–2028. Handlingsplanen innebär bland annat att lottning införs vid tilldelning av tillgreppsobjekt. <a href="om-myndigheten.html#jamstalldhet">Läs mer om myndighetens jämställdhetsarbete</a>' },
  { date: '2026-10-14', title: 'Tjuvmyndigheten varnar för oseriösa aktörer – allt fler stölder genomförs utan tillstånd',
    body: 'Andelen tillgrepp som genomförs utan giltigt tillstånd har ökat för tredje året i följd. Myndigheten uppmanar allmänheten att i samtliga fall kontrollera vederbörandes behörighet.' },
  { date: '2026-10-02', title: 'Förlängda handläggningstider efter rekordmånga ansökningar om inbrottstillstånd',
    body: 'Under september inkom fler ansökningar om inbrottstillstånd än under hela föregående år. Handläggningstiden förlängs med anledning härav tillfälligt till 14–22 månader. Myndigheten beklagar eventuella olägenheter.' },
  { date: '2026-09-24', title: 'Ny rapport: Var tredje tjuv upplever att det blivit svårare att stjäla',
    body: 'I myndighetens årliga enkätundersökning uppger 34 procent av de registrerade yrkestjuvarna att det har blivit svårare att genomföra tillgrepp. De vanligast angivna orsakerna är förbättrade lås, ett ökat antal kameror samt längre handläggningstider.' },
  { date: '2026-09-12', title: 'Vi byter lås på huvudkontoret',
    body: 'Under vecka 39 kan besökare komma att uppleva begränsad tillgänglighet. Nycklar lämnas inte ut.' },
  { date: '2026-08-29', title: 'Myndighetens årsredovisning för 2025',
    body: 'Årsredovisningen kan för närvarande inte lokaliseras. Den som innehar uppgifter om årsredovisningens befintlighet ombeds behålla dessa för sig själv.' },
];

// Visas på varje e-tjänstsida i respektive kategori.
const GOOD_TO_KNOW = {
  tillstand: ['Viktigt att veta innan du ansöker',
    'Ett av Tjuvmyndigheten beviljat tillstånd innebär inte per automatik att verksamheten är tillåten enligt andra myndigheters regelverk. Det åligger sökanden att i förekommande fall inhämta kompletterande tillstånd från berörda myndigheter. Tjuvmyndigheten kan inte lämna besked om vilka övriga tillstånd som kan erfordras.'],
  deklaration: ['Viktigt att veta om deklarationen',
    'Stöldgodsdeklarationen ges in uteslutande till Tjuvmyndigheten. Myndigheten lämnar inte ut uppgifter ur deklarationen till andra myndigheter och kan följaktligen inte gentemot andra myndigheter bekräfta att deklarationen har getts in.'],
  anmalan: ['Viktigt att veta om ditt ärende',
    'Tjuvmyndigheten handlägger endast ärenden inom myndighetens eget ansvarsområde. Har ärendet samband med åtgärder vidtagna av annan myndighet, exempelvis ett gripande, ska den enskilde vända sig till den myndigheten.'],
  arbete: ['Viktigt att veta om ersättningen',
    'Ersättning från Tjuvmyndigheten samordnas inte med ersättningar från andra myndigheter. Tid i häkte eller inom kriminalvården tillgodoräknas inte som aktivt sökande av tillgreppsmöjligheter.'],
  bestulen: ['Viktigt att veta',
    'Tjuvmyndigheten utreder inte brott. Den som önskar göra en polisanmälan hänvisas till Polismyndigheten. Tjuvmyndigheten kan inte vidarebefordra anmälan.'],
  ovrigt: ['Viktigt att veta',
    'Handlingar som utfärdas av Tjuvmyndigheten, exempelvis tjuvlegitimation och tillgreppskvitto, godtas uteslutande av Tjuvmyndigheten.'],
};

const MONTHS = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
const fmtDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };
const svc = (id) => SERVICES.find((s) => s.id === id);
const svcUrl = (s) => `tjanst.html?id=${s.id}`;

// Teckenspråk: byter ut varje ord mot dess transkription (assets/teckensprak-data.js,
// som bara laddas när läget slås på). Ord som saknas bokstaveras med handalfabetet.
// Verktygsraden och licensraden lämnas orörda så att knappen och källhänvisningen går att läsa.
const signOriginals = new Map(); // textnod -> originaltext
const signPlaceholders = new Map(); // fält -> original-placeholder
let signObserver = null;

const sign = (text) => text.replace(/[A-Za-zÅÄÖåäöÉé]+/g, (w) => window.TECKEN[w.toLowerCase()]
  ?? [...w.toLowerCase()].map((c) => window.TECKEN_ALFABET[c]).join('\u{10C960}'));

function toSigns(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (signOriginals.has(n) || n.parentElement?.closest('script, style, .utility, .licenses')
      ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    const signed = sign(n.data);
    if (signed !== n.data) { signOriginals.set(n, n.data); n.data = signed; }
  }
  for (const el of root.querySelectorAll?.('[placeholder]') ?? []) {
    if (signPlaceholders.has(el)) continue;
    signPlaceholders.set(el, el.placeholder);
    el.placeholder = sign(el.placeholder);
  }
}

function signLanguage(on) {
  if (!on) {
    signObserver?.disconnect();
    signObserver = null;
    for (const [n, text] of signOriginals) n.data = text;
    signOriginals.clear();
    for (const [el, text] of signPlaceholders) el.placeholder = text;
    signPlaceholders.clear();
    return;
  }
  if (!window.TECKEN) {
    const s = document.createElement('script');
    s.src = 'assets/teckensprak-data.js';
    s.onload = () => { if (document.body.classList.contains('teckensprak')) signLanguage(true); };
    document.head.append(s);
    return;
  }
  if (signObserver) return;
  toSigns(document.body);
  signObserver = new MutationObserver((records) => {
    for (const r of records) for (const n of r.addedNodes) if (n.isConnected) toSigns(n.nodeType === Node.TEXT_NODE ? n.parentNode : n);
  });
  signObserver.observe(document.body, { childList: true, subtree: true });
}

// Lyssna: spelar upp huvudinnehållet som morsekod, ca 20 ord per minut på 600 Hz.
const MORSE = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....', i: '..', j: '.---',
  k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.', q: '--.-', r: '.-.', s: '...', t: '-',
  u: '..-', v: '...-', w: '.--', x: '-..-', y: '-.--', z: '--..', å: '.--.-', ä: '.-.-', ö: '---.', é: '..-..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '-': '-....-', '/': '-..-.', ':': '---...',
  '(': '-.--.', ')': '-.--.-', '"': '.-..-.', "'": '.----.', '=': '-...-', '+': '.-.-.', '@': '.--.-.',
};
const MORSE_UNIT = 0.06; // sekunder per punkt
let morse = null;

// Originaltexten även när teckenspråksläget är på.
function morseText() {
  const walker = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest('script, style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  let text = '';
  while (walker.nextNode()) text += ' ' + (signOriginals.get(walker.currentNode) ?? walker.currentNode.data);
  return text.toLowerCase();
}

// Ger [start, längd] i punkter för varje ton: 1 mellan tecken, 3 mellan bokstäver, 7 mellan ord.
function* morseTones(text) {
  let t = 0;
  for (const word of text.split(/\s+/)) {
    const letters = [...word].map((c) => MORSE[c]).filter(Boolean);
    if (!letters.length) continue;
    for (const code of letters) {
      for (const s of code) {
        const len = s === '.' ? 1 : 3;
        yield [t, len];
        t += len + 1;
      }
      t += 2;
    }
    t += 4;
  }
}

function listen(btn, on) {
  if (morse) { clearInterval(morse.timer); morse.ctx.close(); morse = null; }
  btn.setAttribute('aria-pressed', String(on));
  btn.textContent = on ? 'Sluta lyssna' : 'Lyssna';
  if (!on) return;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 600;
  gain.gain.value = 0;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  const tones = morseTones(morseText());
  const t0 = ctx.currentTime + 0.1;
  let next = tones.next();
  let end = t0;
  // Schemalägg några sekunder i taget så att långa sidor inte bygger upp allt på en gång.
  const schedule = () => {
    while (!next.done && t0 + next.value[0] * MORSE_UNIT < ctx.currentTime + 2) {
      const [start, len] = next.value;
      const a = t0 + start * MORSE_UNIT;
      end = a + len * MORSE_UNIT;
      gain.gain.setTargetAtTime(0.25, a, 0.003);
      gain.gain.setTargetAtTime(0, end, 0.003);
      next = tones.next();
    }
    if (next.done && ctx.currentTime > end + 0.2) listen(btn, false);
  };
  morse = { ctx, timer: setInterval(schedule, 500) };
  schedule();
}

function renderChrome() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const header = document.getElementById('site-header');
  if (header) {
    header.outerHTML = `
      <a class="skip" href="#main">Till innehållet</a>
      <div class="utility"><div class="wrap">
        <a href="#" class="lyssna-toggle" role="button" aria-pressed="false">Lyssna</a><a href="#" class="lattlast-toggle" role="button" aria-pressed="false">Lättläst</a><a href="#" class="teckensprak-toggle" role="button" aria-pressed="false">Teckenspråk</a><a href="other-languages.html" lang="en">Other languages</a>
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
        <strong>Driftstörning:</strong> E-tjänsten Mina tillgrepp är tillfälligt otillgänglig. Servern har tagits ur drift i avvaktan på besiktning. Besiktningen är under handläggning.
      </div></div>`;
    for (const mode of ['lattlast', 'teckensprak']) {
      const btn = document.querySelector(`.${mode}-toggle`);
      const set = (on) => {
        if (mode === 'teckensprak') signLanguage(on);
        document.body.classList.toggle(mode, on);
        btn.setAttribute('aria-pressed', String(on));
        try { localStorage.setItem(mode, on ? '1' : ''); } catch (e) {}
      };
      try { if (localStorage.getItem(mode)) set(true); } catch (e) {}
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        set(!document.body.classList.contains(mode));
      });
    }
    const lyssna = document.querySelector('.lyssna-toggle');
    lyssna.addEventListener('click', (e) => {
      e.preventDefault();
      listen(lyssna, !morse);
    });
    const form = document.querySelector('form.search');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.q.value = '';
      form.q.placeholder = 'Inga träffar. Sökfunktionen är under upphandling.';
    });
  }
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.outerHTML = `
      <footer><div class="wrap">
        <div class="grid">
          <div><h4>Tjuvmyndigheten</h4><p style="margin:0">Myndigheten för ordnade tillgrepp.</p></div>
          <div><h4>Genvägar</h4><ul>
            <li><a href="e-tjanster.html">Alla e-tjänster</a></li>
            <li><a href="handlaggningstider.html">Handläggningstider</a></li>
            <li><a href="nyheter.html">Nyheter</a></li>
            <li><a href="vanliga-fragor.html">Vanliga frågor</a></li>
            <li><a href="om-myndigheten.html#kontakt">Kontakta oss</a></li>
          </ul></div>
          <div><h4>Om webbplatsen</h4><ul>
            <li><a href="#">Tillgänglighetsredogörelse</a></li>
            <li><a href="kakor.html">Kakor</a></li>
            <li><a href="personuppgifter.html">Så behandlar vi dina personuppgifter</a></li>
          </ul></div>
          <div><h4>Följ inte oss</h4><ul><li>Myndigheten finns inte i sociala medier.</li></ul></div>
        </div>
        <p class="fine">Webbplatsen drivs med <a href="https://fqa.9front.org/">9front</a>. Driftmiljön har upphandlats i enlighet med gällande regelverk.<br>Tjuvmyndigheten är inte en statlig myndighet och har ingen koppling till Polismyndigheten.</p>
        <p class="fine licenses">Teckenspråk: transkriptioner ur <a href="https://teckensprakslexikon.su.se/">Svenskt teckenspråkslexikon</a>, Avdelningen för teckenspråk, Institutionen för lingvistik, Stockholms universitet, under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.sv">CC BY-NC-SA 4.0</a>, hämtade via <a href="https://github.com/zrajm/teckentranskription">teckentranskription</a>. Urvalet är bearbetat (böjningar, sammansatta ord och handalfabetet) och <a href="assets/teckensprak-data.js">bearbetningen</a> delas under samma licens. Stockholms universitet har ingen koppling till och står inte bakom webbplatsen.<br>
        Typsnitt: Comic Neue, © The Comic Neue Project Authors, under <a href="assets/fonts/ComicNeue-OFL.txt">SIL Open Font License 1.1</a>. FreeSans SWL, © GNU FreeFont-bidragsgivare och zrajm, under <a href="assets/fonts/FreeSans-SWL-LICENSE.txt">GNU GPL v3</a> (<a href="assets/fonts/freesans-swl.sfd">källkod</a>).</p>
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
      <h1>E-tjänsten kunde inte hittas</h1><p class="ingress">Blankettnumret saknas, är felaktigt angivet eller har tillgripits. Se <a href="e-tjanster.html">alla e-tjänster</a>.</p>`;
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
          <li>Bifoga samtliga efterfrågade handlingar.</li>
          <li>Skicka in ärendet. Bekräftelse översänds när ärendet har inkommit.</li>
          <li>Invänta beslut. Handläggningen kan inte påskyndas genom kontakt med myndigheten.</li>
        </ol>
        <p class="no-print">${s.start
          ? `<a class="btn" href="${s.start}">Starta e-tjänsten</a>`
          : `<button class="btn" type="button" id="start">Starta e-tjänsten</button>`}</p>
        <div class="box warn" id="closed" hidden><p><strong>E-tjänsten är tillfälligt stängd.</strong> Blanketten TMV ${s.id} kan i stället lämnas i en av myndighetens döda brevlådor. Blanketten och uppgift om brevlådornas placering beställs via e-tjänsten.</p></div>
      </div>
      <aside>
        <div class="box"><h3>Har du frågor?</h3><p>Se myndighetens sammanställning av <a href="vanliga-fragor.html">vanliga frågor</a>.</p></div>
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
