"use strict";

const WHATSAPP_PENJUAL = "6281234567890";
const STORAGE_KEY = "rasa-aceh-cart-v1";
const products = [
  { id: "mie-aceh", name: "Mie Aceh", category: "utama", categoryLabel: "Hidangan utama", price: 28000, image: "assets/mie-aceh.svg", description: "Mi tebal dengan bumbu rempah pekat, pilihan kuah atau goreng.", ingredients: "Mi, bawang, cabai, rempah kari, sayuran; pilihan daging atau makanan laut sesuai ketersediaan.", flavor: "Gurih, pedas, dan kaya aroma rempah. Tingkat pedas bisa dikonfirmasi saat memesan.", allergens: "Dapat mengandung gluten, telur, kedelai, ikan, udang, atau kerang tergantung pilihan dan cara memasak.", story: "Hidangan mi berbumbu ini mencerminkan perjumpaan tradisi kuliner di Aceh. Racikan serta pilihan lauk berbeda antardaerah dan rumah makan." },
  { id: "ayam-tangkap", name: "Ayam Tangkap", category: "utama", categoryLabel: "Hidangan utama", price: 35000, image: "assets/ayam-tangkap.svg", description: "Ayam berbumbu dengan daun kari dan pandan yang harum.", ingredients: "Ayam, daun kari/temurui, daun pandan, bawang, dan racikan rempah.", flavor: "Gurih dan aromatik; daun renyah menjadi pelengkap khas sajian.", allergens: "Periksa kemungkinan penggunaan kacang, kedelai, atau bahan lain dalam racikan bumbu.", story: "Daun aromatik yang ikut disajikan memberi ciri pada Ayam Tangkap. Hidangan ini kerap hadir sebagai lauk untuk dinikmati bersama." },
  { id: "kuah-beulangong", name: "Kuah Beulangong", category: "utama", categoryLabel: "Hidangan utama", price: 38000, image: "assets/kuah-beulangong.svg", description: "Masakan berkuah rempah yang akrab dengan kebersamaan warga.", ingredients: "Daging sapi atau kambing, nangka muda, santan, dan bumbu rempah.", flavor: "Gurih, hangat, dan kaya rempah dengan kuah yang pekat.", allergens: "Mengandung santan; tanyakan kemungkinan kontaminasi silang dan bahan tambahan.", story: "Kuah Beulangong dikenal sebagai sajian yang dimasak dalam belanga besar dan sering dikaitkan dengan kegiatan bersama. Praktiknya dapat berbeda di tiap komunitas." },
  { id: "sie-reuboh", name: "Sie Reuboh", category: "utama", categoryLabel: "Hidangan utama", price: 36000, image: "assets/sie-reuboh.svg", description: "Daging rebus berbumbu dengan rasa asam, gurih, dan hangat.", ingredients: "Daging sapi, cuka aren atau cuka lokal, cabai, bawang, dan bumbu.", flavor: "Perpaduan gurih, asam, dan pedas yang tegas.", allergens: "Bisa mengandung bahan kedelai atau bahan lain dari racikan bumbu; tanyakan kepada penjual.", story: "Sie Reuboh merupakan olahan daging khas Aceh yang dimasak bersama bumbu dan bahan asam. Cara memasak serta tingkat rasa berbeda menurut keluarga." },
  { id: "kuah-pliek-u", name: "Kuah Pliek U", category: "utama", categoryLabel: "Hidangan utama", price: 30000, image: "assets/kuah-pliek-u.svg", description: "Kuah sayur khas Aceh dengan pliek u dan aneka sayuran.", ingredients: "Pliek u (kelapa fermentasi), sayuran, kelapa, cabai, dan rempah.", flavor: "Gurih, sedikit asam, dan harum dengan tekstur sayur yang beragam.", allergens: "Mengandung kelapa; periksa pula jenis sayuran dan bahan tambahan.", story: "Pliek u adalah bahan olahan kelapa yang memberi identitas pada kuah sayur ini. Pilihan sayur dan racikan kuahnya dapat bervariasi." },
  { id: "nasi-gurih", name: "Nasi Gurih", category: "pendamping", categoryLabel: "Pendamping", price: 12000, image: "assets/nasi-gurih.svg", description: "Nasi harum yang dimasak dengan santan dan rempah pilihan.", ingredients: "Beras, santan, daun pandan, serai, dan rempah aromatik.", flavor: "Lembut, gurih, dan harum; cocok dengan aneka lauk.", allergens: "Mengandung kelapa. Tanyakan bila ada tambahan lauk atau taburan.", story: "Nasi gurih merupakan pendamping yang umum ditemui dalam berbagai sajian Aceh. Racikan rempah dan teman makannya berbeda menurut kebiasaan setempat." },
  { id: "timphan", name: "Timphan", category: "pendamping", categoryLabel: "Kue tradisional", price: 8000, image: "assets/timphan.svg", description: "Kue lembut berbungkus daun pisang dengan isian manis.", ingredients: "Tepung ketan, pisang atau labu, santan, dan isian srikaya atau kelapa.", flavor: "Manis lembut dan wangi daun pisang.", allergens: "Dapat mengandung gluten, telur, dan kelapa sesuai jenis adonan serta isi.", story: "Timphan dikenal sebagai kue tradisional Aceh yang kerap disajikan pada momen berkumpul dan perayaan. Isian serta resepnya memiliki beragam versi." },
  { id: "kopi-gayo", name: "Kopi Gayo", category: "minuman", categoryLabel: "Minuman", price: 18000, image: "assets/kopi-gayo.svg", description: "Seduhan kopi dari dataran tinggi Gayo, nikmat hangat atau dingin.", ingredients: "Kopi Gayo, air; gula atau susu tersedia sesuai pilihan.", flavor: "Aroma kopi yang kaya dengan karakter rasa yang dapat berbeda menurut seduhan.", allergens: "Kopi murni tidak mengandung alergen umum; pilihan susu dapat mengandung laktosa.", story: "Nama Gayo merujuk pada wilayah dataran tinggi Aceh yang dikenal dengan budidaya kopi. Tradisi minum kopi menjadi bagian dari ruang temu dan percakapan." }
];

const featuredIds = ["mie-aceh", "ayam-tangkap", "timphan"];
const productMap = new Map(products.map((product) => [product.id, product]));
const storyProducts = products;
let cart = loadCart();
let lastFocusedElement = null;
let toastTimer = 0;

const productList = document.querySelector("#product-list");
const featuredList = document.querySelector("#featured-list");
const storyList = document.querySelector("#story-list");
const searchInput = document.querySelector("#product-search");
const categoryFilter = document.querySelector("#category-filter");
const emptyState = document.querySelector("#empty-state");
const resultsCount = document.querySelector("#results-count");
const cartPanel = document.querySelector("#cart-panel");
const scrim = document.querySelector("#page-scrim");
const modalBackdrop = document.querySelector("#modal-backdrop");
const modal = document.querySelector("#app-modal");
const modalTitle = document.querySelector("#modal-title");
const modalEyebrow = document.querySelector("#modal-eyebrow");
const modalContent = document.querySelector("#modal-content");
const toastRegion = document.querySelector("#toast-region");

function formatPrice(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return new Map();
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return new Map();
    const safeCart = new Map();
    Object.entries(parsed).forEach(([id, quantity]) => {
      if (productMap.has(id) && Number.isSafeInteger(quantity) && quantity > 0 && quantity <= 99) {
        safeCart.set(id, quantity);
      }
    });
    return safeCart;
  } catch (error) {
    console.warn("Keranjang tersimpan tidak dapat dibaca; keranjang dimulai dari kosong.", error);
    return new Map();
  }
}

function saveCart() {
  try {
    const value = Object.fromEntries(cart);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.error("Keranjang tidak dapat disimpan di perangkat ini.", error);
    showToast("Keranjang tidak dapat disimpan di perangkat ini.");
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createProductCard(product, compact) {
  const article = createElement("article", compact ? "featured-card" : "product-card");
  const imageButton = createElement("button", compact ? "featured-image-button" : "product-image-button");
  imageButton.type = "button";
  imageButton.setAttribute("aria-label", `Lihat detail ${product.name}`);
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = `Ilustrasi ${product.name}`;
  image.loading = "lazy";
  imageButton.append(image);
  imageButton.addEventListener("click", () => openProductDetails(product));
  article.append(imageButton);

  if (compact) {
    const content = createElement("div");
    const title = createElement("h3", "", product.name);
    const description = createElement("p", "", product.description);
    const price = createElement("strong", "", formatPrice(product.price));
    content.append(title, description, price);
    article.append(content);
    return article;
  }

  const body = createElement("div", "product-card-body");
  body.append(createElement("span", "category-tag", product.categoryLabel));
  body.append(createElement("h3", "", product.name));
  body.append(createElement("p", "product-description", product.description));
  const bottom = createElement("div", "product-card-bottom");
  const price = createElement("span", "product-price", formatPrice(product.price));
  const details = createElement("button", "detail-link", "Detail menu");
  details.type = "button";
  details.addEventListener("click", () => openProductDetails(product));
  const add = createElement("button", "add-button", "+");
  add.type = "button";
  add.setAttribute("aria-label", `Tambah ${product.name} ke keranjang`);
  add.addEventListener("click", () => changeQuantity(product.id, 1));
  const actions = createElement("div", "product-actions");
  actions.append(details, add);
  bottom.append(price, actions);
  body.append(bottom);
  article.append(body);
  return article;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  const category = categoryFilter.value;
  const filtered = products.filter((product) => {
    const matchesText = `${product.name} ${product.description}`.toLocaleLowerCase("id").includes(query);
    return matchesText && (category === "semua" || product.category === category);
  });
  productList.replaceChildren(...filtered.map((product) => createProductCard(product, false)));
  emptyState.hidden = filtered.length !== 0;
  resultsCount.textContent = `${filtered.length} menu tersedia`;
}

function renderFeatured() {
  featuredList.replaceChildren(...featuredIds.map((id) => createProductCard(productMap.get(id), true)));
}

function renderStories() {
  storyList.replaceChildren(...storyProducts.map((product, index) => {
    const card = createElement("article", "story-card");
    card.append(createElement("span", "story-symbol", ["✦", "❋", "◉", "❧"][index % 4]));
    card.append(createElement("h3", "", product.name));
    card.append(createElement("p", "", product.story));
    return card;
  }));
}

function cartTotals() {
  let count = 0;
  let total = 0;
  cart.forEach((quantity, id) => {
    const product = productMap.get(id);
    if (product) {
      count += quantity;
      total += quantity * product.price;
    }
  });
  return { count, total };
}

function renderCart() {
  const items = [];
  cart.forEach((quantity, id) => {
    const product = productMap.get(id);
    if (!product) return;
    const row = createElement("article", "cart-item");
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = "";
    image.loading = "lazy";
    const content = createElement("div");
    content.append(createElement("h3", "", product.name));
    content.append(createElement("span", "cart-item-price", `${formatPrice(product.price)} / porsi`));
    const controls = createElement("div", "quantity-control");
    const decrease = createElement("button", "", "−");
    decrease.type = "button";
    decrease.setAttribute("aria-label", `Kurangi ${product.name}`);
    decrease.addEventListener("click", () => changeQuantity(id, -1));
    const amount = createElement("span", "", String(quantity));
    const increase = createElement("button", "", "+");
    increase.type = "button";
    increase.setAttribute("aria-label", `Tambah ${product.name}`);
    increase.addEventListener("click", () => changeQuantity(id, 1));
    controls.append(decrease, amount, increase);
    row.append(image, content, controls);
    items.push(row);
  });
  document.querySelector("#cart-items").replaceChildren(...items);
  const { count, total } = cartTotals();
  document.querySelector(".cart-count").textContent = String(count);
  document.querySelector(".cart-count").setAttribute("aria-label", `${count} item`);
  document.querySelector("#cart-total").textContent = formatPrice(total);
  document.querySelector("#cart-empty").classList.toggle("is-visible", count === 0);
  document.querySelector("#cart-panel-foot").hidden = count === 0;
}

function changeQuantity(id, amount) {
  const product = productMap.get(id);
  if (!product) return;
  const next = (cart.get(id) || 0) + amount;
  if (next <= 0) cart.delete(id);
  else if (next <= 99) cart.set(id, next);
  else {
    showToast("Jumlah maksimum untuk satu menu adalah 99.");
    return;
  }
  saveCart();
  renderCart();
  if (amount > 0) showToast(`${product.name} ditambahkan ke keranjang.`);
}

function openCart() {
  closeMenu();
  cartPanel.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  document.body.classList.add("no-scroll");
  cartPanel.querySelector(".cart-close").focus();
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
  if (modalBackdrop.hidden) document.body.classList.remove("no-scroll");
}

function openModal(title, eyebrow, contentBuilder) {
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = title;
  modalEyebrow.textContent = eyebrow;
  modalContent.replaceChildren();
  contentBuilder(modalContent);
  modalBackdrop.hidden = false;
  document.body.classList.add("no-scroll");
  modal.focus();
}

function closeModal() {
  if (modalBackdrop.hidden) return;
  modalBackdrop.hidden = true;
  modalContent.replaceChildren();
  if (!cartPanel.classList.contains("is-open")) document.body.classList.remove("no-scroll");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
}

function openProductDetails(product) {
  openModal(product.name, product.categoryLabel, (content) => {
    const image = document.createElement("img");
    image.className = "detail-modal-image";
    image.src = product.image;
    image.alt = `Ilustrasi ${product.name}`;
    image.loading = "lazy";
    content.append(image);
    const facts = createElement("div", "detail-facts");
    [["Bahan utama", product.ingredients], ["Karakter rasa", product.flavor], ["Informasi alergen umum", product.allergens]].forEach(([heading, detail]) => {
      const block = createElement("div");
      block.append(createElement("h3", "", heading));
      block.append(createElement("p", "", detail));
      facts.append(block);
    });
    content.append(facts);
    const actions = createElement("div", "modal-action-row");
    const price = createElement("span", "product-price", formatPrice(product.price));
    const add = createElement("button", "button button-primary", "Tambah ke keranjang");
    add.type = "button";
    add.addEventListener("click", () => {
      changeQuantity(product.id, 1);
      closeModal();
    });
    actions.append(price, add);
    content.append(actions);
  });
}

function showToast(message) {
  toastRegion.replaceChildren(createElement("div", "toast", message));
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastRegion.replaceChildren(), 3200);
}

function validateField(field) {
  const value = field.value.trim();
  const error = document.querySelector(`#${field.id}-error`);
  let message = "";
  if (field.name === "nama" && (value.length < 2 || value.length > 80)) message = "Nama harus berisi 2–80 karakter.";
  if (field.name === "whatsapp") {
    const digits = value.replace(/[\s()+-]/g, "");
    if (!/^\+?[0-9][0-9\s()-]*$/.test(value) || !/^\d{9,15}$/.test(digits)) message = "Masukkan nomor WhatsApp 9–15 digit, boleh diawali +.";
    else field.dataset.normalized = digits;
  }
  if (field.name === "alamat" && (value.length < 8 || value.length > 240)) message = "Alamat harus berisi 8–240 karakter.";
  if (field.name === "catatan" && value.length > 300) message = "Catatan maksimal 300 karakter.";
  error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
  return !message;
}

function openCheckout() {
  if (cart.size === 0) {
    showToast("Tambahkan menu ke keranjang sebelum memesan.");
    return;
  }
  closeCart();
  openModal("Detail pemesanan", "Siapkan pesanan", (content) => {
    const form = createElement("form", "form-grid");
    form.noValidate = true;
    const fields = [
      { id: "order-name", name: "nama", label: "Nama lengkap", type: "text", max: "80", placeholder: "Nama penerima" },
      { id: "order-whatsapp", name: "whatsapp", label: "Nomor WhatsApp", type: "tel", max: "24", placeholder: "Contoh: 081234567890" },
      { id: "order-address", name: "alamat", label: "Alamat pengantaran", type: "textarea", max: "240", placeholder: "Nama jalan, nomor, kecamatan, kota" },
      { id: "order-note", name: "catatan", label: "Catatan (opsional)", type: "textarea", max: "300", placeholder: "Contoh: tidak terlalu pedas" }
    ];
    fields.forEach((fieldInfo) => {
      const group = createElement("div", "form-field");
      const label = createElement("label", "", fieldInfo.label);
      label.htmlFor = fieldInfo.id;
      let field;
      if (fieldInfo.type === "textarea") field = document.createElement("textarea");
      else {
        field = document.createElement("input");
        field.type = fieldInfo.type;
      }
      field.id = fieldInfo.id;
      field.name = fieldInfo.name;
      field.maxLength = Number(fieldInfo.max);
      field.required = fieldInfo.name !== "catatan";
      field.placeholder = fieldInfo.placeholder;
      field.autocomplete = fieldInfo.name === "nama" ? "name" : fieldInfo.name === "whatsapp" ? "tel" : fieldInfo.name === "alamat" ? "street-address" : "off";
      field.setAttribute("aria-describedby", `${fieldInfo.id}-error`);
      field.addEventListener("blur", () => validateField(field));
      const error = createElement("span", "field-error");
      error.id = `${fieldInfo.id}-error`;
      error.setAttribute("aria-live", "polite");
      group.append(label, field, error);
      form.append(group);
    });
    form.append(createElement("p", "form-note", "Harga belum termasuk ongkos kirim. Ketersediaan dan total akhir dikonfirmasi penjual."));
    const submit = createElement("button", "button button-primary", "Lihat ringkasan pesanan");
    submit.type = "submit";
    form.append(submit);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formFields = Array.from(form.querySelectorAll("input, textarea"));
      const valid = formFields.map(validateField).every(Boolean);
      if (!valid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      showOrderSummary(Object.fromEntries(formFields.map((field) => [field.name, field.value.trim()])));
    });
    content.append(form);
    form.querySelector("input").focus();
  });
}

function showOrderSummary(details) {
  openModal("Periksa pesananmu", "Ringkasan pesanan", (content) => {
    const summary = createElement("div", "order-summary");
    summary.append(createElement("h3", "", "Menu pilihan"));
    cart.forEach((quantity, id) => {
      const product = productMap.get(id);
      if (!product) return;
      summary.append(createElement("p", "summary-line", `${product.name} × ${quantity} — ${formatPrice(product.price * quantity)}`));
    });
    const { total } = cartTotals();
    const totalLine = createElement("div", "summary-total");
    totalLine.append(createElement("span", "", "Total sementara"), createElement("span", "", formatPrice(total)));
    summary.append(totalLine);
    content.append(summary);
    const buyer = createElement("div", "detail-facts");
    [["Nama", details.nama], ["WhatsApp", details.whatsapp], ["Alamat", details.alamat], ["Catatan", details.catatan || "—"]].forEach(([label, value]) => {
      const block = createElement("div");
      block.append(createElement("h3", "", label), createElement("p", "", value));
      buyer.append(block);
    });
    content.append(buyer);
    content.append(createElement("p", "form-note", "WhatsApp akan terbuka di tab baru dengan pesan yang sudah disiapkan. Periksa kembali sebelum mengirim."));
    const actions = createElement("div", "modal-action-row");
    const send = createElement("a", "button button-primary", "Lanjut ke WhatsApp");
    const phone = WHATSAPP_PENJUAL.replace(/\D/g, "");
    const message = [
      "Halo, saya ingin memesan makanan Aceh:",
      ...Array.from(cart, ([id, quantity]) => {
        const product = productMap.get(id);
        return `- ${product.name} x${quantity} (${formatPrice(product.price * quantity)})`;
      }),
      `Total sementara: ${formatPrice(total)}`,
      `Nama: ${details.nama}`,
      `WhatsApp: ${details.whatsapp}`,
      `Alamat: ${details.alamat}`,
      `Catatan: ${details.catatan || "-"}`
    ].join("\n");
    send.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    send.target = "_blank";
    send.rel = "noopener noreferrer";
    send.addEventListener("click", closeModal);
    const back = createElement("button", "button button-outline", "Kembali");
    back.type = "button";
    back.addEventListener("click", openCheckout);
    actions.append(send, back);
    content.append(actions);
  });
}

function closeMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Buka menu navigasi");
}

function init() {
  renderFeatured();
  renderProducts();
  renderStories();
  renderCart();
  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  searchInput.addEventListener("input", renderProducts);
  categoryFilter.addEventListener("change", renderProducts);
  document.querySelectorAll(".cart-open").forEach((button) => button.addEventListener("click", openCart));
  document.querySelector(".cart-close").addEventListener("click", closeCart);
  document.querySelector(".cart-browse").addEventListener("click", () => {
    closeCart();
    document.querySelector("#produk").scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector(".checkout-open").addEventListener("click", openCheckout);
  scrim.addEventListener("click", closeCart);
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!modalBackdrop.hidden) closeModal();
      else if (cartPanel.classList.contains("is-open")) closeCart();
      else closeMenu();
    }
  });
  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle.addEventListener("click", () => {
    const nav = document.querySelector("#primary-nav");
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  });
  document.querySelectorAll("#primary-nav a").forEach((link) => link.addEventListener("click", closeMenu));
}

init();
