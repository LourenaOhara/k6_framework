import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { SharedArray } from "k6/data";

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    }
}

const data = new SharedArray('read data', function () {
    return JSON.parse(open('./data.json')).products;
});

export default function () {
    const prodId = data[Math.floor(Math.random() * data.length)].id
    //console.log(prodId);
    const res = http.get(`https://fakestoreapi.com/products/${prodId}`);

    check(res, {
        'status code 200': (r) => r.status === 200
    });
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}