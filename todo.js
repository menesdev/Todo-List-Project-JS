//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() { // Tüm event listlenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e) {
    
    
    if(confirm("Tüm taskları silmek istediğinize emin misiniz?")) {
        //Arayüzden todoları temizleme

        //todoList.innerHTML = ""; //Yavaş bir yöntem
        //localStorage.removeItem("todos");

        while(todoList.firstElementChild != null){ 
            todoList.removeChild(todoList.firstElementChild);
        }

        
    }


}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            //Bulamadı.

            listItem.setAttribute("style","display : none !important"); //sayfada gösterme.
        }
        else {
            listItem.setAttribute("style", "display : block !important");
        }
    });

}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success","Todo silindi.");
    }
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

function deleteTodoFromStorage(deletetodo) {
    
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index) {
        if(todo === deletetodo){
            todos.splice(index,1); //splice -> Array'den, o indexten itibaren 1 eleman sil
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));

}

function addTodo(e) {
    const newTodo = todoInput.value.trim(); // trim başta ve sondaki boşlukları siler.

    if (newTodo === "") {
        showAlert("danger","Lütfen bir todo girin");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi.");
    }


    e.preventDefault();
}

function getTodosFromStorage() { //Storage'dan Todo'ları alma fonksiyonu.
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos")); //JSON.parse -> arraye çevirme.
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));


}

function showAlert(type,message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeout metodu

    setTimeout(function() {
        alert.remove();
    },1500); //1500 milisaniye(1 bucuk saniye)


}

function addTodoToUI(newTodo) { // Aldığı String değerini list item olarak UI'a ekleyecek.
    /*
    <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
    */

    //List item oluşturma
    const listItem = document.createElement("li");

    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo List'e(ul) list item'ı(li) ekleme
    todoList.appendChild(listItem);

    //console.log(listItem);
    todoInput.value = "";


}




