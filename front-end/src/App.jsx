import './App.sass';
import {BrowserRouter} from "react-router-dom";
import App_router from "./components/App_router";
import NavBar from "./components/NavigationBar";

function App() {
  return (
       <BrowserRouter>
             <NavBar/>
            <App_router/>
       </BrowserRouter>
  )
}

export default App;
