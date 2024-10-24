import {local} from "../local";
import type {IBaseProvider} from "./base-provider";

interface ITicketMasterConfig extends IBaseProvider {}

export const ticketmasterConfig: ITicketMasterConfig = {
  baseUrl: 'https://app.ticketmaster.com',

  clientId: local.ticketmaster.client,

  clientSecret: local.ticketmaster.secret,
}
