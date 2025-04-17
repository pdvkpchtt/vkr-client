import { Toaster } from "react-hot-toast";

import NavMain from "./navigation/NavMain";
import ProtectedRoute from "./middleware/ProtectedRoute";
import ModalHandlerWrap from "./components/modals/ModalHandlerWrap";

function App() {
  return (
    <ProtectedRoute>
      <ModalHandlerWrap>
        <NavMain />
        <Toaster />
      </ModalHandlerWrap>
    </ProtectedRoute>
  );
}

export default App;
