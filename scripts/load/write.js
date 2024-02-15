import { check } from "k6";
import http from "k6/http";
import { SharedArray } from "k6/data";

const n = 10;
function generateArray() {
  const message = new Array(n);
  for (let i = 0; i < 10; i++) {
    message[i] = {
      title: "lou product",
      price: Math.floor(Math.random() * 11),
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronics",
    };
  }
  return message;
}

let data;
if (__ENV.SHARED === "true") {
  data = new SharedArray("my data", generateArray);
} else {
  data = generateArray();
}

export default function () {
  //console.log(data);
  const userData = JSON.stringify(data);
  const res = http.post("https://fakestoreapi.com/products", userData, {
    headers: { "Content-Type": "application/json" },
  });

  //console.log('---------------------------------------------')
  console.log(res.request.body.category);

  check(res, {
    "status is 200": (r) => r.status === 200,
    // "category": (r) => res.json().json.category === 'electronics'
  });
}
