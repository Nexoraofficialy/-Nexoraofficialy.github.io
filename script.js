// Demo products: replace these sample products, prices and images with your live inventory.
const products=[
{id:101,name:"The Form Tote",cat:"Accessories",price:2199,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=85",desc:"A considered everyday carry with a clean silhouette, generous space and refined finishing.",sizes:["One Size"],colors:[{name:"Espresso",hex:"#49352b"},{name:"Sand",hex:"#c9b99a"},{name:"Black",hex:"#171717"}]},
{id:102,name:"The Essential Shirt",cat:"Apparel",price:1699,tag:"NEW ARRIVAL",image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&q=85",desc:"An easy, versatile wardrobe staple with a relaxed fit and timeless proportions.",sizes:["S","M","L","XL"],colors:[{name:"Ivory",hex:"#e9e1d0"},{name:"Blue",hex:"#78899b"},{name:"Black",hex:"#222"}]},
{id:103,name:"Modern Timepiece",cat:"Accessories",price:3499,tag:"THE EDIT",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=85",desc:"A minimal timepiece designed to complement both everyday and occasion dressing.",sizes:["One Size"],colors:[{name:"Gold",hex:"#c5a15b"},{name:"Silver",hex:"#c4c8cb"}]},
{id:104,name:"Sculpted Home Set",cat:"Lifestyle",price:1299,tag:"LIMITED",image:"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=900&q=85",desc:"A tactile home accent set that brings a calm, considered finish to your space.",sizes:["One Size"],colors:[{name:"Natural",hex:"#c7b99e"},{name:"Stone",hex:"#85817a"}]},
{id:105,name:"The Layer Jacket",cat:"Apparel",price:3299,tag:"EDITOR'S PICK",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=85",desc:"A confident layering piece with a clean profile and effortless everyday character.",sizes:["S","M","L","XL"],colors:[{name:"Tan",hex:"#9a7051"},{name:"Black",hex:"#1e1e1e"}]},
{id:106,name:"Everyday Crossbody",cat:"Accessories",price:1899,tag:"POPULAR",image:"https://images.unsplash.com/photo-1590870029862-74c6f4f0e5c1?w=900&q=85",desc:"Compact, functional and easy to style — made to keep essentials close at hand.",sizes:["One Size"],colors:[{name:"Cocoa",hex:"#634838"},{name:"Black",hex:"#171717"}]},
{id:107,name:"Soft Form Cushion",cat:"Lifestyle",price:999,tag:"NEW",image:"https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=85",desc:"A soft finishing touch for a thoughtful, comfortable living space.",sizes:["One Size"],colors:[{name:"Oat",hex:"#c8bca8"},{name:"Olive",hex:"#77775b"}]},
{id:108,name:"Weekend Edit",cat:"Apparel",price:2799,tag:"JUST IN",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85",desc:"A versatile outfit edit for unhurried days and spontaneous plans.",sizes:["S","M","L","XL"],colors:[{name:"Neutral",hex:"#b5a58c"},{name:"Charcoal",hex:"#46464a"}]}
];
let cart=JSON.parse(localStorage.getItem("nextA_cart")||"[]"),category="All",detailSelection={};
const $=id=>document.getElementById(id),money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
function renderProducts(){
 const q=$("search").value.toLowerCase().trim();
 const items=products.filter(p=>(category==="All"||p.cat===category)&&p.name.toLowerCase().includes(q));
 $("productGrid").innerHTML=items.length?items.map(p=>`<article class="product-card"><div class="product-image" onclick="openProduct(${p.id})"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="tag">${p.tag}</span><button class="quick-view" onclick="event.stopPropagation();openProduct(${p.id})">VIEW DETAILS ↗</button></div><div class="product-meta"><span class="category">${p.cat}</span><h3>${p.name}</h3><span class="price">${money(p.price)}</span></div></article>`).join(""):"<p>No matching products found.</p>";
}
function openProduct(id){
 const p=products.find(x=>x.id===id);detailSelection={id,size:p.sizes[0],color:p.colors[0].name};
 $("modalContent").innerHTML=`<div class="detail-layout"><img class="detail-image" src="${p.image}" alt="${p.name}"><div class="detail-info"><p class="kicker">${p.cat.toUpperCase()} / ${p.tag}</p><h2>${p.name}</h2><div class="detail-price">${money(p.price)}</div><p class="detail-desc">${p.desc}</p><span class="option-label">SELECT COLOUR — <span id="chosenColor">${p.colors[0].name}</span></span><div class="swatches">${p.colors.map((c,i)=>`<button class="swatch ${i===0?"selected":""}" style="background:${c.hex}" title="${c.name}" aria-label="${c.name}" onclick="selectColor('${c.name}',this)"></button>`).join("")}</div><span class="option-label">SELECT SIZE</span><div class="sizes">${p.sizes.map((s,i)=>`<button class="size-btn ${i===0?"selected":""}" onclick="selectSize('${s}',this)">${s}</button>`).join("")}</div><button class="detail-add" onclick="addSelected()">ADD TO BAG — ${money(p.price)}</button></div></div>`;
 $("productModal").classList.add("show");$("productModal").setAttribute("aria-hidden","false");
}
function selectColor(name,el){detailSelection.color=name;document.querySelectorAll(".swatch").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");$("chosenColor").textContent=name;}
function selectSize(size,el){detailSelection.size=size;document.querySelectorAll(".size-btn").forEach(x=>x.classList.remove("selected"));el.classList.add("selected");}
function closeProduct(){$("productModal").classList.remove("show");$("productModal").setAttribute("aria-hidden","true");}
function addSelected(){const p=products.find(x=>x.id===detailSelection.id);addToCart(p.id,detailSelection.size,detailSelection.color);closeProduct();openCart(true);}
function addToCart(id,size="One Size",color="Default"){const key=`${id}|${size}|${color}`,line=cart.find(x=>x.key===key);line?line.qty++:cart.push({key,id,size,color,qty:1});saveCart();toast("Added to your bag");}
function saveCart(){localStorage.setItem("nextA_cart",JSON.stringify(cart));renderCart();}
function updateQty(key,delta){const line=cart.find(x=>x.key===key);if(!line)return;line.qty+=delta;if(line.qty<1)cart=cart.filter(x=>x.key!==key);saveCart();}
function removeLine(key){cart=cart.filter(x=>x.key!==key);saveCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 $("bagCount").textContent=count;$("panelCount").textContent=`(${count})`;$("subtotal").textContent=money(total);
 $("cartList").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><span class="variant">${x.size} / ${x.color}</span><div class="qty"><button onclick="updateQty('${x.key}',-1)">−</button><span>${x.qty}</span><button onclick="updateQty('${x.key}',1)">+</button></div></div><button class="remove" onclick="removeLine('${x.key}')">REMOVE</button></div>`}).join(""):'<p class="empty">Your bag is currently empty.<br>Find something you love in the collection.</p>';
}
function openCart(open){$("cartPanel").classList.toggle("open",open);$("shade").classList.toggle("show",open);$("cartPanel").setAttribute("aria-hidden",String(!open));}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2200);}
$("openCart").onclick=()=>openCart(true);$("closeCart").onclick=()=>openCart(false);$("shade").onclick=()=>openCart(false);
$("closeModal").onclick=closeProduct;$("productModal").addEventListener("click",e=>{if(e.target===$("productModal"))closeProduct();});
$("search").addEventListener("input",renderProducts);
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");b.classList.add("active");category=b.dataset.cat;renderProducts();}));
$("mobileMenu").onclick=()=>$("nav").classList.toggle("open");document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>$("nav").classList.remove("open"));
$("year").textContent=new Date().getFullYear();
$("newsletter").addEventListener("submit",e=>{e.preventDefault();$("newsMessage").textContent="Thank you for joining the NEXT A COLLECTION list.";e.target.reset();});

// Razorpay: live checkout requires server-side order creation and signature verification.
$("checkout").addEventListener("click",async()=>{
 if(!cart.length){toast("Your bag is empty");return;}
 const razorpayKeyId="YOUR_RAZORPAY_KEY_ID"; // Public Key ID only. Never expose the Key Secret here.
 if(razorpayKeyId==="YOUR_RAZORPAY_KEY_ID"){toast("Checkout setup pending — connect Razorpay backend.");return;}
 try{
  const response=await fetch("/api/create-razorpay-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:cart})});
  if(!response.ok)throw new Error("Order creation failed");
  const order=await response.json();
  const options={key:razorpayKeyId,amount:order.amount,currency:order.currency||"INR",name:"NEXT A COLLECTION",description:"Collection purchase",order_id:order.id,
   handler:async payment=>{const verified=await fetch("/api/verify-razorpay-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payment)});if(!verified.ok){toast("Payment verification failed. Contact support.");return;}cart=[];saveCart();openCart(false);toast("Payment successful. Thank you!");},
   theme:{color:"#c9aa72"}};
  new Razorpay(options).open();
 }catch(error){console.error(error);toast("Unable to start checkout. Please try again.");}
});
renderProducts();renderCart();