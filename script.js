/* =========================================
   BIGLOGS — CUSTOMER APP
========================================= */

const products = [
  {
    id: "nordvpn",
    name: "NordVPN",
    icon: "nordvpn.png",
    category: "VPN",
    price: 4000,
    description: "Authorized VPN subscription/service for secure and private internet use.",
    stock: 25,
    features: [
      "Premium VPN service",
      "Fast and secure connection",
      "Compatible supported devices",
      "BigLogs customer support"
    ]
  },
  {
    id: "avast-vpn",
    name: "Avast VPN",
    icon: "avast-vpn.png",
    category: "VPN",
    price: 3500,
    description: "Authorized VPN service for secure everyday connections.",
    stock: 18,
    features: [
      "Secure browsing",
      "Privacy-focused service",
      "Supported device compatibility",
      "Customer support"
    ]
  },
  {
    id: "hma-vpn",
    name: "HMA VPN",
    icon: "hma-vpn.png",
    category: "VPN",
    price: 4000,
    description: "Authorized HMA VPN service for privacy and secure connections.",
    stock: 14,
    features: [
      "VPN protection",
      "Secure connection",
      "Supported devices",
      "BigLogs support"
    ]
  },
  {
    id: "expressvpn-pc",
    name: "ExpressVPN PC",
    icon: "expressvpn.png",
    category: "VPN",
    price: 4000,
    stock: 20,
    description: "ExpressVPN option for compatible computers and laptops.",
    features: [
      "PC compatible",
      "Secure connection",
      "Privacy-focused service",
      "Customer support"
    ]
  },
  {
    id: "proton-vpn",
    name: "Proton VPN",
    icon: "proton-vpn.png",
    category: "VPN",
    price: 3500,
    stock: 16,
    description: "Authorized Proton VPN service for privacy and secure browsing.",
    features: [
      "Privacy-focused service",
      "Secure browsing",
      "Supported devices",
      "Customer support"
    ]
  },
  {
    id: "expressvpn-phone",
    name: "ExpressVPN Phone",
    icon: "expressvpn.png",
    category: "VPN",
    price: 4500,
    stock: 12,
    description: "ExpressVPN option for compatible mobile devices.",
    features: [
      "Mobile compatible",
      "Secure connection",
      "Privacy-focused service",
      "BigLogs support"
    ]
  },
  {
    id: "google-voice",
    name: "Google Voice Services",
    icon: "google-voice.jpg",
    category: "Texting",
    price: 8000,
    stock: 8,
    description: "Legitimate Google Voice setup and support services.",
    features: [
      "Legitimate setup support",
      "Eligibility guidance",
      "Regional availability check",
      "Customer support"
    ]
  },
  {
    id: "facebook-pages",
    name: "Facebook Page Services",
    icon: "facebook-pages.jpg",
    category: "Social",
    price: 4500,
    stock: 10,
    description: "Authorized services for Facebook Page owners and legitimate projects.",
    features: [
      "Page setup support",
      "Page management",
      "Marketing assistance",
      "Customer support"
    ]
  },
  {
    id: "instagram-services",
    name: "Instagram Services",
    icon: "instagram.jpg",
    category: "Social",
    price: 3500,
    stock: 15,
    description: "Legitimate Instagram management and marketing services.",
    features: [
      "Instagram management",
      "Marketing support",
      "Campaign assistance",
      "Customer support"
    ]
  },
  {
    id: "tiktok-services",
    name: "TikTok Services",
    icon: "tiktok.jpg",
    category: "Social",
    price: 4270,
    stock: 13,
    description: "Legitimate TikTok management and marketing services.",
    features: [
      "TikTok management",
      "Marketing support",
      "Campaign assistance",
      "Customer support"
    ]
  },
  {
    id: "ai-video-tools",
    name: "AI Video Call Tools",
    icon: "video-call.jpg",
    category: "Tools",
    price: 0,
    priceText: "Contact for price",
    stock: 6,
    description: "AI-assisted video-call and communication tools for authorized educational uses.",
    features: [
      "Educational tools",
      "Research demonstrations",
      "Communication tools",
      "BigLogs support"
    ]
  }
];


/* =========================================
   STATE
========================================= */

let walletBalance = 2250;
let selectedProduct = null;
let quantity = 1;
let activeCategory = "All";

let cart = [];

let orders = [
  {
    id: "#BL10294",
    product: "NORD VPN 7 DAYS",
    amount: 390,
    status: "Completed",
    date: "Aug 31, 2026",
    details: {
      username: "—",
      password: "—",
      expiry: "—"
    }
  },
  {
    id: "#BL10255",
    product: "TEXTPLUS LOGIN",
    amount: 945,
    status: "Completed",
    date: "Aug 30, 2026",
    details: {
      username: "—",
      password: "—",
      expiry: "—"
    }
  },
  {
    id: "#BL10220",
    product: "EXPRESSVPN PC",
    amount: 4000,
    status: "Processing",
    date: "Aug 29, 2026",
    details: {
      username: "Pending",
      password: "Pending",
      expiry: "Pending"
    }
  }
];


/* =========================================
   HELPERS
========================================= */

const money = amount =>
  `₦${Number(amount || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

function get(id) {
  return document.getElementById(id);
}

function showToast(message) {
  const toast = get("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(name) {
  document.querySelectorAll(".app-screen").forEach(screen => {
    screen.classList.remove("active-screen");
  });

  const target = get(`screen-${name}`);

  if (target) {
    target.classList.add("active-screen");
  }

  document.querySelectorAll("[data-screen]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.screen === name
    );
  });

  document.querySelectorAll(".bottom-link").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.screen === name
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  const sidebar = get("sidebar");

  if (sidebar) {
    sidebar.classList.remove("open");
  }
}


/* =========================================
   NAVIGATION BUTTONS
========================================= */

document.addEventListener("click", event => {

  const screenButton = event.target.closest("[data-screen]");

  if (screenButton) {
    event.preventDefault();

    const screen = screenButton.dataset.screen;

    if (screen === "product" && !selectedProduct) {
      showToast("Please select a product first.");
      return;
    }

    showScreen(screen);
  }

});


/* =========================================
   SIDEBAR
========================================= */

const menuBtn = get("menuBtn");
const sidebar = get("sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}


/* =========================================
   MARKETPLACE
========================================= */

function renderMarketplace() {

  const grid = get("marketplaceGrid");

  if (!grid) return;

  const searchInput = get("marketSearch");

  const query = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const filtered = products.filter(product => {

    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    const text = [
      product.name,
      product.category,
      product.description
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !query || text.includes(query);

    return matchesCategory && matchesSearch;
  });


  if (!filtered.length) {

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:50px;
        text-align:center;
        border:1px solid #292929;
        border-radius:15px;
        background:#101111;
        color:#777;
      ">
        No products found.
      </div>
    `;

    return;
  }


  grid.innerHTML = filtered.map(product => {

    const price = product.priceText || money(product.price);

    return `
      <article class="product-card">

        <div class="product-card-top">

          <div class="product-icon">

            <img
              src="assets/${product.icon}"
              alt="${product.name}"
              onerror="this.style.display='none'"
            >

          </div>

          <span class="stock">
            ${product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>

        </div>

        <span class="product-category">
          ${product.category.toUpperCase()}
        </span>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="price">
          ${price}
        </div>

        <div class="product-buttons">

          <button
            class="view-product"
            data-product="${product.id}"
          >
            VIEW
          </button>

          <button
            class="buy-product"
            data-buy="${product.id}"
            ${product.stock <= 0 ? "disabled" : ""}
          >
            BUY NOW
          </button>

        </div>

      </article>
    `;
  }).join("");
}


/* =========================================
   SEARCH
========================================= */

const marketSearch = get("marketSearch");

if (marketSearch) {
  marketSearch.addEventListener("input", renderMarketplace);
}


/* =========================================
   CATEGORY TABS
========================================= */

document.querySelectorAll(".category-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    document.querySelectorAll(".category-tab")
      .forEach(item => item.classList.remove("active"));

    tab.classList.add("active");

    activeCategory = tab.dataset.category;

    renderMarketplace();
  });

});


/* =========================================
   HOME CATEGORY CARDS
========================================= */

document.querySelectorAll(".category-card").forEach(card => {

  card.addEventListener("click", () => {

    activeCategory = card.dataset.category;

    document.querySelectorAll(".category-tab")
      .forEach(tab => {
        tab.classList.toggle(
          "active",
          tab.dataset.category === activeCategory
        );
      });

    showScreen("marketplace");

    renderMarketplace();
  });

});


/* =========================================
   PRODUCT SELECTION
========================================= */

function openProduct(productId) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;

  selectedProduct = product;
  quantity = 1;

  const icon = get("productIcon");
  const title = get("productTitle");
  const description = get("productDescription");
  const category = get("productCategory");
  const price = get("productPrice");
  const stock = get("productStock");
  const features = get("productFeatures");
  const quantityDisplay = get("quantity");
  const total = get("productTotal");

  if (icon) {
    icon.innerHTML = `
      <img
        src="assets/${product.icon}"
        alt="${product.name}"
        onerror="this.style.display='none'"
      >
    `;
  }

  if (title) {
    title.textContent = product.name;
  }

  if (description) {
    description.textContent = product.description;
  }

  if (category) {
    category.textContent =
      `${product.category} SERVICES`.toUpperCase();
  }

  if (price) {
    price.textContent =
      product.priceText || money(product.price);
  }

  if (stock) {
    stock.textContent =
      product.stock > 0
        ? `${product.stock} available`
        : "Out of stock";
  }

  if (features) {
    features.innerHTML = product.features
      .map(feature => `<li>${feature}</li>`)
      .join("");
  }

  if (quantityDisplay) {
    quantityDisplay.textContent = quantity;
  }

  updateProductTotal();

  showScreen("product");
}


function updateProductTotal() {

  if (!selectedProduct) return;

  const total = get("productTotal");

  if (!total) return;

  if (!selectedProduct.price) {
    total.textContent = "Contact for price";
    return;
  }

  total.textContent =
    money(selectedProduct.price * quantity);
}


/* =========================================
   VIEW / BUY BUTTONS
========================================= */

document.addEventListener("click", event => {

  const viewButton =
    event.target.closest("[data-product]");

  const buyButton =
    event.target.closest("[data-buy]");


  if (viewButton) {
    openProduct(viewButton.dataset.product);
  }


  if (buyButton) {

    const productId = buyButton.dataset.buy;

    openProduct(productId);

    setTimeout(() => {
      purchaseSelectedProduct();
    }, 100);

  }

});


/* =========================================
   QUANTITY
========================================= */

const qtyMinus = get("qtyMinus");
const qtyPlus = get("qtyPlus");

if (qtyMinus) {

  qtyMinus.addEventListener("click", () => {

    if (quantity > 1) {
      quantity--;
    }

    const display = get("quantity");

    if (display) {
      display.textContent = quantity;
    }

    updateProductTotal();
  });

}


if (qtyPlus) {

  qtyPlus.addEventListener("click", () => {

    if (!selectedProduct) return;

    if (quantity < selectedProduct.stock) {
      quantity++;
    }

    const display = get("quantity");

    if (display) {
      display.textContent = quantity;
    }

    updateProductTotal();
  });

}


/* =========================================
   BUY NOW
========================================= */

const buyNowBtn = get("buyNowBtn");

if (buyNowBtn) {

  buyNowBtn.addEventListener("click", () => {
    purchaseSelectedProduct();
  });

}


function purchaseSelectedProduct() {

  if (!selectedProduct) return;

  if (!selectedProduct.price) {

    showToast(
      "This product requires a price before purchase."
    );

    return;
  }


  if (selectedProduct.stock <= 0) {

    showToast("This product is currently out of stock.");

    return;
  }


  const total =
    selectedProduct.price * quantity;


  if (walletBalance < total) {

    const balance = get("insufficientBalance");
    const required = get("insufficientRequired");

    if (balance) {
      balance.textContent = money(walletBalance);
    }

    if (required) {
      required.textContent = money(total);
    }

    showScreen("insufficient");

    return;
  }


  walletBalance -= total;

  selectedProduct.stock -= quantity;

  const orderId =
    "#BL" +
    Math.floor(10000 + Math.random() * 90000);


  const newOrder = {

    id: orderId,

    product:
      `${selectedProduct.name} x${quantity}`,

    amount: total,

    status: "Processing",

    date: new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    ),

    details: {
      username: "Pending",
      password: "Pending",
      expiry: "Pending"
    }

  };


  orders.unshift(newOrder);


  const successOrderId =
    get("successOrderId");

  const successProduct =
    get("successProduct");

  const successAmount =
    get("successAmount");


  if (successOrderId) {
    successOrderId.textContent = orderId;
  }

  if (successProduct) {
    successProduct.textContent =
      newOrder.product;
  }

  if (successAmount) {
    successAmount.textContent =
      money(total);
  }


  updateWalletDisplays();

  renderMarketplace();

  renderOrders();

  showScreen("order-success");
}


/* =========================================
   WALLET
========================================= */

function updateWalletDisplays() {

  const balanceDisplays = [
    get("homeBalance"),
    get("walletBalance")
  ];

  balanceDisplays.forEach(element => {

    if (element) {
      element.textContent =
        money(walletBalance);
    }

  });

  const newBalance = get("newBalance");

  if (newBalance) {
    newBalance.textContent =
      money(walletBalance);
  }

  const totalOrders = get("totalOrders");

  if (totalOrders) {
    totalOrders.textContent =
      orders.length;
  }

  const pendingOrders =
    get("pendingOrders");

  if (pendingOrders) {

    pendingOrders.textContent =
      orders.filter(order =>
        order.status === "Pending" ||
        order.status === "Processing"
      ).length;

  }

}


/* =========================================
   WALLET AMOUNT BUTTONS
========================================= */

document.querySelectorAll(
  ".amount-options button"
).forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(
      ".amount-options button"
    ).forEach(item =>
      item.classList.remove("selected")
    );

    button.classList.add("selected");

    const amount =
      button.textContent
        .replace(/[₦,]/g, "");

    const input =
      get("walletAmount");

    if (input) {
      input.value = amount;
    }

  });

});


/* =========================================
   PAYMENT METHOD
========================================= */

document.querySelectorAll(
  ".payment-methods label"
).forEach(label => {

  label.addEventListener("click", () => {

    document.querySelectorAll(
      ".payment-methods label"
    ).forEach(item =>
      item.classList.remove("selected")
    );

    label.classList.add("selected");

  });

});


/* =========================================
   FUND WALLET
========================================= */

const fundWalletBtn =
  document.querySelector(".wallet-pay");

if (fundWalletBtn) {

  fundWalletBtn.addEventListener("click", () => {

    const input = get("walletAmount");

    const amount =
      Number(input ? input.value : 0);


    if (!amount || amount < 100) {

      showToast(
        "Please enter at least ₦100."
      );

      return;
    }


    /*
      DEMO ONLY:

      This currently simulates a successful
      payment so we can test the interface.

      Real Paystack/Flutterwave verification
      will be connected later through a secure
      backend/server endpoint.
    */

    walletBalance += amount;

    updateWalletDisplays();

    showScreen("payment-success");

  });

}


/* =========================================
   ORDERS
========================================= */

function renderOrders(status = "all") {

  const tbody =
    get("ordersTableBody");

  if (!tbody) return;


  const filtered =
    status === "all"
      ? orders
      : orders.filter(
          order =>
            order.status.toLowerCase() ===
            status.toLowerCase()
        );


  if (!filtered.length) {

    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="
          text-align:center;
          color:#777;
          padding:35px;
        ">
          No orders found.
        </td>
      </tr>
    `;

    return;
  }


  tbody.innerHTML =
    filtered.map(order => `

      <tr>

        <td>${order.id}</td>

        <td>${order.product}</td>

        <td>${money(order.amount)}</td>

        <td>
          <span class="status-${order.status.toLowerCase()}">
            ${order.status}
          </span>
        </td>

        <td>${order.date}</td>

        <td>
          <button
            class="view-order-btn"
            data-order="${order.id}"
          >
            View
          </button>
        </td>

      </tr>

    `).join("");
}


document.querySelectorAll(
  ".order-tab"
).forEach(tab => {

  tab.addEventListener("click", () => {

    document.querySelectorAll(
      ".order-tab"
    ).forEach(item =>
      item.classList.remove("active")
    );

    tab.classList.add("active");

    renderOrders(tab.dataset.status);

  });

});


/* =========================================
   ORDER DETAILS
========================================= */

document.addEventListener("click", event => {

  const button =
    event.target.closest("[data-order]");

  if (!button) return;


  const order =
    orders.find(
      item => item.id === button.dataset.order
    );


  if (!order) return;


  const title =
    get("detailOrderTitle");

  const id =
    get("detailOrderId");

  const date =
    get("detailOrderDate");

  const amount =
    get("detailOrderAmount");

  const status =
    get("detailOrderStatus");

  const product =
    get("deliveryProduct");

  const username =
    get("deliveryUsername");

  const password =
    get("deliveryPassword");

  const expiry =
    get("deliveryExpiry");


  if (title) {
    title.textContent = order.product;
  }

  if (id) {
    id.textContent = order.id;
  }

  if (date) {
    date.textContent = order.date;
  }

  if (amount) {
    amount.textContent = money(order.amount);
  }

  if (status) {

    status.textContent =
      order.status;

    status.className =
      `status-${order.status.toLowerCase()}`;

  }

  if (product) {
    product.textContent =
      order.product;
  }

  if (username) {
    username.textContent =
      order.details?.username || "—";
  }

  if (password) {
    password.textContent =
      order.details?.password || "—";
  }

  if (expiry) {
    expiry.textContent =
      order.details?.expiry || "—";
  }


  showScreen("order-details");

});


/* =========================================
   CART
========================================= */

function updateCart() {

  const count =
    get("cartCount");

  const items =
    get("cartItems");

  const totalDisplay =
    get("cartTotal");


  if (count) {
    count.textContent =
      cart.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );
  }


  if (!items) return;


  if (!cart.length) {

    items.innerHTML = `
      <div style="
        text-align:center;
        padding:30px;
        color:#777;
      ">
        Your cart is empty.
      </div>
    `;

    if (totalDisplay) {
      totalDisplay.textContent =
        money(0);
    }

    return;
  }


  items.innerHTML =
    cart.map((item, index) => `

      <div class="cart-item">

        <div class="cart-item-info">

          <strong>
            ${item.product.name}
          </strong>

          <small>
            ${item.quantity} ×
            ${money(item.product.price)}
          </small>

        </div>

        <strong>
          ${money(
            item.product.price *
            item.quantity
          )}
        </strong>

        <button
          class="remove-cart"
          data-remove-cart="${index}"
        >
          Remove
        </button>

      </div>

    `).join("");


  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.product.price *
        item.quantity,
      0
    );


  if (totalDisplay) {
    totalDisplay.textContent =
      money(total);
  }

}


document.addEventListener("click", event => {

  const remove =
    event.target.closest("[data-remove-cart]");

  if (!remove) return;

  cart.splice(
    Number(remove.dataset.removeCart),
    1
  );

  updateCart();

});


/* =========================================
   CART BUTTON
========================================= */

const cartBtn =
  get("cartBtn");

const cartModal =
  get("cartModal");

if (cartBtn && cartModal) {

  cartBtn.addEventListener("click", () => {

    updateCart();

    cartModal.classList.add("open");

  });

}


/* =========================================
   NOTIFICATIONS
========================================= */

const notificationBtn =
  get("notificationBtn");

const notificationModal =
  get("notificationModal");

if (notificationBtn && notificationModal) {

  notificationBtn.addEventListener(
    "click",
    () => {
      notificationModal.classList.add("open");
    }
  );

}


/* =========================================
   FILTER
========================================= */

const filterBtn =
  get("filterBtn");

const filterModal =
  get("filterModal");

if (filterBtn && filterModal) {

  filterBtn.addEventListener(
    "click",
    () => {
      filterModal.classList.add("open");
    }
  );

}


document.querySelectorAll(
  "[data-filter-category]"
).forEach(button => {

  button.addEventListener("click", () => {

    activeCategory =
      button.dataset.filterCategory;

    document.querySelectorAll(
      ".category-tab"
    ).forEach(tab => {

      tab.classList.toggle(
        "active",
        tab.dataset.category ===
        activeCategory
      );

    });

    renderMarketplace();

    filterModal?.classList.remove("open");

  });

});


/* =========================================
   CLOSE MODALS
========================================= */

document.addEventListener("click", event => {

  const close =
    event.target.closest("[data-close]");

  if (close) {

    const modalId =
      close.dataset.close;

    if (modalId) {

      get(modalId)
        ?.classList.remove("open");

    } else {

      document.querySelectorAll(
        ".modal-backdrop"
      ).forEach(modal =>
        modal.classList.remove("open")
      );

    }

    return;
  }


  if (
    event.target.classList.contains(
      "modal-backdrop"
    )
  ) {

    event.target.classList.remove("open");

  }

});


document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      document.querySelectorAll(
        ".modal-backdrop"
      ).forEach(modal =>
        modal.classList.remove("open")
      );

    }

  }
);


/* =========================================
   CART CHECKOUT
========================================= */

const cartCheckoutBtn =
  get("cartCheckoutBtn");

if (cartCheckoutBtn) {

  cartCheckoutBtn.addEventListener(
    "click",
    () => {

      if (!cart.length) {

        showToast(
          "Your cart is empty."
        );

        return;
      }


      const total =
        cart.reduce(
          (sum, item) =>
            sum +
            item.product.price *
            item.quantity,
          0
        );


      if (walletBalance < total) {

        document
          .getElementById("cartModal")
          ?.classList.remove("open");

        const balance =
          get("insufficientBalance");

        const required =
          get("insufficientRequired");

        if (balance) {
          balance.textContent =
            money(walletBalance);
        }

        if (required) {
          required.textContent =
            money(total);
        }

        showScreen("insufficient");

        return;
      }


      walletBalance -= total;


      cart.forEach(item => {

        item.product.stock -=
          item.quantity;

      });


      const orderId =
        "#BL" +
        Math.floor(
          10000 +
          Math.random() * 90000
        );


      orders.unshift({

        id: orderId,

        product:
          cart.map(
            item =>
              `${item.product.name} x${item.quantity}`
          ).join(", "),

        amount: total,

        status: "Processing",

        date: new Date().toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric"
          }
        ),

        details: {
          username: "Pending",
          password: "Pending",
          expiry: "Pending"
        }

      });


      cart = [];


      get("cartModal")
        ?.classList.remove("open");


      const successOrderId =
        get("successOrderId");

      const successProduct =
        get("successProduct");

      const successAmount =
        get("successAmount");


      if (successOrderId) {
        successOrderId.textContent =
          orderId;
      }

      if (successProduct) {
        successProduct.textContent =
          "Multiple Products";
      }

      if (successAmount) {
        successAmount.textContent =
          money(total);
      }


      updateWalletDisplays();

      renderMarketplace();

      renderOrders();

      updateCart();

      showScreen("order-success");

    }
  );

}


/* =========================================
   INITIALIZE
========================================= */

renderMarketplace();

renderOrders();

updateWalletDisplays();

updateCart();

showScreen("home");
