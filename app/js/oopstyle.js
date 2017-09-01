function Category(name, russianName, taskQuantity){
	this.name = name; 
	this.russianName = russianName;
	this.taskQuantity = 4;
	this.activeTasks = []

	var categoryName = this.name;
	this.block = document.querySelector('#'+categoryName+'Block');
	this.saveBtn = this.block.querySelector('.successBtn');
	this.input = this.block.querySelector('input'); // input и должен определяться здесь,если принадлежит задаче?
	this.form = this.block.querySelector('.quadrant__forms-tasks');
	this.quadrantTitle = this.block.querySelector('.quadrant__title');
	this.quadrantForms = this.block.querySelector('.quadrant__forms');

	this.turnOnQuadrant = function () {
		var self = this
		this.block.addEventListener('mouseenter', function(e){
			e.preventDefault();
			// block.classList.add('animation');
			self.quadrantTitle.classList.add('hidden');
			self.quadrantForms.classList.add('visible');
		});
		this.block.addEventListener('mouseleave', function(e){
			e.preventDefault();
			self.quadrantTitle.classList.remove('hidden');
			self.quadrantForms.classList.remove('visible');
		});
	};

	Category.categoriesArr.push(this);

	this.actionButton = function(){
		var self = this;
		this.saveBtn.addEventListener('click', function (e) {			
			e.preventDefault();
			// 5.4. Проверять количество тасков в категории + (try, catch)
			if (self.form.children.length > self.taskQuantity){
				alert ('Сначала выполни эти дела, уебок');
				return false;
			};

			var isInTask = false
			Category.categoriesArr.forEach(function(category){
				category.activeTasks.forEach(function(task){
					if (task.text === self.input.value){
						alert('такая задача уже есть')
						isInTask = true
					} 
				})
			});

			if (isInTask){
				return false;
			}else{
				var task = new Task(self.input.value, self, self.form);
				Task.addIconToContainer();
				self.activeTasks.push(task);
				self.form.reset();
			}
			    
				
		});
	};

	// function alreadyInTask(category, inputValue){

	// };
	// function checkTaskInAllQuadrants(inputValue){

	// };
	// var task = new Task();
	// console.log(this.input.value);
	// function createTask() {

	
	// 	// 1 засунуть задачу в список активных задач категории+
	// 	category.activeTasks.push(task);
	// };
	// function addTaskToList(task, form) {

	// };
};

Category.deleteTask = function(event){
	var icon = event.target;
	var divForDelete = icon.parentNode.parentNode.parentNode;
	var spanForDelete = divForDelete.firstChild;
	var textForDelete = spanForDelete.innerText;
	divForDelete.parentNode.removeChild(divForDelete);
	// deleteTaskFromActiveTasks(textForDelete)
};
Category.deleteTaskFromActiveTasks = function(){
	 
}


/*
Добавить статический метод (массив) для инициализации всех категорий в одной функции.
 поворот и кнопка
*/
Category.categoriesArr = [];

var importantUrgentCategory = new Category('importantUrgentCategory', 'Важно и срочно');
var importantNotUrgentCategory = new Category('importantNotUrgentCategory', 'Важно, но не срочно');
var notImportantUrgentCategory = new Category('notImportantUrgentCategory', 'Неважно, но срочно');
var notImportantNotUrgentCategory = new Category('notImportantNotUrgentCategory', 'Неважно и не срочно');

Category.init = function() {
	Category.categoriesArr.forEach(function(category){
		category.turnOnQuadrant();
		category.actionButton();
	});
}
Category.init();
// Category.validate = function(value) {
// 	Category.categoriesArr.forEach(function(category){
// 		category.checkTaskInActiveTasks(value);
// 	});
// }


function Task(text, category, form){
	this.text = text;
	this.category = category;
	this.done = false;
	this.createdAt = 0;

	var taskDiv = document.createElement('div');
	taskDiv.className = 'quadrant__task-field';
	var taskSpan = document.createElement('span');
	taskSpan.innerText = this.text;
	taskDiv.append(taskSpan);
	var divIcons = Task.addIconToContainer();
	taskDiv.append(divIcons);
	form.insertBefore(taskDiv, form.children[0]);

		// 5.3  Проверять на пустую строку + попробовать trim()
	// self.input.value.trim()
	// if (self.input.value  = ''){
	// 	console.dir(self.input.value);
	// 	return false;
	// }
};
Task.createIcon = function (iconText, onClickHandler, spanClassName){
	var i = document.createElement('i');
	i.className = 'material-icons';
	i.innerText = iconText;
	i.addEventListener('click', function(event){
		// действие на иконке
		event.preventDefault();
		onClickHandler(event);
	});
	var span = document.createElement('span');
	span.ClassName = spanClassName;
	span.append(i);
	return span;
};

Task.addIconToContainer = function(){
	iconDone = this.createIcon('check_circle', 'doneTask' ,'quadrant__task-field-icon_done');
	iconEdit = this.createIcon('mode_edit', 'openTaskPopup','quadrant__task-field-icon_edit');
	iconDelete = this.createIcon('cancel', Category.deleteTask,'quadrant__task-field-icon_delete');
	var divIcons = document.createElement('div');
	divIcons.className = 'quadrant__task-field-icons';
	divIcons.append(iconDone);
	divIcons.append(iconEdit);
	divIcons.append(iconDelete);
	return divIcons;
};



