'use strict';

let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let exists = [];
let numberBlocks = document.querySelectorAll('.randNumbers'); //все span'ы

coordinates();

// запись в span'ы рандомные числа
function newRand() {
	numberBlocks.forEach((element) => {
		//перебор span'ов
		let random = getRandomNumber(); //в random записывается result
		element.innerHTML = numbers[random];
	});
	zeroHide();
	exists = []; // обнуление массива
}

// рандомная генерация
function getRandomNumber() {
	while (true) {
		let result = Math.floor(Math.random() * numbers.length);
		if (!exists.includes(result)) {
			exists.push(result);
			return result; //отправляется в random
		}
	}
}

//функция скрытия 0 блока
function zeroHide() {
	//перебор рандомных span'ов
	numberBlocks.forEach((elem) => {
		//поиск, где есть 0 элемент, добавляем скрытие
		if (elem.innerHTML == 0) {
			elem.parentElement.classList.add('null-block');
		} else {
			elem.parentElement.classList.remove('null-block');
		}
	});
}

function coordinates() {
	numberBlocks.forEach((elem) => {
		elem.parentElement.addEventListener('click', (event) => {
			// внутри target'а узнаем координаты
			// console.log(event.target.offsetLeft, event.target.offsetTop);

			// координаты не 0 блока
			let X = event.target.offsetLeft;
			let Y = event.target.offsetTop;
			let X0;
			let Y0;

			let zeroElement;
			//ForEach для нахождения 0
			numberBlocks.forEach((element) => {
				if (element.innerHTML == 0) {
					//0-ой span который нашли перебором записываем в отдельную переменную
					zeroElement = element;

					// координаты 0 блока
					X0 = element.parentElement.offsetLeft;
					Y0 = element.parentElement.offsetTop;
				}
			});

			//вычитание координат для определения кто ближе к 0
			let diffX = Math.abs(X - X0);
			let diffY = Math.abs(Y - Y0);

			// 0 означают, что блок находится на одной строке или одной столбце с 0 блоком (иначе работает диагональ
			//по координатам, те блоки, у которыз больше 110\137 это не рядом с 0.
			if ((diffX <= 110 && diffY == 0) || (diffY <= 137 && diffX == 0)) {
				[zeroElement.innerHTML, elem.innerHTML] = [elem.innerHTML, zeroElement.innerHTML]; //меняет местами значения
				zeroHide();
			}
		});
	});
}
