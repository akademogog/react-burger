import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { fetchToken } from "../../store/asyncActions/userAuth";

export function ProtectedFromAuth({ children, ...rest }) {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.userReduser.accessToken);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await dispatch(fetchToken());
    setUserLoaded(true);
  };

  useEffect(() => {
    if (!token) {
      init();
    }
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => (!token ? children : <Redirect to={{
        pathname: "/",
        state: { from: location },
      }} />)}
    />
  );
}
