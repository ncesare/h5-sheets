const traits = [{name: 'strength', value: 2},
                {name: 'dexterity', value: 4},
                {name: 'stamina', value: 3},
                {name: 'charisma', value: 2},
                {name: 'manipulation', value: 5},
                {name: 'composure', value: 1},
                {name: 'intelligence', value: 3},
                {name: 'wits', value: 2},
                {name: 'resolve', value: 1}]

const skills = [{name: 'athletics', value: 0},
                {name: 'brawl', value: 0},
                {name: 'craft', value: 0},
                {name: 'driving', value: 0},
                {name: 'firearms', value: 0},
                {name: 'larceny', value: 0},
                {name: 'melee', value: 0},
                {name: 'stealth', value: 0},
                {name: 'survival', value: 0},
                {name: 'animal ken', value: 0},
                {name: 'etiquette', value: 0},
                {name: 'insight', value: 0},
                {name: 'intimidation', value: 0},
                {name: 'leadership', value: 0},
                {name: 'performance', value: 0},
                {name: 'persuasion', value: 0},
                {name: 'streetwise', value: 0},
                {name: 'subterfuge', value: 0},
                {name: 'academics', value: 0},
                {name: 'awareness', value: 0},
                {name: 'finance', value: 0},
                {name: 'investigation', value: 0},
                {name: 'medicine', value: 0},
                {name: 'occult', value: 0},
                {name: 'politics', value: 0},
                {name: 'science', value: 0},
                {name: 'technology', value: 0}]

const trackers = [{type: 'health', value: traits[2].value + 3, status: 'full'},
                  {type: 'willpower', value: traits[5].value + traits[8].value, status: 'full'}] // Figure out if these can be useful

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

const healthContainer = document.createElement('div');
healthContainer.classList.add('tracker-container');
trackerContainer.append(healthContainer);
healthContainer.append('Health');
const healthTrackerContainer = document.createElement('div');
healthContainer.append(healthTrackerContainer);
for (let i = 0; i < 10; i++) {
    const healthTracker = document.createElement('input');
    healthTracker.classList.add('stat-tracker');
    healthTracker.setAttribute('type', 'checkbox');
    healthTrackerContainer.append(healthTracker);
}

const willpowerContainer = document.createElement('div');
willpowerContainer.classList.add('tracker-container');
trackerContainer.append(willpowerContainer);
willpowerContainer.append('Willpower');
const willpowerTrackerContainer = document.createElement('div');
willpowerContainer.append(willpowerTrackerContainer);
for (let i = 0; i < 10; i++) {
    const willpowerTracker = document.createElement('input');
    willpowerTracker.classList.add('stat-tracker');
    willpowerTracker.setAttribute('type', 'checkbox');
    willpowerTrackerContainer.append(willpowerTracker);
}

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
    traitName.textContent = sourceList[j].name[0].toUpperCase() + sourceList[j].name.slice(1);
    row.append(traitName);

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
        radio.setAttribute('name', sourceList[j].name);
        radioBox.append(radio);

        if (radio.value <= sourceList[j].value) {
            radio.checked = true;
        }
    }
}