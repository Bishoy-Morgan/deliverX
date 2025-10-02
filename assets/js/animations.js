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
    duration: .8,
    ease: "power3.out",
}, "-=0.5");

introTl.from(".right-hero .left-image img", {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
    
}, "-=0.3");

introTl.from(".right-hero .right-image img", {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
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
gsap.from(".features-section .feature-image", {
    y: 80,
    scale: .9,
    duration: .5,
    scrollTrigger: {
        trigger: ".ourMission-section",
        start: "top 80%",
    },
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
    const cards = document.querySelectorAll('.journey-section .card');
    
    cards.forEach((card, index) => {
        gsap.fromTo(card, 
            {
                opacity: 0,
                y: 80,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", 
                    end: "top 60%",   
                    toggleActions: "play none none reverse",
                }
            }
        );
    });
    
    const journeyContainer = document.querySelector('.ourJourney-container');
    const cardsContainer = document.querySelector('.cards-container');
    
    if (journeyContainer && cardsContainer) {
        ScrollTrigger.create({
            trigger: ".journey-section",
            start: "top 100px", 
            end: () => `+=${cardsContainer.offsetHeight - journeyContainer.offsetHeight}`,
            pin: journeyContainer,
            pinSpacing: false,
        });
    }
    
    gsap.fromTo('.ourJourney-container', 
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".journey-section",
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        }
    );
});

// partners
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

// news
gsap.from(".news-card", {
    y: 80,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".news-section",
        start: "top 80%",
    },
    onComplete: () => {
        gsap.set(".news-card", { clearProps: "transform" }); 
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
    
    dropdownToggle.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
        dropdownMenu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');
    });
    
    dropdownToggle.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(function() {
            if (!dropdownMenu.matches(':hover')) {
                dropdownMenu.classList.remove('show');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }, 100);
    });
    
    dropdownMenu.addEventListener('mouseenter', function() {
        clearTimeout(dropdownTimeout);
        dropdownMenu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');
    });
    
    dropdownMenu.addEventListener('mouseleave', function() {
        dropdownTimeout = setTimeout(function() {
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }, 100);
    });
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-item.dropdown')) {
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    dropdownMenu.addEventListener('click', function(event) {
        if (event.target.classList.contains('dropdown-item')) {
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    dropdownToggle.addEventListener('touchstart', function() {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
            dropdownToggle.setAttribute('aria-expanded', 'false');
        } else {
            dropdownMenu.classList.add('show');
            dropdownToggle.setAttribute('aria-expanded', 'true');
        }
    });
});



