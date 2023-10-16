// módulos embutidos: fazem parte da própria lib do K6
import http from "k6/http";
// módulos remotos: módulos externos adicionados por importação
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.4.0/s3.js'
// módulos do sistema local de arquivos: utiliza algum arquivo como módulo para a ferramenta
import runTest from './metrics.js'
/*
    módulos externos são nocivos aos testes, pois comprometem negativamente a performance
    caso seja necessário utilizar, optar sempre por módulos jslib
    https://jslib.k6.io/
*/

import { sleep } from "k6";


export default function(){
    let res = http.get('https://fakestoreapi.com/');
    sleep(1);

    check(res, {
     'status code é 200': (r) => r.status === 200
    });
 }