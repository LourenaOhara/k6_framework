import http from "k6/http";
import { check, group } from "k6";

export const options = {
    vus: 4,
    duration: '5s',
    thresholds: {
        'http_req_duration{type:search-all}': ['p(95) < 500']
    },
    //tag de uso global (definidas no option)
    tags:{
        name: 'test'
    }
}

export default function() {
        group('request all products categories', function () {
            const response1 = http.get('https://fakestoreapi.com/products/categories');
            tags:{
                type: 'search-all'
            }
            check(response1, {
                'status code 200 get all': (r) => r.status === 200
            });
        });

        group('request by id', function () {
            const response2 = http.get('https://fakestoreapi.com/products/1');
            check(response2, {
                'status code 200 get id': (r) => r.status === 200
            });
        });
    }
    /*Output
         ✓ { type:search-all }..........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
    */