// skriva i terminal
// 1. npm init
// 2. efter enter på alla frågor 
// 3. vi get +packege.json ny fil 
// 4. git ignore måste göras
// 5. npm i json-server --save-dev // local server behöver vi// 5. npm i json-server -g --save-dev// global server
// 6. +Folder node_modules och package-lock.json
// 7. npm i - för de som ska använda project efter
// 8. npx json-server db.json // starta server
// 9. terminal skriver adress för serveren

let recipe = []; // array get value from db.json [ {}, {}, {}..]

// Class constructor card
window.addEventListener('DOMContentLoaded', async () => {
class MenuCard {
    constructor(title, meat, vegetarian, alergy, price, image, description, parentSelector, ...classes) {
        this.title = title;
        this.meat = meat;
        this.vegetarian = vegetarian;
        this.alergy = alergy;
        this.price = price;
        this.image = image;
        this.description = description;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "card";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        element.innerHTML = `
        <img src=${this.image} alt="">
        <h3 >${this.title}</h3>
        <p >${this.price} kr</p>
        <button class="detailsBtn" type="submit" onclick="openPopup(0)">Details</button>
    `;
        this.parent.append(element);
    }
}


    await axios.get('http://localhost:3000/recipes') // get data from db.json
        .then(data => {
            data.data.forEach(({ title, meat, vegetarian, alergy, price, image, description }) => {
                new MenuCard(title, meat, vegetarian, alergy, price, image, description, '.cardsContainer').render();// geting data and call cards
            });
            recipe = data.data; // set data to recepi 
        });

console.log(recipe); // It's the same array, like we have

const cardsContainer = document.querySelector(".cardsContainer");
let filterByMeat = false;
let filterByVegetarian = false;
let filterByLactos = false;
let filterByGluten = false;

// Create a new Array according to the current state of the user input
function getMenu() {
    return recipe.filter(item => {
        const isMeat = filterByMeat ? item.meat : true;
        const isVegetarian = filterByVegetarian ? item.vegetarian : true;
        const isLactos = filterByLactos ? !item.alergy.includes("laktos") : true;
        const isGluten = filterByGluten ? !item.alergy.includes("gluten") : true;
        return isMeat && isVegetarian && isLactos && isGluten;
    });
}

// Creates all the cards from Array recipe
function createCards() {
    getMenu().forEach((element, index) => {
        const nyMenu = new MenuCard(recipe);
    });
}

createCards();


//     I get misstake, cant send to the server .... something wrong :(

    // // Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // // Send data and set to JSON i used MAMP server.

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading',
        success: 'Thank you, we will make it!',
        failer: 'Something wrong'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    async function postData(url, data) {
      
        console.log(url, data);
        let res = await fetch('http://localhost:3000/recipes', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then(response => console.log('response', response)).catch(err=>console.log(err));

        return await res.json();
    }

    async function getResource(url) {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            await postData('http://localhost:3000/recipes', json)  // adress to json To set data
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

});