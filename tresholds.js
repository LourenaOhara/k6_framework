//tresholds são metricas que esperamos que o teste atenta
//caso não atenda, o teste termina com status de falha]

import http from "k6/http";
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        //limites sobre as requisições com falha
        http_req_failed: ['rate < 0.01'],
        //duração limite da requisição
        http_req_duration: ['p(95) < 20'], //esse 20 é 20ms
        //duração limite da requisição. Nesse caso, o teste é abortado
        http_req_duration: [{threshold:'p(95) < 10', abortOnFail: true}], //esse 20 é 20ms
        //taxa de verificação bem sucedida deve ser superior a 90%
        checks: ['rate > 0.90']
    }
}

export default function(){
   const res = http.get('https://fakestoreapi.com/');
   check(res, {
    'status code é 200': (r) => r.status === 200
   });
}

/*
    Output
     ✓ checks.........................: 100.00% ✓ 4        ✗ 0
     ✗ http_req_duration..............: avg=432.2ms  min=328.66ms med=430.77ms max=538.6ms  p(90)=536.18ms p(95)=537.39ms
     ✓ http_req_failed................: 0.00%   ✓ 0        ✗ 4
     running (02.0s), 0/1 VUs, 4 complete and 1 interrupted iterations
     default ✗ [========================>-------------] 1 VUs  2.0s/3s
     ERRO[0003] thresholds on metrics 'http_req_duration' were crossed; at least one has abortOnFail enabled, stopping test prematurely
*/