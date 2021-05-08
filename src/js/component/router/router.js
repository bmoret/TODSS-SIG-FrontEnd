import {Router} from '@vaadin/router';

const  checkLogin = async () => {
  console.log("sd")
}

const outlet = document.querySelector("#root");
const router = new Router(outlet);
router.setRoutes([
  {
    path: "/",
    animate: true,
    children: [
      { path: "", component: "app-root" },//todo, fill in homepage
      { path: "create-session", component: "create-session-page" },
      { path: "search-employee", component: "search-employee-page" },
      { path: "(.*)", component: "error-page" }, //Keep as last path to keep normal page priority above error page
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