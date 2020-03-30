const { remote } = require('electron');

const PROB_LIST = ['25', '33', '50', '66', '75'];

const buttonGroup = document.querySelectorAll('.btn');
const cursor = document.querySelector('.cursor');
const barLeft = document.querySelector('.bar-left'); // portion represents the probability of user choice
const barRight = document.querySelector('.bar-right');
let messageElem = document.querySelector('.message');

/* */

buttonGroup.forEach(button => {
    button.addEventListener('click', handler);
    button.addEventListener('contextmenu', displayMenu);
});
cursor.addEventListener('transitionend', () => messageElem.classList.remove('hidden'));


/**
 * when button clicked
 * 1. update axis
 * 2. hide message
 * 3. cursor move
 * 4. show message
 */
function handler(e) {
    let prob =event.target.value;
    // 1
    barLeft.style.width = prob + '%';
    barRight.style.width = (100 - prob) + '%';

    // 2
    messageElem.classList.add('hidden');

    // 3
    let randomNumber = roll();
    cursor.style.left = randomNumber + '%';

    // 4
    messageElem.textContent = (randomNumber < prob) ? 'YES' : 'NO';
}

function roll() {
    let number = crypto.getRandomValues(new Uint8Array(1))[0]; // 0 - 255
    return number * 100 / 256;
}

function displayMenu(event) {
    const template = [];
    PROB_LIST.forEach(value => makeMenu(value, template, event));

    let menuList = remote.Menu.buildFromTemplate(template);
    menuList.popup({ window: remote.getCurrentWindow()});
}

function makeMenu(value, template, event) {
    let menuItem = {};

    menuItem.label = value + '%';
    menuItem.type = 'radio';
    menuItem.checked = value === event.target.value ? true : false;
    menuItem.click = function() {
       event.target.value = value;
       event.target.textContent = value + '%';
    };

    template.push(menuItem);
    
}