const tableData = [
	{
		Löneart: '0204  Timlön',
		From: '24-03-01',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-01',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-04',
		Antal: '3,00',
		Belopp: '666,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-04',
		Antal: '3,00',
		Belopp: '79,92',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-05',
		Antal: '5,00',
		Belopp: '1 110,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-05',
		Antal: '5,00',
		Belopp: '133,20',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-07',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-07',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-06',
		Antal: '5,00',
		Belopp: '1 110,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-06',
		Antal: '5,00',
		Belopp: '133,20',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-08',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-08',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-12',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-12',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-13',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-13',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-14',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-14',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-19',
		Antal: '5,00',
		Belopp: '1 110,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-19',
		Antal: '5,00',
		Belopp: '133,20',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-21',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-21',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-22',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-22',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-25',
		Antal: '5,00',
		Belopp: '1 110,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-25',
		Antal: '5,00',
		Belopp: '133,20',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-26',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-26',
		Antal: '4,00',
		Belopp: '106,56',
	},
	{
		Löneart: '0204  Timlön',
		From: '24-03-27',
		Antal: '4,00',
		Belopp: '888,00',
	},
	{
		Löneart: '4200  Sem.ers övriga',
		From: '24-03-27',
		Antal: '4,00',
		Belopp: '106,56',
	},
];

const timlonData = tableData.filter((item) => item.Löneart === '0204  Timlön');
const semersOvrigaData = tableData.filter(
	(item) => item.Löneart === '4200  Sem.ers övriga'
);

const sumBelopp = (data) => {
	return data.reduce((acc, item) => {
		const normalizedBelopp = item.Belopp.replace(',', '.').replace(' ', '');
		const belopp = parseFloat(normalizedBelopp);
		return acc + belopp;
	}, 0);
};

const totalBeloppTimlon = sumBelopp(timlonData);
const totalBeloppSemersOvriga = sumBelopp(semersOvrigaData);

const beloppToPay = (totalBeloppTimlon + totalBeloppSemersOvriga).toFixed(2);

console.log(`Total Belopp for 0204 Timlön: ${totalBeloppTimlon.toFixed(2)}`);
console.log(
	`Total Belopp for 4200 Sem.ers övriga: ${totalBeloppSemersOvriga.toFixed(2)}`
);
console.log(`Belopp to Pay: ${beloppToPay}`);

// ACCOUNT FOR THEFT (TAXES)

const tax = 0.7;

const beloppToPayAfterTax = (beloppToPay * tax).toFixed(2);
console.log(`Belopp to Pay (after tax): ${beloppToPayAfterTax}`);
