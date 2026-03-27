/* =========================================================================
   ANTI-GRAVITY PORTFOLIO SCRIPT
   Author: Manaswi Muppidi
========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 0. Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 1. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-links a, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if(targetId === '#') return;
            
            // Close mobile menu on click
            if(navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            const targetElement = document.getElementById(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 1.5 Scrollspy: Highlight Active Nav Link
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('.nav-links a');

    const scrollSpyOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });


    // 2. Typing Effect for the Role
    const roleEl = document.querySelector('.typing-text');
    if (roleEl) {
        const textToType = "Aspiring Data Analyst";
        roleEl.innerHTML = "";
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                roleEl.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000); // Start after 1 second
    }

    // 3. Glitch Effect on Main Name on Hover
    const glitchEl = document.querySelector('.glitch-text');
    if (glitchEl) {
        glitchEl.addEventListener('mouseenter', () => {
            glitchEl.style.transform = 'translate(2px, -2px)';
            setTimeout(() => { glitchEl.style.transform = 'translate(-2px, 2px)' }, 50);
            setTimeout(() => { glitchEl.style.transform = 'translate(0, 0)' }, 100);
        });
    }

    // 4. Parallax effect for floating orbs on mouse move
    document.addEventListener("mousemove", parallaxEffect);
    function parallaxEffect(e) {
        document.querySelectorAll(".glowing-orb").forEach((orb) => {
            const speed = orb.classList.contains("orb-purple") ? -5 : 
                          orb.classList.contains("orb-blue") ? 5 : 2;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            orb.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // 5. Intersection Observer for Scroll Animations (Fade in the glass cards when scrolling)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.transition = 'all 0.8s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach((card) => {
        // Only apply entrance animation to sections below hero
        if (!card.closest('.hero')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.95)';
            scrollObserver.observe(card);
        }
    });

    // 6. Contact Form Submission Styling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && submitBtn) {
        // We removed the 'preventDefault' so the form can natively submit to Formspree, bypassing local CORS blocks!
        contactForm.addEventListener('submit', () => {
            const btnSpan = submitBtn.querySelector('span');
            const iconElement = submitBtn.querySelector('i');
            
            // Visual feedback: Transmitting... (Will appear until the browser naturally redirects)
            submitBtn.classList.add('btn-transmitting');
            iconElement.className = 'fas fa-satellite-dish';
            btnSpan.innerText = 'Transmitting...';
        });
    }

    // 7. Initialize Leaflet Map for Dashboard
    if (document.getElementById('interactive-map')) {
        const map = L.map('interactive-map', {
            center: [39.8283, -98.5795], // Centered on USA
            zoom: 3,
            zoomControl: false,
            scrollWheelZoom: false // Prevent scrolling issues
        });
        
        // Add Dark Matter tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Add some glowing cyan points covering key states
        const stationPoints = [
            [40.7128, -74.0060], [34.0522, -118.2437], [41.8781, -87.6298], 
            [29.7604, -95.3698], [47.6062, -122.3321], [25.7617, -80.1918],
            [39.7392, -104.9903], [36.1699, -115.1398]
        ];

        stationPoints.forEach(p => {
            L.circleMarker(p, {
                radius: 4,
                fillColor: "var(--neon-cyan)",
                color: "var(--neon-blue)",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);
        });
    }
});
