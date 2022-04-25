
// Define all the app variables 
var expenseType = String()
var itemInput = String()
var itemPrice = Number()
var cssClass = String()
var comestibles = []
var coms = Number()
var Entretenimiento = []
var cuentasAPagar = []
var totalSpending = []
var otros = []
var total = []
var totalComestibles = Number()
var totalCuentasAPagar = Number()
var totalEntretenimiento = Number()
var totalOtros = Number()
var storeData = []
var inputValueFlag = false

var items = []


var expenses = document.getElementsByClassName("expenses").length

console.log(expenses)

showCurrentMonth()
initialize()
//expensesTracking()


function initialize() {

    // Se obtienen todos los datos del Local Storage
    var tableData = JSON.parse(localStorage.getItem("data"));
    const tableItems = document.getElementById('expenses')
    
    console.log(tableData)

    if (tableData != null) {
    tableData.map(item => {
        
    var expenseType = item.ItemType

    var values = item.Price 

    total.push(values)
    console.log(total)

    if (total.length === tableData.length) {
     newtotal = total.reduce((a,b) => a + b,0)
      

    }
    if (expenseType === "Entretenimiento") {
    Entretenimiento.push(item.Price)
    totalEntretenimiento = Entretenimiento.reduce((a,b) => a +b,0)}
    
    else if  (expenseType === 'Comida-Bebida') {
        comestibles.push(item.Price)
        totalComestibles = comestibles.reduce((a,b) => a +b,0) } 

    else if (expenseType === 'Cuentas a Pagar') {
            cuentasAPagar.push(item.Price)
            totalCuentasAPagar = cuentasAPagar.reduce((a,b) => a +b,0)}

    else if (expenseType === 'Otros') {
            otros.push(item.Price)
            totalOtros = otros.reduce((a,b) => a +b,0)}

    })
    
    document.getElementsByClassName('Entretenimiento')[0].innerHTML = "$" + totalEntretenimiento

    document.getElementsByClassName('comestibles')[0].innerHTML = "$" + totalComestibles

    document.getElementsByClassName('cuentas-a-pagar')[0].innerHTML = "$" + totalCuentasAPagar

    document.getElementsByClassName('otros')[0].innerHTML = "$" + totalOtros

    document.getElementsByClassName('total')[0].innerHTML = "$" + newtotal

    

    renderChart()
    
   
    

    for  (var i = 0; i < tableData.length; i++) {
    
    var row = `<tr> <td>${tableData[i].Date}</td>  <td>${tableData[i].Item}</td> <td>$${tableData[i].Price}</td> </tr>`
 
    tableItems.insertAdjacentHTML("beforeend", row)   
    }
    } 

}

function renderChart(){

    ctx = document.getElementById("chart");

    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Entretenimiento','Comestibles','Cuentas A Pagar','Otros'],
            datasets: [{
                
            //    label: 'Track Your Expenses',
                data: [totalEntretenimiento, totalComestibles, totalCuentasAPagar, totalOtros],
                backgroundColor: ['lightgreen', 'purple', 'cornflowerblue','white'],
                borderColor: ['lightgreen', 'purple', 'cornflowerblue', 'white']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    
                    labels: {
                        textAlign: 'right',
                        boxHeight: 30,
                        colors : ['lightgreen', 'purple', 'cornflowerblue','white']
                    }
                }
            }
            
        }
    });
}



function setupDropDownEvents() {
document.getElementById("Gastos").addEventListener("click", 
    
   
    function() {
    
        console.log(this.value)
        const expenseType = this.value
        //return expenseType
    })
return expenseType
};


// document.getElementsByTagName("button")[0].addEventListener("click",
document.getElementById("addRow").addEventListener("click",
function setItemValues(event) {
    
    console.log(this)
    var tableData = JSON.parse(localStorage.getItem("data"));

    
    const itemInput = document.getElementById('iteminput').value
    const itemPrice = Number(document.getElementById('priceinput').value)
    console.log(itemPrice)

    // Chequear que el precio sea mayor a cero
    if (itemPrice <= 0) {

        alert('The price should be greater than 0')
        inputValueFlag = true

        
    } 

    else if (itemInput == '') {
        alert('Add an item expense')
        inputValueFlag = true
    }

    else if (!itemInput.constructor === String) {
        console.log(typeof itemInput)
        console.log(itemInput.constructor===String)
        console.log(itemInput instanceof String)

        alert('The item expense should be a String')
    }

    else if (itemPrice >0 & itemInput !== '') {
        inputValueFlag = false
    }



    if (inputValueFlag === true) {

        return
    }

    else {
    console.log(typeof itemPrice)
    const expense = setupDropDownEvents()
    const expenseType_2 = document.getElementById('Gastos').value
    console.log(expenseType_2)
    const date = new Date().toLocaleDateString()
    console.log(itemInput)
    console.log(itemPrice)
    //console.log(expenseType)
   
  //  var tableData = JSON.parse(localStorage.getItem("data"));
    setExpenseType(expenseType_2)
    {
        let rowToAdd;
    
    if (expenseType_2 === "Comida-Bebida"){

        rowToAdd = `<tr> <td class= "normal-color">${date}</td>  <td class= "normal-color">${itemInput}</td> <td class="comestibles-expense">$${itemPrice}</td> </tr>`

    }

    else if (expenseType_2 === "Entretenimiento") {
         rowToAdd = `<tr> <td>${date}</td>  <td>${itemInput}</td> <td class="entretenimiento-expense">$${itemPrice}</td> </tr>`

    }

    else if (expenseType_2 === "Cuentas a Pagar") {
         rowToAdd = `<tr> <td>${date}</td>  <td>${itemInput}</td> <td class ="cuentas-a-pagar-expense">$${itemPrice}</td> </tr>`

    }

    else {

         rowToAdd = `<tr> <td>${date}</td>  <td>${itemInput}</td> <td class ="otros-expense">$${itemPrice}</td> </tr>`

    }
  //  const rowToAdd = `<tr> <td>${date}</td>  <td>${itemInput}</td> <td class = ${cssClass}>$${itemPrice}</td> </tr>`
    //var tableData = JSON.parse(localStorage.getItem("data"));
    var newItem = ({Date: date , Item: itemInput, Price: itemPrice , ItemType: expenseType_2 }) 
  //  tableData.push({Date: date , Item: itemInput, Price: itemPrice })
    
    if (tableData !== null){
        
        tableData.push(newItem)
        }

    
   
    

    addListItems(rowToAdd)

    localStorage.setItem("data", JSON.stringify(tableData))

    expensesTracking(expenseType_2,itemPrice,storeData)
    //updateOverallTotal(itemPrice)
    reinitialize()
    renderChart()
}}})
 
    
function showCurrentMonth() {

   var m_names = ['January', 'February', 'March', 'April', 'May', 'June',
   'July','August','September','October','November','December']

   d = new Date();
   var n = m_names[d.getMonth()] + " " + d.getFullYear()
   document.getElementById('date').innerHTML = n
   return n

}
function addListItems(row) {

    const listItem = document.createElement('li')
    const tableItems = document.getElementById('expenses')
    

   tableItems.insertAdjacentHTML('beforeend', row)
}

function setExpenseType(expense) {

    console.log(expense)
    const expenseType = setupDropDownEvents()
    if (expenseType === 'Entretenimiento') {
        document.querySelector(expenseType).classList.add('entretenimiento')
      }
      if (expenseType === 'Comida-Bebida') {
          cssClass = 'rojo'
      }
      if (expenseType === 'Cuentas a Pagar') {
          cssClass = 'verde'
      }
      if (expenseType === 'Otros') {
          cssClass = 'rosado'
      }
      return cssClass
}


function updateOverallTotal(value) {
    console.log(totalSpending)
    totalSpending.push(value)
    console.log(totalSpending)
    const total = totalSpending.reduce((a,b) => a +b,0);
    console.log(total)
    return total
}

function expensesTracking(expense,price,storeData) {
    const expenseType = setupDropDownEvents()
    
    console.log(expense)
    console.log(price)
    if (expense === 'Entretenimiento') {
        Entretenimiento.push(price)
        totalEntretenimiento = Entretenimiento.reduce((a,b) => a +b,0);
        console.log(totalEntretenimiento)
        totalSpending.push(price)
        document.getElementsByClassName('Entretenimiento')[0].innerHTML = "$" + totalEntretenimiento
     
    }
    else if (expense === 'Comida-Bebida') {
          comestibles.push(price)
          totalComestibles = comestibles.reduce((a,b) => a +b,0);
          console.log(totalComestibles)
          totalSpending.push(price)
          document.getElementsByClassName('comestibles')[0].innerHTML = "$" + totalComestibles

      }
     else if (expense === 'Cuentas a Pagar') {
          cuentasAPagar.push(price)
          totalCuentasAPagar = cuentasAPagar.reduce((a,b) => a +b,0);
          console.log(totalCuentasAPagar)
          totalSpending.push(price)
          document.getElementsByClassName('cuentas-a-pagar')[0].innerHTML = "$" + totalCuentasAPagar
      }
      else if (expense === 'Otros') {
          otros.push(price)
          totalOtros = otros.reduce((a,b) => a +b,0);
          console.log(totalOtros)
          totalSpending.push(price)
          document.getElementsByClassName('otros')[0].innerHTML = "$" + totalOtros
          data.addData(['Otros', totalOtros])

      }

      console.log(total)
      total.push(price)
      newtotal = total.reduce((a,b) => a + b,0)
      document.getElementsByClassName('total')[0].innerHTML = newtotal

     
    console.log(totalSpending)
    console.log(storeData)

   

   
    // console.log(comestibles)
    // console.log(cuentasAPagar)
    // console.log(otros)
    // console.log(coms)
}

function reinitialize() {

    document.getElementById('iteminput').value = ''
    document.getElementById('priceinput').value = ''


   
 //   chart.draw();

    var tableData = JSON.parse(localStorage.getItem("data"));
   // console.log(tableData)
    
}


function tableToCSV() {

    // Variable to store the final csv data

    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByTagName('tr');

    for (var i = 0; i< rows.length; i++) {

        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = []

        for (var j= 0; j < cols.length; j++) {
            // Get the text data of each cell of a row and push it to csvrow

            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }

    // Combine each row data with new line character
    csv_data = csv_data.join('\n');
    
    // Call this function to download csv file
    downloadCSVFile(csv_data)

}


function downloadCSVFile(csv_data) {

    // Create CSV file object and feed our csv_data into it 

    CSVFile = new Blob([csv_data], { 
        type: "text/csv"
    });

    // Create to temporary link to initiate download process
    var temp_link = document.createElement('a');
    
    // Download csv file
    temp_link.download = "ExpensesData.csv";
    var url = window.URL.createObjectURL(CSVFile)
    temp_link.href = url

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}