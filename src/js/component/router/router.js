import {Router} from '@vaadin/router';
import {retrieveAccessToken} from "../../service/authorization-service";
import {store} from "../../state/store/store";

const  checkLogin = async () => {
  if (retrieveAccessToken() === undefined || retrieveAccessToken() === '' || store.getState().user.isLoggedIn === false){
    setTimeout(() => Router.go("/login?redirected=true"), 10)
  }
};

const outlet = document.querySelector("#root");
export const router = new Router(outlet);
router.setRoutes([
  {
    path: "/",
    children: [
      { path: "", component: "home-page" },
      { path: "login", component: "login-page" },
      { path: "register", component: "register-page" },
      { path: "create-session", component: "create-session-page" },
      { path: "search-employee", component: "search-employee-page" },
      { path: "person/:id", component: "view-employee-page" },
      { path: "session/:id", component: "view-session-page" },
      { path: "create-employee", component: "create-employee-page" },
      { path: "modify-employee/:id", component: "modify-employee-page" },
      { path: "(.*)", component: "page-not-found-page" }, //Keep as last path to keep normal page priority above error page
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