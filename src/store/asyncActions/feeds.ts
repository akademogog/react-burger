import { AppDispatch, AppThunk } from "../../utils/types";
import { getFeed } from "../actions/feedActions";

export const fetchFeeds: AppThunk = (accessToken?: string, close?: boolean,) => {
  let url = `wss://norma.nomoreparties.space/orders`;
  accessToken ? (url = `${url}?token=${accessToken.replace('Bearer ', '')}`) : (url = `${url}/all`)
  return (dispatch: AppDispatch) => {
    const ws = new WebSocket(url);
    if (close) {
      ws.close(1000);
    } else {
      ws.onmessage = (event: MessageEvent) => {
        if(event.data) {
          dispatch(getFeed(JSON.parse(event.data)));
        }
      }
    }
  };
};
