let result = [
	{
		Löneart: '0204  Timlön',
		From: '24-03-01',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-01',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-04',
		Antal: '3,00',
		Belopp: '750,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-04',
		Antal: '3,00',
		Belopp: '90,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-05',
		Antal: '5,00',
		Belopp: '1 250,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-05',
		Antal: '5,00',
		Belopp: '150,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-07',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-07',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-08',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-08',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-12',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-12',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-13',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-13',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-14',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-14',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-19',
		Antal: '5,00',
		Belopp: '1 250,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-19',
		Antal: '5,00',
		Belopp: '150,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-21',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-21',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-22',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-22',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-25',
		Antal: '5,00',
		Belopp: '1 250,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-25',
		Antal: '5,00',
		Belopp: '150,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-26',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-26',
		Antal: '4,00',
		Belopp: '120,00',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-27',
		Antal: '4,00',
		Belopp: '1 000,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-27',
		Antal: '4,00',
		Belopp: '120,00',
	},
];

let combinedResults = {};

result.forEach((entry) => {
	let date = entry.From;
	let amount = parseFloat(entry.Belopp.replace(/\s/g, '').replace(',', '.'));

	if (!combinedResults[date]) {
		combinedResults[date] = {
			Löneart: 'Timlön',
			From: date,
			Antal: entry.Antal,
			Belopp: 0,
		};
	}

	combinedResults[date].Belopp += amount;
});

let finalResults = Object.values(combinedResults).map((entry) => {
	return {
		...entry,
		Belopp: entry.Belopp.toLocaleString('sv-SE', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}),
	};
});

console.log(finalResults);

let totalBelopp = finalResults.reduce((total, entry) => {
	return total + parseFloat(entry.Belopp.replace(',', '.').replace(/\s/g, ''));
}, 0);

// Format the total to match the original string format, if necessary
let formattedTotalBelopp = totalBelopp.toLocaleString('sv-SE', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

console.log(formattedTotalBelopp);

let afterTax = totalBelopp * 0.7;
let formattedAfterTax = afterTax.toLocaleString('sv-SE', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

console.log(formattedAfterTax);

let FullData = {
  summary: finalResults,
  totalBelopp: formattedTotalBelopp,
  afterTax: formattedAfterTax,
};
