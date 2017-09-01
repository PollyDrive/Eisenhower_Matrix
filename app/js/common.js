var importantUrgentCategory = {
	name: 'importantUrgentCategory',
	russianName: 'Важно и срочно',
	activeTasks: []
}
var importantNotUrgentCategory =  {
	name: 'importantNotUrgentCategory',
	russianName: 'Важно, но не срочно',
	activeTasks: []	
}
var notImportantUrgentCategory = {
	name: 'notImportantUrgentCategory',
	russianName: 'Неважно, но срочно',
	activeTasks: []
}
var notImportantNotUrgentCategory =  {
	name: 'notImportantNotUrgentCategory',
	russianName: 'Неважно и несрочно',
	activeTasks: []
}

var categoriesArr = [importantUrgentCategory, importantNotUrgentCategory, notImportantUrgentCategory, notImportantNotUrgentCategory];

categoriesArr.forEach(function(categoryObj){
	var categoryName = categoryObj.name;
	var block = document.querySelector('#'+categoryName+'Block');
	var saveBtn = block.querySelector('.successBtn');
	var input = block.querySelector('input');
	var form = block.querySelector('.quadrant__forms-tasks');
	var quadrantTitle = block.querySelector('.quadrant__title');
	var quadrantForms = block.querySelector('.quadrant__forms');

	turnOnQuadrant(block, quadrantTitle, quadrantForms);

	if (saveBtn) {
		saveBtn.addEventListener('click', function (e) {
			e.preventDefault();
			// 5.3  Проверять на пустую строку + попробовать trim()
			if (input.value.length < 1){
				return false;
			}
			// 5.4. Проверять количество тасков в категории + (try, catch)
			if (form.children.length > 4){
				alert ('Сначала выполни эти дела, уебок');
				return false;
			};
			// 5.5. Проверять что задачи с таким же текстом не существует+ во всех квадрантах +

			disallow = checkTaskInAllQuadrants(input.value, categoryObj);
			if (disallow) {
				return false;
			} else{
				task = createTask(input.value, categoryObj);
				addTaskToList(task, form);
				// 5.2. Очищать input +
				form.reset();
			};
		});
	}
});
function turnOnQuadrant(block, title, forms){
	block.addEventListener('mouseenter', function(e){
		e.preventDefault();
		// block.classList.add('animation');
		title.classList.add('hidden');
		forms.classList.add('visible');
	});
	block.addEventListener('mouseleave', function(e){
		e.preventDefault();
		title.classList.remove('hidden');
		forms.classList.remove('visible');
	});
};

function createTask(text, category) {
	var task = {
		done: false,
		createdAt: 0,
		text: text,
		category: category.name
	}
	// 1 засунуть задачу в список активных задач категории+
	category.activeTasks.push(task);
	return task;
};

function addTaskToList(task, form) {
	// 5. При создании новой задачи, добавлять DOM-елемент с ней в квадрант +
	// 5.1. Добавлять в правильный квадрант +
	var div = document.createElement('div');
	div.className = 'quadrant__task-field';
	var span = document.createElement('span')
	span.innerText = task.text
	div.append(span);
	var icons = addIconToContainer();
	div.append(icons);
	form.insertBefore(div, form.children[0]);
	
	div.addEventListener('click',function(e){
		e.preventDefault();
		editTask(form, div, span, task);
	});
	return true;
};
/*6.4.1 в див добавляется инпут +
	создать функцию редактирования задачи+
	в ней создается новый инпут+
	c value, равным тексту из дива+
	и новая кнопка "сохранить"+

	редактируется див только при наведении фокуса, как фокус уходит - див сохраняется в таком же состоянии (unfocus)
	кнопка проверяет наличие таких же тасков +, но если это свежесозданный таск, его не получается добавить, не редактируя(уже есть в массиве активных)

	пустую строку +
	сохраняет текст из инпута в диве +
	и замещает инпут на див +
	разобраться с forEach, проверка должна быть только в конкретной категории +
	и не должна вызывать addToList, т.к. та ссылается на нее +
*/
function editTask(parentForm, oldTask, oldTaskText, taskObj){
	var editTaskInputWrapper = document.createElement('div');
	editTaskInputWrapper.className = 'quadrant__input-wr';
	var editTaskInput = document.createElement('input');
	editTaskInput.className = 'quadrant__input';
	editTaskInput.setAttribute('type', 'form', 'placeholder');
	editTaskInput.value = oldTaskText.innerText;
	var editTaskInputButton = document.createElement('button');
	editTaskInputButton.className = 'successBtn';
	editTaskInputButton.textContent = 'Сохранить';
	editTaskInputWrapper.append(editTaskInput);
	editTaskInputWrapper.append(editTaskInputButton);
	parentForm.replaceChild(editTaskInputWrapper, oldTask);

	editTaskInputButton.addEventListener('click', function (e) {
		e.preventDefault();
		if (editTaskInput.value.length < 1){
			return false;
		};
		disallow = checkTaskInAllQuadrants(editTaskInput.value);
		if (disallow) {
			// console.log(disallow);
			return false;
		} else {
			taskObj.text = editTaskInput.value;
			oldTaskText.innerText = taskObj.text;
		    parentForm.replaceChild(oldTask, editTaskInputWrapper);
			return true;
		};
	});
	return ;
};
//по нажатию на иконку редактирования открывает поп-ап - добавляет -wr класс visible+
//закрывается поп-ап по нажатию на кнопку "закрыть" или темную область+
// при закрытии попапа поле инпута должно превращаться в див


function openTaskPopup(event){
	var icon = event.target;
	var taskInputforEditing = icon.parentNode.parentNode.parentNode;
	var textFromTask = taskInputforEditing.firstChild;
	var taskPopupWrapper = document.querySelector('#taskPopupWrapper');
	var taskPopupBg = document.querySelector('.edit__pop-up-bg');
	var taskPopup = document.querySelector('#taskPopup');
	var popupTitle = document.querySelector('.edit__pop-up-title');
	document.body.classList.add('overflow');
	taskPopupWrapper.classList.add('visible');
	taskPopupBg.addEventListener('click', function(e){
		if(e.target.classList.contains('edit__pop-up-bg')){
			taskPopupWrapper.classList.remove('visible');
			document.body.classList.remove('overflow');
		} else{
			return false;
		}
	});
	// console.dir(taskTextforPopup);
	addDataToPopup(popupTitle, textFromTask);
}
/*
	Передать значение текста задачи в заголовок +
	названия категории в категорию
	добавить дату создания
	статус
	предполагаемую дату
	дату выполнения
*/
function addDataToPopup(title, text){
	//заголовок +
	title.innerText = text.innerText
	// категория +
	var popupCategory = document.querySelector('.edit__pop-up-category');
	categoriesArr.forEach(function(categoryObj){
		var found = categoryObj.activeTasks;
		found.forEach(function(activeTaskObj){
			if(activeTaskObj.text === title.innerText){
				popupCategory.innerText = categoryObj.russianName;
			}
		});
	});
};

var deleteTask = function deleteTask(event){
	var icon = event.target;
	var divForDelete = icon.parentNode.parentNode.parentNode;
	var spanForDelete = divForDelete.firstChild;
	var textForDelete = spanForDelete.innerText;
	divForDelete.parentNode.removeChild(divForDelete);
	deleteTaskFromActiveTasks(textForDelete)
};

function deleteTaskFromActiveTasks(taskTextToDelete) {
	categoriesArr.forEach(function(categoryObj){
		categoryObj.activeTasks = categoryObj.activeTasks.filter(function(task){
			if (task.text === taskTextToDelete){
				return false;
			} else{
				return true;
			}
		})
	});
}

/*6.3.1.
1 пройтись по массиву активных задач
2 сравнить текст задачи с текстом удаляемого дива 
3 если да - удалить текст из массива
4 на нет и суда нет
*/

function addIconToContainer(taskObj, categoryObj){
	iconDone = createIcon('check_circle', 'doneTask' ,'quadrant__task-field-icon_done');
	iconEdit = createIcon('mode_edit', openTaskPopup,'quadrant__task-field-icon_edit');
	iconDelete = createIcon('cancel', deleteTask,'quadrant__task-field-icon_delete');
	var divIcons = document.createElement('div');
	divIcons.className = 'quadrant__task-field-icons';
	divIcons.append(iconDone);
	divIcons.append(iconEdit);
	divIcons.append(iconDelete);
	return divIcons;
};
 //target parentNode
function createIcon(iconText, onClickHandler, spanClassName){
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

function alreadyInTask(category, inputValue){
	// пройтись по всем массивам готовых задач
	// пройтись по category.activeTasks
	// и в каждом цикле сравить inputValue === tasks.text
	// если нашли возвращать из alreadyInTask true
	// если не нашливозвращаем false
	var result = false;
	category.activeTasks.forEach(function(task){
		if(inputValue === task.text){
			alert('Такая задача уже есть!');
			result = true;
		}
	});
	return result;
};

function checkTaskInAllQuadrants(inputValue){
	var checkAllResult = false;
	categoriesArr.forEach(function(category){
		var alreadyResult = alreadyInTask(category, inputValue);
		if(alreadyResult){
			checkAllResult = true;
		}
	});
	return checkAllResult;
};


// 2 вывести в консоль объект категории, в котором будет новоиспеченная задача+
// console.log(notImportantUrgentCategory);

// 3 при нажатии на "СОХРАНИТЬ" вызывать функцию добавления активной задачи+

// 3.1 связать  домэлементы с категориями+
// получить атрибут от айдишника

// 4. Заменить onclick на addEventListener и рассказать про листнеры+
// 4.1 Исправить анимацию для всех блоков +
// 5. При создании новой задачи, доавблять DOM-елемент с ней в квадрант+

// 6. Добавить возможность редактирования и удаления задач в квадранте
/* 6.1 при клике на кноку "сохранить" добавляется div c введенной задачей +
  6.2 при наведении на div появляется область с иконками+
  6.3 при нажатии на delete div удаляется +
  6.3.1 и удаляется задача из массива активных задач + 
  6.4. при нажатии на див для редактирования имени задачи:
  6.4.1 в див добавляется инпут
  6.4.2 и кнопка сохранить
  6.4.3 невидима панель с иконками
  6.4.4 при наведении на див панель с иконками всплывает
  6.4 при клике на иконку "edit", появляетс модалка
  6.5 при нажатии на enter  или кнопку сохранения, value сохраняется в div+ */
 
// 7. При клике на иконку done задание становится выполненным   
// ?. Активировать все квадранты +
// ?. Реализовать сохранение данных в браузере человека (без сервера)