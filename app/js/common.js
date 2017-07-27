var importantUrgentCategory = {
	name: 'importantUrgentCategory',
	activeTasks: []
}
var importantNotUrgentCategory =  {
	name: 'importantNotUrgentCategory',
	activeTasks: []	
}
var notImportantUrgentCategory = {
	name: 'notImportantUrgentCategory',
	activeTasks: []
}
var notImportantNotUrgentCategory =  {
	name: 'notImportantNotUrgentCategory',
	activeTasks: []
}
var categoriesArr = [importantUrgentCategory, importantNotUrgentCategory, notImportantUrgentCategory, notImportantNotUrgentCategory]

categoriesArr.forEach(function(categoryObj){
	var categoryName = categoryObj.name;
	var block = document.querySelector('#'+categoryName+'Block');
	var saveBtn = block.querySelector('button');
	var input = block.querySelector('input');

	if (saveBtn) {
		saveBtn.onclick = function(e) {
			e.preventDefault();
			createTask(input.value, categoryObj);
			console.log(categoryObj)
		};
	}
});

function createTask(text, category) {
	var task = {
		done: false,
		createdAt: 0,
		text: text,
		category: category.name
	}
	// 1 засунуть задачу в список активных задач категории
	category.activeTasks.push(task);
};

// var quadrantCategoryName
// var block = document.querySelector('#'+quadrantCategoryName+'Block');
// console.dir(block);
// var saveBtn = block.querySelector('button');
// console.log(saveBtn)

// saveBtn.onclick = function(e) {
// 	e.preventDefault();
// 	var text = getTask(block)
// 	createTask(text, quadrantCategory);
// };






// console.log(createTask('выполнить задания', notImportantUrgentCategory ));

// 2 вывести в консоль объект категории, в котором будет новоиспеченная задача
// console.log(notImportantUrgentCategory);

// 3 при нажатии на "СОХРАНИТЬ" вызывать функцию добавления активной задачи

// 3.1 связать  домэлементы с категориями
// получить атрибут от айдишника

// 4. Заменить onclick на addEventListener и рассказать про листнеры
// 5. При создании новой задачи, доавблять DOM-елемент с ней в квадрант
// 6. Добавить возможность редактирования и удаления задач в квадранте
// 7.
// ?. Активировать все квадранты
// ?. Реализовать сохранение данных в браузере человека (без сервера)