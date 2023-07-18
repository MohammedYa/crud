// Variable input and Button
var inputname = document.getElementById("name");
var inputid = document.getElementById("id");
var inputcost = document.getElementById("cost");
var inputdisc = document.getElementById("Disc");
var addbtn = document.querySelector(".btn1");
var searchinput = document.getElementById('search');
var pobName = document.getElementById("problemName");
var index = 0;
var products = [];

// Get value from Local Storage
if (localStorage.getItem("ProductList") === null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("ProductList"));
  displaydata();
}

// Click event for button
addbtn.addEventListener("click", function() {
  if (addbtn.innerHTML == "Add Product") {
    addProduct();
  } else {
    updateproduct(index);
    addbtn.innerHTML = "Add Product";
  }
  displaydata();
  clearForm();
});

// Create object (product) from input values and push it into the products array
function addProduct() {
  var product = {
    id: inputid.value,
    name: inputname.value,
    cost: inputcost.value,
    disc: inputdisc.value
  }

  products.push(product);
  localStorage.setItem("ProductList", JSON.stringify(products));
}

// Display data in table
function displaydata() {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    cartona += `
      <tr>
        <td>${products[i].id}</td>
        <td>${products[i].name}</td>
        <td>${products[i].cost}</td>
        <td>${products[i].disc}</td>
        <td><button onclick="deleteproduct(${i})" class="btn btn-danger">delete</button></td>
        <td><button onclick="getproduct(${i})" class="btn btn-info">update</button></td>
      </tr>`;
  }
  document.getElementById("TableBody").innerHTML = cartona;
}

// Clear the form after adding a product
function clearForm() {
  inputcost.value = "";
  inputdisc.value = "";
  inputid.value = "";
  inputname.value = "";
}

// Delete a product from the array
function deleteproduct(index) {
  products.splice(index, 1);
  displaydata();
  localStorage.setItem("ProductList", JSON.stringify(products));
}

// // /* if you would updata any product */
function getproduct(currntindex){

    index=currntindex
    inputcost.value=products[currntindex].cost;
    inputdisc.value=products[currntindex].disc;
    inputid.value=products[currntindex].id;
    inputname.value=products[currntindex].name; 
    addbtn.innerHTML="Update product" 
}
function updateproduct(index){

    var product={
        id  :inputid.value,
        name:inputname.value,
        cost:inputcost.value,
        disc:inputdisc.value
    }
    products[index].name=product.name
    products[index].id=product.id
    products[index].disc=product.disc
    products[index].cost=product.cost

}
// /* function of search */
function search(txtsearch){
    var cartona="";
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(txtsearch.toLowerCase())){
        cartona+=
        `<tr>
        
        <td>${products[i].id}</td>
        <td>${products[i].name}</td>
        <td>${products[i].cost}</td>
        <td>${products[i].disc}</td>
        <td><button onclick='deleteproduct(${i})' class=" btn btn-danger ">delete</button>        </td>
        <td><button onclick='getproduct(${i})' class=" btn btn-info ">update</button>        </td>
        </tr>`
    }
}
    document.getElementById("TableBody").innerHTML=cartona;
}

// // // **************   validation of crud     ************

inputname.addEventListener("keyup",function(){
    var rejexName =/[A-Z][a-z]{3,8}$/
    if(rejexName.test(inputname.value)==true){
        addbtn.removeAttribute("disabled");
        pobName.classList.add("d-none");
        inputname.classList.add("is-valid");
        inputname.classList.remove("is-invalid");

    }
    else{
        addbtn.disabled="true"
        pobName.classList.remove("d-none");
        inputname.classList.remove("is-valid")
        inputname.classList.add("is-invalid")


    }
}
)


// // ////////////////////////////////////
// // /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// // particlesJS.load('particles-js', 'assets/particles.json', function() {
// //     console.log('callback - particles.js config loaded');
// //   });



