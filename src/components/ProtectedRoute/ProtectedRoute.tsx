import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { fetchToken } from "../../store/asyncActions/userAuth";
import { TState } from "../../store/rootReduser";

export function ProtectedRoute({ children, ...rest }) {
  const dispatch: Function = useDispatch();
  const token = useSelector((store: TState) => store.userReduser.accessToken);
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
