// import './App.css'
// import './styles.css'

import { RouterProvider } from "react-router-dom";
import router from "./router";
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  return (
    <GoogleOAuthProvider clientId="579198128069-t749r6sj23rj9spt7a0n3f8i4lek0fbo.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )

}

export default App
