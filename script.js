// Arrayen som innehåller våra objekt i detta fall har BIL och tsm BILAR
// Då sidan inte ska vara tom när vi kommer in på den populerar vi arrayen från början 
let cars = [
	{
		brand: 'Volvo',
		model: 'V90',
		year: 2019,
		milage: '0',
		colour: 'Vit',
		gearbox: 'Automat',
		price: 467000,
		used: 'Ny'	
	},
	{
		brand: 'Audi',
		model: 'A6',
		year: 2004,
		milage: 54500,
		colour: 'Silver',
		gearbox: 'Manuell',
		price: 28500,
		used: 'Begagnad'
	},
	{
		brand: 'BMW',
		model: 'E42',
		year: 2000,
		milage: 4300,
		colour: 'Grå',
		gearbox: 'Automat',
		price: 1000,
		used: 'Begagnad'
	},
	{
		brand: 'Jeep',
		model: 'Wrangler',
		year: 2016,
		milage: 2900,
		colour: 'Svart',
		gearbox: 'Manuell',
		price: 120000,
		used: 'Begagnad'
	},
	{
		brand: 'BMW',
		model: 'E92',
		year: 2012,
		milage: 6900,
		colour: 'Gul',
		gearbox: 'Automat',
		price: 90000,
		used: 'Begagnad'
	},
	{
		brand: 'Volvo',
		model: 'V70',
		year: 2004,
		milage: 29000,
		colour: 'Marin blå',
		gearbox: 'Automat',
		price: 10000,
		used: 'Begagnad'
	},
]
// Kör funktionen createTable
createTable();

// Definierar classen Car med alla värden vårat projekt kräver för att målen skall bli uppfyllda
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

// Ganska självförklarna class
function getCarValues() {
	let validation = false;
	let outputError = document.getElementById("error-output");
	let form = document.getElementById('form');
	let brand = capitalize(document.getElementById("brand").value)
	let model = capitalize(document.getElementById("model").value)
	let year = document.getElementById("year").value
	let milage = document.getElementById("milage").value
	let colour = capitalize(document.getElementById("colour").value)
	let gearbox = capitalize(document.getElementById("gearbox").value)
	let price = document.getElementById("price").value
	let used;
	
	// Kallar på validate funktionen och byter variabeln validation ifall alla variabler 
	// Med value ovanför har ett value.
	validate()
	// Validerings funktion för inputs 
	function validate() {
		if(!brand || !model|| !year || !milage || !colour || !gearbox || !price) {
			return validation = false
		} else {
			return validation = true
		}
	}
	// Ifall dom har det går vi vidare och först resetar error diven för felet försvinner
	// om vi först inte fyllt i och nu i efterhand har fyllt i alla inputs
	if(validation === true) {
		outputError.innerHTML = '';
		// Ganska självförklarna, beroende på boxen av gör vi bilen skick
		if (checkbox.checked) {
			document.getElementById("checkbox").value = "Begagnad";
			used = document.getElementById("checkbox").value;
		}
		else {
			document.getElementById("checkbox").value = "Ny";
			used = document.getElementById("checkbox").value;
		}

		// Vi skapar ett nytt objekt Car med dess attributer som får värdet från tidigare
		// definierade variabler som i sin tur får värdet från inputs.
		let car = new Car(brand, model, year, milage, colour, gearbox, price, used);
	
		// Unshift i skillnad från push 
		// Sätter in objektet på position 0 för arreyen istället för sista
		// Vi vill ha den ha den senast tillagda bilen längst upp i listan.
		cars.unshift(car);
	
		// Resetar förmuläret så att alla inputs blir tomma
		// Har ingen funktionalitet förutom UX
		form.reset();

		// Vi kör create table igen.
		createTable();
	} else {
		// Har du misslyckats att mata in världerna???????????!!! :DD
		error = `<p>Var vänlig och fyll i alla fälten!</p>`;
		outputError.innerHTML = error
	}
}

// En funktion som gör all string börjar med stor boxtav 
//detta behövs för sorteringen annars knasar den

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Funktionen create table 
function createTable() {
	/// Här börjar hela tabbellen
	let carOutput = "<table><tr>";
	// Här är första raden av tabellen dess så kallade heading med alla "knappar" 
	// Vi kör funktionen filtercars onclick här och skickar med this dvs knappen för 
	// att sedan använda oss av this.id för att få brand year ex för filtriering
	let th = `
		<th><button type='button' onclick='filterCars(this);' id='brand'>Märke</button></th>
		<th><button type='button'>Modell</button></th>
		<th><button type='button' onclick='filterCars(this);' id='year'>Modellår</button></th>
		<th><button type='button' onclick='filterCars(this);' id='milage'>Miltal</button></th>
		<th><button type='button'>Färg</button></th>
		<th><button type='button' onclick='filterCars(this);' id='gearbox'>Växellåda</button></th>
		<th><button type='button' onclick='filterCars(this);' id='price'>Pris</button></th>
		<th><button type='button' onclick='filterCars(this);' id='used'>Skick</button></th>
	`;

	carOutput += th 
	// Sist men inte minst varje bil får sin rad
	cars.forEach((item) => {
		// så för varjebil skapar vi en rad 
		carOutput += "<tr class='car-info'>";

		// För varje attribut av bilen på de skriver vi ut det för varjebil
		for (var attrb in item) {
			carOutput += "<td>" + item[attrb] + "</td>";
		}

		// Vi stänger raden
		carOutput += "</tr>";

	});

	// Vi stänger table och outputar hela den till output diven.
	carOutput += "</table>";
	document.getElementById("output").innerHTML = carOutput;
}

// Funktionen filter cars 
function filterCars(sortBy) {
	output = document.getElementById("output");
	output.innerHTML = '';

	// Vi kör sort på arrayen med cars sedan skickar vi in en funktion i den
	// Med funktionen medföljer vårat id. Detta är beskrivet bättre på rad 149 varför osv.
	cars.sort(sortOn(sortBy.id))

	// Funktionen sorton får nu veta enligt vad vi vill sortera och jämför 
	// Värden vilket ska komma före det andra och på det beroende på det returnerar -1 1 eller 0
	function sortOn(prop) {
		return function(a, b) {
			if (a[prop] < b[prop]) {
				return -1;
			} else if (a[prop] > b[prop]){
				return 1;
			} else {
				return 0;
			}
		}
	}
	// Vi skickar ändrade arrayen till createtable för att få en uppdaterad table
	createTable(cars);
}