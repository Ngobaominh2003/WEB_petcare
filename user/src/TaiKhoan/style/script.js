document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobile-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Toggle icon between bars and times
      const icon = mobileToggle.querySelector("i")
      if (icon) {
        icon.classList.toggle("fa-bars")
        icon.classList.toggle("fa-times")
      }
    })

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")

        const icon = mobileToggle.querySelector("i")
        if (icon) {
          icon.classList.add("fa-bars")
          icon.classList.remove("fa-times")
        }
      })
    })
  }

  // Tabs functionality
  const tabsElements = document.querySelectorAll(".tabs")
  tabsElements.forEach((tabs) => {
    const tabButtons = tabs.querySelectorAll(".tab-button")
    const tabContents = tabs.querySelectorAll(".tab-content")

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Add active class to current button and content
        this.classList.add("active")
        const tabContent = document.getElementById(tabId)
        if (tabContent) {
          tabContent.classList.add("active")
        }
      })
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        e.preventDefault()
        const headerHeight = document.querySelector(".header")?.offsetHeight || 0
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Sticky header with animation
  const header = document.querySelector(".header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Add animation on scroll
  const animateElements = document.querySelectorAll(".card, .pet-card, .service-card, .stat-card, .auth-card")

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  window.addEventListener("scroll", checkScroll)
  // Initial check on page load
  setTimeout(checkScroll, 100)

  // Input field animation
  const inputFields = document.querySelectorAll("input, textarea, select")
  inputFields.forEach((input) => {
    // Add focus class when input is focused
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused")
    })

    // Remove focus class when input loses focus
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove("focused")
      // Add filled class if input has value
      if (input.value.trim() !== "") {
        input.parentElement.classList.add("filled")
      } else {
        input.parentElement.classList.remove("filled")
      }
    })

    // Check if input already has value on page load
    if (input.value.trim() !== "") {
      input.parentElement.classList.add("filled")
    }
  })

  // Button hover effects
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.classList.add("btn-hover")
    })

    button.addEventListener("mouseleave", () => {
      button.classList.remove("btn-hover")
    })
  })

  // Add CSS animation classes
  const style = document.createElement("style")
  style.textContent = `
    .card, .pet-card, .service-card, .stat-card, .auth-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .card.animate, .pet-card.animate, .service-card.animate, .stat-card.animate, .auth-card.animate {
      opacity: 1;
      transform: translateY(0);
    }

    .header.scrolled {
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }

    .focused {
      border-color: var(--primary) !important;
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
      transition: all 0.3s ease;
    }

    .btn-hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    /* Staggered animation for cards */
    .card:nth-child(1), .pet-card:nth-child(1), .service-card:nth-child(1), .stat-card:nth-child(1) {
      transition-delay: 0.1s;
    }
    .card:nth-child(2), .pet-card:nth-child(2), .service-card:nth-child(2), .stat-card:nth-child(2) {
      transition-delay: 0.2s;
    }
    .card:nth-child(3), .pet-card:nth-child(3), .service-card:nth-child(3), .stat-card:nth-child(3) {
      transition-delay: 0.3s;
    }
    .card:nth-child(4), .pet-card:nth-child(4), .service-card:nth-child(4), .stat-card:nth-child(4) {
      transition-delay: 0.4s;
    }

    /* Pulse animation for buttons */
    .btn-primary:hover, .btn-secondary:hover {
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
      }
      70% {
        box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
      }
    }

    /* Fade in animation for page load */
    body {
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `
  document.head.appendChild(style)

  // Form submission animation
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Add animation class to form
      form.classList.add("form-submitted")

      // Create and append success message
      const successMessage = document.createElement("div")
      successMessage.className = "success-message"
      successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Thao tác thành công!</p>
      `
      form.appendChild(successMessage)

      // Add success message styles
      const successStyle = document.createElement("style")
      successStyle.textContent = `
        .form-submitted {
          position: relative;
          pointer-events: none;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        .success-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: var(--primary);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeInUp 0.5s ease;
          z-index: 10;
        }
        .success-message i {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .success-message p {
          font-size: 1.25rem;
          margin-bottom: 0;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `
      document.head.appendChild(successStyle)

      // Reset form after delay
      setTimeout(() => {
        // Redirect based on form type
        if (form.id === "login-form") {
          const email = document.getElementById("email")?.value || ""
          if (email.includes("provider")) {
            window.location.href = "provider-account.html"
          } else {
            window.location.href = "user-account.html"
          }
        } else if (form.id === "user-register-form") {
          window.location.href = "user-account.html"
        } else if (form.id === "provider-register-form") {
          window.location.href = "provider-account.html"
        }
      }, 2000)
    })
  })
})

