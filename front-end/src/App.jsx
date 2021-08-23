import './App.sass';
import {BrowserRouter} from "react-router-dom";
import App_router from "./components/App_router";
import NavBar from "./components/NavigationBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./requests_http/user_api";
import {Spinner} from "react-bootstrap";


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            })
                .finally(() => setLoading(false))
    },[])


  return (
       <BrowserRouter>
             <NavBar/>
           {loading ?
               <div className="wrapp-spinner">
                   <Spinner animation="border" role="status">
                       <span className="visually-hidden"></span>
                   </Spinner>
               </div>
               :
               <App_router/>}
       </BrowserRouter>
  )
})

export default App;
