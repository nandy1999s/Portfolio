// Navigation Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// EmailJS integration for client-side email sending
// Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_PUBLIC_KEY' with your EmailJS credentials.
(function(){
  emailjs.init('YOUR_PUBLIC_KEY'); // <-- Replace with your EmailJS public key
})();

// Form Submission Handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            message: data.message
        });
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    } catch (error) {
        console.error('Email sending failed:', error);
        alert('Sorry, there was an error sending your message. Please try again later.');
    }
});

// Portfolio Image Hover Effects
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
    });
});

// Project Modal functionality
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

// Function to show modal
function showProjectModal(project) {
    console.log('Project clicked:', project);
    
    if (!project) {
        console.error('No project element found');
        return;
    }

    const title = project.querySelector('.portfolio-overlay h3');
    const description = project.querySelector('.portfolio-overlay p');
    const image = project.querySelector('img');
    
    console.log('Title:', title ? title.textContent : 'No title found');
    console.log('Description:', description ? description.textContent : 'No description found');
    console.log('Image:', image ? image.src : 'No image found');

    if (title && description && image) {
        document.getElementById('project-title').textContent = title.textContent;
        document.getElementById('project-image').style.backgroundImage = `url(${image.src})`;
        document.getElementById('project-description').textContent = description.textContent;
        modal.style.display = 'block';
        console.log('Modal displayed');
    } else {
        console.error('Missing required elements in project');
    }
}

// Close modal when clicking the close button or outside the modal
closeModal.onclick = function() {
    modal.style.display = 'none';
    console.log('Modal closed by close button');
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        console.log('Modal closed by clicking outside');
    }
};

// Add click event listeners to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    console.log('Adding click listener to portfolio item');
    item.addEventListener('click', function(e) {
        console.log('Portfolio item clicked');
        e.preventDefault(); // Prevent any default behavior
        showProjectModal(this);
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Scroll to Top Button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '↑';
scrollBtn.className = 'scroll-top';
scrollBtn.style.display = 'none';
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
