#!/usr/bin/env node

import http from "http";

import next from "next";

async function main(uris) {
  const nextApp = next({});
  const nextHandleRequest = nextApp.getRequestHandler();
  await nextApp.prepare();

  const htmls = Object.fromEntries(
    await Promise.all(
      uris.map((uri) => {
        try {
          // If it's a fully qualified URL, make it its pathname
          uri = new URL(uri).pathname;
        } catch {}
        return renderPage(nextHandleRequest, uri);
      })
    )
  );
  console.log(htmls);
}

async function renderPage(handler, url) {
  const req = new http.IncomingMessage(null);
  const res = new http.ServerResponse(req);
  req.method = "GET";
  req.url = url;
  req.path = url;
  req.cookies = {};
  req.headers = {};
  await handler(req, res);
  if (res.statusCode !== 200) {
    throw new Error(`${res.statusCode} on rendering ${req.url}`);
  }
  for (const { data } of res.outputData) {
    const [, body] = data.split("\r\n\r\n");
    if (body) return [url, body];
  }
  throw new Error("No output data has a body");
}

main(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exit(1);
});
