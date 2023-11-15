import { RouterProvider } from "react-router-dom";
import router from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="736509045783-ah6iscgo7rffbl31ps23cf6irld2ge61.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App