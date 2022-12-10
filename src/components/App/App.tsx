import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import { fetchIngredients } from "../../store/asyncActions/ingredients";
import SwitchRoutes from "../SwitchRoutes/SwitchRoutes";
import { useAppDispatch } from "../../hooks/hooks";

function App() {
  const dispatch: Function = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <Router>
      <AppHeader />
      <SwitchRoutes />
    </Router>
  );
}

export default App;
