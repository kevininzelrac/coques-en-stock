import { Sha256 } from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { HttpRequest } from "@smithy/protocol-http";
import { SignatureV4 } from "@smithy/signature-v4";

export const handler = async (event) => {
  const request = event.Records[0].cf.request;

  const hostname = request.origin.custom.domainName;
  const protocol = request.origin.custom.protocol;
  const method = request.method;
  const path = request.uri;
  const search = request.querystring.length ? `?${request.querystring}` : "";
  const url = new URL(`${protocol}://${hostname}${path}${search}`);
  let headers = request.headers;

  delete headers["x-forwarded-for"];
  headers["host"] = [{ key: "Host", value: hostname }];

  const httpRequest = new HttpRequest({
    hostname,
    method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    body:
      request.body && request.body.data
        ? Buffer.from(request.body.data, request.body.encoding).toString()
        : undefined,
    headers:
      method === "POST"
        ? {
            "Content-Type": headers["content-type"][0].value,
            host: hostname,
          }
        : { host: hostname },
  });

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: hostname.split(".")[2],
    service: "lambda",
    sha256: Sha256,
  });

  const signed = await signer.sign(httpRequest);

  for (const key in signed.headers) {
    request.headers[key.toLowerCase()] = [
      {
        key: key,
        value: signed.headers[key].toString(),
      },
    ];
  }

  console.log("EVENT ", JSON.stringify(event));
  console.log("SIGNED ", JSON.stringify(signed));
  console.log("REQUEST ", JSON.stringify(request));

  return request;
};

/* 
THESE LIBRARIES IMPORTS ARE AVAILABLE IN THE LAMBDA RUNTIME BUT ALLMOST DEPRECATED
*/
//import { HttpRequest } from "@aws-sdk/protocol-http";
//import { SignatureV4 } from "@aws-sdk/signature-v4";
//import { createHash, createHmac } from "node:crypto";

//function Sha256(secret) {
//  return secret ? createHmac("sha256", secret) : createHash("sha256");
//}
