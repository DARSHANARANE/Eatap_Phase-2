import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { restoreSession } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(restoreSession() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AppRoutes />;
}

export default App;


