// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip empty hash links
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate header height to offset the scroll position, allowing the fixed nav to not cover the section header
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve to animate only once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe all elements with .fade-in for scroll animations
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Contact form validation and mock submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission / page refresh
            
            // Basic validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill out all fields.');
                return;
            }
            
            // Simple email format check using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            
            // Change button text temporarily to indicate sending
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network request delay (800ms)
            setTimeout(() => {
                // If validation passes, show success message
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                
                // Reset the form and button
                contactForm.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 800);
        });
    }
});
