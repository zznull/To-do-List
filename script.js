

//Pievienots
const  CONFIG={
	'MAXITEM':10,
	'DATASRC':'https://to-do-list-a3c11.firebaseio.com/todos.json',
	
};
//Pievienots
function getInitialTasks() {
    fetch(CONFIG.DATASRC).then(response => response.json()).then(mycrazydata => handlers.addTodo(mycrazydata))
};


let todoList = {
	todos: [],

	addTodo: function(todoText){
		this.todos.push({
			todoText: todoText,
			completed: false
		});
		//pievienots
		postData(CONFIG.DATASRC, todoText);
	},
	
	changeTodo: function(position, todoText){
		this.todos[position].todoText = todoText;
	},
	
	deleteTodo:function(position){
		this.todos.splice(position,1);
	},
	
	toggleCompleted: function(position){
		let todo=this.todos[position];
		todo.completed = !todo.completed;
	},
	
	toggleAll: function(){
		let completedTodos=0;
		
		this.todos.forEach(function(todo){
			if (todo.completed===true){
				completedTodos++
			}
		});
		
		this.todos.forEach(function(todo){
			if(completedTodos===todoList.todos.length){
				todo.completed=false;
			}else{
				todo.completed=true;
			}
		});
	}
};




let handlers={
	addTodo:function(){
		const addTodoTextInput = document.getElementById('addTodoTextInput');
			if (addTodoTextInput.value == ''){
				alert('Your given To-Do is empty.');
				return false;
			}else{	
				todoList.addTodo(addTodoTextInput.value);
			};
		addTodoTextInput.value='';
		view.displayTodos();
		
	},
	//pievienots
	addBaseTodo:function(todos){
		console.log(todos);
		for(todo in todos){
			console.log(todos[todo]);
			todoList.addTodo(todos[todo]);
		};
		view.displayTodos();
	},
	deleteTodo:function(position){
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	
	activateModal:function(position) {
		currpos: 0,
		this.currpos = position;
	},
	changeTodo:function(position){
		position = this.currpos;
		
		var changeTodoTexInputInput = document.getElementById('changeTodoTextInput');
			if (changeTodoTextInput.value == ''){
				alert('Your given To-Do is empty.');
				return false;
			}else{	
				todoList.changeTodo(position, changeTodoTextInput.value);
			};
		changeTodoTextInput.value='';
		view.displayTodos();

	},
	toggleCompleted:function(position){
		todoList.toggleCompleted(position);
		view.displayTodos();

	},
	toggleAll:function(){
		todoList.toggleAll();
		view.displayTodos();
	},
};
		


let view={
	displayTodos:function(){
		let todosUl= document.querySelector('ul');
		todosUl.innerHTML='';

		todoList.todos.forEach(function(todo, position){
			let todoLi= document.createElement('li');
			let todoTextWithCompletion='';
			
			if(todo.completed===true){
				todoTextWithCompletion='<i class="far fa-check-circle"></i> <span class="completed">' + todo.todoText + '</span> ';
			}else{
				todoTextWithCompletion='<i class="far fa-circle"></i> <span class="incomplete">' + todo.todoText + '</span> ';
			}
			todoLi.id=position;
			todoLi.innerHTML=todoTextWithCompletion;
			todoLi.appendChild(view.createToggleCompletedButton());
			todoLi.appendChild(view.createDeleteButton());
			todoLi.appendChild(view.createChangeButton());
			todosUl.appendChild(todoLi);
		});
	},
	createToggleCompletedButton:function(){
		let toggleCompletedButton=document.createElement('button'); 
		toggleCompletedButton.innerHTML='Complete'; //Nosaukums DOM'ā // <i class="fas fa-check"></i>
		toggleCompletedButton.className='toggleCompletedButton'; // Piešķirts class name 
		return toggleCompletedButton; //atgriezta vērtība
	},
	createDeleteButton:function(){
		let deleteButton= document.createElement('button');
		deleteButton.innerHTML='Delete';//<i class="far fa-trash-alt"></i>
		deleteButton.className='deleteButton';
		return deleteButton;
	},
	createChangeButton:function(){
		let changeButton= document.createElement('button');
		changeButton.innerHTML='Change';//<i class="fas fa-hammer"></i>
		//changeButton.className='btn';
		changeButton.className='changeButton';
		changeButton.setAttribute('data-toggle','modal');
		changeButton.setAttribute('data-target','#exampleModalCenter');
		return changeButton;
		
	},
	elementCounter:function(){
		let count = document.getElementById('count');
		let countIncomplete = document.getElementsByClassName('incomplete').length;
		count.innerText='You have "'+ countIncomplete + '" To-do\'s that needs to be done.';
	},
		
	setUpEventListeners:function(){
		//let todosUl=document.querySelector('ul');
			document.addEventListener('click', function(event){
	
			let elementClicked = event.target;
				if (elementClicked.className === 'deleteButton'){ 
					handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
				}
				if (elementClicked.className === 'toggleCompletedButton'){ 
					handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
				}	
				if (elementClicked.className === 'changeButton'){ 
					handlers.activateModal(parseInt(elementClicked.parentNode.id));
				}
				if (elementClicked.id === 'addBtn'){
					handlers.addTodo();	
				}
				if (elementClicked.id === 'toggleBtn'){
					handlers.toggleAll();
				}
				if (elementClicked){ 
					view.elementCounter();
				}
				
		});

	},

};

	let utilities={
	textInputOnEnter:function(){
		document.getElementById('addTodoTextInput').addEventListener('keyup', function(event){
			event.preventDefault();
				if (event.keyCode === 13) {
					document.getElementById('addBtn').click();
    };
});
		document.getElementById('changeTodoTextInput').addEventListener('keyup', function(event) {
			event.preventDefault();
				if (event.keyCode === 13) {
					document.getElementById('changeBtn').click();
	}
});
	},

	
   
};		

view.setUpEventListeners();
utilities.textInputOnEnter();
//pievienots
getInitialTasks();




