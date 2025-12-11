// Education and Experience Button Script
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.target,
            targetContent = document.querySelector(targetSelector)

    // Disable all content and active tabs
    tabContents.forEach((content) => content.classList.remove('work-active'))
    tabs.forEach((t) => t.classList.remove('work-active'))

    // Active the tab and corresponding content
    tab.classList.add('work-active')
    targetContent.classList.add('work-active')
    })
})

// Tab functionality
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link")
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab")
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab")
}

// Mobile menu functionality
var sidemenu = document.getElementById("side-menu");

function openmenu(){
    sidemenu.style.right = "0";
    sidemenu.classList.add("show-menu");
}

function closemenu(){
    sidemenu.style.right = "-200px";
    sidemenu.classList.remove("show-menu");
}

// Form submission with improved feedback
const scriptURL = 'https://script.google.com/macros/s/AKfycbwvmdiVOnccn_GH-FcBlXigEhiQFspvgVbkfkVwEqF867TCl4JaLn2LWdWhut8UvoCP/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            msg.style.color = "#61b752";
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = "Error sending message. Please try again.";
            msg.style.color = "#ff004f";
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit';
            setTimeout(() => msg.innerHTML = "", 3000);
        });
});

// See More functionality with smooth animation
const seeMoreBtn = document.getElementById('seeMoreBtn');
const workItems = document.querySelectorAll('.work-list .work');
let showingAll = false;
let currentFilter = 'all';

function updateShowMoreVisibility() {
    if (currentFilter === 'all') {
        seeMoreBtn.style.display = '';
    } else {
        seeMoreBtn.style.display = 'none';
    }
}

function showFilteredWorks(filter) {
    let shownCount = 0;
    workItems.forEach((work, idx) => {
        const tag = work.getAttribute('data-tag');
        if (filter === 'all' || tag === filter) {
            work.style.display = '';
            if (filter === 'all' && !showingAll && shownCount >= 3) {
                work.classList.add('hidden-work');
            } else {
                work.classList.remove('hidden-work');
            }
            shownCount++;
        } else {
            work.style.display = 'none';
        }
    });
    updateShowMoreVisibility();
}

document.querySelectorAll('.portfolio-filters .tab-links').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.portfolio-filters .tab-links').forEach(b => b.classList.remove('active-link'));
        this.classList.add('active-link');
        currentFilter = this.getAttribute('data-filter');
        showingAll = false;
        showFilteredWorks(currentFilter);
    });
});

seeMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (currentFilter === 'all') {
        showingAll = !showingAll;
        if (showingAll) {
            workItems.forEach(work => work.classList.remove('hidden-work'));
            seeMoreBtn.textContent = 'Show Less';
        } else {
            let count = 0;
            workItems.forEach(work => {
                if (count < 3) {
                    work.classList.remove('hidden-work');
                } else {
                    work.classList.add('hidden-work');
                }
                count++;
            });
            seeMoreBtn.textContent = 'See More';
        }
    }
});

// Initial state
showFilteredWorks('all');
seeMoreBtn.textContent = 'See More';

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 600) {
                closemenu();
            }
        }
    });
});

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const works = document.querySelectorAll('.work');
    works.forEach(work => {
        const workTop = work.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (workTop < windowHeight * 0.8) {
            work.style.opacity = '1';
            work.style.transform = 'translateY(0)';
        }
    });
});
// Typing effect for header text
const roles = ["AI/ML Engineer", "Python Developer", "Data Analyst", "BI Developer"]; 
let roleIndex = 0;
let charIndex = 0;
let typing = true;
const typingText = document.getElementById("typing-text");

function typeRole() {
    if (typing) {
        if (charIndex < roles[roleIndex].length) {
            typingText.textContent = roles[roleIndex].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeRole, 100); // Typing speed
        } else {
            typing = false;
            setTimeout(typeRole, 1200); // Pause before deleting
        }
    } else {
        if (charIndex > 0) {
            typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeRole, 50); // Deleting speed
        } else {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 400); // Pause before typing next
        }
    }
}

typeRole();

// Modal functionality
document.querySelectorAll('[data-modal-target]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    });
});

document.querySelectorAll('.modal .close-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('show');
    });
});

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

document.querySelectorAll('.modal-contact-btn').forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.classList.remove('show');
        // Smooth scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
