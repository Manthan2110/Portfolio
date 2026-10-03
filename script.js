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

function opentab(e, tabname){
    // Fallback if called without event argument
    if (typeof e === 'string' && !tabname) {
        tabname = e;
        e = window.event;
    }
    const currentTarget = e ? (e.currentTarget || e.target) : null;
    
    for(let tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(let tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    if (currentTarget) {
        currentTarget.classList.add("active-link");
    }
    const targetEl = document.getElementById(tabname);
    if (targetEl) {
        targetEl.classList.add("active-tab");
    }
}

// Mobile menu functionality
const sidemenu = document.getElementById("side-menu");

function openmenu(){
    if (sidemenu) {
        sidemenu.classList.add("show-menu");
    }
}

function closemenu(){
    if (sidemenu) {
        sidemenu.classList.remove("show-menu");
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (sidemenu && sidemenu.classList.contains('show-menu')) {
        if (!sidemenu.contains(e.target) && !e.target.closest('.fa-bars')) {
            closemenu();
        }
    }
});

// Contact Form Submission (Option B: Web3Forms Developer Service)
const contactForm = document.getElementById('contact-form') || document.forms['contact-form'];
const msg = document.getElementById("msg");

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('form-submit-btn') || contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        }
        if (msg) {
            msg.innerHTML = "";
        }

        const formData = new FormData(contactForm);
        const accessKey = formData.get("access_key");

        // Graceful fallback if user has not yet pasted their unique Web3Forms access key
        if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
            const senderName = formData.get("name") || "";
            const senderEmail = formData.get("email") || "";
            const userSubject = formData.get("user_subject") || "Portfolio Inquiry";
            const messageBody = formData.get("message") || "";
            
            const mailtoUrl = `mailto:manthanjadav746@gmail.com?subject=${encodeURIComponent(userSubject)}&body=${encodeURIComponent("From: " + senderName + " (" + senderEmail + ")\n\n" + messageBody)}`;
            window.location.href = mailtoUrl;
            
            if (msg) {
                msg.innerHTML = `<i class="fa-solid fa-circle-info"></i> Please paste your free Web3Forms Key in <code>index.html</code> for instant background sending. (<a href="${mailtoUrl}" style="color: #ff004f; text-decoration: underline;">Click here to send via email client</a>)`;
                msg.style.color = "#ffb703";
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (response.ok && data.success) {
                if (msg) {
                    msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message was sent successfully.';
                    msg.style.color = "#61b752";
                }
                contactForm.reset();
            } else {
                throw new Error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            if (msg) {
                msg.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error sending message. Opening direct email...';
                msg.style.color = "#ff004f";
            }
            // Fallback to mailto on network/API failure
            const userSubject = formData.get("user_subject") || "Portfolio Inquiry";
            const messageBody = formData.get("message") || "";
            window.open(`mailto:manthanjadav746@gmail.com?subject=${encodeURIComponent(userSubject)}&body=${encodeURIComponent(messageBody)}`, '_blank');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
            setTimeout(() => {
                if (msg) msg.innerHTML = "";
            }, 6000);
        }
    });
}

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
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Always close mobile/tablet drawer if open
            closemenu();
        }
    });
});

// Mobile touch card support: tap to reveal details on touch screens
document.querySelectorAll('.work-list .work').forEach(workCard => {
    workCard.addEventListener('click', function(e) {
        // If clicking directly on external project link, let it open
        if (e.target.closest('a')) return;
        
        const isTouch = window.matchMedia('(hover: none) or (max-width: 992px)').matches;
        if (isTouch) {
            const wasActive = this.classList.contains('touch-active');
            document.querySelectorAll('.work-list .work.touch-active').forEach(c => c.classList.remove('touch-active'));
            if (!wasActive) {
                this.classList.add('touch-active');
            }
        }
    });
});

// Close active touch card on outside tap
document.addEventListener('click', function(e) {
    if (!e.target.closest('.work')) {
        document.querySelectorAll('.work-list .work.touch-active').forEach(c => c.classList.remove('touch-active'));
    }
});

// Add scroll-based animations, progress bar, back-to-top and ScrollSpy
const scrollProgress = document.getElementById('scroll-progress');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 1. Reading progress line
    if (scrollProgress && scrollHeight > 0) {
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }

    // 2. Back-to-top button visibility
    if (backToTopBtn) {
        if (scrollTop > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // 3. Work items reveal animation
    const works = document.querySelectorAll('.work');
    works.forEach(work => {
        const workTop = work.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (workTop < windowHeight * 0.8) {
            work.style.opacity = '1';
            work.style.transform = 'translateY(0)';
        }
    });

    // 4. ScrollSpy: active nav link highlight
    let currentId = '';
    const sectionIds = ['header', 'about', 'work', 'services', 'portfolio', 'contact'];
    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 250 && rect.bottom >= 150) {
                currentId = id;
            }
        }
    });
    if (currentId) {
        document.querySelectorAll('#side-menu li a').forEach(link => {
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});
// Typing effect for header text
const roles = ["Python Developer", "Software Engineer", "AI/ML Engineer", "Data Analyst", "BI Developer"]; 
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

// Close modal on Escape key press
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});

// Smooth Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Ensure pure dark mode across all visits & clean up legacy keys
try {
    document.body.classList.remove('light-mode');
    localStorage.removeItem('portfolio-theme');
} catch (e) {}
