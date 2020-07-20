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
  return `
    <div id="wrapper__passanger_${i}">
      <h3 class="name">${passenger.fields.name}</h3>
      <p class="sex">${passenger.fields.sex}</p>
      <p class="age">${passenger.fields.age}</p>
    </div>
  `;
};


/*
*  PRE:
*  POST: Recibe por paramentro el resultado de una division, el cual se multiplica por 100 para convertirlo en un porcentaje y lo devuelve en String.
*/
const percentageToString = (percentage) => {

    percentage = percentage * 100;
    
    return percentage + '%';
}