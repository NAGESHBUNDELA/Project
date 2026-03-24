import { NavBar } from "./components/nav-bar";
import { AppRoutes } from "./routes/app-routes";

export function App() {
  return (
    <div>
      <NavBar />
      <AppRoutes />
    </div>
  );
}
