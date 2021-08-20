import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom"
import {onlyAuthRoutes, publicRoutes} from "../routes"
import {SHOP_ROUTE} from "../utils/constants"
import {Context} from "../index"

const AppRouter = () => {
    const {user} = useContext(Context)


    return (
       <Switch>
           {user.IsAuth  && onlyAuthRoutes.map(({path, Component}) =>
                    <Route key={path} path = {path} component = {Component} exact/>
           )}

           {publicRoutes.map(({path, Component}) =>
               <Route key={path} path = {path} component = {Component} exact/>
           )}
        <Redirect to={SHOP_ROUTE}/>
       </Switch>
    );
};

export default AppRouter;