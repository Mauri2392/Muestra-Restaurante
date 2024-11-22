const navLinks = document.querySelectorAll(".nav-link");
const buttonContainer = document.querySelector(".button-container");
const sections = document.querySelectorAll("section");
const header = document.querySelector(".header-section");
const footer = document.querySelector("#footer");

function updateActiveNav() {
  let currentSection = ""; // Almacena la sección activa

  // Calculamos los límites del header y el footer
  const headerBottom = header.getBoundingClientRect().bottom;
  const footerTop = footer.getBoundingClientRect().top;
  const viewportHeight = window.innerHeight;

  // Si estamos en el header
  if (headerBottom > 0 && headerBottom <= viewportHeight) {
    currentSection = "pizza"; // Pintamos el primer botón
  }
  // Si estamos en el footer y hemos salido completamente de la última sección
  else if (
    footerTop < viewportHeight &&
    document.querySelector("#postres").getBoundingClientRect().bottom <= 0
  ) {
    currentSection = "bebidas"; // Pintamos el último botón
  } else {
    // Determinamos qué sección intermedia está activa
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;

      // Verificamos si la sección está completamente visible
      if (sectionTop <= 60 && sectionTop + sectionHeight > 60) {
        currentSection = section.getAttribute("id");
      }
    });
  }

  // Actualizamos los estilos de los botones de navegación
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
      scrollToActiveButton(link);
    }
  });
}

function scrollToActiveButton(button) {
  const containerRect = buttonContainer.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const scrollAmount = buttonRect.left - containerRect.left - containerRect.width / 2 + buttonRect.width / 2;
  buttonContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

// Evento de scroll
document.addEventListener("scroll", updateActiveNav);

// Desplazamiento suave al hacer clic en un enlace
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId).offsetTop - 60;
    window.scrollTo({ top: targetSection, behavior: "smooth" });
  });
});

// Inicialización
updateActiveNav();


// Desplazamiento suave al hacer click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const navbarHeight = 60; // Altura del navbar en píxeles
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.offsetTop - navbarHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});







// Función para abrir el modal y mostrar el contenido completo
function openModal(divElement) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const modalPrice = document.getElementById("modal-price");

    // Elementos del div principal
    const imgElement = divElement.querySelector('img');
    const spanElement = divElement.querySelector('span');
    const pElements = divElement.querySelectorAll('p');

    // Mostrar el modal y asignar el contenido
    modal.style.display = "flex";
    modalImg.src = imgElement.src;
    modalTitle.textContent = spanElement.textContent;
    
    // Usa el contenido completo para el modal
    modalDesc.textContent = pElements[1].dataset.fullText;
    modalPrice.textContent = pElements[2].textContent;
}



// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Truncado de texto en el div principal
document.querySelectorAll('.info p:nth-child(2)').forEach(descriptionElement => {
    const charLimit = 100;
    const originalText = descriptionElement.textContent;

    // Guarda el texto completo en un atributo data-full-text para el modal
    descriptionElement.dataset.fullText = originalText;

    // Trunca el texto en el div principal si supera el límite de caracteres
    if (originalText.length > charLimit) {
        const truncatedText = originalText.substring(0, charLimit) + '...';
        descriptionElement.textContent = truncatedText;
    }
});
