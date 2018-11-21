
let todoList = {
	todos: [],

	addTodo: function(todoText){
		this.todos.push({
			todoText: todoText,
			completed: false
		});
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
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value='';
		view.displayTodos();
	},
	deleteTodo:function(position){
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	changeTodo:function(position){
	debugger;
		var changeTodoTexInputInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(position, changeTodoTextInput.value);
		//changeTodoTextInput.value='';
		view.displayTodos();
			console.log(position);
			console.log(changeTodoTextInput.value);

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
				todoTextWithCompletion='<i class="far fa-check-circle"></i> <span class="completed">' + todo.todoText + '</span> ';// <span contenteditable="true">
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
		let todosUl=document.querySelector('ul');
			todosUl.addEventListener('click', function(event){
	
			let elementClicked = event.target;
				if (elementClicked.className === 'deleteButton'){ 
					handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
				}
				if (elementClicked.className === 'toggleCompletedButton'){ 
					handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
				}	
				if (elementClicked.className === 'changeButton'){ 
					handlers.changeTodo(parseInt(elementClicked.parentNode.id));
				}
				
				
		});
		let content = document.getElementsByClassName('content');
			content[0].addEventListener('click', function(event){
	
			let elementClicked = event.target;
				if (elementClicked){ 
					view.elementCounter();
				}
				
		});
	},

};
view.setUpEventListeners();


