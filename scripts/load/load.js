import { check } from "k6";
import http from "k6/http";
import { SharedArray } from "k6/data";

const user = new SharedArray("some name", function () {
  // All heavy work (opening and processing big files for example) should be done inside here.
  // This way it will happen only once and the result will be shared between all VUs, saving time and memory.
  const f = JSON.parse(open("./data_load.json"));
  return f;
});

export default function () {
  const userData = user[0].address.street;
  const res = http.get(
    "https://jsonplaceholder.typicode.com/users",
    JSON.stringify(userData),
    { headers: { "Content-Type": "application/json" } }
  );

  check(res, {
    "status is 200": (r) => r.status === 200,
    "street name": (r) => r.body.includes("Kulas Light"),
  });
}
