const express = require('express');
const app = express();
const port=3000;

//const readLine = require('readline')
const file = './src/users.txt'
//const fs = require('fs')

//Library to read file txt
const lr = require('line-reader');

var mainArr = []
var users=0;
var valid=0;
var validKeys=['u s r :','e m e :','p s w :','a g e :','l o c :','f l l :']
var flag=false
var valido=true;

var dataUser = []

app.get('/', async (req,res) =>{
    await count();

    await res.send(`Total-Users: ${users}, Valid-Users: ${valid}, Invalid-Users: ${users - valid}`);
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})


const read = async () => {
    lr.eachLine(file, (line, last)=>{
        mainArr.push(line);
    })

}

const count = async ()=>{
    dataUser = []
    let len = mainArr.length;
    users=1;
    valid=0;

    for(let i=0; i<len;i++){
        if(mainArr[i] == ''){
            //validar
            users++;
            validar();            

            //limpiar
            dataUser=[]
            continue
        }else{
            dataUser.push(`${mainArr[i]} `)

            //valida en la ultima linea
            if(i == len - 1){
                validar();
            }
        }
    }

    function validar(){
        console.log('*****start*****')
        let strTemp = ''
        valido = true;

        //juntar
        for(let i=0;i<dataUser.length;i++){
            for(let j=0;j<dataUser[i].length;j++){
                strTemp += `${dataUser[i][j]} `;
            }
        }

        //separar
        let arrTemp2 = []
        strTemp = strTemp.trim();
        let arrTemp = strTemp.split('   ');

        //validar
        let lenKeys = validKeys.length;

        //valida cantidad
        if(arrTemp.length < lenKeys ){ 
            valido=false;
        }else{
            //validar contenido
            valido = validarContenido(arrTemp);
        }

        if(valido){
            valid++;
        }

        
        //console.log(arrTemp)
        console.log(`${arrTemp.length} / ${validKeys.length}`)
        console.log(`--${valido}--${strTemp}--`);
        console.log('*****end*****')
    }

}

function validarContenido(arreglo){
    let countMatch = 0;
    let arregloTemp = arreglo;

    arregloTemp.forEach(el => {
        for(let i=0;i<validKeys.length;i++){
            let str = validKeys[i];
            let position = el.indexOf(str);
            if(position !== -1){
                countMatch++;
            }
            console.log(`cadena> ${el.toString()} termino> ${validKeys[i]} posicion: ${position}`);
        }
    });
    
    
    console.log(countMatch);
    if(countMatch >= validKeys.length){
        return true;
    }

    return false;
}

read();