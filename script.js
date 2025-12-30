// Navegación móvil
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")
const navbar = document.getElementById("navbar")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Efecto de scroll en navbar
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

const typedTextElement = document.getElementById("typed-text")
if (typedTextElement) {
  const phrases = [
    "Estudiante de Desarrollo de Software",
    "Buscando mi Primera Oportunidad"
  ]

  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false

  function type() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000 // Pausa al final
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  // Iniciar el efecto de typing
  setTimeout(type, 1000)
}

const animateCounter = (element, target) => {
  let current = 0
  const increment = target / 100
  const duration = 2000
  const stepTime = duration / 100

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      element.textContent = target + (target === 100 ? "%" : "+")
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(current) + (target === 100 ? "%" : "+")
    }
  }, stepTime)
}

// Observer para las estadísticas
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.getAttribute("data-target"))
          animateCounter(stat, target)
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const aboutStats = document.querySelector(".about-stats")
if (aboutStats) {
  statsObserver.observe(aboutStats)
}

// Animación de logos de tecnologías
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
}

const techObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const techLogos = entry.target.querySelectorAll(".tech-logo")
      techLogos.forEach((logo, index) => {
        setTimeout(() => {
          logo.style.opacity = "1"
          logo.style.transform = "translateY(0)"
        }, index * 100)
      })
      techObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

const skillsSection = document.querySelector(".skills")
if (skillsSection) {
  techObserver.observe(skillsSection)
}

// Animación fade-in para elementos
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        fadeObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Agregar clase fade-in a elementos que queremos animar
const animateElements = document.querySelectorAll(".project-card, .stat-card, .soft-skill-card")
animateElements.forEach((el) => {
  el.classList.add("fade-in")
  fadeObserver.observe(el)
})

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Efecto parallax sutil en el hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`
    heroContent.style.opacity = Math.max(1 - (scrolled / window.innerHeight) * 0.5, 0.3)
  }
})

// Lightbox para imágenes de proyectos
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")
const lightboxClose = document.querySelector(".lightbox-close")
const lightboxPrev = document.querySelector(".lightbox-prev")
const lightboxNext = document.querySelector(".lightbox-next")
const lightboxCounter = document.querySelector(".lightbox-counter")

let currentImages = []
let currentIndex = 0

// Abrir lightbox al hacer click en las imágenes de proyecto
document.querySelectorAll(".project-image").forEach((projectImage) => {
  projectImage.addEventListener("click", function (e) {
    e.preventDefault()
    e.stopPropagation()
    
    const projectCard = this.closest(".project-card")
    const imagesData = projectCard.getAttribute("data-images")
    
    if (imagesData) {
      currentImages = JSON.parse(imagesData)
      currentIndex = 0
      showLightboxImage()
      lightbox.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  })
})

function showLightboxImage() {
  if (currentImages.length > 0) {
    lightboxImg.src = currentImages[currentIndex]
    
    // Actualizar contador
    if (currentImages.length > 1) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`
      lightboxPrev.style.display = "block"
      lightboxNext.style.display = "block"
    } else {
      lightboxCounter.textContent = ""
      lightboxPrev.style.display = "none"
      lightboxNext.style.display = "none"
    }
  }
}

// Cerrar lightbox
lightboxClose.addEventListener("click", closeLightbox)
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    closeLightbox()
  }
})

function closeLightbox() {
  lightbox.classList.remove("active")
  document.body.style.overflow = "auto"
  currentImages = []
  currentIndex = 0
}

// Navegación entre imágenes
lightboxPrev.addEventListener("click", function (e) {
  e.stopPropagation()
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
  showLightboxImage()
})

lightboxNext.addEventListener("click", function (e) {
  e.stopPropagation()
  currentIndex = (currentIndex + 1) % currentImages.length
  showLightboxImage()
})

// Navegación con teclado
document.addEventListener("keydown", function (e) {
  if (lightbox.classList.contains("active")) {
    if (e.key === "Escape") {
      closeLightbox()
    } else if (e.key === "ArrowLeft" && currentImages.length > 1) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
      showLightboxImage()
    } else if (e.key === "ArrowRight" && currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length
      showLightboxImage()
    }
  }
})

// Envío de formulario a WhatsApp
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()
    
    const name = document.getElementById("name").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value
    
    // Construir el mensaje de WhatsApp
    const whatsappMessage = `*Hola, soy ${name}*%0A%0A*Asunto:* ${subject}%0A%0A*Mensaje:*%0A${message}`
    
    // Número de WhatsApp (código de país + número sin espacios ni guiones)
    const phoneNumber = "5492657239836"
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
    
    // Opcional: limpiar el formulario
    contactForm.reset()
  })
}
