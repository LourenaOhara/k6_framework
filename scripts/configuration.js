//1.inicialização
import sleep from 'k6';

//2. configuração
export const options = {
    vus: 1,
    duration: '10s'
}
//3. execução / codigo vu
export default function(){
    console.log("testando o k6");
}

//4. desmontagem
export function teardown(data){
    console.log(data)
}

//k6 run exemplo.js
//k6 run --vus 10 --duration 30s exemplo.js