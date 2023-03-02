const btn = document.querySelectorAll('button')
const spn1 = document.querySelector('#spn1')
const spn2 = document.querySelector('#spn2')
const spn3 = document.querySelector('#spn3')
const tbodyEl = document.querySelector('tbody')
let tablica = []
let myArray = []
if (
  localStorage.getItem('start1') === null &&
  localStorage.getItem('start2') === null &&
  localStorage.getItem('start3') === null &&
  localStorage.getItem('tablica') === null
) {
  in1C = 0
  in3C = 0
} else {
  in1C = parseFloat(localStorage.getItem('start1')) //odczyt elementu
  spn1.innerHTML = in1C
  in3C = parseFloat(localStorage.getItem('start2'))
  spn2.innerHTML = in3C
  spn3.innerHTML = parseFloat(localStorage.getItem('start3'))
  const myArrayString = localStorage.getItem('tablica')
  myArray = JSON.parse(myArrayString)
  myArray.forEach((element) => {
    tbodyEl.innerHTML += `
    <tr>
        <td>${element.wydatek}</td>
        <td>${element.kwota}</td>
    </tr>
     `
  })
}

btn.forEach((element) => {
  element.addEventListener('click', (e) => {
    const in1 = parseFloat(document.getElementById('in1').value)
    const in2 = document.getElementById('in2').value
    const in3 = parseFloat(document.getElementById('in3').value)

    if (e.target.id === 'btn1') {
      in1C = in1C + in1
      spn1.innerHTML = in1C.toFixed(2)
      spn3.innerHTML = (in1C - in3C).toFixed(2)
      document.getElementById('in1').value = ''
    }
    if (e.target.id === 'btn2') {
      in3C = in3C + in3
      spn2.innerHTML = in3C.toFixed(2)
      spn3.innerHTML = (in1C - in3C).toFixed(2)
      const nowyKoszt = { wydatek: in2, kwota: in3 }
      tablica = tablica.concat(myArray)
      tablica.push(nowyKoszt)
      tbodyEl.innerHTML += `
    <tr>
        <td>${nowyKoszt.wydatek}</td>
        <td>${nowyKoszt.kwota.toFixed(2)}</td>
    </tr>
     `
      document.getElementById('in2').value = ''
      document.getElementById('in3').value = ''
    }
    if (e.target.id === 'btn3') {
      localStorage.setItem('start1', in1C) //utworzenie elementu;
      localStorage.setItem('start2', in3C)
      localStorage.setItem('start3', in1C - in3C)
      const myArrayString = JSON.stringify(tablica)
      localStorage.setItem('tablica', myArrayString)
    }
  })
})
