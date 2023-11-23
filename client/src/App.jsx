import {
  RouterProvider
} from "react-router-dom";
import router from "./routers/router";
import { MusicKitProvider } from "./context/MusicKitContext";

function App() {

  return (
    <>
      <MusicKitProvider>
        <RouterProvider router={router} />
      </MusicKitProvider>
    </>
  )
}

export default App
