document.addEventListener('DOMContentLoaded', () => {

    // ------------------------ Sticky navigation -----------------------------

    const navigation = document.getElementById('nav');
    const heroSection = document.getElementById('hero');
    const originalNav = navigation.innerHTML;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                navigation.classList.add('sticky');
                document.querySelector('.logo-container').style.display = 'flex';
            }
            else {
                navigation.classList.remove('sticky');
                document.querySelector('.logo-container').style.display = 'none';
            }
        });
    }, {
        root: null,
        threshold: 0
    });
    observer.observe(heroSection);

    // ----------------------- Mobile Navigation ---------------------------

    const mobileNavBtn = document.querySelector('.mobile-nav-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeNavBtn = document.querySelector('.close-nav-btn');
    const body = document.body;

    mobileNavBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        body.classList.add('no-scroll');
    });

    closeNavBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        body.classList.remove('no-scroll');
    });

    const navLinks = document.querySelectorAll('.mobile-nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    mobileNav.addEventListener('transitionend', (event) => {
        if (!mobileNav.classList.contains('active') && event.propertyName === 'right' && window.matchMedia('(max-width: 795px)').matches) {
            mobileNavBtn.style.display = 'flex';
        }
    });
    
    document.addEventListener('click', (event) => {
        if (!mobileNav.contains(event.target) && !mobileNavBtn.contains(event.target)) {
            mobileNav.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });

    // ----------------------- Smooth Scrolling ---------------------------

    const allLinks = document.querySelectorAll("a:link");
    allLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const href = link.getAttribute("href");
            if (href === "#")
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            if (href !== "#" && href.startsWith("#")) {
                const sectionEl = document.querySelector(href);
                sectionEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // ------------------------ Auto typing hero txt -----------------------------

    const fullTextElement = document.querySelector('.first-half')
    const textElement = document.querySelector('.shob-jam');
    const fullText = fullTextElement.textContent;
    const words = ["Shoubhit Jamadhiar", "a student", "a personal developer"];
    let wordIndex = 0;
    let letterIndex = 0;
    let letterIndex1 = 0;
    let currentWord = words[wordIndex];
    let isDeleting = false;
    const typingSpeed = 95;
    const erasingSpeed = 60;
    const delayBetweenWords = 2000;

    function typeFullText() {
        if (letterIndex1 < fullText.length) {
            fullTextElement.textContent = fullText.substring(0, letterIndex1 + 1);
            letterIndex1++;
            setTimeout(typeFullText, typingSpeed);
        }
        else {
            type()
        }
    }

    function type() {
        if (isDeleting) {
            if (letterIndex > 0) {
                textElement.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
                setTimeout(type, erasingSpeed);
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                currentWord = words[wordIndex];
                setTimeout(type, typingSpeed + 500);
            }
        }
        else {
            if (letterIndex < currentWord.length) {
                textElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
                setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(type, delayBetweenWords);
            }
        }
    }

    typeFullText();

    // ----------------------- Hero Image Tile Card effect ---------------------------    

    const tiltContainer = document.querySelector('.tilt-container');
    const shine = document.querySelector('.shine');
    const heroImage = document.querySelector('.hero-img');

    let bounds;

    function rotateToMouse(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        }
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        tiltContainer.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
            ${center.y / 100},
            ${-center.x / 100},
            0,
            ${Math.log(distance) * 2}deg
        )
        `;

        shine.style.opacity = 0.5;
        shine.style.transform = `translate3d(${center.x / 4}px, ${center.y / 4}px, 0)`;
    }

    heroImage.addEventListener('mouseenter', () => {
        bounds = tiltContainer.getBoundingClientRect();
        document.addEventListener('mousemove', rotateToMouse);
    });

    heroImage.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', rotateToMouse);
        tiltContainer.style.transform = '';
        tiltContainer.style.background = '';
        shine.style.opacity = 0;
    });

    // ----------------------- Projects Image OnTop Effect ---------------------------    


    const overlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const closeBtn = document.querySelector('.close-btn');
    const projectImages = document.querySelectorAll('.project-img');

    projectImages.forEach(img => {
        img.addEventListener('click', () => {
            overlayImage.src = img.src;
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });

    function closeOverlay() {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            closeOverlay();
        }
    });

    // ----------------------- Tech Arsenal popup ---------------------------

    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const tech = document.querySelector('.tech-section');
    let activeItem = null;

    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', function (e) {
            e.stopPropagation();
            if (activeItem === this) {
                popup.style.display = 'none';
                activeItem = null;
                return;
            }
            activeItem = this;
            popupText.textContent = this.getAttribute('data-summary');

            const rect = this.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            popup.className = 'popup bottom';
            popup.style.top = (rect.bottom + scrollTop + 10) + 'px';

            popup.style.left = rect.left + 'px';
            popup.style.display = 'block';
        });

        item.addEventListener('mouseleave', function (e) {
            popup.style.display = 'none';
            activeItem = null;
        });
    });

    document.addEventListener('click', function (e) {
        if (!popup.contains(e.target) && !e.target.classList.contains('tech-item')) {
            popup.style.display = 'none';
            activeItem = null;
        }
    });

    // ----------------------- Contact section ---------------------------

    document.querySelector('.contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        let params = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_63ty9rb', 'template_0g74gyj', params)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent successfully! I will get back to you shortly.');
                document.querySelector('.contact-form').reset();
            }, function (error) {
                console.log('FAILED...', error);
                alert('Failed to send the message. Please try again later.');
            });
    });

});