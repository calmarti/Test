const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream("datos_prueba_tecnica.csv", { encoding: "utf-8" })
  .pipe(csv({ separator: ";" }))
  
  .on("data", (data) => {
    results.push(data);
    
  })
  .on('error', (error)=> console.log(error))
  .on("end", () => {
    console.log("Data loaded");
    
    
    //1. Indicar cuantos hombres y mujeres hay del total de empleados.
    const totalFemale = results.filter(elem=>elem.sexo==='M').length;
    const totalMale = results.filter(elem=>elem.sexo==='H').length;
    console.log("Total number of female employees: ", totalFemale);
    console.log("Total number of male employees: ", totalMale);
    


    //2. Indica la suma del salario bruto anual de los empleados de la empresa 1 (Equilibra IT) y el centro de trabajo CT2 (Alovera)
    const salarioBrutoAnualTotal = 
    results.filter(elem=>elem['ID Empresa']==='1' && elem['Nombre centro trabajo']==='Alovera')
    .map(elem=>Number(elem['salario bruto anual']))
    .reduce((total=0,elem)=> total + elem);
    console.log('Total annual wages - Equilibrha IT - Alovera: ', salarioBrutoAnualTotal);



    //3. Imprime un listado de empleados (id empleado, nombre, apellidos, salario y 
    // empresa de los empleados que cobren más de 28000 euros  y que pertenezcan a la 
    // empresa 2 (Equilibra RRHH) 
    const targetGroup = results.filter(elem=> elem['salario bruto anual'] > 28000 && elem['ID Empresa']==='2');
    
    console.log("list of employees working on Equilibrha IT that earn more than 28.000€: \n\n", targetGroup);

  });





 
