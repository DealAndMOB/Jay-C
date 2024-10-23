// Datos de ejemplo para los beats
const beatsData = [
    {
        id: 1,
        title: "Midnight Vibes",
        genre: "Trap",
        bpm: 140,
        price: 29.99,
        image: "https://placehold.co/400x400"
    },
    {
        id: 2,
        title: "Summer Heat",
        genre: "Reggaeton",
        bpm: 95,
        price: 34.99,
        image: "https://placehold.co/400x400"
    },
    {
        id: 3,
        title: "Dark Matter",
        genre: "Hip Hop",
        bpm: 90,
        price: 39.99,
        image: "https://placehold.co/400x400"
    },
    {
        id: 4,
        title: "Future Dreams",
        genre: "R&B",
        bpm: 85,
        price: 29.99,
        image: "https://placehold.co/400x400"
    },
    {
        id: 5,
        title: "Crystal Clear",
        genre: "Pop",
        bpm: 128,
        price: 44.99,
        image: "https://placehold.co/400x400"
    },
    {
        id: 6,
        title: "Urban Night",
        genre: "Trap",
        bpm: 145,
        price: 34.99,
        image: "https://placehold.co/400x400"
    }
];

// Función para crear las cards de beats
function createBeatCards() {
    const container = document.getElementById('beats-container');
    beatsData.forEach(beat => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="beat-card">
                <img src="${beat.image}" alt="${beat.title}">
                <h3>${beat.title}</h3>
                <p>Género: ${beat.genre}</p>
                <p>BPM: ${beat.bpm}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="beat-price">$${beat.price}</span>
                    <button class="btn btn-outline-light btn-sm" onclick="playPreview(${beat.id})">
                        <i class="fas fa-play"></i> Preview
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Función para reproducir preview (simulada)
function playPreview(beatId) {
    console.log(`Reproduciendo preview del beat ${beatId}`);
    // Aquí puedes implementar la lógica real de reproducción
}

// Efecto de scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 31, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 243, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 31, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Animación de entrada para las cards de servicios
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animaciones a las cards de servicios
document.addEventListener('DOMContentLoaded', function() {
    // Crear las cards de beats
    createBeatCards();

    // Animar cards de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Animar cards de beats
    const beatCards = document.querySelectorAll('.beat-card');
    beatCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Función para filtrar beats por género
function filterBeatsByGenre(genre) {
    const container = document.getElementById('beats-container');
    container.innerHTML = '';
    
    const filteredBeats = genre === 'all' 
        ? beatsData 
        : beatsData.filter(beat => beat.genre.toLowerCase() === genre.toLowerCase());
    
    filteredBeats.forEach(beat => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="beat-card">
                <img src="${beat.image}" alt="${beat.title}">
                <h3>${beat.title}</h3>
                <p>Género: ${beat.genre}</p>
                <p>BPM: ${beat.bpm}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="beat-price">$${beat.price}</span>
                    <button class="btn btn-outline-light btn-sm" onclick="playPreview(${beat.id})">
                        <i class="fas fa-play"></i> Preview
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Agregar efectos de hover con mouse parallax
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.beat-card, .service-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        const angleX = (cardCenterY - e.clientY) / 30;
        const angleY = (e.clientX - cardCenterX) / 30;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});