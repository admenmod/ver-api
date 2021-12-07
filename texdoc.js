/*
<a href='https://www.google.com/search?q=canvas+js'>canvas</a>
<a href='https://www.google.com/search?q=collback+js'>collback</a>
<a href='https://www.google.com/search?q=CanvasRenderingContext2D'>CanvasRenderingContext2D</a>
*/

'use strict';
(function() {
	let api = [
		{
			"name" : "codeShell",
			"type" : "function",
			"source" : "ver.codeShell",
			"syntax" : "codeShell(code: string|function [, useAPI: object = {}, file: string = 'code']);",
			"description" : "Принимает JavaScript код в виде строки и возвращает функцию которая выполняет переданный JavaScript код как бы в изолированной среде. У него не будут доступа к глобальной области видимости. При попытке достать переменную из глобальной области видимости, переменная будет искатся в переданном обьекте useAPI.",
			"params" : {
				"code: string|function" : " - JavaScript код",
				"useAPI: object = {}" : " - у этого обьекта будут запрашиватся все переменные вызываемые в глобальной (по отношению к функции) области видимости (опционально)",
				"file: string = 'code'" : " - название псевдо-файла, используется как имя файла в стеке вызова (опционально)"
			},
			"return" : "function",
			"example" : "let useAPI = { console, Math };\nlet codeStr = codeShell(`\n  console.log(this, this === window);\n`, useAPI);\n\ncodeStr(); // obj: Window, false \ncodeStr.call(/*this obj*/); // this obj, false\n\nlet codeFunc = codeShell(function() {\n  // внутри функция будет преобразована в текст\n  // по той же причине стрелочные функции вызовут ошибку\n  console.log(Math.pow(2, 2));\n\n  // доступ есть только к переменным переданным в useAPI\n  console.log(Promise, window, Math, Object); // undefined, undefined, Math, undefined\n}, useAPI);\n\ncodeFunc(); // 4"
		},
		{
			"name" : "random",
			"type" : "function",
			"source" : "ver.random",
			"syntax" : "random(min: number, max: number);",
			"description" : "Возвращаяет случайное значение из диапазон.",
			"params" : {
				"min: number" : " - минимальное значение",
				"max: number" : " - максимальное значение"
			},
			"return" : "min - max: number",
			"example" : "random(0, 100); // вернет случайно от 0 до 100"
		},
		{
			"name" : "JSONcopy",
			"type" : "function",
			"source" : "ver.JSONcopy",
			"syntax" : "JSONcopy(object);",
			"description" : "Копирует обьект методом преобразования в JSON и обратно.",
			"params" : {
				"object" : " - обьект для копирования"
			},
			"return" : "object - новый обьект",
			"example" : "JSONcopy(state); // скопирует и вернет новый обьект state"
		},
		{
			"name" : "generateImage",
			"type" : "function",
			"source" : "ver.generateImage",
			"syntax" : "generateImage(width: number, height: number, collback{ctx: CanvasRenderingContext2D, size: Vector2});",
			"description" : "Вызывает <a href='https://www.google.com/search?q=collback+js'>collback</a> для отрисовки изображения на <a href='https://www.google.com/search?q=canvas+js'>canvas</a>, с аргументом <a href='https://www.google.com/search?q=CanvasRenderingContext2D'>CanvasRenderingContext2D</a>. Возвращает промис с обьектом <a href='https://www.google.com/search?q=image+js'>Image</a>.",
			"params" : {
				"width: number" : " - шырина изображения",
				"height: number" : " - высота изображения",
				"collback" : " - вызывается с аргументоми ctx и size",
				"collback{ctx: CanvasRenderingContext2D}" : " - <a href='https://www.google.com/search?q=CanvasRenderingContext2D'>CanvasRenderingContext2D</a>",
				"collback{size: Vector2}" : " - вектор с размерами изображения"
			},
			"return" : "Promise\<<a href='https://www.google.com/search?q=image+js'>Image</a>\>",
			"example" : "generateImage(400, 300, (ctx, size) => {\n  ctx.fillRect(10, 10, 200, 100);\n}).then(img => console.log(img)); // Image"
		},
		{
			"name" : "loadImage",
			"type" : "function",
			"source" : "ver.loadImage",
			"syntax" : "loadImage(src: string [, width: number, height: number]);",
			"description" : "Динамически подгружает изображение.",
			"params" : {
				"src: string" : " - абсолютный путь к файлу",
				"width: number" : " - ширина изображения (опцыонально)",
				"height: number" : " - высота изображения (опцыонально)"
			},
			"return" : "Promise\<<a href='https://www.google.com/search?q=image+js'>Image</a>\>",
			"example" : "loadImage('img/icon.png').then(img => {\n  console.log(img); // Image img/icon.png\n});"
		},
		{
			"name" : "loadScript",
			"type" : "function",
			"source" : "ver.loadScript",
			"syntax" : "loadScript(src: string [, p: {\n  parent: HTMLElement = document.body,\n  async: boolean = false\n}]);",
			"description" : "Динамически подгружает скрипт.",
			"params" : {
				"src: string" : " - абсолютный путь к файлу",
				"p: object" : " - обьект параметров (опцыонально)",
				"p.parent: HTMLElement = document.body" : " - родительский элемент для скрипта (опцыонально)",
				"p.async: boolean = false" : " - асинхронная загрузка"
			},
			"return" : "Promise\<<a href='https://www.google.com/search?q=script+element+js'>Script</a>\>",
			"example" : "loadImage('img/icon.png').then(img => {\n  console.log(img); // Image img/icon.png\n});"
		},
		{
			"name" : "EventEmitter",
			"type" : "class",
			"source" : "ver.EventEmitter",
			"syntax" : "new EventEmitter();",
			"description" : "Обычный EventEmitter. Вместо emitter'а, this в функции обработчике ровняется определенному store обьекту, который является уникальным для каждого события и одним и тем же при каждой имитации собития. Store = { self = emitter = EventEmitter, type = event name }",
			"params" : {},
			"return" : "EventEmitter",
			"example" : "let em = new EventEmitter();\n\nem.on('open', (arg1, arg2) => console.log(arg1, arg1));\nem.emit('open', 'arg one', 53); // 'arg one', 53\n\nem.once('destroy', function() {\n  // обработчик будет удален при первом выполнении\n  console.log(this);\n};\nem.emit('destroy') // { (self, emitter): object, type = 'destroy' };"
		},
		{
			"name" : "Scene",
			"type" : "class",
			"source" : "* ver.Scene",
			"syntax" : "new Scene(scene: function);",
			"description" : "...",
			"params" : {
				"scene: function" : " - Функция конструктор."
			},
			"return" : "Scene",
			"example" : "let scene = new Scene('main', function() {\n  // код выполнится при первом запуске\n  console.log('compile');\n\n  this.preload(Promise&lt;data&gt;).then(console.log); // data\n\n  this.init = () => console.log('init');\n\n  this.load = () => console.log('load');\n\n  this.updata = () => console.log('updata');\n\n  this.exit = () => console.log('exit');\n});\n\nScene.run('main'); // | scene.run();"
		},
		{
			"name" : "Child",
			"type" : "class",
			"source" : "* ver.Child",
			"syntax" : "new Child();",
			"description" : "...",
			"params" : {},
			"return" : "Child",
			"example" : "..."
		},
		{
			"name" : "VectorN",
			"type" : "class",
			"source" : "* ver.VectorN",
			"syntax" : "new VectorN(...args);",
			"description" : "...",
			"params" : { "args" : " - args" },
			"return" : "VectorN",
			"example" : "..."
		},
		{
			"name" : "Vector2",
			"type" : "class",
			"source" : "ver.Vector2",
			"syntax" : "new Vector2([x: number = 0, y: number = 0]);",
			"description" : "Обычный вектор с возможностью передовать в методы как вектор так и отдельные координаты",
			"params" : {
				"x: number = 0" : " - X (опционально)",
				"y: number = 0" : " - Y (опционально)"
			},
			"return" : "Vector2",
			"example" : "let vector = new Vector(10, 10);\nvector.plus(new Vector(10, 10)); // вектор\nvectro.minus(5, 5); // отдельные значения\nvector.div(5); // при одном аргументе применяет его к обоим свойствам"
		},
		{
			"name" : "CameraImitationCanvas",
			"type" : "class",
			"source" : "* ver.CameraImitationCanvas",
			"syntax" : "new CameraImitationCanvas(ctx: CanvasRenderingContext2D);",
			"description" : "...",
			"params" : { "ctx: CameraImitationCanvas" : " - CameraImitationCanvas" },
			"return" : "CameraImitationCanvas",
			"example" : "..."
		},
		{
			"name" : "CanvasLayer extends HTMLElement",
			"type" : "class",
			"source" : "* ver.CanvasLayer",
			"syntax" : "new CanvasLayer();",
			"description" : "...",
			"params" : {},
			"return" : "CanvasLayer",
			"example" : "..."
		}
	];
	
	
	let parseParams = item => {
		let t = '';
		for(let param in item.params) t += `<div class="param"><b>${param}</b>${item.params[param]}</div>`;
		return t;
	};
	
	
	let winEl = document.createElement('div');
	winEl.classList.add('win');
	
	let winc = '';
	for(let item of api) {
		winc += `<div class="item item-type-${item.type === 'class' ? 'class' : 'function'}">
			<details>
			<summary><div class="item-name">${item.source}</div></summary>
			<hr>
			<div class="item-syntax"><pre>${item.syntax}</pre></div>
			<div class="item-params">${parseParams(item)}</div>
			<div class="item-return"><span style="color: #ee4444; font-weight: bolder;">return</span> ${item.return}</div>
			<div class="item-description">${item.description}</div>
			<fieldset class="item-example-fieldset">
				<legend class="item-example-legend">${item.name}</legend>
				<pre>${item.example}</pre>
			</fieldset>
			</details>
			<hr>
		</div>`;
	};
	
	winEl.innerHTML = winc;
	
	document.body.append(winEl);
})();
