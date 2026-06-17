/* ================= HEADER SCROLL & ACTIVE NAV ================= */
const header = document.getElementById("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navMenu a");

window.addEventListener("scroll", () => {
  // Sticky header
  header.classList.toggle("scrolled", window.scrollY > 50);

  // Active nav link
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ================= HAMBURGER MENU ================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  }
});

/* ================= PROJECT CARD SLIDER ================= */
document.querySelectorAll(".project-card").forEach(card => {
  const images = card.querySelectorAll(".project-slider img");
  const prevBtn = card.querySelector(".prev");
  const nextBtn = card.querySelector(".next");
  let index = 0;
  const total = images.length;

  function showImage(i) {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  }

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    index = (index + 1) % total;
    showImage(index);
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    index = (index - 1 + total) % total;
    showImage(index);
  });
});

/* ================= LOAD MORE / SHOW LESS ================= */
const projectCards = document.querySelectorAll(".project-card");
const loadBtn = document.getElementById("loadMoreProjects");
const INITIAL_COUNT = 3;
let expanded = false;

// Initial state: show only first 3
projectCards.forEach((card, i) => {
  card.style.display = i < INITIAL_COUNT ? "block" : "none";
});

loadBtn.addEventListener("click", () => {
  if (!expanded) {
    projectCards.forEach(card => (card.style.display = "block"));
    loadBtn.textContent = "Show Less";
    expanded = true;
  } else {
    projectCards.forEach((card, i) => {
      card.style.display = i < INITIAL_COUNT ? "block" : "none";
    });
    loadBtn.textContent = "Load More Projects";
    expanded = false;
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  }
});

/* ================= CASE STUDY MODAL ================= */
const modal = document.getElementById("caseModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");

document.querySelectorAll(".case-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".project-card");

    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.description;

    modalTech.innerHTML = "";
    card.dataset.tech.split(",").forEach(t => {
      const span = document.createElement("span");
      span.textContent = t.trim();
      modalTech.appendChild(span);
    });

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";
}

document.querySelector(".modal-close").addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") closeModal();
});

/* ================= DISCUSS PROJECT BUTTON ================= */
const discussBtn = document.getElementById("discussProjectBtn");

discussBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();

  const contact = document.getElementById("contact");
  const offset = 100;
  const top = contact.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
});

/* ================= IMAGE ZOOM MODAL ================= */
const zoomModal = document.getElementById("imageZoomModal");
const zoomedImage = document.getElementById("zoomedImage");
const closeZoomBtn = document.querySelector(".close-zoom");
const zoomNextBtn = document.querySelector(".zoom-next");
const zoomPrevBtn = document.querySelector(".zoom-prev");

let currentGallery = [];
let currentZoomIndex = 0;

function openZoom(gallery, index) {
  currentGallery = gallery;
  currentZoomIndex = index;
  updateZoomImage();
  zoomModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateZoomImage() {
  zoomedImage.src = currentGallery[currentZoomIndex].src;
}

function closeZoomModal() {
  zoomModal.classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("zoomable")) return;

  const galleryWrapper = e.target.closest(".project-gallery");

  currentGallery = Array.from(
    galleryWrapper.querySelectorAll(".zoomable")
  );

  currentIndex = currentGallery.findIndex(img =>
    img.classList.contains("active")
  );

  if (currentIndex === -1) currentIndex = 0;

  showZoomImage();
  zoomModal.classList.add("active");
});
function showZoomImage() {
  zoomedImage.src = currentGallery[currentIndex].src;
}

zoomNextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentZoomIndex = (currentZoomIndex + 1) % currentGallery.length;
  updateZoomImage();
});

zoomPrevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentZoomIndex = (currentZoomIndex - 1 + currentGallery.length) % currentGallery.length;
  updateZoomImage();
});

closeZoomBtn.addEventListener("click", closeZoomModal);

zoomModal.addEventListener("click", (e) => {
  if (e.target === zoomModal) closeZoomModal();
});

document.addEventListener("keydown", (e) => {
  if (!zoomModal.classList.contains("active")) return;
  if (e.key === "ArrowRight") { currentZoomIndex = (currentZoomIndex + 1) % currentGallery.length; updateZoomImage(); }
  if (e.key === "ArrowLeft")  { currentZoomIndex = (currentZoomIndex - 1 + currentGallery.length) % currentGallery.length; updateZoomImage(); }
  if (e.key === "Escape") closeZoomModal();
});


  document.getElementById("contactForm").addEventListener("submit",async function (e) {
    /* ================= CONTACT FORM ================= */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");
// console.log("data: " + JSON.stringify(contactForm));
    e.preventDefault();
    const form = document.getElementById("contactForm");
    const data = {
      fullName: form.fullName.value,
      email: form.emailAddr.value,
      phone: form.phone.value,
      company: form.company.value,
      website: form.website.value,
      service: form.service.value,
      message: form.message.value
    };
    // const formData = new FormData(this);
    // Simulate form submission
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    const leadurl = "https://script.google.com/macros/s/AKfycbzFVR9LJR00_l7c4Vzbb7w0A0QYtt0Imq4_HPR4NJHFJIo6SNxoz86GbJSlKPWd2Z80bA/exec";
    const response = await fetch(leadurl, {
    method: "POST",
      body: JSON.stringify(data)
    
  })
    .then(() => {
        contactForm.reset();
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    })
    .catch(() => {
        contactForm.reset();
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    });

    setTimeout(() => {
      contactForm.reset();
      formSuccess.classList.add("show");
      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;

      // Hide success after 5 seconds
      setTimeout(() => formSuccess.classList.remove("show"), 5000);
    }, 1200);
  });

/* ================= SCROLL REVEAL (Intersection Observer) ================= */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -60px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll(".project-card, .service-card, .stat-box, .about-wrapper, .contact-wrapper").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.1}s, transform 0.5s ease ${(i % 4) * 0.1}s`;
  observer.observe(el);
});
