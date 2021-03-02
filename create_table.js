
var myData = [
    {"dealId" : 0, "client_name" : "Microsoft", "project_name" : "Apollo Project", "project_manager" : "Mary", "project_estimate" : 1000, "finance_actual": 100, "budget": "UNDER"},
    {"dealId" : 1, "client_name" : "Intel", "project_name" : "Hermes Project", "project_manager" : "Bob", "project_estimate" : 10000, "finance_actual": 100, "budget": "UNDER"},
    {"dealId" : 2, "client_name" : "Apple", "project_name" : "Zeus Project", "project_manager" : "Jane", "project_estimate" : 100000, "finance_actual": 100, "budget": "UNDER"}
]


var currentDealId = myData.length;



function CreateTableFromJSON() {    
    

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

    saveTableToStorage();
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


    CreateTableFromJSON();

}

function DeleteRow(dealId) {
     
    for( var i = 0; i < myData.length; i++){ 
    
        if ( myData[i].dealId === dealId) { 
    
            myData.splice(i, 1); 
        }

        localStorage.removeItem(dealId);
    
    }
    CreateTableFromJSON();
}

// Save to localStorage
function saveTableToStorage() {
    var dealString
    myData.forEach(element => {

        if (localStorage.getItem(element.dealId) !== null) {
            console.log(`Email address exists`);
        } else {
            dealString = JSON.stringify(element);
            localStorage.setItem(element.dealId.toString(), dealString);
        }

        budgetEval();
        
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

