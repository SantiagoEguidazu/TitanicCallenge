/* ENUNCIADO
  PARTE 1:
  Se desea obtener las personas que estuvieron en el titanic que sean: mujeres y menores a 76 años. Agruparlas de la siguiente manera: 0-15, 16-30, 31-45, 46-60, 61-75.

  PARTE 2:
  Se debería poder agrupar de 5 en 5, de 10 en 10. Es decir, de forma variable. A su vez, imprimir la cantidad de personas dentro de cada grupo y mostrar los rangos en el grafico.

*/

/*
    MATERIAL DESGIN - INICIO
*/
import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCFormField} from '@material/form-field';
import {MDCRadio} from '@material/radio';

const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const radio = new MDCRadio(document.querySelector('.mdc-radio'));
const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
formField.input = radio;
/*
    MATERIAL DESGIN - FIN
*/

import titanic from '../titanic.json';
const total = titanic.length;


// Barra de progreso
const passangers_title = document.getElementById('progress__title');
const passangers_progress = document.getElementById('progress__fill');

// Contenedor de los pasajeros
const passengers_list = document.getElementById('passengers_list');

// Input de rango inicial
const inputRange = document.getElementById('range');

// Input radios para seleccionar el sexo de los pasajeros
const radioFemale = document.getElementById('female-radio');
const radioMale = document.getElementById('male-radio');

// Botones para filtrar, avanzar y retroceder en el rango de edad
const btnFilter = document.getElementById('filter');
const btnPrev = document.getElementById('filter_prev');
const btnNext = document.getElementById('filter_next');

// Variables globales para facilitar los calculos de filtrado
var intPrev;
var intNext;
var intRange;


// Boton FILTRAR - Evento de click - Filtra el arreglo de datos entre 0 y el rango inicial (inputRange)
btnFilter.addEventListener("click", () => {
    
    let dataFilteredSex = filterBySex();

    intRange = parseInt(inputRange.value);
    intPrev = 0;
    intNext = intRange;
    let dataFilteredAge = filterByAge(dataFilteredSex, intNext);

    passangers_title.innerHTML = 'Age group: 0 to ' + intNext + ' / Number of passengers: ' + dataFilteredAge.length;
    passangers_progress.style.width = percentageToString(dataFilteredAge.length * 100 / total);

    insertFilteredArray(dataFilteredAge);
});


// Boton NEXT - Evento de click - Aumenta el filtro por el valor de inputRange 
btnNext.addEventListener("click", () => {

    let dataFilteredSex = filterBySex();

    intPrev += intRange;
    intNext += intRange;
    let dataFilteredAge = filterByAgePrevNext(dataFilteredSex, intPrev, intNext);

    passangers_title.innerHTML = 'Age group: ' + intPrev + ' to ' + intNext + ' / Number of passengers: ' + dataFilteredAge.length;
    passangers_progress.style.width = percentageToString(dataFilteredAge.length * 100 / total);

    insertFilteredArray(dataFilteredAge);
});


// Boton NEXT - Evento de click - Disminuye el filtro por el valor de inputRange
btnPrev.addEventListener("click", () => {

    let dataFilteredSex = filterBySex();

    if( intPrev - intRange < 0 ) {
        intPrev = 0;
        intNext = intRange;
        var dataFilteredAge = filterByAgePrevNext(dataFilteredSex, intPrev, intNext);

        passangers_title.innerHTML = 'Age group: 0 to ' + intNext + ' / Number of passengers: ' + dataFilteredAge.length;
    } else {

        intPrev -= intRange;
        intNext -= intRange;
        var dataFilteredAge = filterByAgePrevNext(dataFilteredSex, intPrev, intNext);
        
        passangers_title.innerHTML = 'Age group: ' + intPrev + ' to ' + intNext + ' / Number of passengers: ' + dataFilteredAge.length;
    }

    passangers_progress.style.width = percentageToString(dataFilteredAge.length * 100 / total);

    insertFilteredArray(dataFilteredAge);
});


/*
*  PRE:
*  POST: Devuelve un array con filtrado por los botones radio.
*        Si el boton radioFemale esta prendido, devuelve un arreglo filtrado con el dato 'female'.
*        Si el boton radioMale esta prendido, devuelve un arreglo filtrado con el dato 'male'.
*        Si el boton radioBoth esta prendido, devuelve un arreglo sin filtrar (default).
*/
const filterBySex = () => {
    let tempData;
    
    switch(true) {
        case radioFemale.checked: 
            tempData = titanic.filter(record => record.fields.sex === 'female');
            break;
        
        case radioMale.checked: 
            tempData = titanic.filter(record => record.fields.sex === 'male');
            break;

        default:
            tempData = titanic;
            break;
    }

    return tempData;
};


/*
*  PRE:
*  POST: Devuelve un array con filtrado por el valor del inputRange. Este valor corresponde al rango de edad por el cual se desea filtrar.
*        Les asigna un valor a las variables intRange (utilizada para sumar y restar el rango), intPrev e intNext. Estas dos ultimas variables se utilizan para cambiar el filtrado por edad, es decir, aumentarlo o reducirlo.
*/
const filterByAge = (data, int) => {
    intRange = parseInt(int);
    intPrev = 0;
    intNext = parseInt(int);
    return data.filter(record => record.fields.age <= int);
};


/*
*  PRE:
*  POST: Devuelve un array con filtrado por el valor de intPrev e intNext.
*        Les asigna un nuevo valor a las variables intPrev e intNext.
*/
const filterByAgePrevNext = (data, lower, higher) => {
    intPrev = parseInt(lower);
    intNext = parseInt(higher);
    return data.filter(record => record.fields.age >= lower && record.fields.age <= higher);
};


/*
*  PRE:
*  POST: Recibe un arreglo por parametro y lo inserta en passengers_list.
*/
const insertFilteredArray = (array) => {
    passengers_list.innerHTML = '';

    array.forEach((record, i) => {
        let passenger = createPassengerInfo(record, i);

        passengers_list.innerHTML += passenger;
    });
}


/*
*  PRE:
*  POST: Devuelve un template donde se muestra la informacion del pasajero.
*/
const createPassengerInfo = (passenger, i) => {
    let newClassName = '';
    if( i % 2 === 0 ) {
        newClassName = 'pair';
    } else {
        newClassName = 'odd';
    }

    return `
        <div class="wrapper__passanger ${newClassName}" id="passanger_${i}">
            <h3 class="passanger__sex_age">${passenger.fields.sex}, ${passenger.fields.age}</h3>
            <p class="passanger__name">${passenger.fields.name}</p>
        </div>
    `;
};


/*
*  PRE:
*  POST: Recibe por paramentro el resultado de una division, el cual se multiplica por 100 para convertirlo en un porcentaje y lo devuelve en String.
*/
const percentageToString = (percentage) => {
    
    return percentage + '%';
}
  