
var myData = [];

var currentDealId = myData.length;



function CreateTableFromJSON() {    
    
    getTableFromLocalStorage();
    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myData.length; i++) {
        for (var key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myData[i][col[j]];
        }

        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="FinanceRow(' + myData[i].dealId + ')">Update Finance</button>'

        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="DeleteRow(' + myData[i].dealId + ')">Delete Row</button>'

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    pushTableToStorage();
}

function AddNewDeal() {
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var projectCost = document.getElementById("projectCostInput").value;


    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";
    document.getElementById("projectCostInput").value = "";


    InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);
    
    

}

function FinanceRow(dealId){

    localStorage.setItem("finance", dealId);

    window.location="finance.html"


}

function InsertRow(dealId, clientName, projectName, projectManager, projectCost) {
    myData.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_estimate" : projectCost, "finance_actual": 100, "budget": "UNDER"})
    currentDealId++;
    
    pushTableToStorage();
    CreateTableFromJSON();

}

function DeleteRow(dealId) {
     
    for( var i = 0; i < myData.length; i++){ 
    
        if ( myData[i].dealId === dealId) { 
    
            myData.splice(i, 1); 
        }

        localStorage.removeItem("deal" + dealId);
    
    }
    CreateTableFromJSON();
}


function getTableFromLocalStorage(){

    myData = [];

    for(i = 0; i < 10; i++) {
        var dealString = localStorage.getItem("deal" + i);
        console.log(dealString);
        if (dealString !== null){
            var deal = JSON.parse(dealString);
            myData.push(deal);
        }
        budgetEval();
    }

    currentDealId = myData.length;

}

// Save to localStorage
function pushTableToStorage() {
   
    budgetEval();
    myData.forEach(element => {

        if (localStorage.getItem("deal" + element.dealId) == null) {

            var dealString = JSON.stringify(element);
            localStorage.setItem("deal" + element.dealId, dealString);
        }
        

        
        
    });


    
}

function budgetEval(){
    myData.forEach(element => {

        if (element.project_estimate < element.finance_actual ) {
            element.budget = "OVER";
        }
    });
}

function EditEstimate(){

}

