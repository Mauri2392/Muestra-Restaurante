const navLinks = document.querySelectorAll(".nav-link");
const buttonContainer = document.querySelector(".button-container");

// Función para marcar el botón activo basado en la sección visible
function updateActiveNav() {
    const sections = document.querySelectorAll("section");
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop - 60 && scrollY < sectionTop + sectionHeight - 60) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSectionId)) {
            link.classList.add("active");

            // Centrar el botón activo en la barra de navegación
            scrollToActiveButton(link);
        }
    });
}

// Función para desplazar automáticamente la barra de navegación
function scrollToActiveButton(activeButton) {
    const containerRect = buttonContainer.getBoundingClientRect(); // Dimensiones del contenedor
    const buttonRect = activeButton.getBoundingClientRect(); // Dimensiones del botón activo

    // Calcula la posición necesaria para centrar el botón en el contenedor
    const offset = buttonRect.left - containerRect.left - containerRect.width / 2 + buttonRect.width / 2;

    // Desplaza el contenedor horizontalmente
    buttonContainer.scrollBy({
        left: offset,
        behavior: "smooth" // Movimiento suave
    });
}

// Detecta el evento de scroll y actualiza el botón activo
document.addEventListener("scroll", updateActiveNav);

// Configura el comportamiento de smooth scroll al hacer clic en un enlace
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.offsetTop - 60;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});

// Inicializa el botón activo al cargar la página
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
    const charLimit = 120;
    const originalText = descriptionElement.textContent;

    // Guarda el texto completo en un atributo data-full-text para el modal
    descriptionElement.dataset.fullText = originalText;

    // Trunca el texto en el div principal si supera el límite de caracteres
    if (originalText.length > charLimit) {
        const truncatedText = originalText.substring(0, charLimit) + '...';
        descriptionElement.textContent = truncatedText;
    }
});
