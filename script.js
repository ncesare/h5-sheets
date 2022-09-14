let traits = [{name: 'strength', value: 2},
                {name: 'dexterity', value: 4},
                {name: 'stamina', value: 3},
                {name: 'charisma', value: 2},
                {name: 'manipulation', value: 1},
                {name: 'composure', value: 2},
                {name: 'intelligence', value: 3},
                {name: 'wits', value: 2},
                {name: 'resolve', value: 3}]

let skills = [{name: 'athletics', value: 2},
                {name: 'brawl', value: 3},
                {name: 'craft', value: 1},
                {name: 'driving', value: 1},
                {name: 'firearms', value: 1},
                {name: 'larceny', value: 2},
                {name: 'melee', value: 0},
                {name: 'stealth', value: 2},
                {name: 'survival', value: 0},
                {name: 'animal-ken', value: 0},
                {name: 'etiquette', value: 2},
                {name: 'insight', value: 3},
                {name: 'intimidation', value: 3},
                {name: 'leadership', value: 0},
                {name: 'performance', value: 0},
                {name: 'persuasion', value: 2},
                {name: 'streetwise', value: 0},
                {name: 'subterfuge', value: 0},
                {name: 'academics', value: 0},
                {name: 'awareness', value: 3},
                {name: 'finance', value: 0},
                {name: 'investigation', value: 2},
                {name: 'medicine', value: 0},
                {name: 'occult', value: 0},
                {name: 'politics', value: 0},
                {name: 'science', value: 1},
                {name: 'technology', value: 0}]

let trackers = [{type: 'health', value: traits[2].value + 3, status: 'full'},
                  {type: 'willpower', value: traits[5].value + traits[8].value, status: 'full'}] // Figure out if these can be useful

let dicePool = [];

const dicePoolDisplay = document.querySelector('#dice-pool');
const rollButton = document.querySelector('#roll-button');
rollButton.addEventListener('click', roll);

// Generate character traits

const traitsContainer = document.querySelector('#traits-container')

for (let i = 0; i < 3; i++) {
    const traitsColumn = makeColumn(traitsContainer);
    for (let j = i * 3; j < i * 3 + 3; j++) {
        const traitRow = makeRow(j, traitsColumn, traits);
        makeRadioButtons(j, traitRow, traits);
    }
}

// Generate Health, Willpower, and Despair trackers

const trackerContainer = document.querySelector('#tracker-container');

makeTracker(trackers[0], trackerContainer);
makeTracker(trackers[1], trackerContainer);

const despairContainer = document.createElement('div');
    despairContainer.classList.add('tracker-container');
    trackerContainer.append(despairContainer);
    despairContainer.append('Despair');
const despairTracker = document.createElement('input');
    despairTracker.classList.add('stat-tracker')
    despairTracker.setAttribute('type', 'checkbox');
    despairContainer.append(despairTracker);

// Generate character skills

const skillsContainer = document.querySelector('#skills-container');

for (let i = 0; i < 3; i++) {
    const skillsColumn = makeColumn(skillsContainer);
    for (let j = i * 9; j < i * 9 + 9; j++) {
        const skillRow = makeRow(j, skillsColumn, skills);
        makeRadioButtons(j, skillRow, skills);
    }
}

function makeColumn(parent) {
    const column = document.createElement('div');
    column.classList.add('traits-column');
    parent.append(column);
    return column;
}

function makeRow(j, parentColumn, sourceList) {
    const row = document.createElement('div');
    row.classList.add('trait-row');
    parentColumn.append(row);

    const traitName = document.createElement('div');
    traitName.classList.add('names');
    traitName.textContent = sourceList[j].name.replace('-', ' ');
    row.append(traitName);
    traitName.addEventListener('click', (e) => appendDicePool(e, j, sourceList));

    return row;
}

function makeRadioButtons(j, row, sourceList) {
    const radioBox = document.createElement('div');
    radioBox.classList.add('radio-box');
    radioBox.setAttribute('id', sourceList[j].name);
    row.append(radioBox);

    for (let i = 1; i < 6; i++) {
        const radio = document.createElement('input');
        radio.classList.add('stat-tracker')
        radio.setAttribute('type', 'checkbox');
        radio.setAttribute('value', i);
        radio.setAttribute('id', `${sourceList[j].name}-${i}`);
        radio.setAttribute('name', sourceList[j].name);
        radioBox.append(radio);

        if (radio.value <= sourceList[j].value) {
            radio.checked = true;
        }

        radio.addEventListener('change', (e) => changeStats(e, j, sourceList));
    }
}

function changeStats(e, j, sourceList) {

    if (e.target.checked === true) {
        sourceList[j].value = Number(e.target.value);
    } else {
        sourceList[j].value = Number(e.target.value - 1);
    }

    for (let i = 1; i < 6; i++) {
        const radio = document.querySelector(`#${sourceList[j].name}-${i}`);
        if (radio.value < sourceList[j].value) {
            radio.checked = true;
        }

        if (radio.value > sourceList[j].value) {
            radio.checked = false;
        }
    }
}

function makeTracker(sourceValue, trackerContainer) {
    const container = document.createElement('div');
    container.classList.add('tracker-container');
    trackerContainer.append(container);
    container.append(sourceValue.type);

    const buttonContainer = document.createElement('div');
    container.append(buttonContainer);

    for (let i = 1; i < 11; i++) {
        const tracker = document.createElement('button');
        tracker.setAttribute('type', 'button');
        tracker.classList.add('stat-tracker');
        tracker.setAttribute('value', i);
        buttonContainer.append(tracker);
        tracker.addEventListener('click', (e) => changeTracker(e))
        tracker.addEventListener('contextmenu', (e) => changeTrackerReverse(e))

        if (tracker.value <= sourceValue.value) {
            tracker.style.backgroundColor = 'green';
        }
    }
}

function changeTracker(e) {
    if (e.target.style.backgroundColor === 'green') {
        e.target.style.backgroundColor = 'yellow';
    }
    else if (e.target.style.backgroundColor === 'yellow') {
        e.target.style.backgroundColor = 'red';
    } 
    else if (e.target.style.backgroundColor === 'red') {
        e.target.style.backgroundColor = null;
    } else {
        e.target.style.backgroundColor = 'green';
    }
}

function changeTrackerReverse(e) {
    e.preventDefault();
    if (e.target.style.backgroundColor === 'green') {
        e.target.style.backgroundColor = null;
    }
    else if (e.target.style.backgroundColor === 'yellow') {
        e.target.style.backgroundColor = 'green';
    } 
    else if (e.target.style.backgroundColor === 'red') {
        e.target.style.backgroundColor = 'yellow';
    } else {
        e.target.style.backgroundColor = 'red';
    }
    return false;
}

function appendDicePool(e, j, sourceList) {
    if (dicePoolDisplay.textContent.includes('success')) {
        dicePoolDisplay.textContent = ''
    }

    if (dicePool.length === 2) {
        dicePool = [];
        dicePool.push(sourceList[j].value)
        dicePoolDisplay.textContent = `${sourceList[j].name.replace('-', ' ')} (${sourceList[j].value}) + `;
    }
    else if (dicePool.length === 0) {
        dicePool.push(sourceList[j].value);
        dicePoolDisplay.textContent += `${sourceList[j].name.replace('-', ' ')} (${sourceList[j].value}) + `;
    } else {
        dicePool.push(sourceList[j].value);
        dicePoolDisplay.textContent += `${sourceList[j].name.replace('-', ' ')} (${sourceList[j].value}): `;
    }

    if (dicePool.length === 2) {
        dicePoolDisplay.textContent += `Dice Pool: ${sum(dicePool)}`;
    }
}

function sum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum  += array[i];
    }
    return sum;
}

function roll() {
    let rollResult = [];

    dicePoolDisplay.textContent = '';

    if (sum(dicePool) === 0) {
        dicePoolDisplay.textContent = '0 successes';
        return;
    }

    for (let i = 0;  i < sum(dicePool); i++) {
        const diceResult = Math.floor(Math.random() * 10) + 1;
        rollResult.push(diceResult);
        dicePoolDisplay.textContent += `${diceResult} `;
    }

    let successes = countSuccesses(rollResult);

    dicePoolDisplay.textContent += `(${successes} successes)`;
}

function countSuccesses(rollResult) {
    let successes = 0;
    let tens = 0;

    rollResult.forEach(dice => {
        console.log('Dice:' + dice);
        if (5 < dice && dice < 10) {
            successes++;
            console.log(successes);
        }
        else if (dice === 10) {
            tens++;
            console.log(tens);
        }
    })

    if (tens > 0 && tens % 2 === 0) {
        successes += tens * 2;
    } else if (tens > 0 && tens % 2 !== 0) {
        tens--;
        successes++;
        successes += tens * 2;
    }

    return successes;
}

// Add desperation dice and other roll modifiers.