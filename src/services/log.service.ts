/*
 * This may seem like a useless file but the idea is...
 * while we develop we bundle all of our logs into this one service
 * and when I find time I can easily set up a store and use these
 * logs for development purposes.
 */

import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private static logMessage(
    level: 'warn' | 'error' | 'log',
    message: string,
    namespace: string,
    value?: unknown,
  ): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${timestamp} - [${namespace}] ${message}`;
    if (value) {
      console[level](formattedMessage, value);
    } else {
      console[level](formattedMessage);
    }
  }

  public static warn(message: string, namespace: string, value?: unknown): void {
    this.logMessage('warn', message, namespace, value);
  }

  public static error(message: string, namespace: string, value?: unknown): void {
    this.logMessage('error', message, namespace, value);
  }

  public static log(message: string, namespace: string, value?: unknown): void {
    this.logMessage('log', message, namespace, value);
  }
}
