import {Router} from '@vaadin/router';

const  checkLogin = async () => {
  console.log("sd")
};

const outlet = document.querySelector("#root");
const router = new Router(outlet);
router.setRoutes([
  {
    path: "/",
    animate: false,
    children: [
      { path: "", component: "create-session-page" },
    ],
    action: checkLogin()
  },
]);

/** Vaadin Router
 * Set routes neemt een lijs in met route segments.
 * Segment valt te connecten vanaf 'path'
 * Laden kan geanimeerd worden met 'animate'
 * Action is een actie die een route (of subroute) async uitvoert. Zoals een login of rol check
 * Onder route segment vallen child routes, Denk aan alle routes waar een secretaresse bij kan
 * een child bevat een 'path' en een 'component'
 * */