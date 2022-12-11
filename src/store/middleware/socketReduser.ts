import { wsActions } from './socketActions';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_GET_MESSAGE
} from './socketActionsTypes';

type TWSState = {
  wsConnected: boolean;
  messages: any;
  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
};

export const wsReducer = (state = initialState, action: wsActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    
    case WS_CONNECTION_CLOSE:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
                error: undefined,
        messages: action.payload
      };

    default:
      return state;
  }
};