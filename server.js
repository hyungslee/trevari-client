const next = require("next");
const routes = require("./routes/routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const express = require("express");
const handle = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/book/:id', (req, res) => {
      console.log("/a/a/a/a", req.params.id)
      // as prop인 /books/:id 요청이 오면
      const actualPage = '/book' //실제 href route로 설정한다.
      const queryParams = {id: req.params.id} // /books의 쿼리값을 설정한다.
      app.render(req, res, actualPage, queryParams)
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

// const handler = routes.getRequestHandler(app, ({ req, res, reoute, query }) => {
//   app.render(req, res, reoute.page, query);
// });