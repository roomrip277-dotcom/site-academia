// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
menuBtn.addEventListener("click", ()=>{ navbar.classList.toggle("active"); });

// Reveal ao rolar
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for(let i=0;i<reveals.length;i++){
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){ reveals[i].classList.add("active"); }
  }
}
window.addEventListener("scroll", reveal);

// Contador de alunos
let countAlunos = 0;
const alunos = document.getElementById("alunos");
let alunosContado = false;

function contadorAlunos(){
  if(countAlunos < 500){
    countAlunos++;
    alunos.textContent = countAlunos;
    setTimeout(contadorAlunos, 15);
  }
}

window.addEventListener("scroll", ()=>{
  const section = document.querySelector(".alunos");
  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if(sectionTop < windowHeight && !alunosContado){
    alunosContado = true;
    contadorAlunos();
  }
});

// Barra força animada
let barrasAnimadas = false;
function animarBarras(){
  const barras = document.querySelectorAll(".barra-forca div");
  barras.forEach(bar=>{
    const valor = 70 + Math.random()*30;
    bar.style.width = valor+"%";
  });
}

window.addEventListener("scroll", ()=>{
  const treinos = document.querySelector(".treinos");
  const treinosTop = treinos.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if(treinosTop < windowHeight && !barrasAnimadas){
    barrasAnimadas = true;
    animarBarras();
  }
});

// Calculadora IMC
document.getElementById("calcular").addEventListener("click", ()=>{
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  if(!peso || !altura){ alert("Preencha todos os campos!"); return; }
  const imc = peso/(altura*altura);
  document.getElementById("resultado").textContent = "Seu IMC é: "+imc.toFixed(2);
});

// Fumaça realista
const canvas = document.getElementById('canvasFumaca');
const ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const numParticles = 80;
for(let i=0;i<numParticles;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    radius:20+Math.random()*30,
    speedX:-0.2+Math.random()*0.4,
    speedY:-0.5-Math.random()*0.5,
    opacity:0.05+Math.random()*0.1
  });
}

function drawFumaca(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    const gradient = ctx.createRadialGradient(p.x,p.y,p.radius*0.1,p.x,p.y,p.radius);
    gradient.addColorStop(0,'rgba(255,255,255,'+p.opacity+')');
    gradient.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=gradient;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if(p.y+p.radius<0 || p.x+p.radius<0 || p.x-p.radius>canvas.width){
      p.x=Math.random()*canvas.width;
      p.y=canvas.height+Math.random()*100;
    }
  });
  requestAnimationFrame(drawFumaca);
}
drawFumaca();

// GALERIA LIGHTBOX
const imagens = document.querySelectorAll(".galeria-container img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

imagens.forEach(img=>{
  img.addEventListener("click", ()=>{
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", ()=>{
  lightbox.style.display = "none";
});