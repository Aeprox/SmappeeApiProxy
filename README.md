# SmappeeApiProxy

A small nodeJS project that can serve as a proxy for the Smappee energy monitors local API. Because the local/private Smappee API does not implement [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) it is not possible to query it directly from the browser using javascript for example.
This proxy aleviates this problem by actng as a (kind of) proxy, and also serves a simple graphical frontend (using canvasJS for the graphs).

It does so by fetching http://SMAPPEEIP/gateway/apipublic/instantaneous, and passing these values back to the client, but with the 'Access-Control-Allow-Origin' header set to accept every domain/address. 

## Configure
Smappee IP and password can be configured in server.js

## Use

Browse to your nodeJS instance to view the graphical frontend, or do a GET of the /api path, and you'll receive the same data as you'd get by querying /gateway/apipublic/instantaneous, but with CORS! If you want to make sure only your webpage can use the proxy, you might want to use your domain in the 'Access-Control-Allow-Origin' header instead of the wildcard.

