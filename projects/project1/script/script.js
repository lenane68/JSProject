const page = document.querySelector("#page");
let type, params;

restorePage();

const elementSelect = {
    title: [
        'headerType',
        'color',
        'content',
        'justText',
        'bgColor',
    ],
    p: [
        'fontSize',
        'color',
        'content',
        'justText',
        'bgColor',
    ],
    input: [
        'inputType',
        'fontSize',
        'color',
        'content',
        'bgColor',
    ],
    button: [
        'fontSize',
        'color',
        'content',
        'bgColor',
    ],
    div: [
        'height',
        'width',
        'bgColor',
        'content',
        'justText',
        'color',
    ]

};

function bgChange(elem) {
    page.style.backgroundColor = elem.value;
    savePage();
}

function paddingChange(elem) {
    page.style.padding = elem.value + 'px';
    savePage();
}

function pageToShow(id, elem) {
    document.querySelector('nav a.active').classList.remove('active');
    elem.classList.add('active');

    document.querySelector('#panelSide>div.show').classList.remove('show');
    document.getElementById(id).classList.add('show');
}

function typeSelect(selectElem) {
    type = selectElem.value;
    params = elementSelect[type];

    // הסתרת כל האלמנטים המוצגים
    const divs = document.querySelectorAll('#params>div');

    for (const div of divs) {
        div.classList.remove('show');
    }

    // הצגת האלמטים הנצרכים
    for (const param of params) {
        document.getElementById(param).classList.add('show');
    }
}

function add() {
    // שם התגית כברירת מחדל זה הסוג
    let tagName = type;

    // אם הסוג הוא כותרת, שם התגית לפי מה שהמשתמש בחר
    if (type === 'title') {
        tagName = document.querySelector('#headerType select').value;
    }

    // יצירת אלמנט חדש
    const elem = document.createElement(tagName);

    const inputType = document.querySelector('#inputType select').value;
    const fontSize = document.querySelector('#fontSize input').value;
    const color = document.querySelector('#color input').value;
    const bgColor = document.querySelector('#bgColor input').value;
    const content = document.querySelector('#content input').value;
    const justText = document.querySelector('#justText select').value;
    const height = document.querySelector('#height input').value;
    const width = document.querySelector('#width input').value;

    for (const param of params) {
        if (param === 'inputType') {
            elem.type = inputType;
        } else if (param === 'fontSize') {
            elem.style.fontSize = fontSize + 'px';
        } else if (param === 'color') {
            elem.style.color = color;
        } else if (param === 'bgColor') {
            elem.style.backgroundColor = bgColor;
        } else if (param === 'justText') {
            elem.style.textAlign = justText;
        } else if (param === 'height') {
            elem.style.height = height + 'px';
        } else if (param === 'width') {
            elem.style.width = width + 'px';
        } else if (param === 'content') {
            if (type === 'input') {
                elem.value = content;
            } else {
                elem.innerHTML = content;
            }
        }
    }


    page.appendChild(elem);
    savePage();
}

function savePage() {
    localStorage.style = page.attributes.style?.value;
    localStorage.page = page.innerHTML;
}

function restorePage() {
    page.innerHTML = localStorage.page || '';
    page.setAttribute('style', localStorage.style || '');
}

page.addEventListener('input', savePage);