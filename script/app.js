const values = {}

const inset = document.querySelector('#inset')
const convert = document.querySelector('#convert')
const insetSwitcher = document.querySelector('#inset-switcher')
const convertSwitcher = document.querySelector('#convert-switcher')

const courseUSD = document.querySelector('[data-value="USD"]')
const courseEUR = document.querySelector('[data-value="EUR"]')
const courseGBP = document.querySelector('[data-value="GBP"]')
const courseTRY = document.querySelector('[data-value="TRY"]')
const courseCNY = document.querySelector('[data-value="CNY"]')

invokeCurrencies()

inset.oninput = convertation
convert.oninput = reverseConvertation
insetSwitcher.oninput = reverseConvertation
convertSwitcher.oninput = convertation

function convertation() {
    if(inset.value !== '') convert.value = (inset.value / values[convertSwitcher.value].Value).toFixed(2)
    else convert.value = null
}
function reverseConvertation() {
    if(convert.value !== '') inset.value = (convert.value * values[convertSwitcher.value].Value).toFixed(2)
    else inset.value = null
}

async function invokeCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const json = await response.json()
    const data = await json

    values.USD = data.Valute.USD
    values.EUR = data.Valute.EUR
    values.GBP = data.Valute.GBP
    values.TRY = data.Valute.TRY
    values.CNY = data.Valute.CNY

    courseUSD.textContent = values.USD.Value.toFixed(2)
    courseEUR.textContent = values.EUR.Value.toFixed(2)
    courseGBP.textContent = values.GBP.Value.toFixed(2)
    courseTRY.textContent = values.TRY.Value.toFixed(2)
    courseCNY.textContent = values.CNY.Value.toFixed(2)

    if(values.USD.Value > values.USD.Previous) courseUSD.classList.add('growth')
    else if(values.USD.Value < values.USD.Previous) courseUSD.classList.add('fall')
    if(values.EUR.Value > values.EUR.Previous) courseEUR.classList.add('growth')
    else if(values.EUR.Value < values.EUR.Previous) courseEUR.classList.add('fall')
    if(values.GBP.Value > values.GBP.Previous) courseGBP.classList.add('growth')
    else if(values.GBP.Value < values.GBP.Previous) courseGBP.classList.add('fall')
    if(values.TRY.Value > values.TRY.Previous) courseTRY.classList.add('growth')
    else if(values.TRY.Value < values.TRY.Previous) courseTRY.classList.add('fall')
    if(values.CNY.Value > values.CNY.Previous) courseCNY.classList.add('growth')
    else if(values.CNY.Value < values.CNY.Previous) courseCNY.classList.add('fall')
}
