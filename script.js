const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const filters = document.querySelectorAll(".filter");
const galleryItems = document.querySelectorAll(".gallery-item");

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      const shouldShow = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

const serviceDetails = {
  "Box Braids": "A classic protective style that can be customized by braid size, length, parting pattern, and finish. Add exact pricing and preparation requirements here.",
  "Knotless Braids": "A lighter-feeling braid style that begins with the client's natural hair and gradually adds extension hair. Ideal for a flexible, natural-looking finish.",
  "Twists": "A versatile protective option that can be adapted in size, length, texture, and finish depending on the client's desired look.",
  "Cornrows": "Detailed braided styles close to the scalp, from simple straight-back looks to more creative patterns and combinations.",
  "Natural Hair Styling": "Styling for natural texture with an emphasis on gentle handling, healthy hair practices, and looks that fit the client's lifestyle.",
  "Consultation": "A short conversation to discuss hair condition, desired style, maintenance, timing, budget, comfort, and what to prepare before the appointment."
};

const dialog = document.getElementById("serviceDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogBody = document.getElementById("dialogBody");
const dialogBook = document.getElementById("dialogBook");
const serviceSelect = document.getElementById("serviceSelect");

document.querySelectorAll(".service-open").forEach(button => {
  button.addEventListener("click", () => {
    const service = button.dataset.service;
    dialogTitle.textContent = service;
    dialogBody.textContent = serviceDetails[service];
    dialogBook.dataset.service = service;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

dialogBook.addEventListener("click", () => {
  const service = dialogBook.dataset.service;
  serviceSelect.value = service;
  dialog.close();
});

const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get("name");
  const service = formData.get("service");

  formStatus.textContent = `Thank you, ${name}. Your ${service} request is ready to be connected to Mariette's booking system.`;
  bookingForm.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
