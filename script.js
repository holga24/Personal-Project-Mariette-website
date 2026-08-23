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

const aboutPortrait = document.getElementById("aboutPortrait");
const aboutHelp = document.getElementById("aboutHelp");

if (aboutPortrait && aboutHelp) {
  const setPortraitSide = flipped => {
    aboutPortrait.classList.toggle("is-flipped", flipped);
    aboutPortrait.setAttribute("aria-pressed", flipped ? "true" : "false");
  };
  const togglePortrait = () => setPortraitSide(!aboutPortrait.classList.contains("is-flipped"));

  const portraitObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setPortraitSide(true);
      } else if (entry.boundingClientRect.top > 0) {
        setPortraitSide(false);
      }
    });
  }, { threshold: 0.05 });

  portraitObserver.observe(aboutHelp);
  aboutPortrait.addEventListener("click", togglePortrait);
  aboutPortrait.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePortrait();
    }
  });
}

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

if (dialog && dialogTitle && dialogBody && dialogBook) {
  document.querySelectorAll(".service-open").forEach(button => {
    button.addEventListener("click", () => {
      const service = button.dataset.service;
      dialogTitle.textContent = service;
      dialogBody.textContent = serviceDetails[service];
      dialogBook.dataset.service = service;
      dialog.showModal();
    });
  });

  const dialogClose = document.querySelector(".dialog-close");
  if (dialogClose) dialogClose.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  dialogBook.addEventListener("click", () => {
    const service = dialogBook.dataset.service;
    if (serviceSelect) serviceSelect.value = service;
    dialog.close();
  });
}

const testimonialCarousel = document.getElementById("testimonialCarousel");

if (testimonialCarousel) {
  const reviews = [
    {
      quote: "Mariette listened to what I wanted, made sure I was comfortable, and gave me a style that felt beautiful and easy to maintain.",
      author: "Olga Hamilton"
    },
    {
      quote: "I felt comfortable from the start and left with a style that looked beautiful and lasted beautifully.",
      author: "Noela Lomboto"
    },
    {
      quote: "I felt relaxed the whole time, and my hair looked healthy, neat, and full of life.",
      author: "Blandine Mateta"
    },
    {
      quote: "The style was polished, comfortable, and exactly what I hoped for.",
      author: "Sophie Lumingu"
    }
  ];
  const quote = document.getElementById("testimonialQuote");
  const author = document.getElementById("testimonialAuthor");
  const dots = document.getElementById("testimonialDots");
  const previous = document.getElementById("testimonialPrev");
  const next = document.getElementById("testimonialNext");
  let currentReview = 0;
  let reviewTimer;

  reviews.forEach((review, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.setAttribute("aria-label", `Show review ${index + 1}`);
    dot.addEventListener("click", () => showReview(index));
    dots.appendChild(dot);
  });

  const showReview = index => {
    currentReview = (index + reviews.length) % reviews.length;
    testimonialCarousel.classList.add("is-changing");
    window.setTimeout(() => {
      quote.textContent = `“${reviews[currentReview].quote}”`;
      author.textContent = `— ${reviews[currentReview].author}`;
      testimonialCarousel.classList.remove("review-theme-1", "review-theme-2", "review-theme-3");
      if (currentReview > 0) testimonialCarousel.classList.add(`review-theme-${currentReview}`);
      dots.querySelectorAll(".testimonial-dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentReview);
        dot.setAttribute("aria-current", dotIndex === currentReview ? "true" : "false");
      });
      testimonialCarousel.classList.remove("is-changing");
    }, 250);
  };

  const startReviews = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(reviewTimer);
    reviewTimer = window.setInterval(() => showReview(currentReview + 1), 5000);
  };

  previous.addEventListener("click", () => { showReview(currentReview - 1); startReviews(); });
  next.addEventListener("click", () => { showReview(currentReview + 1); startReviews(); });
  testimonialCarousel.addEventListener("mouseenter", () => window.clearInterval(reviewTimer));
  testimonialCarousel.addEventListener("mouseleave", startReviews);
  testimonialCarousel.addEventListener("focusin", () => window.clearInterval(reviewTimer));
  testimonialCarousel.addEventListener("focusout", startReviews);
  showReview(0);
  startReviews();
}

const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

if (bookingForm) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get("name");
    const service = formData.get("service");

    formStatus.textContent = `Thank you, ${name}. Your ${service} request is ready to be connected to Mariette's booking system.`;
    bookingForm.reset();
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
