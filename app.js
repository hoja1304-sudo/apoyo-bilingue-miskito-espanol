const phrases = [
  { mis: 'Naksa', es: 'Hola', pos: '0% 0%' },
  { mis: 'Nahkisma', es: '¿Cómo estás?', pos: '50% 0%' },
  { mis: 'Nahki damra walisma', es: '¿Cómo te sientes?', pos: '100% 0%' },
  { mis: 'Titan yamni', es: 'Buenos días', pos: '0% 50%' },
  { mis: 'Dinar yamni', es: 'Buenas tardes del medio día', pos: '50% 50%' },
  { mis: 'Tutni yamni', es: 'Buenas tardes', pos: '100% 50%' },
  { mis: 'Tihmia yamni', es: 'Buenas noches', pos: '0% 100%' },
  { mis: 'Ninam dia', es: '¿Cómo te llamas?', pos: '50% 100%' },
  { mis: 'An mani brisma', es: '¿Cuántos años tienes?', pos: '100% 100%' }
];
const normPhrases = [
  { mis: 'Mihtam bukaia sturi aisia wantsma pyuara', es: 'Levanta la mano para hablar o participar.', x: 0, y: 0 },
  { mis: 'Sap walaia upla kum sturi aisi pyuara', es: 'Escucha con atención cuando otras personas hablan.', x: 1, y: 0 },
  { mis: 'Sturi yamni nani yu mus aisima pyuara', es: 'Usa palabras amables como “por favor”, “gracias” y “permiso”.', x: 2, y: 0 },
  { mis: 'Rispik munaia pamnika an maistrukam ra', es: 'Respeta a tus compañeros y a tu docente.', x: 3, y: 0 },
  { mis: 'Iwisma pliska ba wapni an klin briaia', es: 'Mantén tu espacio limpio y ordenado.', x: 0, y: 1 },
  { mis: 'Klas bilara wapi taukaia, palaia apia', es: 'Camina dentro del aula; no corras.', x: 1, y: 1 },
  { mis: 'Kul dakbaia apia an sun balaia', es: 'Puntualidad y asistencia.', x: 2, y: 1 },
  { mis: 'Maistrukam dia mai wiba walaia', es: 'Sigue las instrucciones del docente.', x: 3, y: 1 },
  { mis: 'Bila kaikis man taim aisia pyuara', es: 'Espera tu turno para hablar.', x: 0, y: 2 },
  { mis: 'Pliskam ar sir kam ra iwi bas', es: 'Permanece sentado cuando sea necesario.', x: 1, y: 2 },
  { mis: 'Dipasta ba pliskara mangks', es: 'Deposita la basura en su lugar.', x: 2, y: 2 }
];

const app = document.querySelector('#app');
const toast = document.querySelector('.toast');
let toastTimer;

const speakerIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l5 4V6l-5 4H4Z"/><path d="M16 9a5 5 0 0 1 0 6M18.5 6.5a9 9 0 0 1 0 11"/></svg>';
const arrowIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function menu() {
  app.innerHTML = `<section class="view menu-view">
    <div class="menu-intro"><span class="eyebrow">Aprendizaje bilingüe</span><h1>Una palabra abre<br>una conversación.</h1><p>Explora frases cotidianas en miskito y español. Mira, escucha y practica a tu ritmo.</p></div>
    <div class="menu-grid">
      <button class="menu-card" data-page="saludos"><span class="icon"><svg viewBox="0 0 24 24"><path d="M8 12.5c1.1 1.8 2.5 2.7 4.2 2.7 1.6 0 2.8-.7 3.8-2.2M7 8.5h.01M17 8.5h.01"/><path d="M12 21a9 9 0 1 0-9-9c0 1.7.5 3.3 1.3 4.6L3 21l4.6-1.3A9 9 0 0 0 12 21Z"/></svg></span><span class="card-arrow">${arrowIcon}</span><h2>Saludos</h2><p>Saluda, pregunta cómo está alguien y preséntate.</p></button>
      <button class="menu-card secondary" data-page="normas"><span class="icon"><svg viewBox="0 0 24 24"><path d="M8 5h12M8 12h12M8 19h12"/><path d="m3 5 1 1 2-2M3 12l1 1 2-2M3 19l1 1 2-2"/></svg></span><span class="card-arrow">${arrowIcon}</span><h2>Normas de clase</h2><p>Frases para compartir y aprender con respeto.</p></button>
    </div>
  </section>`;
}

function greetings() {
  const rows = phrases.map((item, i) => `<article class="phrase">
    <span class="phrase-no">${String(i + 1).padStart(2, '0')}</span>
    <div class="phrase-art" role="img" aria-label="Ilustración: ${item.es.toLowerCase()}" style="background-position:${item.pos}"></div>
    <div class="phrase-copy miskito"><span class="label">En miskito</span><strong lang="miq">${item.mis}</strong></div>
    <div class="phrase-copy es"><span class="label">En español</span><strong lang="es">${item.es}</strong></div>
    <div class="phrase-actions"><button class="listen" data-say="mis" data-index="${i}">${speakerIcon}<span>Oír miskito</span></button><button class="listen" data-say="es" data-index="${i}">${speakerIcon}<span>Oír español</span></button></div>
  </article>`).join('');
  app.innerHTML = `<section class="view greetings-view">
    <button class="back-link" data-back>${arrowIcon.replace('M5 12h14M13 6l6 6-6 6','M19 12H5m6 6-6-6 6-6')} Volver al menú</button>
    <div class="hero"><div class="hero-copy"><span class="eyebrow">Primeras palabras</span><h1>Saludos y presentación</h1><p>Las palabras sencillas son el comienzo de una gran conversación. Practica cada frase en ambos idiomas.</p></div><div class="hero-art" role="img" aria-label="Dos niños saludándose" ></div></div>
    <div class="lesson-toolbar"><div><h2 class="section-title">Practiquemos</h2><p class="section-subtitle">${phrases.length} frases para saludar y presentarse</p></div><div class="audio-note">Pulsa los botones para escuchar cada frase.</div></div>
    <div class="phrase-list">${rows}</div>
    <div class="notice"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></svg><span>El audio usa la voz disponible en tu dispositivo. Como no siempre hay una voz de miskito instalada, la pronunciación en miskito es una aproximación; el español sí se reproduce en español cuando el dispositivo lo permite.</span></div>
  </section>`;
  app.querySelectorAll('[data-say]').forEach(button => button.addEventListener('click', () => speak(button)));
  app.focus({ preventScroll: true });
}

function normas() {
  const rows = normPhrases.map((item, i) => {
    const pos = `${item.x * 100 / 3}% ${item.y * 50}%`;
    return `<article class="phrase">
      <span class="phrase-no">${String(i + 1).padStart(2, '0')}</span>
      <div class="phrase-art norma-art" role="img" aria-label="Ilustración: ${item.es.toLowerCase()}" style="background-position:${pos}"></div>
      <div class="phrase-copy miskito"><span class="label">En miskito</span><strong lang="miq">${item.mis}</strong></div>
      <div class="phrase-copy es"><span class="label">En español</span><strong lang="es">${item.es}</strong></div>
      <div class="phrase-actions"><button class="listen" data-set="normas" data-say="mis" data-index="${i}">${speakerIcon}<span>Oír miskito</span></button><button class="listen" data-set="normas" data-say="es" data-index="${i}">${speakerIcon}<span>Oír español</span></button></div>
    </article>`;
  }).join('');
  app.innerHTML = `<section class="view greetings-view">
    <button class="back-link" data-back>${arrowIcon.replace('M5 12h14M13 6l6 6-6 6','M19 12H5m6 6-6-6 6-6')} Volver al menú</button>
    <div class="hero"><div class="hero-copy"><span class="eyebrow">Convivimos y aprendemos</span><h1>Normas y reglas de clase</h1><p>Pequeños acuerdos para compartir el aula, aprender con respeto y cuidarnos entre todos.</p></div><div class="hero-art normas-hero-art" role="img" aria-label="Docente repasando las normas con una estudiante"></div></div>
    <div class="lesson-toolbar"><div><h2 class="section-title">Practiquemos en clase</h2><p class="section-subtitle">${normPhrases.length} normas para convivir y aprender</p></div><div class="audio-note">Pulsa los botones para escuchar cada frase.</div></div>
    <div class="phrase-list">${rows}</div>
    <div class="notice"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></svg><span>El audio usa la voz disponible en tu dispositivo. Como no siempre hay una voz de miskito instalada, la pronunciación en miskito es una aproximación; el español sí se reproduce en español cuando el dispositivo lo permite.</span></div>
  </section>`;
  app.querySelectorAll('[data-say]').forEach(button => button.addEventListener('click', () => speak(button)));
  app.focus({ preventScroll: true });
}

function speak(button) {
  if (!('speechSynthesis' in window)) {
    showToast('Este navegador no tiene lectura de voz disponible.');
    return;
  }
  window.speechSynthesis.cancel();
  document.querySelectorAll('.listen[aria-pressed="true"]').forEach(el => el.setAttribute('aria-pressed', 'false'));
  const list = button.dataset.set === 'normas' ? normPhrases : phrases;
  const item = list[Number(button.dataset.index)];
  const language = button.dataset.say;
  const utterance = new SpeechSynthesisUtterance(language === 'es' ? item.es : item.mis);
  utterance.lang = language === 'es' ? 'es-CR' : 'es-419';
  utterance.rate = language === 'es' ? 0.88 : 0.76;
  utterance.onstart = () => button.setAttribute('aria-pressed', 'true');
  utterance.onend = () => button.setAttribute('aria-pressed', 'false');
  utterance.onerror = () => button.setAttribute('aria-pressed', 'false');
  window.speechSynthesis.speak(utterance);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

window.addEventListener('hashchange', route);
function route() {
  if (window.location.hash === '#saludos') greetings();
  else if (window.location.hash === '#normas') normas();
  else menu();
}
document.addEventListener('click', event => {
  const pageTarget = event.target.closest('[data-page]');
  if (pageTarget) window.location.hash = pageTarget.dataset.page;
  if (event.target.closest('[data-back]')) window.location.hash = 'menu';
});
route();
