import { checkResponse } from "./checkResponse";

export function request<T>(url: string, options?: object): Promise<T> {
  return fetch(url, options).then(checkResponse)
}