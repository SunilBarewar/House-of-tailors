import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import DashboardPage from "./pages/dashboard/page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-red-500">
      <div>
        <DashboardPage />
      </div>
    </div>
  );
}

export default App;
