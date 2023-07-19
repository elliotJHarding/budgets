import {createContext} from "react";
import Cookies from 'universal-cookie'

export class Auth {

   constructor(token) {
      const cookies = new Cookies();
      token != null && cookies.set('auth', token)

      this.token = token;
   }

   authorized() {
      const cookies = new Cookies();
      let token = cookies.get('auth')

      this.token = token != 'null' ? cookies.get('auth') : this.token;

      return (! (this.token == null));
   }

   logout() {
      const cookies = new Cookies();
      this.token = null;
      cookies.remove('auth');
      console.log('logout')
   }

   header() {
      return(
         {
            Authorization: `Token ${this.token}`
         }
      );
   }


}

export const AuthContext = createContext(null);

