"use strict";

console.log("coffee app loaded");

// Format single coffee item.
function renderCoffee(coffee) {
    var html = '<div class="coffee-container">';
    html += '<p id="table-id">' + coffee.id + '</p>';
    html += '<h2 id="table-coffee-name">' + coffee.name + '</h2>';
    html += '<p id="table-coffee-roast" >' + coffee.roast + '</p>';
    html += '</div>';

    return html;
}

// Format all the coffee items. (uses renderCoffee())
function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// updates the coffee list. (uses renderCofees())
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// Array of coffees from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];



// Declare Variables
var coffeeListDiv = document.getElementById("coffeeListDiv");
var submitButton = document.querySelector('#submit');
// var roastSelection = document.querySelector('#roast-selection');
var roastSelection = document.getElementById("roast-selection");
var roastNameField = document.getElementById("roast-name");
var addDropdown = document.getElementById("add-selection");
var addName = document.getElementById("add-name");
var addSubmit = document.getElementById("add-submit");

// Render coffees to html page.
coffeeListDiv.innerHTML = renderCoffees(coffees); 



// ===== Searching Roasts =====
//  returns selected roasts
function selectRoast(ro) {
    let tempArr = []
    coffees.forEach(function(e, i) {
        if (e.roast === ro) {
            tempArr.push(coffees[i]);
        }
    })
    return tempArr;
}

//   sorts the roasts
function changeByRoast(ro) {
    var temp = selectRoast(ro);
    coffeeListDiv.innerHTML = renderCoffees(temp)
}

//   Event listener for roasts drop down
roastSelection.addEventListener('change', function() {
    var temp = document.getElementById("roast-selection").value;
    changeByRoast(temp);
});


// ===== Searching By Name =====
// Searches for name by every letter entered
function selectName(na) {
    let tempArr = []
    var temp = na;
    na = na.charAt(0).toUpperCase();
    temp = temp.substr(1);
    na = na + temp
    // console.log(na) // Prints each letter to console
    coffees.forEach(function(e) {
        if (e.name.includes(na)) {
            tempArr.push(e);
        }
    });
    return tempArr;
}

// Takes input from search field and renders to page
function changeByName(na) {
    var temp = selectName(na);
    coffeeListDiv.innerHTML = renderCoffees(temp)
}

// Eventlistener on keyup to search for what's in the search field
roastNameField.addEventListener("keyup", function() {
    var temp = roastNameField.value;
    changeByName(temp);
});


// ===== Add a coffee =====
// Adds coffee to the list
function addCoffee (dd, na) {
    coffees.push({id: (coffees.length + 1), name: addName.value, roast: addDropdown.value});
    coffeeListDiv.innerHTML = renderCoffees(coffees);
}

// Eventlistener for submit button that adds coffee to the list
addSubmit.addEventListener("click", function(e){
    e.preventDefault();
});
