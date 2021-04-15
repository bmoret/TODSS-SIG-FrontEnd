// import { Router } from "@vaadin/router";
import {Router} from 'https://unpkg.com/@vaadin/router';

const outlet = document.querySelector("#root");
const router = new Router(outlet);
router.setRoutes([
  {
    path: "/",
    animate: false,
    children: [
      { path: "", component: "create-session-screen" },
    ],
  },
]);