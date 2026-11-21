// Plain vanilla JavaScript — zero frameworks or external dependencies

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    mobileNav.hidden = isExpanded;
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleBtn.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

// Active Nav Link on Scroll
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav .nav-link");
  if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

// Copy Email Helper
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const feedbackEl = document.getElementById("copy-feedback");
  if (!copyBtn || !feedbackEl) return;

  copyBtn.addEventListener("click", async () => {
    const email = "sunitadarnalsunitadarnal@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      feedbackEl.textContent = "Email address copied to clipboard.";
    } catch {
      feedbackEl.textContent = `Email: ${email}`;
    }

    window.setTimeout(() => {
      feedbackEl.textContent = "";
    }, 3200);
  });
}

// Contact Form Validation & Submission
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successBox = document.getElementById("form-success");
  const successSummary = document.getElementById("success-summary");
  const resetBtn = document.getElementById("reset-form-btn");

  const nameInput = document.getElementById("sender-name");
  const emailInput = document.getElementById("sender-email");
  const inquirySelect = document.getElementById("inquiry-type");
  const messageInput = document.getElementById("sender-message");
  const charCount = document.getElementById("char-count");

  const errorName = document.getElementById("error-name");
  const errorEmail = document.getElementById("error-email");
  const errorMessage = document.getElementById("error-message");

  if (!form || !nameInput || !emailInput || !messageInput) return;

  function setFieldError(inputEl, errorEl, message) {
    if (message) {
      inputEl.classList.add("is-invalid");
      errorEl.textContent = message;
      return false;
    }
    inputEl.classList.remove("is-invalid");
    errorEl.textContent = "";
    return true;
  }

  function validateName() {
    const val = nameInput.value.trim();
    if (!val) return setFieldError(nameInput, errorName, "Please enter your name.");
    if (val.length < 2) return setFieldError(nameInput, errorName, "Name must be at least 2 characters.");
    return setFieldError(nameInput, errorName, "");
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) return setFieldError(emailInput, errorEmail, "Please enter your email address.");
    if (!emailPattern.test(val)) {
      return setFieldError(emailInput, errorEmail, "Please enter a valid email address.");
    }
    return setFieldError(emailInput, errorEmail, "");
  }

  function validateMessage() {
    const val = messageInput.value.trim();
    if (!val) return setFieldError(messageInput, errorMessage, "Please write a brief message.");
    if (val.length < 10) {
      return setFieldError(messageInput, errorMessage, "Message should be at least 10 characters.");
    }
    return setFieldError(messageInput, errorMessage, "");
  }

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  messageInput.addEventListener("input", () => {
    if (charCount) {
      charCount.textContent = `${messageInput.value.length} / 500`;
    }
    if (messageInput.classList.contains("is-invalid")) {
      validateMessage();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const okName = validateName();
    const okEmail = validateEmail();
    const okMsg = validateMessage();

    if (!okName || !okEmail || !okMsg) {
      if (!okName) nameInput.focus();
      else if (!okEmail) emailInput.focus();
      else messageInput.focus();
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const topic = inquirySelect ? inquirySelect.value : "General Inquiry";

    form.hidden = true;
    successBox.hidden = false;
    successSummary.textContent = `Thank you, ${name}. Your ${topic.toLowerCase()} message (${email}) has been recorded for Sunita Darnal.`;
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      if (charCount) charCount.textContent = "0 / 500";
      setFieldError(nameInput, errorName, "");
      setFieldError(emailInput, errorEmail, "");
      setFieldError(messageInput, errorMessage, "");
      successBox.hidden = true;
      form.hidden = false;
      nameInput.focus();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollSpy();
  initCopyEmail();
  initContactForm();
});
