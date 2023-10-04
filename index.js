// password contents
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let characters = [];

// DOM elements
const btn = document.querySelector('button');
const passwordDisplay1 = document.querySelector('#password-display-1');
const passwordDisplay2 = document.querySelector('#password-display-2');
const form = document.querySelector('form');
const errorMsg = document.querySelector('.error-msg');
//are these necessary?
let passwordDisplays = document.querySelectorAll('.display--container');
const copyBtns = document.querySelectorAll('.copy-btn');

// get all clickable password bits
const copyEls = document.querySelectorAll('.copy-el')

// password generating functions
function getRand(array) {
    return Math.floor(Math.random() * array.length);
}

function generate(arr,length) {
    
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push(arr[getRand(arr)])
    }
    return result.join('');
}

function getLength() {
    let length = document.querySelector('#length').value;

    if (!Number(length) || length < 8 || length > 15) {
        errorMsg.textContent = 'Length must be a number between 8 - 15';
        return 0;
    } else {
        errorMsg.textContent = '';
    }
    
    return length;
}

// click handler for password generate button
function handleSubmit(event) {
    event.preventDefault();
    
    const lettersCheck = document.querySelector('#letters');
    const numbersCheck = document.querySelector('#numbers');
    const symbolsCheck = document.querySelector('#symbols');
    
    if (lettersCheck.checked && numbersCheck.checked && symbolsCheck.checked) {
        characters = [...letters, ...numbers, ...symbols];
    } else if (lettersCheck.checked && numbersCheck.checked && !symbolsCheck.checked) {
        characters = [...letters, ...numbers];
    } else if (lettersCheck.checked && !numbersCheck.checked && symbolsCheck.checked) {
        characters = [...letters, ...symbols];
    } else if (lettersCheck.checked && !numbersCheck.checked && !symbolsCheck.checked) {
        characters = [...letters];
    } 

    let length = getLength();
    
    if (length) {
        let pass1 = generate(characters,length);
        let pass2 = generate(characters,length);
        passwordDisplay1.textContent = pass1;
        passwordDisplay2.textContent = pass2;
        passwordDisplays.forEach(display => display.classList.add('cursor-point'))
    } else {
        return;
    }
}

// click handler for copy buttons
function copy(event) {
    // if element is div get the text content
    // if element is span get the prev el sib text content

    let node = event.target.nodeName;
    let el;

    if (node === 'SPAN') {
        console.log('span clicked');
        el = event.target.previousElementSibling;
    } else if (node === 'DIV') {
        console.log('div clicked');
        el = event.target;
    } else {
        console.log('Node: ', node)
    }

    const text = el.textContent;
    console.log(text);
    if (text === '') {
        return;
    } else if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then( () => {
            confirmCopy(event.target);
            
        }, (error) => {
            console.log(error.message);
        })
    } else {
        console.log('Could not copy to clipboard')
    }
}

// passes the element that was clicked 
function confirmCopy(element) {
    // change the icon to a tick
    if (element.id === 'copy1') {
        element.textContent = 'done';
    } else if (element.id === 'copy2') {
        element.textContent = 'done';
    } 

    // change the icon back to clipboard after 1 second
    setTimeout(() => {
        if (element.id === 'copy1') {
            element.textContent = 'content_copy';
        } else if (element.id === 'copy2') {
            element.textContent = 'content_copy';
        } 
    },1000);

}

// add event listeners 

btn.addEventListener('click', handleSubmit);
copyEls.forEach(btn => btn.addEventListener('click',copy));