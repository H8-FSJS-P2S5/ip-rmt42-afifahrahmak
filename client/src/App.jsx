import { RouterProvider } from "react-router-dom";
import router from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { DataProvider } from "./context";

function App() {
  return (
    <DataProvider>
      <GoogleOAuthProvider clientId="736509045783-ah6iscgo7rffbl31ps23cf6irld2ge61.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ DataProvider>
  )
}

export default App