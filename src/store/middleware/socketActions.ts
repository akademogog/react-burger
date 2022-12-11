import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from './socketActionsTypes';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload?: any;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}
export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export type wsActions = 
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionClose
  | IWsGetMessage
  | IWsSendMessage;

export const wsConnectionStart = (payload?: any): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload
  };
};
export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};
export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};
export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};
export const wsConnectionClose = (): IWsConnectionClose => {
  return {
    type: WS_CONNECTION_CLOSE
  };
};
export const wsGetMessage = (payload: any): IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload,
  };
};
export const wsSendMessage = (payload: any): IWsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload,
  };
};

export const wsActions = {
  wsConnectionStart: WS_CONNECTION_START,
  wsConnectionSuccess: WS_CONNECTION_SUCCESS,
  wsConnectionError: WS_CONNECTION_ERROR,
  wsConnectionClosed: WS_CONNECTION_CLOSED,
  wsConnectionClose: WS_CONNECTION_CLOSE,
  wsGetMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE,
}