import React, { useEffect, useState, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Route, Redirect } from "react-router-dom";
import { fetchToken } from "../../store/asyncActions/userAuth";
import RouteProps from 'react-router-dom';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((store) => store.userReduser.accessToken);
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    await dispatch(fetchToken());
    setUserLoaded(true);
  };

  useEffect(() => {
    if (!token) {
      init();
    }
  }, []);

  if (isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (token ? children : <Redirect to={{
        pathname: "/login",
        state: { from: location },
      }} />)}
    />
  );
}
