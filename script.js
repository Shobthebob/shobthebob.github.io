document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.shob-jam');
    const words = ["Shoubhit Jamadhiar", "a student", "a developer", ""];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = words[wordIndex];
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const delayBetweenWords = 2000;

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
        } else {
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

    textElement.classList.add('typing');
    type();
});
