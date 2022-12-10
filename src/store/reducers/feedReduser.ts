import {
  GET_FEED, TPayloadFeed,
} from "../actions/feedActions";
import { IGetFeed } from "../actions/feedActions";

const feedState: TPayloadFeed | any = {
  payload: null,
};

export const feedReduser = (state = feedState, action: IGetFeed) => {
  switch (action.type) {
    case GET_FEED: {
      return {
        ...state,
        payload: action.payload,
      };
    }
    default:
      return state;
  }
};
