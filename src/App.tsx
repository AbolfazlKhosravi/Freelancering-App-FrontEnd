import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container xl:max-w-screen-xl">
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
