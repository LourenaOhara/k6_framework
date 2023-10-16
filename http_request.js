//https://k6.io/docs/

import http from "k6/http";

export default function(){
    http.get('https://fakestoreapi.com/');
}