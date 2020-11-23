import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import graphQLProxy, { ApiVersion } from "@shopify/koa-shopify-graphql-proxy";
import Koa from "koa";
const serve = require('koa-static');
import next from "next";
import Router from "koa-router";
import session from "koa-session";
import * as handlers from "./handlers/index";
dotenv.config();
const cors = require('koa2-cors');
import firebase from '../firebase/firebase.config';


const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SCOPES } = process.env;
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(
    session(
      {
        sameSite: "none",
        secure: true,
      },
      server
    )
  );
  server.keys = [SHOPIFY_API_SECRET];
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: [SCOPES],

      async afterAuth(ctx) {
        //Auth token and shop available in session
        //Redirect to shop upon auth
        const { shop } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
        });
        ctx.redirect("/");
      },
    })
  );
  server.use(
    graphQLProxy({
      version: ApiVersion.October19,
    })
  );



  /*
  router.get("/api/:test", verifyRequest(), async (ctx) => {
    console.log("Route called: /api/", " Param: ", ctx.params.test);
    const {shop, accessToken} = ctx.session;
    console.log("Store: ", shop, " Access_Token: ", accessToken);
    ctx.res.statusCode = 200;
  })
  */


  /*

  MockUp Products 

  Iphone 12 ID: 6005440675989  
  Prodotto Prova 2: 6005451784341  PERSONALIZZABILE
 


  router.get("api/options/:shop/:id", async (ctx) => {
    
    //Chiamata al db per prendere le opzioni
    ctx.body = options
  })
   
  */


  router.get("/api/dbtest", async(ctx) => {
    firebase.collection("clients").get().then( data => {
      console.log("Data sent");
      ctx.body = {
        ciao: "CIAO"
      };
    }).catch( e => {
      console.log(e);
    })
  })


  router.get("(.*)", verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(serve('./public'));
  server.use(cors({origin: "*"}));
  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

