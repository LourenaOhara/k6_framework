//forma de organizar scripts
import http from "k6/http";
import { check, group } from "k6";

export const options = {
    vus: 4,
    duration: '5s',
    thresholds: {
        'http_req_duration{group:::requisição por id}': ['p(95) < 500']
    }
}

export default function() {
        group('request all products categories', function () {
            const response1 = http.get('https://fakestoreapi.com/products/categories');
            check(response1, {
                'status code 200 get all': (r) => r.status === 200
            });
        });

        group('request by id', function () {
            const response2 = http.get('https://fakestoreapi.com/products/9');
            check(response2, {
                'status code 200 get id': (r) => r.status === 200
            });
        });
    }

    /*Output:
        █ request all products categories

        ✓ status code 200 get all

        █ request by id

        ✓ status code 200 get id
    */