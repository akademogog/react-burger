export const GET_FEED: 'GET_FEED' = "GET_FEED";

type TOrder = {
  createdAt: string,
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string,
  ingredients: string[],
}

export type TPayloadFeed = {
  success: boolean,
  total: number,
  totalToday: number,
  orders: TOrder[],
}

export interface IGetFeed {
  readonly type: typeof GET_FEED;
  readonly payload: TPayloadFeed | null;
}

export const getFeed = (payload: TPayloadFeed | null): IGetFeed => ({type: GET_FEED, payload});