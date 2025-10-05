// Data for products
const PRODUCTS = [
  { id:1, name:"Tomatodo", category:"tomatodos", price:"S/ 25", img:"img/tomatodo.jpg", desc:"Tomatodo , 500ml." },
  { id:2, name:"Lapicero", category:"lapiceros", price:"S/ 8", img:"img/lapiceros.jpg", desc:"Lapicero personalizado con logo." },
  { id:3, name:"Lápiz", category:"lapiceros", price:"S/ 1.5", img:"img/lapiz negro.jpg", desc:"Lápiz escolar." },
  { id:4, name:"Agendas", category:"agendas", price:"S/ 40", img:"img/agendas.jpg", desc:"Agenda A5 con tapa dura y hojas pautadas." },
  { id:5, name:"Pelota Antiestrés", category:"accesorios", price:"S/ 6", img:"img/pelotas anti estres.jpg", desc:"Pelota para aliviar estrés, personalizable." },
  { id:6, name:"Llaveros de metal", category:"accesorios", price:"S/ 7", img:"img/llaveros de metal.jpg", desc:"Llaveros de metal con tu diseño." },
  { id:7, name:"Popsocket", category:"accesorios", price:"S/ 15", img:"img/popsocket.jpg", desc:"Popsocket para celular con impresión." },
  { id:8, name:"Resaltador", category:"accesorios", price:"S/ 12", img:"img/resaltador.jpg", desc:"resalatador forma triangular." },
];

function el(tag, attrs={}, children=[]){
  const e = document.createElement(tag);
  for(const k in attrs) e.setAttribute(k, attrs[k]);
  children.forEach(c => e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return e;
}

function renderProducts(list){
  const root = document.getElementById('catalog');
  root.innerHTML = '';
  list.forEach(p => {
    const card = el('article',{class:'card','data-cat':p.category});
    const img = document.createElement('img');
    img.src = p.img;
    img.alt = p.name;
    img.classList.add('product-img'); // ✅ Añadimos clase para el modal
    const h4 = el('h4',{},[p.name]);
    const desc = el('p',{},[p.desc]);
    const price = el('div',{},[el('span',{class:'badge'},[p.price])]);
    card.appendChild(img);
    card.appendChild(h4);
    card.appendChild(desc);
    card.appendChild(price);
    root.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // initial render
  renderProducts(PRODUCTS);
  document.getElementById('year').textContent = new Date().getFullYear();

  // search
  const search = document.getElementById('search');
  search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    renderProducts(filtered);
  });

  // filter
  const filter = document.getElementById('filter');
  filter.addEventListener('change', (e) => {
    const v = e.target.value;
    if(v === 'all') renderProducts(PRODUCTS);
    else renderProducts(PRODUCTS.filter(p => p.category === v));
  });

  // ✅ Modal para ampliar imágenes
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.getElementsByClassName("close")[0];

  // Delegación: volver a agregar eventos cada vez que se rendericen productos
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("product-img")) {
      modal.style.display = "block";
      modalImg.src = e.target.src;
    }
  });

  closeBtn.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
