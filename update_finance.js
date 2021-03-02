
var myTaskData = [
    {"expenseId" : 0, "expense_name" : "Initial Setup" , "expense_cost" : 100},
    
]

var actualCostTotal = 0;



var taskIdCount = myTaskData.length;



function CreateTableFromJSON() {    
    
    updateTotal();

    var edit = window.localStorage.getItem("finance");
    var projectString = window.localStorage.getItem(edit);
    var project = JSON.parse(projectString);

    document.getElementById("projectName").innerHTML = project.project_name;
    document.getElementById("expenseTotal").innerHTML = actualCostTotal.toString();

    

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Deal ID', 'Deal Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myTaskData.length; i++) {
        for (var key in myTaskData[i]) {
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
    for (var i = 0; i < myTaskData.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myTaskData[i][col[j]];
        }
 
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button onclick="DeleteRow(' + myTaskData[i].taskId + ')"> DeleteTask </button>'

    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    

}

function AddNewDeal() {


    var expenseName = document.getElementById("expenseNameInput").value;
    var expenseCost = document.getElementById("expenseCostInput").value;


    document.getElementById("expenseNameInput").value = "";
    document.getElementById("expenseCostInput").value = "";

    InsertRow(expenseName, expenseCost);
    
    

}

function InsertRow(expenseName, expenseCost) {
    taskIdCount++;
    myTaskData.push({"expenseId": taskIdCount, "expense_name" : expenseName, "expense_cost" : expenseCost})


    CreateTableFromJSON();

}

function DeleteRow(taskId) {
     
    for( var i = 0; i < myTaskData.length; i++){ 
    
        if ( myTaskData[i].taskId === taskId) { 
            myTaskData.splice(i,1); 
        }
    
    }
    CreateTableFromJSON();
}


function updateTotal(){

    var sum = 0;
    myTaskData.forEach(element => {
        sum += parseInt(element.expense_cost);
    });

    actualCostTotal = sum;
}

function ReturnToDeals() {

    var edit = window.localStorage.getItem("finance");
    var projectString = window.localStorage.getItem(edit);
    var p = JSON.parse(projectString);

    var myData = {"dealId" : p.dealId, "client_name" : p.client_name, "project_name" : p.project_name, "project_manager" : p.project_manager, "project_estimate" : p.project_estimate, "finance_actual": parseInt(actualCostTotal), "budget": "UNDER"}

    var dealString = JSON.stringify(myData);

    localStorage.setItem(p.dealId.toString(), dealString);

    window.location = "deal_manager.html";
    
}

