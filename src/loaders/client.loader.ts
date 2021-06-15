import axios, { AxiosInstance } from "axios";

export interface Clients {
  httpClient: AxiosInstance;
}

export const initClients = (): Clients => {
  const httpClient = axios.create()

  return {
    httpClient,
  };
};
