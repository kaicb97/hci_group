var rooms = [];

//Roomname, height, width
var room = ["room1", 12, 12];
//tableYCoordinate, tableXCoordinate, chairs horizontal or vertical
var room_tables = [
	[1,2,'h'], [1,5,'h'], [1,8,'h'], [1,11,'h'],
	[4,1,'v'], 
	[7,1,'v'], [7,7,'v'], [7,8,'v'], [7,11,'v'], [7,12,'v'],
	[10,1,'v'], [10,7,'v'], [10,8,'v'], [10,11,'v'], [10,12,'v'],
				[12, 8,'h'], [12, 11,'h']
];
room.push(room_tables);
var room_doors = [
	[4,12], [12,3]
]
room.push(room_doors);
rooms.push(room);

//Roomname, height, width
var room = ["room2", 12, 16];
//tableYCoordinate, tableXCoordinate, chairs horizontal or vertical
var room_tables = [
	[7,1,'v'], [7,2,'v'], [7,5,'v'], [7,6,'v'], [7,11,'v'], [7,12,'v'], [7,15,'v'],[7,16,'v'],
	[10,1,'v'], [10,2,'v'], [10,5,'v'], [10,6,'v'], [10,11,'v'], [10,12,'v'], [10,15,'v'],[10,16,'v'],
	[12, 2,'h'], [12, 5,'h'], [12, 11,'h'], [12, 15,'h'], 
];
room.push(room_tables);
var room_doors = [
	[4,1], [1,2], [1,11], [12, 8]
]
room.push(room_doors);
rooms.push(room);

//Roomname, height, width
var room = ["room3", 7, 28];
var room_tables = [
						  [2,10,'h'], [2,14,'h'], 				[2,23,'h'],
	[3,1,'v'], [3,6,'v'], [3,10,'h'], [3,14,'h'], [3,17,'v'], 	[3,23,'h'],
	[6,1,'v'], [6,6,'v'], [6,10,'h'], [6,14,'h'], [6,17,'v'],	[6,23,'h'],
						  [7,10,'h'], [7,14,'h'], 				[7,23,'h']
];
room.push(room_tables);
var room_doors = [
	[1,3], [1, 20]
]
room.push(room_doors);
rooms.push(room);


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

function addTableList(){
	var input = document.getElementById("tableText");
	var val = input.value.padStart(2, "0");
	if(!selected_tables.includes(val) && parseInt(val) < 55 && parseInt(val) >= 0){
		selected_tables.push(val);
		addTisch(val);
		selectObject("T"+val);
	} else if (val == ""){
		alert("Please enter a table number.");
	} else if (selected_tables.includes(val)) {
		alert("Table already added!");
	} else {
		alert("Invalid table number!");
	}
}

function addTisch(value) {
	var list = document.getElementById("selected_tables");
	var tableEntry = document.createElement("div");
	tableEntry.setAttribute("id", "LIT"+String(value).padStart(2, "0"));

	var Img = document.createElement("img");
	Img.src = "ress/side-table.png";
	Img.style.height = "32px";
	Img.style.width = "32px";
	tableEntry.appendChild(Img);

	var Table = document.createElement("div");
	Table.style.width = "50%";
	Table.innerHTML = value;
	Table.classList.add("tableListElement");
	tableEntry.appendChild(Table);

	var Delete = document.createElement("img");
	Delete.src = "ress/close.png";
	Delete.style.width = "32px";
	Delete.style.height = "32px";
	Delete.style.cursor = "pointer";
	Delete.style.justifySelf = "flex-end"
	Delete.setAttribute("id", "DLIT"+value);
	Delete.setAttribute("onclick", "deleteEntry('LIT"+String(value).padStart(2, "0")+"')");
	tableEntry.appendChild(Delete);
	list.appendChild(tableEntry);

	number_of_seats += 2;
	var seats = document.getElementById("seats");
	seats.innerHTML = number_of_seats;
}

function deleteEntry(id){
	deleteTable(id);
	var tableNumber = id.substring(3);
	selectObject("T"+String(tableNumber).padStart(2, "0"));
}

function deleteTable(id){
	document.getElementById(id).remove();
	var tableNumber = id.substring(3);
	selected_tables.pop(tableNumber);

	number_of_seats -= 2;
	var seats = document.getElementById("seats");
	seats.innerHTML = number_of_seats;
}

function select(id){
	if(document.getElementById(id).classList.contains('cell')){
		addTisch(parseInt(id.substring(1)));
	} else {
		deleteTable("LIT"+id.substring(1));
	}
	selectObject(id);
}

function selectObject(id){
	var object = document.getElementById(id);
	if(object.classList.contains('cell') && id.includes("T")){
		object.classList.add('cell_selected');
		object.classList.remove('cell');
		if(!selected_table_ids.includes(id)){
			selected_table_ids.push(id);
		}
	} else if(id.includes("T")) {
		object.classList.add('cell');
		object.classList.remove('cell_selected');
		if(selected_table_ids.includes(id)){
			selected_table_ids.pop(id);
		}
	}
}

function generatePlan(){
	var tableIds = 1;
	rooms.forEach(room => {
    	var plan = document.getElementById(room[0]);
		//Generate all cells
		plan.style.gridTemplateAreas = ""
		for (let x = 1; x <= room[1]; x++) {
			var row = '"';
			for (let y = 1; y <= room[2]; y++) {
				row = row+' Z'+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
				var newCell = document.createElement("div");
				newCell.style.backgroundSize = "50px";
				newCell.style.gridArea = "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0');
				//newCell.classList.add('cell');
				newCell.setAttribute("id", "Z"+String(x).padStart(2, '0')+"_"+String(y).padStart(2, '0'));
				plan.appendChild(newCell);
			}
			var row = row+'"\n';
			plan.style.gridTemplateAreas = plan.style.gridTemplateAreas+row;
		}

    //Generate Table and Chair layout
		room[3].forEach(table => {
			var selector = document.createElement("div");
			var tableId = "T"+String(tableIds).padStart(2, '0');
			selector.setAttribute("id", tableId);
			selector.setAttribute("class", "cell");
			selector.setAttribute("onclick", "select('"+tableId+"')");
			selector.style.zIndex = 3;
			if(table[2] == "v"){
				selector.style.gridArea = String(table[0]-1)+" / "+String(table[1])+" / span 3 / span 1";
			} else {
				selector.style.gridArea = String(table[0])+" / "+String(table[1]-1)+" / span 1 / span 3";
			}
			plan.appendChild(selector);
			
			var tableElement = document.createElement("div");
			var tableId = "IT"+String(tableIds).padStart(2, '0');
			tableElement.setAttribute("id", tableId);
			tableElement.setAttribute("class", "plan_element table");
			tableElement.style.gridArea = "Z"+String(table[0]).padStart(2, '0')+"_"+String(table[1]).padStart(2, '0');
			tableElement.innerHTML = String(tableIds).padStart(2, '0');
			plan.appendChild(tableElement);
			tableIds++

			for(var index = 1; index <= 2; index++){
				var chairId = "C"+tableId.substring(1)+"_"+String(index).padStart(2, '0');
				var chairElement = document.createElement("div");
				chairElement.setAttribute("id", chairId);
				chairElement.setAttribute("class", "plan_element chair_square");
				if(table[2] == "v"){
					if(index == 1){
						chairElement.style.gridArea = "Z"+String(table[0]-1).padStart(2, '0')+"_"+String(table[1]).padStart(2, '0');
					} else if(index == 2){
						chairElement.style.gridArea = "Z"+String(table[0]+1).padStart(2, '0')+"_"+String(table[1]).padStart(2, '0');
						chairElement.style.transform = "rotate(180deg)";
					}
				} else if(table[2] == "h"){
					if(index == 1){
						chairElement.style.gridArea = "Z"+String(table[0]).padStart(2, '0')+"_"+String(table[1]-1).padStart(2, '0');
						chairElement.style.transform = "rotate(270deg)";
					} else if(index == 2){
						chairElement.style.gridArea = "Z"+String(table[0]).padStart(2, '0')+"_"+String(table[1]+1).padStart(2, '0');
						chairElement.style.transform = "rotate(90deg)";
					}
				}
				plan.appendChild(chairElement);
			}

			
		});

		room[4].forEach(door => {
			var doorElement = document.createElement("div");
			doorElement.setAttribute("class", "door");
			doorElement.style.gridArea = "Z"+String(door[0]).padStart(2, '0')+"_"+String(door[1]).padStart(2, '0');
			doorElement.style.zIndex = 1;
			if(door[1] == room[2]) {//west
				doorElement.classList.add("west");
			} else if(door[1] == 1){//east
				doorElement.classList.add("east");
			} else if(door[0] == room[1]){//south
				doorElement.classList.add("south");
			} else {//north
				doorElement.classList.add("north");
			}
			
			plan.appendChild(doorElement);
		});
	});
}