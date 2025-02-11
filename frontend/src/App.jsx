import { RouterProvider } from "react-router-dom";
import router from "./router";
import { UserStorage } from "./UserContext";

export default function App() {
  return (
    <UserStorage>
      <RouterProvider router={router} />
    </UserStorage>
  );
}
