const primulaFunction = require('../functions/primulaFunction')

async function mainWi() {
  const advancedtableData = [
    {
      Löneart: '0204  Timlön',
      From: '23-11-06',
      Tom: '23-11-06',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    },
    {
      Löneart: '4200  Sem.ers övriga',
      From: '23-11-06',
      Tom: '23-11-06',
      Antal: '5,00',
      ÁPris: '',
      Tillfällen: '1,00',
      Belopp: '102,00'
    },
    {
      Löneart: '0204  Timlön',
      From: '23-11-09',
      Tom: '23-11-09',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    },
    {
      Löneart: '4200  Sem.ers övriga',
      From: '23-11-09',
      Tom: '23-11-09',
      Antal: '5,00',
      ÁPris: '',
      Tillfällen: '1,00',
      Belopp: '102,00'
    },
    {
      Löneart: '0204  Timlön',
      From: '23-11-13',
      Tom: '23-11-13',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    },
    {
      Löneart: '4200  Sem.ers övriga',
      From: '23-11-13',
      Tom: '23-11-13',
      Antal: '5,00',
      ÁPris: '',
      Tillfällen: '1,00',
      Belopp: '102,00'
    },
    {
      Löneart: '0204  Timlön',
      From: '23-11-16',
      Tom: '23-11-16',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    },
    {
      Löneart: '4200  Sem.ers övriga',
      From: '23-11-16',
      Tom: '23-11-16',
      Antal: '5,00',
      ÁPris: '',
      Tillfällen: '1,00',
      Belopp: '102,00'
    },
    {
      Löneart: '0204  Timlön',
      From: '23-11-20',
      Tom: '23-11-20',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    },
    {
      Löneart: '4200  Sem.ers övriga',
      From: '23-11-20',
      Tom: '23-11-20',
      Antal: '5,00',
      ÁPris: '',
      Tillfällen: '1,00',
      Belopp: '102,00'
    },
    {
      Löneart: '0204  Timlön',
      From: '23-11-23',
      Tom: '23-11-23',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    },
    {
      Löneart: '4200  Sem.ers övriga',
      From: '23-11-23',
      Tom: '23-11-23',
      Antal: '5,00',
      ÁPris: '',
      Tillfällen: '1,00',
      Belopp: '102,00'
    },
    {
      Löneart: '0204  Timlön',
      From: '23-11-27',
      Tom: '23-11-27',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    },
    {
      Löneart: '4200  Sem.ers övriga',
      From: '23-11-27',
      Tom: '23-11-27',
      Antal: '5,00',
      ÁPris: '',
      Tillfällen: '1,00',
      Belopp: '102,00'
    },
    {
      Löneart: '0204  Timlön',
      From: '23-11-30',
      Tom: '23-11-30',
      Antal: '5,00',
      ÁPris: '170,00',
      Tillfällen: '1,00',
      Belopp: '850,00'
    }
  ]

  const data = [
    { Date: '06', Hours: '5' },
    { Date: '09', Hours: '5' },
    { Date: '13', Hours: '5' },
    { Date: '16', Hours: '5' },
    { Date: '20', Hours: '5' },
    { Date: '23', Hours: '5' },
    { Date: '27', Hours: '5' },
    { Date: '30', Hours: '5' }
  ]

  await primulaFunction.VerifyData(data, advancedtableData)

  //await testVerifyData(data, advancedtableData)
}

async function testVerifyData(data, advancedtableData) {
  let validFormData = 1

  // Filter out '4200  Sem.ers övriga' from advancedtableData
  const filteredAdvancedData = advancedtableData.filter(
    (item) => item['Löneart'] === '0204  Timlön'
  )

  console.log('filteredAdvancedData: ', filteredAdvancedData)

  // Check if the lengths of the datasets match
  if (data.length !== filteredAdvancedData.length) {
    console.log('Dataset lengths do not match.')
    return 0 // Or handle the mismatch as required
  }

  // Iterate through the filtered data
  for (let i = 0; i < filteredAdvancedData.length; i++) {
    const fromValue = filteredAdvancedData[i].From
    const antalHours = filteredAdvancedData[i].Antal.replace(',', '.') // Replace comma with dot for consistency
    const dayPart = fromValue.split('-').slice(-1)[0].trim()
    const dataPart = data[i].Date
    const hourPart = data[i].Hours

    // Convert hours to the same format before comparison
    let hoursDot = parseFloat(antalHours).toFixed(2).toString()

    if (dayPart === dataPart && hoursDot === hourPart) {
      console.log(`Row ${i + 1}: Matches`)
      console.log('dayPart: ', dayPart, ' dataPart: ', dataPart)
      console.log('hoursDot: ', hoursDot, ' hourPart: ', hourPart)
    } else {
      console.log(`Row ${i + 1}: Does not match`)
      console.log('Day part: ', dayPart, ' Data part: ', dataPart)
      console.log('hoursDot: ', hoursDot, ' hourPart: ', hourPart)
      validFormData = 0
    }
  }

  console.log('validFormData: ', validFormData)
  return validFormData
}

async function test() {
  await mainWi()
}

test()
