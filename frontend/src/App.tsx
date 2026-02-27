import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { restoreSession } from "./features/auth/authSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.auth);
<Toaster position="top-right" />
  useEffect(() => {
    dispatch(restoreSession() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AppRoutes />;
}

export default App;


