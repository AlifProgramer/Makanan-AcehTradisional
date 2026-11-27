"use strict";

const WHATSAPP_PENJUAL = "6281234567890";
const ONGKOS_KIRIM_CONTOH = 10000;
const STORAGE_KEY = "rasa-aceh-cart-v2";

const products = [
  { id: "mie-aceh", name: "Mie Aceh", category: "berat", categoryLabel: "Makanan Berat", price: 28000, gambar: "gambar-aceh/mie-aceh.jpg", description: "Mi tebal dengan racikan rempah, tersedia goreng atau kuah.", spice: "Sedang; tingkat pedas dapat ditanyakan.", portion: "1 porsi", ingredients: "Mi, bawang, cabai, rempah, dan sayuran. Pilihan lauk mengikuti ketersediaan.", allergens: "Dapat mengandung gluten, telur, kedelai, ikan, udang, atau kerang sesuai pilihan lauk.", flavor: "Gurih dan kaya aroma rempah.", origin: "Asal-usul khusus: perlu diverifikasi. Racikan dan pilihan lauk dapat berbeda antarrumah makan.", serving: "Dinikmati sebagai hidangan utama; pilihan goreng atau kuah mengikuti kebiasaan tempat makan.", available: true, featured: true },
  { id: "nasi-gurih", name: "Nasi Gurih", category: "berat", categoryLabel: "Makanan Berat", price: 15000, gambar: "gambar-aceh/nasi-gurih.jpg", photoLabel: "Foto ilustrasi", description: "Nasi beraroma santan dan rempah, cocok dengan lauk.", spice: "Tidak pedas.", portion: "1 porsi", ingredients: "Beras, santan, daun pandan, serai, dan rempah aromatik.", allergens: "Mengandung kelapa; periksa bahan lauk atau taburan tambahan.", flavor: "Lembut, gurih, dan wangi.", origin: "Asal-usul khusus: perlu diverifikasi. Nasi berbumbu hadir dalam beragam kebiasaan makan di Aceh.", serving: "Disajikan sebagai nasi pendamping; lauk dapat berbeda menurut rumah dan daerah.", available: true, featured: false },
  { id: "ayam-tangkap", name: "Ayam Tangkap", category: "lauk", categoryLabel: "Lauk", price: 35000, gambar: "gambar-aceh/ayam-tangkap.jpg", description: "Ayam berbumbu dengan daun aromatik yang harum.", spice: "Sedang; bumbu mengandung cabai.", portion: "1 porsi lauk", ingredients: "Ayam, daun kari/temurui, daun pandan, bawang, dan rempah.", allergens: "Periksa kemungkinan penggunaan kacang, kedelai, dan bahan lain dalam bumbu.", flavor: "Gurih dan aromatik; daun renyah menjadi pelengkap.", origin: "Asal-usul khusus: perlu diverifikasi. Daun aromatik menjadi ciri penyajian di sejumlah versi.", serving: "Dihidangkan dengan daun aromatik dan dinikmati bersama nasi.", available: true, featured: true },
  { id: "kuah-beulangong", name: "Kuah Beulangong", category: "lauk", categoryLabel: "Lauk", price: 38000, gambar: "gambar-aceh/kuah-beulangong.jpg", description: "Kuah rempah dan daging, dikenal sebagai sajian kebersamaan.", spice: "Sedang.", portion: "1 porsi", ingredients: "Daging sapi atau kambing, nangka muda, santan, dan rempah.", allergens: "Mengandung santan; tanyakan bahan tambahan dan kemungkinan kontaminasi silang.", flavor: "Gurih, hangat, dan kaya rempah.", origin: "Asal-usul dan kaitan upacara tertentu: perlu diverifikasi bersama sumber daerah dan komunitas.", serving: "Namanya merujuk pada beulangong (belanga); cara masak dan penyajian dapat berbeda.", available: true, featured: false },
  { id: "sie-reuboh", name: "Sie Reuboh", category: "lauk", categoryLabel: "Lauk", price: 36000, gambar: "gambar-aceh/Sie Reuboh.jpeg", description: "Olahan daging berbumbu dengan sentuhan rasa asam.", spice: "Sedang hingga pedas.", portion: "1 porsi", ingredients: "Daging sapi, cuka lokal, cabai, bawang, dan racikan bumbu.", allergens: "Tanyakan kemungkinan bahan kedelai atau bahan tambahan pada racikan.", flavor: "Gurih, asam, dan pedas.", origin: "Asal-usul dan teknik tradisional spesifik: perlu diverifikasi melalui sumber lokal.", serving: "Dinikmati bersama nasi; resep dan tingkat rasa berbeda menurut keluarga.", available: true, featured: false },
  { id: "kuah-pliek-u", name: "Kuah Pliek U", category: "lauk", categoryLabel: "Lauk", price: 30000, gambar: "gambar-aceh/kuah-pliek-u.jpg", description: "Kuah sayur dengan pliek u dan aneka sayuran.", spice: "Sedang.", portion: "1 porsi", ingredients: "Pliek u (olahan kelapa), sayuran, kelapa, cabai, dan rempah.", allergens: "Mengandung kelapa; jenis sayuran dan bahan tambahan perlu ditanyakan.", flavor: "Gurih, harum, dengan rasa khas pliek u.", origin: "Kisah asal-usul spesifik: perlu diverifikasi. Pliek u dikenal sebagai bahan dalam sejumlah masakan Aceh.", serving: "Disajikan sebagai kuah sayur; pilihan sayuran dapat bervariasi.", available: true, featured: false },
  { id: "eungkot-keumamah", name: "Eungkot Keumamah", category: "lauk", categoryLabel: "Lauk", price: 32000, gambar: "gambar-aceh/eungkot-keumamah.jpg", description: "Olahan ikan kayu dengan bumbu khas, resep dapat berbeda.", spice: "Sedang hingga pedas.", portion: "1 porsi lauk", ingredients: "Ikan tongkol yang dikeringkan, cabai, bawang, dan bumbu.", allergens: "Mengandung ikan; periksa bahan tambahan dan kemungkinan kontaminasi silang.", flavor: "Gurih, berbumbu, dan beraroma.", origin: "Kisah asal-usul dan sejarah pemanfaatan khusus: perlu diverifikasi dari sumber setempat.", serving: "Dimasak kembali dengan bumbu; cara olah berbeda antarkeluarga.", available: true, featured: false },
  { id: "timphan", name: "Timphan", category: "kue", categoryLabel: "Kue", price: 8000, gambar: "gambar-aceh/timphan.jpg", description: "Kue lembut berbungkus daun pisang dengan isian manis.", spice: "Tidak pedas.", portion: "1 buah", ingredients: "Tepung ketan, pisang atau labu, santan, dan isian sesuai resep.", allergens: "Dapat mengandung gluten, telur, dan kelapa sesuai adonan serta isi.", flavor: "Manis lembut dan wangi daun pisang.", origin: "Asal-usul khusus: perlu diverifikasi. Timphan dikenal sebagai salah satu kue tradisional Aceh.", serving: "Kerap dijumpai pada waktu berkumpul; waktu dan cara penyajian dapat berbeda.", available: true, featured: true },
  { id: "bhoi", name: "Bhoi", category: "kue", categoryLabel: "Kue", price: 6000, gambar: "gambar-aceh/bhoi (1).jpeg", description: "Kue panggang tradisional; bahan dan bentuk mengikuti resep.", spice: "Tidak pedas.", portion: "1 buah", ingredients: "Umumnya adonan kue berbahan telur, tepung, dan gula; resep penjual perlu dikonfirmasi.", allergens: "Dapat mengandung telur dan gluten.", flavor: "Manis dan ringan.", origin: "Asal-usul dan makna simbolis tertentu: perlu diverifikasi dari sumber lokal.", serving: "Jenis bentuk dan penyajian dapat berbeda menurut pembuat.", available: false, featured: false },
  { id: "martabak-aceh", name: "Martabak Aceh", category: "kue", categoryLabel: "Kue", price: 22000, gambar: "gambar-aceh/martabak-aceh.jpg", description: "Martabak gurih dengan telur dan sayur, dibuat saat dipesan.", spice: "Tidak pedas hingga sedang.", portion: "1 porsi", ingredients: "Adonan tepung, telur, bawang, dan sayuran; isian dapat bervariasi.", allergens: "Mengandung gluten dan telur; kemungkinan bahan susu atau lainnya perlu ditanyakan.", flavor: "Gurih, renyah di luar dan lembut di dalam.", origin: "Asal-usul khusus: perlu diverifikasi. Ragam martabak memiliki banyak versi daerah.", serving: "Disajikan hangat sebagai kudapan atau teman makan.", available: true, featured: false },
  { id: "kopi-sanger", name: "Kopi Sanger", category: "minuman", categoryLabel: "Minuman", price: 18000, gambar: "gambar-aceh/kopi-sanger.jpg", description: "Kopi dengan susu kental manis; takaran dapat dikonfirmasi.", spice: "Tidak pedas.", portion: "1 gelas", ingredients: "Kopi, air, dan susu kental manis sesuai racikan.", allergens: "Mengandung susu; dapat mengandung laktosa.", flavor: "Kopi kuat dengan rasa manis dan creamy.", origin: "Kisah asal-usul nama dan racikan: perlu diverifikasi dari sumber setempat.", serving: "Disajikan hangat atau dingin sesuai pilihan penjual.", available: true, featured: false },
  { id: "kopi-gayo", name: "Kopi Gayo", category: "minuman", categoryLabel: "Minuman", price: 18000, gambar: "gambar-aceh/kopi-gayo.jpg", description: "Seduhan kopi dari kawasan Gayo, nikmat hangat atau dingin.", spice: "Tidak pedas.", portion: "1 gelas", ingredients: "Kopi dan air; gula atau susu sesuai pilihan.", allergens: "Kopi murni tidak mengandung alergen umum; susu dapat mengandung laktosa.", flavor: "Aroma kopi dengan karakter seduhan yang beragam.", origin: "Asal-usul kebun, varietas, dan klaim produksi spesifik: perlu diverifikasi dari produsen.", serving: "Diseduh sesuai metode penjual dan dinikmati bersama.", available: true, featured: true }
];

const productMap = new Map(products.map((product) => [product.id, product]));
let cart = loadCart();
let lastFocusedElement = null;
let toastTimer = 0;
let checkoutDraft = {};

const productList = document.querySelector("#product-list");
const featuredList = document.querySelector("#featured-list");
const featuredPrevious = document.querySelector("#featured-previous");
const featuredNext = document.querySelector("#featured-next");
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
    Object.entries(parsed).forEach(([id, entry]) => {
      if (!productMap.has(id) || !entry || typeof entry !== "object") return;
      if (Number.isSafeInteger(entry.quantity) && entry.quantity > 0 && entry.quantity <= 99 && typeof entry.note === "string" && entry.note.length <= 160) {
        safeCart.set(id, { quantity: entry.quantity, note: entry.note });
      }
    });
    return safeCart;
  } catch (error) {
    console.warn("Data keranjang tersimpan tidak valid; keranjang dimulai dari kosong.", error);
    return new Map();
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(cart)));
  } catch (error) {
    console.error("Keranjang tidak dapat disimpan di perangkat ini.", error);
    showToast("Keranjang tidak dapat disimpan di perangkat ini. Coba aktifkan penyimpanan browser.");
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createImage(product, extraClass) {
  const photo = createElement("figure", extraClass ? `product-photo ${extraClass}` : "product-photo");
  if (!product.gambar) {
    const fallback = createElement("div", "image-fallback", `${product.name} — Foto segera tersedia`);
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", product.name);
    photo.append(fallback);
  } else {
    const image = document.createElement("img");
    image.alt = product.name;
    image.loading = "lazy";
    image.decoding = "async";
    image.width = 320;
    image.height = 240;
    image.addEventListener("error", () => {
      const fallback = createElement("div", "image-fallback", `${product.name} — Foto segera tersedia`);
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", product.name);
      image.replaceWith(fallback);
    });
    image.src = product.gambar;
    photo.append(image);
  }
  if (product.photoLabel) photo.append(createElement("span", "photo-label", product.photoLabel));
  return photo;
}

function createProductCard(product, compact) {
  const article = createElement("article", compact ? "featured-card" : "product-card");
  const imageButton = createElement("button", compact ? "featured-image-button" : "product-image-button");
  imageButton.type = "button";
  imageButton.setAttribute("aria-label", `Lihat detail ${product.name}`);
  const photo = createImage(product, "");
  if (compact) {
    imageButton.append(photo, createElement("span", "featured-category-tag", product.categoryLabel));
  } else {
    imageButton.append(photo);
  }
  imageButton.addEventListener("click", () => openProductDetails(product));
  article.append(imageButton);

  const body = createElement("div", compact ? "featured-card-body" : "product-card-body");
  if (compact) {
    body.append(createElement("strong", "featured-price", formatPrice(product.price)));
    body.append(createElement("h3", "", product.name));
    body.append(createElement("p", "featured-description", product.description));
    const add = createElement("button", "button button-primary featured-add", "Tambah");
    add.type = "button";
    add.setAttribute("aria-label", `Tambah ${product.name} ke keranjang`);
    add.addEventListener("click", () => addToCart(product.id, 1, ""));
    body.append(add);
  } else {
    const top = createElement("div", "product-card-top");
    top.append(createElement("span", "category-tag", product.categoryLabel));
    if (!product.available) top.append(createElement("span", "sold-out-badge", "Habis"));
    body.append(top);
    const name = createElement("button", "product-name-button", product.name);
    name.type = "button";
    name.addEventListener("click", () => openProductDetails(product));
    body.append(name);
    body.append(createElement("p", "product-description", product.description));
    body.append(createElement("p", "spice-level", `Pedas: ${product.spice}`));
    const bottom = createElement("div", "product-card-bottom");
    bottom.append(createElement("span", "product-price", formatPrice(product.price)));
    const add = createElement("button", product.available ? "button button-primary add-product" : "button button-disabled add-product", product.available ? "Tambah" : "Menu habis");
    add.type = "button";
    add.disabled = !product.available;
    add.setAttribute("aria-label", product.available ? `Tambah ${product.name} ke keranjang` : `${product.name} sedang habis`);
    add.addEventListener("click", () => addToCart(product.id, 1, ""));
    bottom.append(add);
    body.append(bottom);
  }
  article.append(body);
  return article;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  const category = categoryFilter.value;
  const filtered = products.filter((product) => {
    const matchesText = `${product.name} ${product.description} ${product.categoryLabel}`.toLocaleLowerCase("id").includes(query);
    return matchesText && (category === "semua" || product.category === category);
  });
  productList.replaceChildren(...filtered.map((product) => createProductCard(product, false)));
  emptyState.hidden = filtered.length !== 0;
  resultsCount.textContent = `${filtered.length} dari ${products.length} menu`;
  document.querySelectorAll(".filter-chip").forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderFeatured() {
  const featured = products.filter((product) => product.featured && product.available);
  featuredList.replaceChildren(...featured.map((product) => createProductCard(product, true)));
  updateFeaturedControls();
}

function updateFeaturedControls() {
  const maxScroll = featuredList.scrollWidth - featuredList.clientWidth;
  featuredPrevious.disabled = maxScroll <= 1 || featuredList.scrollLeft <= 1;
  featuredNext.disabled = maxScroll <= 1 || featuredList.scrollLeft >= maxScroll - 1;
}

function scrollFeatured(direction) {
  const card = featuredList.querySelector(".featured-card");
  if (!card) return;
  const gap = Number.parseFloat(getComputedStyle(featuredList).columnGap) || 0;
  const distance = card.getBoundingClientRect().width + gap;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  featuredList.scrollBy({ left: direction * distance, behavior });
}

function renderStories() {
  storyList.replaceChildren(...products.map((product, index) => {
    const card = createElement("article", "story-card");
    card.append(createElement("span", "story-symbol", ["✦", "❋", "◉", "❧"][index % 4]));
    card.append(createElement("h3", "", product.name));
    card.append(createElement("p", "", product.origin));
    const flavor = createElement("p", "story-flavor", `Bumbu dan rasa: ${product.flavor}`);
    card.append(flavor);
    card.append(createElement("p", "story-serving", `Penyajian: ${product.serving}`));
    const action = createElement("button", "text-link story-order", "Pesan makanan ini");
    action.type = "button";
    action.addEventListener("click", () => openProductDetails(product));
    card.append(action);
    return card;
  }));
}

function cartTotals(mode) {
  let count = 0;
  let subtotal = 0;
  cart.forEach((entry, id) => {
    const product = productMap.get(id);
    if (!product) return;
    count += entry.quantity;
    subtotal += entry.quantity * product.price;
  });
  const shipping = count > 0 && mode !== "ambil" ? ONGKOS_KIRIM_CONTOH : 0;
  return { count, subtotal, shipping, total: subtotal + shipping };
}

function renderCart() {
  const rows = [];
  cart.forEach((entry, id) => {
    const product = productMap.get(id);
    if (!product) return;
    const row = createElement("article", "cart-item");
    row.append(createImage(product, ""));
    const content = createElement("div", "cart-item-content");
    content.append(createElement("h3", "", product.name));
    content.append(createElement("span", "cart-item-price", `${formatPrice(product.price)} / ${product.portion.toLocaleLowerCase("id")}`));
    if (entry.note) content.append(createElement("p", "cart-item-note", `Catatan: ${entry.note}`));
    const controls = createElement("div", "quantity-control");
    const decrease = createElement("button", "", "−");
    decrease.type = "button";
    decrease.setAttribute("aria-label", `Kurangi ${product.name}`);
    decrease.addEventListener("click", () => changeQuantity(id, -1));
    const amount = createElement("span", "", String(entry.quantity));
    amount.setAttribute("aria-label", `${entry.quantity} porsi`);
    const increase = createElement("button", "", "+");
    increase.type = "button";
    increase.setAttribute("aria-label", `Tambah ${product.name}`);
    increase.addEventListener("click", () => changeQuantity(id, 1));
    const remove = createElement("button", "remove-item", "Hapus");
    remove.type = "button";
    remove.setAttribute("aria-label", `Hapus ${product.name} dari keranjang`);
    remove.addEventListener("click", () => removeFromCart(id));
    controls.append(decrease, amount, increase, remove);
    row.append(content, controls);
    rows.push(row);
  });
  document.querySelector("#cart-items").replaceChildren(...rows);
  const { count, subtotal, shipping, total } = cartTotals();
  document.querySelectorAll(".cart-count").forEach((badge) => { badge.textContent = String(count); });
  document.querySelectorAll(".cart-open").forEach((button) => button.setAttribute("aria-label", `Buka keranjang, ${count} item`));
  document.querySelector("#cart-subtotal").textContent = formatPrice(subtotal);
  document.querySelector("#cart-shipping").textContent = formatPrice(shipping);
  document.querySelector("#cart-total").textContent = formatPrice(total);
  document.querySelector("#cart-empty").classList.toggle("is-visible", count === 0);
  document.querySelector("#cart-panel-foot").hidden = count === 0;
}

function addToCart(id, quantity, note) {
  const product = productMap.get(id);
  if (!product || !product.available) {
    showToast(product ? `${product.name} sedang habis.` : "Menu ini tidak tersedia.");
    return;
  }
  const current = cart.get(id) || { quantity: 0, note: "" };
  if (current.quantity + quantity > 99) {
    showToast("Maksimal 99 porsi untuk satu menu.");
    return;
  }
  cart.set(id, { quantity: current.quantity + quantity, note: note || current.note });
  saveCart();
  renderCart();
  showToast(`${product.name} sudah masuk keranjang.`);
}

function changeQuantity(id, amount) {
  const current = cart.get(id);
  if (!current) return;
  const quantity = current.quantity + amount;
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  if (quantity > 99) {
    showToast("Maksimal 99 porsi untuk satu menu.");
    return;
  }
  cart.set(id, { ...current, quantity });
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  const previous = cart.get(id);
  const product = productMap.get(id);
  if (!previous || !product) return;
  cart.delete(id);
  saveCart();
  renderCart();
  showToast(`${product.name} dihapus dari keranjang.`, {
    label: "Batalkan",
    action: () => {
      cart.set(id, previous);
      saveCart();
      renderCart();
      showToast(`${product.name} dikembalikan ke keranjang.`);
    }
  });
}

function openCart() {
  closeMenu();
  lastFocusedElement = document.activeElement;
  cartPanel.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  document.body.classList.add("no-scroll");
  cartPanel.querySelector(".cart-close").focus();
}

function closeCart() {
  const wasOpen = cartPanel.classList.contains("is-open");
  cartPanel.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
  if (modalBackdrop.hidden) document.body.classList.remove("no-scroll");
  if (wasOpen && lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
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

function appendFact(parent, heading, detail) {
  const block = createElement("div", "detail-fact");
  block.append(createElement("h3", "", heading));
  block.append(createElement("p", "", detail));
  parent.append(block);
}

function openProductDetails(product) {
  openModal(product.name, `${product.categoryLabel} · Harga contoh`, (content) => {
    content.append(createImage(product, "detail-modal-image"));
    content.append(createElement("strong", "detail-price", formatPrice(product.price)));
    content.append(createElement("p", "portion-note", `Ukuran contoh: ${product.portion}. Harga dan porsi perlu dikonfirmasi penjual.`));
    const facts = createElement("div", "detail-facts");
    appendFact(facts, "Bahan utama", product.ingredients);
    appendFact(facts, "Alergen", product.allergens);
    appendFact(facts, "Cerita singkat · perlu diverifikasi", product.origin);
    content.append(facts);
    if (!product.available) {
      content.append(createElement("p", "sold-out-message", "Menu ini sedang habis. Silakan pilih menu lain."));
      return;
    }
    const form = createElement("form", "detail-order-form");
    form.noValidate = true;
    const quantityGroup = createElement("div", "form-field");
    const quantityLabel = createElement("label", "", "Jumlah porsi");
    quantityLabel.htmlFor = "detail-quantity";
    const quantity = document.createElement("input");
    quantity.id = "detail-quantity";
    quantity.type = "number";
    quantity.min = "1";
    quantity.max = "99";
    quantity.value = "1";
    quantity.inputMode = "numeric";
    quantityGroup.append(quantityLabel, quantity);
    const noteGroup = createElement("div", "form-field");
    const noteLabel = createElement("label", "", "Catatan menu (opsional)");
    noteLabel.htmlFor = "detail-note";
    const note = document.createElement("textarea");
    note.id = "detail-note";
    note.maxLength = 160;
    note.placeholder = "Contoh: sambal dipisah";
    noteGroup.append(noteLabel, note);
    const error = createElement("span", "field-error");
    error.id = "detail-quantity-error";
    error.setAttribute("aria-live", "polite");
    form.append(quantityGroup, noteGroup, error);
    const add = createElement("button", "button button-primary", "Masukkan Keranjang");
    add.type = "submit";
    form.append(add);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const count = Number(quantity.value);
      if (!Number.isSafeInteger(count) || count < 1 || count > 99) {
        error.textContent = "Pilih jumlah antara 1 dan 99 porsi.";
        quantity.setAttribute("aria-invalid", "true");
        quantity.focus();
        return;
      }
      error.textContent = "";
      quantity.removeAttribute("aria-invalid");
      addToCart(product.id, count, note.value.trim());
      closeModal();
    });
    content.append(form);
  });
}

function showToast(message, actionInfo) {
  const toast = createElement("div", "toast");
  toast.append(createElement("span", "", message));
  if (actionInfo) {
    const action = createElement("button", "toast-action", actionInfo.label);
    action.type = "button";
    action.addEventListener("click", () => {
      window.clearTimeout(toastTimer);
      actionInfo.action();
      toastRegion.replaceChildren();
    });
    toast.append(action);
  }
  toastRegion.replaceChildren(toast);
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastRegion.replaceChildren(), 5000);
}

function setFieldError(field, errorElement, message) {
  errorElement.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
  return !message;
}

function validateTextField(field, deliveryMode) {
  const value = field.value.trim();
  const error = document.querySelector(`#${field.id}-error`);
  let message = "";
  if (field.name === "nama" && (value.length < 2 || value.length > 80)) message = "Masukkan nama 2–80 karakter.";
  if (field.name === "whatsapp") {
    const digits = value.replace(/[\s()+-]/g, "");
    if (!/^\+?[0-9][0-9\s()-]*$/.test(value) || !/^\d{9,15}$/.test(digits)) message = "Masukkan nomor WhatsApp yang benar, 9–15 digit.";
  }
  if (field.name === "alamat" && deliveryMode === "antar" && (value.length < 8 || value.length > 240)) message = "Alamat antar harus 8–240 karakter agar mudah ditemukan.";
  if (field.name === "catatan" && value.length > 300) message = "Catatan maksimal 300 karakter.";
  return setFieldError(field, error, message);
}

function createField(form, info, initialValue) {
  const group = createElement("div", "form-field");
  const label = createElement("label", "", info.label);
  label.htmlFor = info.id;
  let field;
  if (info.type === "textarea") field = document.createElement("textarea");
  else {
    field = document.createElement("input");
    field.type = info.type;
  }
  field.id = info.id;
  field.name = info.name;
  field.maxLength = info.maxLength;
  field.required = info.required;
  field.placeholder = info.placeholder;
  field.value = initialValue || "";
  field.autocomplete = info.autocomplete || "off";
  field.setAttribute("aria-describedby", `${info.id}-error`);
  const error = createElement("span", "field-error");
  error.id = `${info.id}-error`;
  error.setAttribute("aria-live", "polite");
  group.append(label, field, error);
  form.append(group);
  return field;
}

function updateDeliveryFields(form, mode) {
  const addressGroup = form.querySelector("#order-address").closest(".form-field");
  const address = form.querySelector("#order-address");
  const addressError = form.querySelector("#order-address-error");
  const needsAddress = mode === "antar";
  addressGroup.hidden = !needsAddress;
  address.required = needsAddress;
  if (!needsAddress) {
    address.value = "";
    setFieldError(address, addressError, "");
  }
  const feeLabel = form.querySelector("#checkout-fee");
  feeLabel.textContent = formatPrice(needsAddress ? ONGKOS_KIRIM_CONTOH : 0);
  form.querySelector("#checkout-total").textContent = formatPrice(cartTotals(mode).total);
}

function selectedValue(form, name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function createRadioGroup(form, title, name, options, selected, exampleText) {
  const fieldset = createElement("fieldset", "choice-group");
  const legend = createElement("legend", "", title);
  fieldset.append(legend);
  options.forEach((option) => {
    const label = createElement("label", "choice-option");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = option.value;
    input.checked = option.value === selected;
    input.required = true;
    label.append(input, createElement("span", "", option.label));
    fieldset.append(label);
  });
  if (exampleText) fieldset.append(createElement("p", "form-note", exampleText));
  const error = createElement("span", "field-error");
  error.id = `${name}-error`;
  error.setAttribute("aria-live", "polite");
  fieldset.append(error);
  form.append(fieldset);
  return fieldset;
}

function openCheckout(initialDetails) {
  const { count } = cartTotals();
  if (!count) {
    showToast("Keranjang masih kosong. Pilih menu terlebih dahulu.");
    return;
  }
  closeCart();
  const initial = initialDetails || checkoutDraft;
  openModal("Checkout pesanan", "Tanpa perlu membuat akun", (content) => {
    const form = createElement("form", "form-grid checkout-form");
    form.noValidate = true;
    createRadioGroup(form, "Cara menerima pesanan", "pengantaran", [
      { value: "antar", label: `Diantar · ongkir contoh ${formatPrice(ONGKOS_KIRIM_CONTOH)}` },
      { value: "ambil", label: "Ambil sendiri · ongkir Rp0" }
    ], initial.pengantaran || "antar", "Ongkos antar hanya contoh, belum dikonfirmasi penjual.");
    createField(form, { id: "order-name", name: "nama", label: "Nama penerima", type: "text", maxLength: 80, required: true, placeholder: "Nama lengkap", autocomplete: "name" }, initial.nama);
    createField(form, { id: "order-whatsapp", name: "whatsapp", label: "Nomor WhatsApp", type: "tel", maxLength: 24, required: true, placeholder: "Contoh: 081234567890", autocomplete: "tel" }, initial.whatsapp);
    createField(form, { id: "order-address", name: "alamat", label: "Alamat pengantaran", type: "textarea", maxLength: 240, required: (initial.pengantaran || "antar") === "antar", placeholder: "Jalan, nomor rumah, kelurahan, kecamatan", autocomplete: "street-address" }, initial.alamat);
    createRadioGroup(form, "Pembayaran (pilihan simulasi)", "pembayaran", [
      { value: "tunai", label: "Tunai" },
      { value: "transfer", label: "Transfer" },
      { value: "qris", label: "QRIS" }
    ], initial.pembayaran || "tunai", "Jangan mengirim pembayaran sebelum mengonfirmasi cara dan tujuan pembayaran kepada penjual.");
    createField(form, { id: "order-note", name: "catatan", label: "Catatan untuk penjual (opsional)", type: "textarea", maxLength: 300, required: false, placeholder: "Contoh: sambal dipisah" }, initial.catatan);
    const totals = createElement("div", "order-summary");
    const subtotal = createElement("p", "summary-line");
    subtotal.append(createElement("span", "", "Subtotal"), createElement("strong", "", formatPrice(cartTotals().subtotal)));
    const shipping = createElement("p", "summary-line");
    shipping.append(createElement("span", "", "Ongkos antar (contoh)"));
    const shippingAmount = createElement("strong", "");
    shippingAmount.id = "checkout-fee";
    shipping.append(shippingAmount);
    const total = createElement("p", "summary-total");
    total.append(createElement("span", "", "Total sementara"), createElement("strong", "", ""));
    total.querySelector("strong").id = "checkout-total";
    totals.append(subtotal, shipping, total);
    form.append(totals);
    const note = createElement("p", "form-note", "Informasi ini hanya digunakan untuk menyiapkan pesan pesanan. Periksa kembali sebelum melanjutkan.");
    form.append(note);
    const submit = createElement("button", "button button-primary", "Tinjau Ringkasan Pesanan");
    submit.type = "submit";
    form.append(submit);
    form.addEventListener("change", (event) => {
      if (event.target.name === "pengantaran") updateDeliveryFields(form, selectedValue(form, "pengantaran"));
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const mode = selectedValue(form, "pengantaran");
      const payment = selectedValue(form, "pembayaran");
      const requiredRadioErrors = [];
      [["pengantaran", mode], ["pembayaran", payment]].forEach(([name, value]) => {
        const error = form.querySelector(`#${name}-error`);
        error.textContent = value ? "" : "Pilih salah satu opsi.";
        if (!value) requiredRadioErrors.push(form.querySelector(`input[name="${name}"]`));
      });
      const textFields = Array.from(form.querySelectorAll("input[type='text'], input[type='tel'], textarea"));
      const fieldValidity = textFields.map((field) => validateTextField(field, mode));
      if (requiredRadioErrors.length || fieldValidity.includes(false)) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]') || requiredRadioErrors[0];
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      const details = {
        pengantaran: mode,
        pembayaran: payment,
        nama: form.elements.nama.value.trim(),
        whatsapp: form.elements.whatsapp.value.trim(),
        alamat: mode === "antar" ? form.elements.alamat.value.trim() : "",
        catatan: form.elements.catatan.value.trim()
      };
      checkoutDraft = details;
      showOrderSummary(details);
    });
    content.append(form);
    updateDeliveryFields(form, initial.pengantaran || "antar");
    form.querySelector("#order-name").focus();
  });
}

function showOrderSummary(details) {
  openModal("Periksa sebelum mengirim", "Ringkasan pesanan", (content) => {
    const summary = createElement("div", "order-summary");
    summary.append(createElement("h3", "", "Menu pilihan"));
    cart.forEach((entry, id) => {
      const product = productMap.get(id);
      if (!product) return;
      summary.append(createElement("p", "summary-line", `${product.name} × ${entry.quantity} — ${formatPrice(product.price * entry.quantity)}`));
      if (entry.note) summary.append(createElement("p", "summary-note", `Catatan ${product.name}: ${entry.note}`));
    });
    const { subtotal, shipping, total } = cartTotals(details.pengantaran);
    summary.append(createElement("p", "summary-line", `Subtotal: ${formatPrice(subtotal)}`));
    summary.append(createElement("p", "summary-line", `Ongkos antar (contoh): ${formatPrice(shipping)}`));
    summary.append(createElement("p", "summary-total", `Total sementara: ${formatPrice(total)}`));
    content.append(summary);
    const buyer = createElement("div", "detail-facts summary-details");
    appendFact(buyer, "Nama", details.nama);
    appendFact(buyer, "WhatsApp", details.whatsapp);
    appendFact(buyer, "Cara menerima", details.pengantaran === "antar" ? "Diantar" : "Ambil sendiri");
    if (details.pengantaran === "antar") appendFact(buyer, "Alamat", details.alamat);
    appendFact(buyer, "Pembayaran pilihan (simulasi)", details.pembayaran.toLocaleUpperCase("id"));
    if (details.catatan) appendFact(buyer, "Catatan", details.catatan);
    content.append(buyer);
    content.append(createElement("p", "form-note summary-warning", "WhatsApp akan terbuka dengan pesan yang sudah terisi. Pesanan belum terkirim sampai kamu menekan tombol Kirim di WhatsApp."));
    const actions = createElement("div", "modal-action-row");
    const send = createElement("a", "button button-primary", "Kirim via WhatsApp");
    const phone = WHATSAPP_PENJUAL.replace(/\D/g, "");
    const lines = [
      "Halo, saya ingin memesan makanan Aceh:",
      ...Array.from(cart, ([id, entry]) => {
        const product = productMap.get(id);
        const line = `- ${product.name} x${entry.quantity} (${formatPrice(product.price * entry.quantity)})`;
        return entry.note ? `${line} | Catatan: ${entry.note}` : line;
      }),
      `Subtotal: ${formatPrice(subtotal)}`,
      `Ongkos antar (contoh): ${formatPrice(shipping)}`,
      `Total sementara: ${formatPrice(total)}`,
      `Cara menerima: ${details.pengantaran === "antar" ? "Diantar" : "Ambil sendiri"}`,
      ...(details.pengantaran === "antar" ? [`Alamat: ${details.alamat}`] : []),
      `Nama: ${details.nama}`,
      `WhatsApp pemesan: ${details.whatsapp}`,
      `Pembayaran pilihan (simulasi): ${details.pembayaran}`,
      `Catatan: ${details.catatan || "-"}`
    ];
    send.href = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
    send.target = "_blank";
    send.rel = "noopener noreferrer";
    const back = createElement("button", "button button-outline", "Kembali dan ubah");
    back.type = "button";
    back.addEventListener("click", () => openCheckout(details));
    actions.append(send, back);
    content.append(actions);
  });
}

function closeMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (!toggle || !nav) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Buka menu navigasi");
}

function setCategory(category) {
  categoryFilter.value = category;
  renderProducts();
  document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
}

function setActiveNav(id) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const active = link.dataset.nav === id;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function init() {
  renderFeatured();
  featuredList.addEventListener("scroll", updateFeaturedControls, { passive: true });
  featuredPrevious.addEventListener("click", () => scrollFeatured(-1));
  featuredNext.addEventListener("click", () => scrollFeatured(1));
  window.addEventListener("resize", updateFeaturedControls);
  renderProducts();
  renderStories();
  renderCart();
  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  searchInput.addEventListener("input", renderProducts);
  categoryFilter.addEventListener("change", renderProducts);
  document.querySelectorAll(".filter-chip").forEach((button) => button.addEventListener("click", () => {
    categoryFilter.value = button.dataset.filter;
    renderProducts();
  }));
  document.querySelectorAll(".category-shortcut").forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.category)));
  document.querySelector(".reset-search").addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "semua";
    renderProducts();
    searchInput.focus();
  });
  document.querySelectorAll(".cart-open").forEach((button) => button.addEventListener("click", openCart));
  document.querySelector(".cart-close").addEventListener("click", closeCart);
  document.querySelector(".cart-browse").addEventListener("click", () => {
    closeCart();
    document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector(".checkout-open").addEventListener("click", () => openCheckout());
  scrim.addEventListener("click", closeCart);
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!modalBackdrop.hidden) closeModal();
      else if (cartPanel.classList.contains("is-open")) closeCart();
    }
    if (event.key === "Tab" && !modalBackdrop.hidden) {
      const focusable = Array.from(modal.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])"))
        .filter((element) => !element.closest("[hidden]"));
      if (!focusable.length) {
        event.preventDefault();
        modal.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === modal)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "Tab" && cartPanel.classList.contains("is-open") && modalBackdrop.hidden) {
      const focusable = Array.from(cartPanel.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])"));
      if (focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === cartPanel)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  });
  document.querySelectorAll(".primary-nav a, .mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      setActiveNav(link.dataset.nav);
      closeMenu();
    });
  });
  const contactLink = document.querySelector(".contact-wa");
  contactLink.href = `https://wa.me/${WHATSAPP_PENJUAL.replace(/\D/g, "")}`;
  const sections = ["beranda", "menu", "sejarah", "kontak"].map((id) => document.getElementById(id));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(visible.target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.4, 0.7] });
    sections.forEach((section) => observer.observe(section));
  } else {
    setActiveNav("beranda");
  }
  setActiveNav(location.hash.replace("#", "") || "beranda");
}

init();
