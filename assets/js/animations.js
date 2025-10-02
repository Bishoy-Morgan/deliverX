gsap.registerPlugin(ScrollTrigger);

let introTl = gsap.timeline();

// navbar
introTl.from(".navbar", {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
});

// hero left content
introTl.from(".left-hero", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
}, "-=0.3"); 

// hero right content
introTl.from(".right-hero", {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
})
.from(".right-hero .left-image", {
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    ease: "power3.out",
}, "-=0.4")
.from(".right-hero .right-image", {
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    ease: "power3.out",
});

gsap.to(".right-hero .left-image", {
    y: 40, 
    ease: "sine.inOut",
    scrollTrigger: {
        trigger: ".right-hero",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.5,
    }
});

gsap.to(".right-hero .right-image", {
    y: -40, 
    ease: "sine.inOut",
    scrollTrigger: {
        trigger: ".right-hero",
        start: "top 80%",
        end: "bottom top",
        scrub: 1.5,
    }
});

// nu-container 
gsap.from(".nu-container > div", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".nu-container",
        start: "top 85%",
    },
});

// features sections
gsap.utils.toArray(".features-section .feature-image").forEach((img) => {
    gsap.from(img, {
        y: 80,
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: img,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
    });
});

gsap.utils.toArray([".aboutUs-container", ".ourMission-container"]).forEach((el) => {
    gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// joureny section
document.addEventListener('DOMContentLoaded', function() {
    const journeySection = document.querySelector('.journey-section');
    const ourJourneyContainer = document.querySelector('.ourJourney-container');
    const cardsContainer = document.querySelector('.cards-container');
    const cards = document.querySelectorAll('.cards-container .card');
    
    gsap.set(cards, {
        opacity: 0,
        y: 100
    });
    
    
    cards.forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    
    ScrollTrigger.create({
        trigger: journeySection,
        start: 'top top',
        end: () => `+=${cardsContainer.offsetHeight - window.innerHeight + 200}`,
        pin: ourJourneyContainer,
        pinSpacing: false
    });
});

// partners section
gsap.from(".three-cols-content > img ", {
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".partners-section",
        start: "top 80%",
    },
});

// news section
gsap.from(".news-card", {
    y: 100,
    opacity: 0,
    duration: .8,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".news-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
    },
    onComplete: () => {
        gsap.set(".news-card", { clearProps: "y,opacity" }); 
    }
});

// footer
gsap.from("footer", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "footer",
        start: "top 90%",   // when footer is 90% into view
        toggleActions: "play none none reverse"
    }
});

// navbar scroll animation
let lastScroll = 0;

ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
        let currentScroll = self.scroll();
        if (currentScroll > lastScroll + 5) {
            gsap.to(".sticky-navbar", { y: "-100%", duration: 0.3, ease: "power2.out" });
        } else if (currentScroll < lastScroll - 5) {
            gsap.to(".sticky-navbar", { y: "0%", duration: 0.3, ease: "power2.out" });
        }
        lastScroll = currentScroll;
    }
});

// navbar dropdown
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.nav-item.dropdown .dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-item.dropdown .dropdown-menu');
    let dropdownTimeout;
    
    dropdownToggle.setAttribute('data-bs-toggle', '');
    dropdownToggle.setAttribute('aria-expanded', 'false');

    dropdownMenu.style.transition = 'none';
    
    // initial state
    gsap.set(dropdownMenu, {
        opacity: 0,
        y: 20,
        display: 'none',
        visibility: 'hidden'
    });
    
    function showDropdown() {
        clearTimeout(dropdownTimeout);
        gsap.to(dropdownMenu, {
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
        dropdownMenu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');
    }
    
    function hideDropdown() {
        gsap.to(dropdownMenu, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: function() {
                dropdownMenu.classList.remove('show');
                gsap.set(dropdownMenu, { 
                    display: 'none',
                    visibility: 'hidden'
                });
            }
        });
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }
    
    dropdownToggle.addEventListener('mouseenter', showDropdown);
    
    dropdownToggle.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(function() {
            if (!dropdownMenu.matches(':hover')) {
                hideDropdown();
            }
        }, 100);
    });
    
    dropdownMenu.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
    });
    
    dropdownMenu.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(hideDropdown, 100);
    });
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-item.dropdown')) {
            hideDropdown();
        }
    });
    
    dropdownMenu.addEventListener('click', function(event) {
        if (event.target.classList.contains('dropdown-item')) {
            hideDropdown();
        }
    });
    
    dropdownToggle.addEventListener('touchstart', function() {
        if (dropdownMenu.classList.contains('show')) {
            hideDropdown();
        } else {
            showDropdown();
        }
    });
});



