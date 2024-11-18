import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "react-hot-toast";
import useInitializeBotpressClient from "./hooks/use-initialize-botpress-client";

function App() {
  useInitializeBotpressClient();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
