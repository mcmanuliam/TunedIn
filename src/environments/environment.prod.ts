/**
 * This file contains keys and URLs that are protected for security
 * and will not be included in version control.
 *
 * If you need this file please contact https://github.com/mcmanuliam.
 */
import {local} from "../config/local";

interface IEnvironment {
  backendKey: string,

  backendUrl: string,

  production: boolean;
}

export const environment: IEnvironment = {
  backendKey: local.backend.key,

  backendUrl: local.backend.url,

  production: true
};
