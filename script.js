//TableID: Number Chairs
var tables = {1: 4, 2: 4, 3: 4, 4: 2, 5: 4, 6: 4, 7: 4, 8: 2, 9: 2};
var selected_tables = [];
var selected_chairs = [];
var number_of_seats = 0;

function logPlanState(){
	console.log("Chairs: "+String(selected_chairs.length)+", Tables: "+String(selected_tables.length));
	if(selected_chairs.length > 0){
		console.log(selected_chairs);
	}
	if(selected_tables.length > 0){
		console.log(selected_tables);
	}
}

function incrementChairs(){
	number_of_seats +=1;
	document.getElementById("chairs").value = number_of_seats;
}

function decrementChairs(){
	number_of_seats -=1;
	document.getElementById("chairs").value = number_of_seats;
}



function selectObject(){
	var ObjectID = event.target.getAttribute("id");
	if(event.target.classList.contains('cell')){
		event.target.classList.add('cell_selected');
		event.target.classList.remove('cell');
		if(ObjectID.includes("C")){
			incrementChairs();
			selected_chairs.push(ObjectID);
		} else if(ObjectID.includes("T")) {
			selected_tables.push(ObjectID);
		}
	} else {
		event.target.classList.add('cell');
		event.target.classList.remove('cell_selected');
		if(ObjectID.includes("C")){
			if(selected_chairs.includes(ObjectID)){
				decrementChairs();
				selected_chairs.pop(ObjectID);
			}
		} else if(ObjectID.includes("T")) {
			if(selected_tables.includes(ObjectID)){
				selected_tables.pop(ObjectID);
			}
		}
	}
	logPlanState();
}

function generatePlan(){
    var plan = document.getElementById("plan");
	
	//Generate Tables Layout
	for(var table in tables) {
		var tableElement = document.createElement("div");
		var tableId = "T"+String(table).padStart(2, '0');
		tableElement.setAttribute("id", tableId);
		tableElement.setAttribute("class", "cell table");
		tableElement.setAttribute("onClick", "selectObject()");
		tableElement.innerHTML = String(table).padStart(2, '0');
		plan.appendChild(tableElement);
		
		for(var index = 1; index <= tables[table]; index++){
			var chairId = "C"+tableId.substring(1)+"_"+String(index).padStart(2, '0');
			var chairElement = document.createElement("div");
			chairElement.setAttribute("id", chairId);
			chairElement.setAttribute("class", "cell chair");
			chairElement.setAttribute("onClick", "selectObject()");
			chairElement.innerHTML = String(index).padStart(2, '0');
			plan.appendChild(chairElement);
		}
	}
	
	//Generate all cells
    plan.style.gridTemplateAreas = ""
    for (let x = 1; x <= 12; x++) {
        var row = '"';
        for (let y = 1; y <= 12; y++) {
            row = row+' Z'+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
            var newCell = document.createElement("div");
            newCell.style.background = "url(floor.png)"
            newCell.style.gridArea = "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
            newCell.classList.add('cell');
            newCell.setAttribute("id", "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0'));
            plan.appendChild(newCell);
        }
        var row = row+'"\n';
        plan.style.gridTemplateAreas = plan.style.gridTemplateAreas+row;
    }
}



function showFood(){
    var foodContainer = document.getElementById("food-container");
    foodContainer.classList.toggle('show');
    return false;
}

function choose(button){
    button.classList.toggle("buttonShow");
    return false;
}

var foodprice = 0; 

function calcFoodPrice(){
	
	var id = "quantity";
	foodprice = 0;
	for(var i = 1; i<4;i++){
		var numberOfFood = parseInt(document.getElementById(id+i).value, 10);
		if(isNaN(numberOfFood)){
			return false;
		}
		if (i<3) {
			foodprice += (6.69 * numberOfFood);
		}else{
			foodprice += (4.20 * numberOfFood);
		}
	}
	foodprice = Math.round(foodprice * 100)/100 + "€";
	document.getElementById("FoodPrice").value = foodprice;
	document.getElementById("FoodPrice2").value = foodprice;
}

function incrementFood(id){
	var numberOfFood = parseInt(document.getElementById(id).value, 10);
	if(isNaN(numberOfFood) || numberOfFood > 98){
		return false;
	}
	numberOfFood ++;
	document.getElementById(id).value = numberOfFood;
	calcFoodPrice();
	return false;
}

function decrementFood(id){
	var numberOfFood = parseInt(document.getElementById(id).value, 10);
	if(isNaN(numberOfFood) || numberOfFood == 0){
		return false;
	}
	numberOfFood --;
	document.getElementById(id).value = numberOfFood;
	calcFoodPrice();
	return false;
}