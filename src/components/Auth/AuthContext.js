import {createContext} from "react";

export class Auth {
   constructor(token) {
      this.token = token;
   }

   authorized() {
      return (! (this.token == null));
   }


}

export const AuthContext = createContext(null);

