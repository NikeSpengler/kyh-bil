let cars = [
	{
		brand: 'Volvo',
		model: 'V90',
		year: '2019',
		milage: '0',
		colour: 'Vit',
		gearbox: 'Automat',
		price: '467000',
		used: 'Ny'	
	},
	{
		brand: 'Audi',
		model: 'A6',
		year: '2004',
		milage: '54500',
		colour: 'Silver',
		gearbox: 'Manuell',
		price: '28500',
		used: 'Begagnad'
	},
	{
		brand: 'BMW',
		model: 'E42',
		year: '2000',
		milage: '4300',
		colour: 'Grå',
		gearbox: 'Automat',
		price: '10000',
		used: 'Begagnad'
	},
	{
		brand: 'Jeep',
		model: 'Wrangler',
		year: '2016',
		milage: '2900',
		colour: 'Svart',
		gearbox: 'Manuell',
		price: '120000',
		used: 'Begagnad'
	},
	{
		brand: 'BMW',
		model: 'E92',
		year: '2012',
		milage: '6900',
		colour: 'Gul',
		gearbox: 'Automat',
		price: '90000',
		used: 'Begagnad'
	},
	{
		brand: 'Volvo',
		model: 'V70',
		year: '2004',
		milage: '29000',
		colour: 'Marin blå',
		gearbox: 'Automat',
		price: '10000',
		used: 'Begagnad'
	},
]

cars.push();
createTable();

class Car {
	constructor(brand, model, year, milage, colour, gearbox, price, used) {
		this.brand = brand;
		this.model = model;
		this.year = year;
		this.milage = milage;
		this.colour = colour;
		this.gearbox = gearbox;
		this.price = price;
		this.used = used;
	}
}

function getCarValues() {
	let form = document.getElementById('form');
	let brand = validateValue(document.getElementById("brand").value);
	let model = validateValue(document.getElementById("model").value);
	let year = validateValue(document.getElementById("year").value);
	let milage = validateValue(document.getElementById("milage").value);
	let colour = validateValue(document.getElementById("colour").value);
	let gearbox = validateValue(document.getElementById("gearbox").value);
	let price = validateValue(document.getElementById("price").value);
	let used;

	if (checkbox.checked) {
		document.getElementById("checkbox").value = "Begagnad";
		used = document.getElementById("checkbox").value;
	}
	else {
		document.getElementById("checkbox").value = "Ny";
		used = document.getElementById("checkbox").value;
	}

	let car = new Car(brand, model, year, milage, colour, gearbox, price, used);

	cars.unshift(car);

	form.reset();
	createTable();
}

function createTable() {
	let carOutput = "<table><tr>";

	// for loop to get attribute names and pu them in the first row in array
	let th = `
		<th><button type='button' onclick='filterCars(this);' id='brand'>Märke</button></th>
		<th><button type='button'>Modell</button></th>
		<th><button type='button' onclick='filterCars(this);' id='model'>Modellår</button></th>
		<th><button type='button' onclick='filterCars(this);' id='milage'>Miltal</button></th>
		<th><button type='button'>Färg</button></th>
		<th><button type='button' onclick='filterCars(this);' id='gearbox'>Växellåda</button></th>
		<th><button type='button' onclick='filterCars(this);' id='price'>Pris</button></th>
		<th><button type='button' onclick='filterCars(this);' id='used'>Skick</button></th>
	`;

	carOutput += th 

	// forEach loop for each object in the array (each row will be an object)
	cars.forEach((item) => {
		carOutput += "<tr class='car-info'>";

		for (var attrb in item) {
			carOutput += "<td>" + item[attrb] + "</td>";
		}

		carOutput += "</tr>";

	});

	carOutput += "</table>";

	document.getElementById("output").innerHTML = carOutput;
}

function filterCars(sortBy) {
	output = document.getElementById("output");
	output.innerHTML = '';
	cars.sort(sortOn(sortBy.id))

	function sortOn(prop) {
		return function(a, b) {
			if(a[prop] < b[prop]) {
				return -1
			} else if(a[prop] > b[prop]){
				return 1
			} else {
				return 0
			}
		}
	}

	createTable(cars);
}