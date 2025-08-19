import { canActivateAuth } from "./lib/auth/access.guard";
import { authTokenInterceptor } from "./lib/auth/auth.interceptor";



export {
  canActivateAuth,
  authTokenInterceptor,
}
