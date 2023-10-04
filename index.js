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
const passwordDisplays = document.querySelectorAll('.display--container');
const modeIcon = document.querySelector('#toggle-mode');

// colour theme default
let activeTheme = 'dark';

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
    // we need the number so take off the last character in the string and use that as the identifier (1 or 2)
    const num = element.id[element.id.length - 1];

    // change the icon to a tick
    if (num === '1') {
        document.querySelector('#copy1').textContent = 'done';
    } else if (num === '2') {
        document.querySelector('#copy2').textContent = 'done';
    } 

    // change the icon back to clipboard after 1 second
    //  not very DRY
    setTimeout(() => {
        if (num === '1') {
            document.querySelector('#copy1').textContent = 'content_copy';
        } else if (num === '2') {
            document.querySelector('#copy2').textContent = 'content_copy';
        } 
    },1000);

}

// add event listeners 

btn.addEventListener('click', handleSubmit);
copyEls.forEach(btn => btn.addEventListener('click',copy));

// colour theme switcher
function swapTheme() {
    // get the root element where css variables are defined
    const root = document.querySelector(':root');
    // get access to the styles
    const rootStyle = getComputedStyle(root);

    // ease the background colour transition only when switching themes
    document.querySelector('body').style = ('transition: background-color 0.5s');

    /* variables
    --bgColour: dark #1F2937, light #ECFDF5
    --textColour: dark #fff, light #2B283A
    --accentColour: dark #4ADF86, light #10B981
    --btnColour: #10B981; (SAME)
    --borderColour: dark #2F3E53, light #D5D4D8
    --passBgColour: #273549; (SAME)
    */

    // store reference to the properties
    // TODO: is this necessary???
    let bgColour = rootStyle.getPropertyValue('--bgColour');
    let textColour = rootStyle.getPropertyValue('--textColour');
    let accentColour = rootStyle.getPropertyValue('--accentColour');
    let borderColour = rootStyle.getPropertyValue('--borderColour');

    const switchDark = document.querySelector('#switch-dark');
    const switchLight = document.querySelector('#switch-light');


    // ternary to swap between two themes - if its dark make it light, if its not dark make it dark
    activeTheme === 'dark' ? activeTheme = 'light' : activeTheme = 'dark';

    if (activeTheme === 'dark') {
        // change switch icon textContent to 'dark_mode'
        modeIcon.textContent = 'dark_mode';
        root.style.setProperty('--bgColour', '#1F2937');
        root.style.setProperty('--textColour', '#fff');
        root.style.setProperty('--accentColour', '#4ADF86');
        root.style.setProperty('--borderColour', '#2F3E53');

    } else if (activeTheme === 'light') {
        // change switch icon textContent to 'light_mode'
        modeIcon.textContent = 'light_mode';
        root.style.setProperty('--bgColour', '#ECFDF5');
        root.style.setProperty('--textColour', '#2B283A');
        root.style.setProperty('--accentColour', '#10B981');
        root.style.setProperty('--borderColour', '#D5D4D8');
    } else {
        console.log('Error setting theme')
    }
    
}

// swap the icon from light to dark?
modeIcon.addEventListener('click', swapTheme);