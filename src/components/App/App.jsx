import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import { fetchIngredients } from "../../store/asyncActions/ingredients";
import SwitchRoutes from "../SwitchRoutes/SwitchRoutes";

function App() {
  const dispatch = useDispatch();

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
