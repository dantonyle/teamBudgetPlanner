
var myTaskData = [];
var actualCostTotal = 0;
var taskIdCount = myTaskData.length;

function CreateTableFromJSON() {    
    
    getExpenseFromStorage();
    updateTotal();

    var dealNum = localStorage.getItem("finance");
    var dealString = localStorage.getItem("deal"+dealNum);
    var deal = JSON.parse(dealString);

    document.getElementById("projectName").innerHTML = deal.project_name;
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

    addExpenseToStorage();

}

function AddNewDeal() {


    var expenseName = document.getElementById("expenseNameInput").value;
    var expenseCost = document.getElementById("expenseCostInput").value;


    document.getElementById("expenseNameInput").value = "";
    document.getElementById("expenseCostInput").value = "";

    InsertRow(expenseName, expenseCost);
    
    

}

function InsertRow(expenseName, expenseCost) {
    
    console.log(expenseName);
    console.log(expenseCost);

    myTaskData.push({"expenseId": taskIdCount, "expense_name" : expenseName, "expense_cost" : expenseCost})
    taskIdCount++;
    addExpenseToStorage();
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

    var dealNum = parseInt(localStorage.getItem("finance"));
    console.log("dealNum: " + dealNum);
    var dealString = localStorage.getItem("deal"+dealNum);
    console.log("object: " + dealString.toString() );
    var p = JSON.parse(dealString);

    var dealData = {"dealId": p.dealId, "client_name" : p.client_name, "project_name" : p.project_name, "project_manager" : p.project_manager, "project_estimate" : p.project_estimate, "finance_actual": actualCostTotal, "budget": "UNDER"};

    var deal = JSON.stringify(dealData);

    localStorage.setItem("deal"+dealNum, deal);

    window.location = "deal_manager.html";
    
}

function addExpenseToStorage() {
    var deal = "deal" + localStorage.getItem("finance");

    myTaskData.forEach(element => {

        var taskLocal = localStorage.getItem(deal+"task"+element.taskId);
        // if row does not exist in local storage -- ADD
        if ( taskLocal == null) {
            var expenseString = JSON.stringify(element);
            localStorage.setItem(deal+"task"+element.expenseId, expenseString);
        }
    });

}

function getExpenseFromStorage() {
    myTaskData= []
    var deal = "deal" + localStorage.getItem("finance");
    console.log("deal:" + deal);

    if (localStorage.getItem(deal+"task0") == null){
        myTaskData.push({"expenseId": taskIdCount, "expense_name" : "Initial Fee", "expense_cost" : 100})
    } else {
        for(i = 0; i < 20; i++ ) {
        
            var taskString = localStorage.getItem(deal+"task"+i);

            if (taskString !== null) {
                var task = JSON.parse(taskString);
                myTaskData.push(task);
            }
        }
    }
    taskIdCount = myTaskData.length;
}

