const listContainer=document.getElementById("products-list");
const form=document.getElementById("product-form");
function validateText(t){return t.length>=3&&t.length<=50;}
function validateNumber(n){return n>0&&n<120;}
async function loadProducts(){try{const r=await fetch("https://dummyjson.com/products");const d=await r.json();d.products.forEach(p=>addProductToList({title:p.title,description:p.description,price:p.price,brand:p.brand,category:p.category,thumbnail:p.thumbnail}));}catch(e){console.warn("Não foi possível carregar API, o sistema continuará funcionando localmente.");}}
function addProductToList(p){const d=document.createElement("div");d.className="card product-card";d.innerHTML=`
  <div class="thumb"><img src="${p.thumbnail}" alt="${p.title}"></div>
  <div class="meta">
    <h4>${p.title}</h4>
    <p class="muted">${p.brand} • ${p.category}</p>
    <p class="desc">${p.description}</p>
    <div class="price">R$ ${p.price}</div>
  </div>
  <button class="remove" title="Remover">✕</button>
`;d.querySelector(".remove").addEventListener("click",()=>{d.classList.add("removing"); setTimeout(()=>d.remove(),220);});listContainer.appendChild(d);}
form.addEventListener("submit",e=>{e.preventDefault();const t=form.title.value.trim(),desc=form.description.value.trim(),pr=Number(form.price.value),b=form.brand.value.trim(),c=form.category.value.trim(),img=form.thumbnail.value.trim()||"https://via.placeholder.com/260";if(!validateText(t)||!validateText(desc)||!validateText(b)||!validateText(c)){alert("Texto inválido.");return;}if(!validateNumber(pr)){alert("Preço inválido.");return;}addProductToList({title:t,description:desc,price:pr,brand:b,category:c,thumbnail:img});form.reset();});
loadProducts();
