import { Outlet } from "react-router";
import { Header } from "./Header";
import { Window } from "./Window";

const Layout = () => {
  return (
    <div>
      <Header />

      <Window>
        <Outlet />
      </Window>
    </div>
  )
}

export { Layout };