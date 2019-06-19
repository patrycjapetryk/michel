const imgInContainer = document.querySelectorAll(".gallery__image");
const howManyPhotos = imgInContainer.length;
const header = document.querySelector(".header");
const headerTitle = document.querySelector(".header__title");
const headerTitleText = headerTitle.innerText;
const galleryDescription = document.querySelector(".gallery__description"); // description
const contactContainer = document.querySelector('.contact'); // contact txt
const linkDescription = document.querySelector('.main__link-description'); // back txt
const bg = document.querySelector(".background"); // contact bg


const queryWidth = window.matchMedia("(max-width: 900px)");

let countPhotos = 0;
let timer;
const time = 1000;
let contact = false;

const imagesOnMousemove = (event) => {

    if (!queryWidth.matches) {

        const cursorX = event.clientX;

        for (let i = 0; i < howManyPhotos; i++) {

            const partWidth = window.innerWidth / howManyPhotos;

            const min = partWidth * i;
            const max = partWidth * (i + 1);

            if (cursorX >= min && cursorX < max) {
                imgInContainer[i].style.opacity = 1;
                galleryDescription.innerText = imgInContainer[i].getAttribute("alt");
            } else {
                imgInContainer[i].style.opacity = 0;
            }
        }
    }
}

const imagesSlider = () => {
    if (queryWidth.matches) {
        for (let i = 0; i < howManyPhotos; i++) {
            if (i == countPhotos) {
                imgInContainer[i].style.opacity = 1;
            } else {
                imgInContainer[i].style.opacity = 0;
            }
        }
        if (countPhotos < howManyPhotos - 1) {
            countPhotos++;
        } else {
            countPhotos = 0;
        }

        timer = setTimeout("imagesSlider()", time);
    } else {
        clearTimeout(timer);
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
    const items = [headerTitle, contactContainer, linkDescription, bg];
    if (contact == false) {
        // wyswietl contact
        items.forEach((item) => item.classList.add('active'));
        contactContainer.style.display = 'block';
        linkDescription.innerText = 'close';
        contactContainer.addEventListener('mouseover', () => linkDescription.classList.remove('active'));
        contactContainer.addEventListener('mouseout', () => linkDescription.classList.add('active'));
        contact = true;
    } else {
        // ukryj contact
        headerTitle.innerText = headerTitleText;
        items.forEach((item) => item.classList.remove('active'));

        setTimeout(() => contactContainer.style.display = 'none', 400);
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

    imgInContainer[0].style.opacity = 1;
    galleryDescription.innerText = imgInContainer[0].getAttribute("alt");

    imagesSlider();

    window.addEventListener("mousemove", (event) => imagesOnMousemove(event));

    window.addEventListener("resize", () => {
        clearTimeout(timer);
        imagesSlider();
    });

    // title + contact page

    headerTitle.addEventListener('mouseover', () => titleHover("Contact"));
    headerTitle.addEventListener('mouseout', () => titleHover(headerTitleText));
    headerTitle.addEventListener('click', contactDisplay);
    bg.addEventListener('click', contactDisplay);
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