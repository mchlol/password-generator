const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
let characters = [];

const btn = document.querySelector('button');
const passwordDisplay1 = document.querySelector('#password-display-1');
const passwordDisplay2 = document.querySelector('#password-display-2');
const form = document.querySelector('form');
const errorMsg = document.querySelector('.error-msg');
let passwordDisplays = document.querySelectorAll('.password');
const tooltips = document.querySelectorAll('.tooltiptext');

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

btn.addEventListener('click', handleSubmit);

function getLength() {
    let length = document.querySelector('#length-input').value;

    if (!Number(length) || length < 8 || length > 15) {
        errorMsg.textContent = 'Length must be a number between 8 - 15';
        return 0;
    } else {
        errorMsg.textContent = '';
    }
    
    return length;
}

function copy(event) {
    const text = event.target.textContent;
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

passwordDisplays.forEach(display => display.addEventListener('click',copy));

function confirmCopy(element) {

    if (element.id === 'password-display-1') {
        document.querySelector('#copy1').textContent = 'done';
    } else if (element.id === 'password-display-2') {
        document.querySelector('#copy2').textContent = 'done';
    } 

}