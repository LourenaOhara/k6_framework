//imports necessários para a execução dos testes com http e utilizando arquivo json
import { check } from "k6";
import http from "k6/http";
import { SharedArray } from "k6/data";

/* OPTIONS
    Stage: entrada parcionada de usuários vituais. Necessário uma vez que não serão enviadas todas 
    as mensagens de um só vez*/
    export const options = {
    stages: [
        { duration: 'xs', target: y },
        { duration: 'xs', target: y },
        { duration: 'xs', target: y },
        { duration: 'xs', target: y },
        { duration: 'xs', target: y },
    ],
    
    //Thresholds: métricas mais vizíveis
    thresholds: {
        http_req_duration: ['p(95) < 200'],
        data_received: ['count > 1000'], 
        data_sent: ['count > 1000']
    }
}

// tratamento da mensagem. Criação do json contendo os campos necessários para o envio
function generateArray() {
  const message = new Array();
    message = {
      tipoEvento: tipoEvento,
      codigoCredor: codigoCredor,
      entidadeId: Math.floor(Math.random() * 2000)
    };
  return message;
}

// dados salvos no arquivo 
let data;
if (__ENV.SHARED === "true") {
  data = new SharedArray("mydata", generateArray);
} else {
  data = generateArray();
}

export default function () {
  const userData = JSON.stringify(data);
  const res = http.post("url_envio_mensagem", userData, {
    headers: { "Content-Type": "application/json" },
  });

  // checks: métricas de response relevantes
  check(res, {
    'status is 200': (r) => r.status === 200,
    'body size is 11,105 bytes': (r) => r.body.length == 11105,
  });
}
