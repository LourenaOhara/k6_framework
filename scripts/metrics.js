import http from "k6/http";
import { check } from "k6";
//contadores
import { Counter } from "k6/metrics";
//medidores
import { Gauge } from "k6/metrics";
//taxas
import { Rate } from "k6/metrics";
//tendências
import { Trend } from "k6/metrics";

export const options = {
    vus: 1,
    duration: '3s'
}

const mCounter = new Counter('quantidade de chamadas');
const mGauge = new Gauge('tempo bloqueado');
const mRate = new Rate('taxa req 200');
const mTrend = new Trend('taxa de espera');

export default function(){
    const req = http.get('https://fakestoreapi.com/');
    mCounter.add(1);
    mGauge.add(req.timings.blocked);
    mRate.add(req.status === 200)
    mTrend.add(req.timings.waiting);
}

/*
    Output
     quantidade de chamadas.........: 8        2.500528/s
     taxa de espera.................: avg=363.215239 min=330.82445 med=338.32635 max=536.03543 p(90)=403.665391 p(95)=469.850411
     taxa req 200...................: 100.00%  ✓ 8          ✗ 0           
     tempo bloqueado................: 0.001002 min=0.000542 max=267.451401
*/