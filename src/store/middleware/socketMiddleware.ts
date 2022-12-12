import type { Middleware, MiddlewareAPI } from "redux";

import type { AppDispatch, RootState } from "../../utils/types";

export const socketMiddleware = (wsUrl: string, wsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsConnectionStart, wsSendMessage, wsConnectionSuccess, wsConnectionClosed, wsConnectionError, wsGetMessage, wsConnectionClose } = wsActions;
      const { accessToken } = getState().userReduser;

      if (type === wsConnectionStart) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      };
      
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: wsConnectionSuccess, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: wsConnectionError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: wsGetMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: wsConnectionClosed, payload: event });
        };

        if (type === wsConnectionClose) {
          socket.close(1000, "работа закончена");
        }

        if (type === wsSendMessage) {
          const message = payload;
          message['token'] = accessToken;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
