const images = document.querySelectorAll(".gallery__image");
const imagesLength = images.length;
// const header = document.querySelector(".header");
const headerTitle = document.querySelector(".header__title");
const headerTitleText = headerTitle.innerText;
const galleryDescription = document.querySelector(".gallery__description");
const contactArticle = document.querySelector('.contact__article');
const contactBackground = document.querySelector(".contact__background");
const linkDescription = document.querySelector('.main__link-description');


const queryWidth = window.matchMedia("(max-width: 900px)");

let countImages = 0;
let imagesSliderTimer;
const imagesSliderShowTime = 1000;
let contact = false;

const imagesOnMousemove = (event) => {

    if (!queryWidth.matches) {

        const cursorX = event.clientX;

        for (let i = 0; i < imagesLength; i++) {

            const partWidth = window.innerWidth / imagesLength;

            const min = partWidth * i;
            const max = partWidth * (i + 1);

            if (cursorX >= min && cursorX < max) {
                images[i].style.opacity = 1;
                galleryDescription.innerText = images[i].getAttribute("alt");
            } else {
                images[i].style.opacity = 0;
            }
        }
    }
}

const imagesSlider = () => {
    if (queryWidth.matches) {
        for (let i = 0; i < imagesLength; i++) {
            if (i == countImages) {
                images[i].style.opacity = 1;
            } else {
                images[i].style.opacity = 0;
            }
        }
        if (countImages < imagesLength - 1) {
            countImages++;
        } else {
            countImages = 0;
        }

        imagesSliderTimer = setTimeout("imagesSlider()", imagesSliderShowTime);
    } else {
        clearTimeout(imagesSliderTimer);
    }
}

const titleHover = (text) => {
    if (contact == false) headerTitle.innerText = text;
}

const backTxtPosition = (event) => {
    linkDescription.style.left = event.clientX + 10 + "px";
    linkDescription.style.top = event.clientY + 10 + "px";
}

const backTxtPositionOut = () => {
    linkDescription.style.left = -500 + 'px';
    linkDescription.style.top = -500 + 'px';
}

const contactDisplay = (event) => {
    const items = [headerTitle, contactArticle, linkDescription, contactBackground];
    if (contact == false) {
        // wyswietl contact
        items.forEach((item) => item.classList.add('active'));
        contactArticle.style.display = 'block';
        linkDescription.innerText = 'close';
        contactArticle.addEventListener('mouseover', () => linkDescription.classList.remove('active'));
        contactArticle.addEventListener('mouseout', () => linkDescription.classList.add('active'));
        contact = true;
    } else {
        // ukryj contact
        headerTitle.innerText = headerTitleText;
        items.forEach((item) => item.classList.remove('active'));

        setTimeout(() => contactArticle.style.display = 'none', 400);
        contact = false;
    }
}

const init = () => {
    document.body.style.cursor = 'default';
    document.body.removeEventListener('click', init);

    playground.style.opacity = 0;
    setTimeout(() => playground.style.display = 'none', 600);

    headerTitle.classList.remove('active');
    linkDescription.classList.remove('active');

    images[0].style.opacity = 1;
    galleryDescription.innerText = images[0].getAttribute("alt");

    imagesSlider();

    window.addEventListener("mousemove", (event) => imagesOnMousemove(event));

    window.addEventListener("resize", () => {
        clearTimeout(imagesSliderTimer);
        imagesSlider();
    });

    // title + contact page
    headerTitle.addEventListener('mouseover', () => titleHover("Contact"));
    headerTitle.addEventListener('mouseout', () => titleHover(headerTitleText));
    headerTitle.addEventListener('click', contactDisplay);
    contactBackground.addEventListener('click', contactDisplay);
}

if (!queryWidth.matches) {
    // intro tylko na desktopie
    playground.style.opacity = 1;
    document.body.style.cursor = 'none';

    linkDescription.classList.add('active');
    backTxtPositionOut();
    window.addEventListener("mousemove", (event) => {
        backTxtPosition(event); //od początku na desktopie ta funkcja zaczyna działać i działa cały czas, nie odpala się na mobile
    });
    window.addEventListener("mouseout", backTxtPositionOut);

    document.body.addEventListener('click', init);
} else {
    init();
}