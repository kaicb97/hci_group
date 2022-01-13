function generatePlan(){
    var plan = document.getElementById("plan");
    plan.style.gridTemplateAreas = ""
    for (let x = 1; x <= 12; x++) {
        var row = '"';
        for (let y = 1; y <= 12; y++) {
            row = row+' Z'+String(x).padStart(2, '0')+String(y).padStart(2, '0');
            var newCell = document.createElement("div");
            newCell.style.background = "url(floor.png)"
            newCell.style.gridArea = "Z"+String(x).padStart(2, '0')+String(y).padStart(2, '0');
            newCell.classList.add('cell');
            newCell.setAttribute("id", "Z"+String(x).padStart(2, '0')+String(y).padStart(2, '0'));
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