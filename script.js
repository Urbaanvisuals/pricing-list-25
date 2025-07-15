// Price Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hdrInput = document.getElementById('hdr-count');
    const flambientInput = document.getElementById('flambient-count');
    const hdrTotal = document.getElementById('hdr-total');
    const flambientTotal = document.getElementById('flambient-total');
    const hdrBreakdown = document.getElementById('hdr-breakdown');
    const flambientBreakdown = document.getElementById('flambient-breakdown');
    const finalTotal = document.getElementById('final-total');

    const baseFee = 6000;
    const hdrPrice = 200;
    const flambientPrice = 300;

    function updateCalculator() {
        const hdrCount = parseInt(hdrInput.value) || 0;
        const flambientCount = parseInt(flambientInput.value) || 0;

        const hdrCost = hdrCount * hdrPrice;
        const flambientCost = flambientCount * flambientPrice;
        const total = baseFee + hdrCost + flambientCost;

        if (hdrTotal) hdrTotal.textContent = `฿${hdrCost.toLocaleString()}`;
        if (flambientTotal) flambientTotal.textContent = `฿${flambientCost.toLocaleString()}`;
        if (hdrBreakdown) hdrBreakdown.textContent = `฿${hdrCost.toLocaleString()}`;
        if (flambientBreakdown) flambientBreakdown.textContent = `฿${flambientCost.toLocaleString()}`;
        if (finalTotal) finalTotal.textContent = `฿${total.toLocaleString()}`;
    }

    // Number input buttons functionality
    const numberBtns = document.querySelectorAll('.number-btn');
    numberBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const currentValue = parseInt(input.value) || 0;
            
            if (this.classList.contains('plus')) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('minus') && currentValue > 0) {
                input.value = currentValue - 1;
            }
            
            updateCalculator();
        });
    });

    if (hdrInput && flambientInput) {
        updateCalculator(); // Initialize
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Bloom handles form submission
        console.log('Bloom form initialized');
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.package-card, .service-card, .feature-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
        });
    }

    // Pricing Toggle Functionality
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const bundledPackages = document.getElementById('bundled-packages');
    const photosOnlyPackages = document.getElementById('photos-only-packages');

    if (toggleOptions.length > 0 && bundledPackages && photosOnlyPackages) {
        toggleOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedOption = this.getAttribute('data-option');
                
                // Update toggle button states
                toggleOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // Show/hide appropriate packages
                if (selectedOption === 'bundled') {
                    bundledPackages.classList.remove('hidden');
                    photosOnlyPackages.classList.add('hidden');
                } else if (selectedOption === 'photos_only') {
                    bundledPackages.classList.add('hidden');
                    photosOnlyPackages.classList.remove('hidden');
                }
            });
        });
    }

    // Package selection highlighting
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            packageCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
        });
    });

    // Service selection in contact form
    const serviceSelect = document.getElementById('service');
    const propertyTypeSelect = document.getElementById('property-type');
    
    if (serviceSelect && propertyTypeSelect) {
        // Auto-select property type based on service
        serviceSelect.addEventListener('change', function() {
            const service = this.value;
            if (service.includes('essential')) {
                propertyTypeSelect.value = 'studio';
            } else if (service.includes('premium')) {
                propertyTypeSelect.value = '2br';
            } else if (service.includes('ultra')) {
                propertyTypeSelect.value = '3br';
            } else if (service.includes('prestige')) {
                propertyTypeSelect.value = 'villa';
            }
        });
    }

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary') && !this.disabled) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });

    // Add hover effects for better UX
    const interactiveElements = document.querySelectorAll('.package-card, .service-card, .feature-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form field focus effects
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add CSS for focused state
    const style = document.createElement('style');
    style.textContent = `
        .form-group.focused label {
            color: #e6bc44;
        }
        .package-card.active {
            border-color: #e6bc44;
            box-shadow: 0 8px 30px rgba(230, 188, 68, 0.3);
        }
        .header {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}); 

// Licensing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const licensingToggle = document.querySelector('.licensing-toggle');
    const licensingContent = document.querySelector('.licensing-content');

    if (licensingToggle && licensingContent) {
        licensingToggle.setAttribute('aria-expanded', 'false');
        
        licensingToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            licensingContent.classList.toggle('hidden');
            
            // Smooth scroll into view if expanding
            if (!isExpanded) {
                setTimeout(() => {
                    licensingContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    }
}); 

// Handle package selection buttons
document.addEventListener('DOMContentLoaded', function() {
    // Get all package selection buttons
    const packageButtons = document.querySelectorAll('.package-card .btn-primary');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get package details
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('h3').textContent;
            const packagePrice = packageCard.querySelector('.price').textContent;
            
            // Pre-fill contact form
            const serviceSelect = document.querySelector('#service');
            if (serviceSelect) {
                // Find and select the matching option
                Array.from(serviceSelect.options).forEach(option => {
                    if (option.text.includes(packageName)) {
                        serviceSelect.value = option.value;
                        // Trigger change event for Bloom
                        serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                });
            }
            
            // Add package info to message
            const messageArea = document.querySelector('#message');
            if (messageArea) {
                messageArea.value = `I'm interested in the ${packageName} package (${packagePrice}).\n\n`;
                // Trigger change event for Bloom
                messageArea.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            // Smooth scroll to contact form
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Handle WhatsApp clicks with package info
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Get any pre-selected package or service info
        const selectedService = document.querySelector('#service').value;
        let baseMessage = "Hi, thanks for reaching out to Urbaan Visuals! Please feel free to share details about what you're looking for – ";
        
        if (selectedService) {
            baseMessage += `I'm interested in the ${selectedService} package. `;
        }
        
        baseMessage += "the service you're interested in, your property or project information, and any specific requirements. I'll review it and get back to you with a few questions shortly.";
        
        this.href = `https://wa.me/66654475786?text=${encodeURIComponent(baseMessage)}`;
    });
});

// Form validation visual feedback
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.checkValidity()) {
            this.classList.add('valid');
            this.classList.remove('invalid');
        } else {
            this.classList.add('invalid');
            this.classList.remove('valid');
        }
    });
});

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="btn-text">Sending...</span>';
        
        // Get form data
        const formData = new FormData(form);
        
        // Send to Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success - redirect to thank you page or show success message
            const redirectUrl = form.querySelector('input[name="_next"]').value;
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                // Show success message if no redirect URL
                showFormMessage('Thank you! We will contact you soon.', 'success');
                form.reset();
            }
        } else {
            // Show error message
            throw new Error('Form submission failed');
        }
    } catch (error) {
        showFormMessage('Sorry, there was a problem. Please try again or contact us directly.', 'error');
    } finally {
        // Re-enable submit button and restore original text
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// Helper function to show form messages
function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
} 