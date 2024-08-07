document.addEventListener('DOMContentLoaded', () => {
    const fullTextElement = document.querySelector('.first-half')
    const textElement = document.querySelector('.shob-jam');
    const fullText = fullTextElement.textContent;
    const words = ["Shoubhit Jamadhiar", "a student", "a developer"];
    let wordIndex = 0;
    let letterIndex = 0;
    let letterIndex1 = 0;
    let currentWord = words[wordIndex];
    let isDeleting = false;
    const typingSpeed = 95;
    const erasingSpeed = 60;
    const delayBetweenWords = 2000;

    function typeFullText() {
        console.log(fullText);
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
                setTimeout(type, typingSpeed + 500); // Adding a slight delay before starting to type the new word
            }
        }
        else {
            if (letterIndex < currentWord.length) {
                textElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
                setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(type, delayBetweenWords); // Delay before starting to delete
            }
        }
    }
    
    typeFullText();


    const tiltContainer = document.querySelector('.tilt-container');
    const shine = document.querySelector('.shine');
    
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
        const distance = Math.sqrt(center.x**2 + center.y**2);
        
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

    tiltContainer.addEventListener('mouseenter', () => {
        bounds = tiltContainer.getBoundingClientRect();
        document.addEventListener('mousemove', rotateToMouse);
    });

    tiltContainer.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', rotateToMouse);
        tiltContainer.style.transform = '';
        tiltContainer.style.background = '';
        shine.style.opacity = 0;
    });
});