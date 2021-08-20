import './App.sass';
import {BrowserRouter} from "react-router-dom";
import App_router from "./components/App_router";
import NavBar from "./components/NavigationBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./requests_http/user_api";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        })
            .finally(() => setLoading(false))
    },[])

  return (
       <BrowserRouter>
             <NavBar/>
            <App_router/>
       </BrowserRouter>
  )
})

export default App;
