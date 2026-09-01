const services = [
  {
    name: "NordVPN",
    icon: "nordvpn.png",
    price: "₦4,000",
    desc: "Authorized VPN subscription/service for secure and private internet use.",
    details: "Choose an authorized NordVPN package and confirm the current subscription period and device compatibility with BigLogs support."
  },
  {
    name: "Avast VPN",
    icon: "avast-vpn.png",
    price: "₦3,500",
    desc: "Authorized VPN subscription/service for secure everyday connections.",
    details: "Confirm the available Avast VPN package, supported devices, and subscription period with BigLogs support."
  },
  {
    name: "HMA VPN",
    icon: "hma-vpn.png",
    price: "₦4,000",
    desc: "Authorized HMA VPN service for privacy and secure connections.",
    details: "Review the available HMA VPN subscription options and compatibility before ordering."
  },
  {
    name: "ExpressVPN PC",
    icon: "expressvpn.png",
    price: "₦4,000",
    desc: "ExpressVPN option for compatible computers and laptops.",
    details: "Confirm the authorized subscription period and PC compatibility with BigLogs support."
  },
  {
    name: "Proton VPN",
    icon: "proton-vpn.png",
    price: "₦3,500",
    desc: "Authorized Proton VPN service for privacy and secure browsing.",
    details: "Confirm the available Proton VPN plan, duration, and device requirements with support."
  },
  {
    name: "ExpressVPN Phone",
    icon: "expressvpn.png",
    price: "₦4,500",
    desc: "ExpressVPN option for compatible mobile devices.",
    details: "Confirm the authorized subscription period and mobile-device compatibility before ordering."
  },
  {
    name: "Google Voice Services",
    icon: "google-voice.jpg",
    price: "₦8,000",
    desc: "Legitimate Google Voice setup and support services.",
    details: "Availability depends on Google eligibility and regional rules. BigLogs support can confirm the legitimate setup options available to you."
  },
  {
    name: "Facebook Page Services",
    icon: "facebook-pages.jpg",
    price: "₦4,500",
    desc: "Authorized services for Facebook Page owners and legitimate projects.",
    details: "Confirm the exact page-management, setup, or marketing service included in the package with support."
  },
  {
    name: "Instagram Services",
    icon: "instagram.jpg",
    price: "From ₦3,500",
    desc: "Legitimate Instagram management and marketing packages.",
    details: "Choose a marketing or management tier based on your campaign scope and goals.",
    packages: [
      {
        name: "Starter",
        price: "₦3,500",
        desc: "Essential Instagram management support for a focused campaign."
      },
      {
        name: "Growth",
        price: "₦5,200",
        desc: "Expanded management and marketing support for ongoing growth."
      },
      {
        name: "Premium",
        price: "₦7,200",
        desc: "A broader management package for more involved campaigns."
      }
    ]
  },
  {
    name: "TikTok Services",
    icon: "tiktok.jpg",
    price: "From ₦4,270",
    desc: "Legitimate TikTok management and marketing packages.",
    details: "Choose a marketing or management tier based on your campaign scope and goals.",
    packages: [
      {
        name: "Starter",
        price: "₦4,270",
        desc: "Essential TikTok management support for a focused campaign."
      },
      {
        name: "Growth",
        price: "₦5,570",
        desc: "Expanded management and marketing support for ongoing growth."
      },
      {
        name: "Premium",
        price: "₦7,320",
        desc: "A broader management package for more involved campaigns."
      }
    ]
  },
  {
    name: "AI Video Call Tools",
    icon: "video-call.jpg",
    price: "Contact for price",
    desc: "AI-assisted video-call and communication tools for educational purposes.",
    details: "Tools for learning, research, demonstrations, and other authorized educational uses. Ask BigLogs support about available tools, compatibility, and current pricing."
  }
];

const grid = document.getElementById("serviceGrid");
const search = document.getElementById("search");
const modal = document.getElementById("serviceModal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalDetails = document.getElementById("modalDetails");
const modalOrder = document.getElementById("modalOrder");

function render(list) {
  grid.innerHTML = list.map((service) => {
    const index = services.indexOf(service);

    return `
      <article class="card">

        <div class="icon">
          ${
            service.icon
              ? `<img src="assets/${service.icon}" alt="${service.name} logo">`
              : `<span style="color:#f5d77a;font-size:30px">+</span>`
          }
        </div>

        <h3>${service.name}</h3>

        <p>${service.desc}</p>

        <div class="price">${service.price}</div>

        <div class="service-actions">

          <button
            class="view-service"
            data-index="${index}">
            VIEW SERVICE →
          </button>

          <a
            class="order"
            href="https://t.me/biglogs1"
            target="_blank"
            rel="noopener">
            ORDER →
          </a>

        </div>

      </article>
    `;
  }).join("");

  document.querySelectorAll(".view-service").forEach(button => {
    button.addEventListener("click", () => {
      openService(Number(button.dataset.index));
    });
  });
}

function openService(index) {
  const service = services[index];

  if (!service) return;

  modalIcon.innerHTML = service.icon
    ? `<img src="assets/${service.icon}" alt="${service.name}">`
    : "";

  modalTitle.textContent = service.name;
  modalDesc.textContent = service.desc;
  modalPrice.textContent = service.price;

  const product = service.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (service.packages) {

    modalDetails.innerHTML = service.packages.map(pkg => `
      <li class="package-item">
        <strong>${pkg.name}</strong>
        <span>${pkg.price}</span>
        <small>${pkg.desc}</small>
      </li>
    `).join("");

  } else {

    modalDetails.innerHTML = `
      <li>${service.details}</li>
    `;

  }

  modalDetails.innerHTML += `
    <li class="order-item">
      <a
        class="telegram-order"
        href="https://t.me/biglogs1?start=${product}"
        target="_blank"
        rel="noopener">
        🛒 Order on Telegram
      </a>
    </li>
  `;

  modalOrder.href = `https://t.me/biglogs1?start=${product}`;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

render(services);

search.addEventListener("input", (event) => {

  const query = event.target.value
    .toLowerCase()
    .trim();

  const filtered = services.filter(service => {

    const text = `
      ${service.name}
      ${service.desc}
      ${service.details || ""}
    `.toLowerCase();

    return text.includes(query);
  });

  render(filtered);
});

document.addEventListener("click", (event) => {

  if (
    event.target.matches("[data-close]") ||
    event.target === modal
  ) {
    closeModal();
  }

});

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeModal();
  }

});
