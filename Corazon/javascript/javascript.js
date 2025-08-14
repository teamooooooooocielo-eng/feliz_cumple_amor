const sector = document.getElementById('sector');
const radius = 100;
const center = { x: 0, y: 0 };
const duration = 4000; // Duración en milisegundos
let startTime = null;

function polarToCartesian(cx, cy, radius, angleDegrees) {
  const angleRadians = (angleDegrees - 90) * Math.PI / 180.0;
  return {
    x: cx + radius * Math.cos(angleRadians),
    y: cy + radius * Math.sin(angleRadians)
  };
}

function describeSector(cx, cy, radius, startAngle, endAngle){
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M", cx, cy,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");
}

const fullD = describeSector(center.x, center.y, radius, 0, 359.9);

sector.setAttribute('d', describeSector(center.x, center.y, radius, 0, 0));

function animate(time) {
  if (!startTime) startTime = time;
  const elapsed = time - startTime;
  let progress = elapsed / duration;
  if (progress > 1) progress = 1;

  const angle = 359.9 * progress;
  const d = describeSector(center.x, center.y, radius, 0, angle);
  sector.setAttribute('d', d);

  if (progress < 1) {
    requestAnimationFrame(animate);
  } else {
    sector.setAttribute('d', fullD);
  }
}

requestAnimationFrame(animate);


const texto = `Bueno mi amor, aqui solo quiero expresarte un poquito de lo que tu me haces sentir, de lo que tu con esos ojitos hermosos, esa risa contagiosa y ese caracter especial me hacen sentir dia a dia. 
Como sabrás yo soy muy cursi, y me gusta demostrarte mi cariño. 
Mi amor, no sé en qué momento de mi vida llegaste al punto en que seas lo primero que pienso cuando me levanto, y lo ultimo antes de dormir, no se en que momento llegaste al punto de cuando no esté en el celular mis pensamientos más frecuentes sean "¿qué me habrás escrito?" "¿que estaras haciendo?", no se en que momento fue que me enamore de ti, creo que fue algo que simplemente ocurrio al estar conociendo a la increible persona que eres, no sé en qué momento te adueñaste completamente de mi corazón pero joder... cómo me encanta eso, tú me encantas hermosa. Gracias por permitirme entrar en tu vida valery, muchas gracias por haberme dado la oportunidad de demostrarte que puedo cambiar, gracias por siempre estar para mi, por los momentos felices y por los momentos tristes o malos, que de ellos aprendemos, gracias por esforzarte en que lo nuestro funcione. Yo te amo con mi vida entera señorita Lopez`;

const elemento = document.getElementById('texto-maquina');
let i = 0;

function escribir() {
  if (i < texto.length) {
    elemento.style.opacity = 1;
    const char = texto.charAt(i);
    elemento.innerHTML += char === '\n' ? '<br>' : char;
    i++;
    setTimeout(escribir, 55); // velocidad ajustable
  }
}

escribir();

const fondo = document.querySelector('.fondo-ondas');

function crearOnda() {
  const onda = document.createElement('div');
  onda.classList.add('onda');

  // Tamaño aleatorio entre 30 y 80px
  const size = Math.random() * 50 + 30;
  onda.style.width = size + 'px';
  onda.style.height = size + 'px';

  // Posición aleatoria dentro del viewport
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  onda.style.left = (x - size / 2) + 'px';
  onda.style.top = (y - size / 2) + 'px';

  // Duración aleatoria para animación
  const duracion = Math.random() * 2000 + 4000;
  onda.style.animationDuration = duracion + 'ms';

  fondo.appendChild(onda);

  // Quitar el elemento cuando termine la animación para no saturar el DOM
  onda.addEventListener('animationend', () => {
    onda.remove();
  });
}

// Crear una onda cada 700 ms aprox.
setInterval(crearOnda, 2000);

