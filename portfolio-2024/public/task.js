/**
 * Weekoverzicht met taken die moeten worden uitgevoerd, waarbij het mogelijk is om nieuwe taken 
 * toe te voegen en bestaande taken te verwijderen.
 */



/**
 * Functionaliteiten
 * taken toevoegen & verwijderen
 * ? icon, gebruiker verder op weg helpen
 * localstorage, data tijdelijk opslaan
 * drag and drop, muis
 */

// Stel een variabele in om een unieke ID-teller bij te houden
let activitiesIdCounter = 0;
const activities = document.querySelectorAll('.item');
const days = document.querySelectorAll('.day');

document.querySelector('input[id="sendEvent"]').addEventListener('click', addNewTask);

function addNewTask(event) { 
    event.preventDefault();
    const nameActivities = document.querySelector('input[name="newEvent"]');
    const newActivities = document.createElement('li');
    const uniqueId = `item-${Date.now()}`;
    const deleteButton = document.createElement("button");

    if(!nameActivities) return; //Controleer of de invoer niet leeg is

    newActivities.classList.add('item');
    newActivities.textContent = nameActivities.value;

    deleteButton.innerHTML = "Delete";
    newActivities.appendChild(deleteButton);

    // Voeg de nieuwe taak toe aan de ul-lijst in de .day container
    let allTaskList = document.querySelector('#containerTask ul');
    if (!allTaskList) {
        allTaskList = document.createElement('ul');
        allTaskList.id = 'activitiesList';
        document.querySelector('#containerTask').appendChild(allTaskList);
    }
    allTaskList.appendChild(newActivities);

    // Voeg draggable attributen en event listeners toe aan de nieuwe taak
    newActivities.setAttribute('draggable', 'true');
    newActivities.setAttribute('id', uniqueId);
    newActivities.addEventListener('dragstart', dragStart);
    newActivities.addEventListener('dragend', dragEnd);

    //containerList.insertAdjacentElement('beforeend', newActivities); //Dit plaatst de nieuwe taak aan het einde van de lijst van activiteiten.
    activitiesIdCounter++; // Verhoog de teller voor de volgende taak

       // Voeg event listener toe aan de delete-knop
       // Ul wordt verwijderd als er een kind-elementen zijn 'li'
       deleteButton.addEventListener('click', function() {
        const parentList = newActivities.parentElement;
        newActivities.remove();
                if (parentList.childElementCount === 0) {
                    parentList.remove();
                }
    });
}

// Add draggable attribute, unique id, and event listeners to each itemTask element
activities.forEach((itemTask, index) => {
  // Set a unique id for each itemTask element
  itemTask.setAttribute('id', `item-${index}`);
  itemTask.setAttribute('draggable', 'true');

  itemTask.addEventListener('dragstart', dragStart);
  itemTask.addEventListener('dragend', dragEnd);

  // Voeg een delete-knop event listener toe aan bestaande taken
  const deleteButton = itemTask.querySelector('button');
  if (deleteButton) {
      deleteButton.addEventListener('click', function() {
        itemTask.remove();
          const parentList = itemTask.parentElement;
          itemTask.remove();
          if (parentList.childElementCount === 0) {
              parentList.remove();
          }
      });
  }
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => {
    e.target.classList.add('hidden');
  }, 0);
  this.classList.add('hold');
}

function dragEnd() {
  this.classList.remove('hold', 'hidden');
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('hovered');
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove('hovered');
}

function dragDrop(e) {
  this.classList.remove('hovered');
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);
  const oldParent = draggable.parentElement;
 // this.appendChild(draggable);
   // Zoek of er een ul in de dropcontainer is, anders maak er een
   let taskList = this.querySelector('ul');
   if (!taskList) {
       taskList = document.createElement('ul');
       this.appendChild(taskList);
   }
   taskList.appendChild(draggable);
 // Verwijder de oude ul als deze leeg is, oldParent is de gesleepte draggable-element
 // Controleren of oldParend een ul element is en geen kind-elementen heeft, als dat het geval is, verwijderen we het oldParent-element
 if (oldParent.tagName === 'UL' && oldParent.childElementCount === 0) {
    oldParent.remove();
}
}

// Add event listeners to each empty element
days.forEach(empty => {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
});