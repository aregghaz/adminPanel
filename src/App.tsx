import React from "react";
import "./i18n";
import {Provider} from "react-redux";
import store from "./store/store";
import {Router} from "@reach/router";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import Site from "./pages/layouts/site/site";

// Site Pages
// import NotFound from "./pages/vendor/not-found/not-found";
import LoginWrapper from "./pages/admin/login/login-wrapper";

// Admin Pages
import Dashboard from "./pages/admin/dashbord/dashboard";
import ProductsList from "./pages/admin/products/list";
import ProductCreate from "./pages/admin/products/create";
import CategoriesList from "./pages/admin/categories/list";
import CategoryCreate from "./pages/admin/categories/create";
import CategoriesEdit from "./pages/admin/categories/edit";
import AttributesList from "./pages/admin/attributes/list";
import AttributesCreate from "./pages/admin/attributes/create";
import AttributesEdit from "./pages/admin/attributes/edit";
import BrandsList from "./pages/admin/brands/list";
import BrandsCreate from "./pages/admin/brands/create";
import BrandsEdit from "./pages/admin/brands/edit";
import ConditionsList from "./pages/admin/conditions/list";
import ConditionsCreate from "./pages/admin/conditions/create";
import ConditionsEdit from "./pages/admin/conditions/edit";


const App = (): JSX.Element => (
    <Provider store={store}>
        <Router>
            <LoginWrapper path="/login"/>
            <Site path="/">
                <Dashboard path="/dashboard"/>
                <ProductsList path="/products"/>
                <ProductCreate path="/products/create"/>
                <CategoriesList path="/categories"/>
                <CategoryCreate path="/categories/create"/>
                <CategoriesEdit path="/categories/:id"/>
                <AttributesEdit path="/attributes/:id"/>
                <AttributesList path="/attributes"/>
                <AttributesCreate path="/attributes/create"/>
                <BrandsList path="/brands"/>
                <BrandsCreate path="/brands/create"/>
                <BrandsEdit path="/brands/:id"/>
                <ConditionsList path="/conditions"/>
                <ConditionsCreate path="/conditions/create"/>
                <ConditionsEdit path="/conditions/:id"/>
                {/*<ProductCreate path="/products/create" />*/}
                {/*<Users path="/users/:id" />*/}
                {/*<Clients path="/trips" />*/}
                {/*<ClientEdit path="trips/:id" />*/}
                {/*<ClientCreate path="trip/create" />*/}
                {/*<NotFound default />*/}
            </Site>
        </Router>
    </Provider>

);

export default App