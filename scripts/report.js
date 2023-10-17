import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 1,
    duration: '3s'
}

export default function(){
   const res = http.get('https://fakestoreapi.com/');
   check(res, {
    'status code é 200': (r) => r.status === 200
   });
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}