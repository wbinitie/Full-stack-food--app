import { signOut } from "./auth-api";

const auth = {
  authenticate(jwt, cb) {
    //Ensure window is defined
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },

  clearJWT(role, cb) {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("jwt"))
        JSON.parse(sessionStorage.getItem("jwt"));
      signOut(role, JSON.parse(sessionStorage.getItem("jwt")));
      sessionStorage.removeItem("jwt");
    }
    cb();
  },
  isAuthenticated() {
    if (typeof window == "undefined") return false;
    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },
};
export default auth;
