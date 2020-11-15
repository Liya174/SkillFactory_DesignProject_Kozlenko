function init() {
    const projectImages = [
        {
        id: 0,
        alt: 'Интерьер с панарамными окнами',
        src: './img/middle_1.jpg',
        name: 'Rostov-on-Don, Admiral',
        },
        {
        id: 1,
        alt: 'Интерьер столовой',
        src: './img/middle_2.jpg',
        name: 'Sochi Thieves',
        },
        {
        id: 2,
        alt: 'Интерьер гостинной',
        src: './img/middle_3.jpg',
        name: 'Rostov-on-Don, Patriotic'
        },
    ]

    const DESKTOP_MODE = 'desktop';
    const MOBILE_MODE = 'mobile';
    const projectBoxImage = document.querySelector('.project-box__image');
    const buttonsSlider = document.querySelectorAll('.button-slider'); // стрелочки-кнопки переключения слайдера
    const projectDotButtons = document.querySelector('.project-dot-buttons'); //клуглые кнопки переключения слайдера
    const projectList = document.querySelector('.project-list'); // ссылки с названиями
    const projectImagesMobile = document.querySelector('.project-images_mobile'); //для мобильной версии
    const projectButtonsMobile = document.querySelectorAll('.pbim__button');

    //на основе массива объектов создаём блок с картинками, первая - активная, остальные - скрыты
    function createImages(images) {
        projectBoxImage.innerHTML = '';
        images.forEach( ({ id, alt, src }) => {
            const imageString = `
                <img class="project-image ${+id===0 ? 'active' : ''}" 
                    data-index="${id}"
                    src="${src}" 
                    alt="${alt}">
                </img>
            `;
            projectBoxImage.innerHTML += imageString;
        });
    };

    //создаём блок с картинками для мобильной версии
    function createMobileImages(images) {
        projectImagesMobile.innerHTML = '';
        images.forEach( ({ id, alt, src }) => {
            const imageString = `
                <img class="project-image_mobile ${+id===0 ? 'active' : ''}" 
                    data-index="${id}"
                    src="${src}" 
                    alt="${alt}"
                    width="100%">
            `;
            projectImagesMobile.innerHTML += imageString;
        });
    };

    //на основе массива объектов создаём круглые кнопки-ссылки 
    function createDots(images) {
        projectDotButtons.innerHTML = '';
        images.forEach( ({ id }) => {
            const dotButton = `
            <button class="button-nondesign p-d__dot ${+id===0 ? 'active' : ''}" 
                data-index="${id}">
            </button>
            `;
            projectDotButtons.innerHTML += dotButton;
        })
        const buttonDots = projectDotButtons.querySelectorAll('.p-d__dot');
        buttonDots.forEach(buttonDot => {
            buttonDot.addEventListener('click', event => {
                const choisedImageIndex = +event.target.dataset.index;
                toggleActiveElements(choisedImageIndex);
            });
        });
    };
    
    //на основе массива объектов создаём блок с ссылками и названиями
    function createNames(images) {
        projectList.innerHTML = '';
        images.forEach( ({ id, name }) => {
            const nameButton = `
            <li class="p-l__list">
                <button 
                    class="button-nondesign title p-l__item ${+id===0 ? 'active' : ''}"
                    data-index="${id}">
                    ${name}
                </button>
            </li>
            `;
            projectList.innerHTML += nameButton;
        });

        const imageNames = projectList.querySelectorAll('.p-l__item');
        imageNames.forEach(imageName => {
            imageName.addEventListener('click', event => {
                const choisedImageIndex = +event.target.dataset.index;
                toggleActiveElements(choisedImageIndex);
            })
        });
    };

    //меняем картинки при нажатии на кнопку
    function chooseNextImage(event, type) {
        let images = [];
        if (type === DESKTOP_MODE) {
            images = document.querySelectorAll('.project-image');
        } else {
            images = document.querySelectorAll('.project-image_mobile');
        }
        
        let currentImageIndex;
        let newImageIndex = NaN;
        images.forEach(image => {
            if (image.classList.contains('active')) {
                currentImageIndex = +image.dataset.index;
            }
        });

        if (event.target.classList.contains('button-right')) {
            newImageIndex = currentImageIndex === (images.length - 1) ? 0 : currentImageIndex + 1;
            toggleActiveElements(newImageIndex, type);
            return;
        } else {
            newImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
            toggleActiveElements(newImageIndex, type);
            return;
        };
    }

    //смена активных и неактивных классов у элементов
    function toggleActiveElements(newIndex, type) {
        if (type === MOBILE_MODE) {
            const images = document.querySelectorAll('.project-image_mobile');
            images.forEach(image => {
                if (+image.dataset.index === newIndex) image.classList.add('active');
                else image.classList.remove('active');
            });
        } else {
            const images = document.querySelectorAll('.project-image');
            const buttonDots = projectDotButtons.querySelectorAll('.p-d__dot');
            const imageNames = projectList.querySelectorAll('.p-l__item');
            images.forEach(image => {
                if (+image.dataset.index === newIndex) image.classList.add('active');
                else image.classList.remove('active');
            });
            buttonDots.forEach(buttonDot => {
                if (+buttonDot.dataset.index === newIndex) buttonDot.classList.add('active');
                else buttonDot.classList.remove('active');
            });
            imageNames.forEach(imageName => {
                if (+imageName.dataset.index === newIndex) imageName.classList.add('active');
                else imageName.classList.remove('active');
            });
        }
    }


    //обработчики событий
    buttonsSlider.forEach(button => {
        button.addEventListener('click', event => {
            chooseNextImage(event, DESKTOP_MODE);
        })
    });

    projectButtonsMobile.forEach(button => {
        button.addEventListener('click', event => {
            chooseNextImage(event, MOBILE_MODE);
        })
    });


    //запуск функций
    createImages(projectImages);
    createMobileImages(projectImages);
    createDots(projectImages);
    createNames(projectImages);
}

document.addEventListener('DOMContentLoaded', init)
