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
import ProductEdit from "./pages/admin/products/edit";
import UsersList from "./pages/admin/users/list";
import BannersList from "./pages/admin/banners/list";
import UserEdit from "./pages/admin/users/edit";
import BannersEdit from "./pages/admin/banners/edit";
import UsersCreate from "./pages/admin/users/create";
import NewsList from "./pages/admin/news/list";
import NewsCreate from "./pages/admin/news/create";
import NewsEdit from "./pages/admin/news/edit";


const App = (): JSX.Element => (
    <Provider store={store}>
        <Router>
            <LoginWrapper path="/login"/>
            <Site path="/">
                <Dashboard path="/dashboard"/>
                <ProductsList path="/products"/>
                <ProductCreate path="/products/create"/>
                <ProductEdit path="/products/:id"/>
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

                <UsersList path="/users"/>
                <UserEdit path="/users/:id"/>
                <UsersCreate path="/users/create"/>

                <NewsList path="/news"/>
                <NewsCreate path="/news/create"/>
                <NewsEdit path="/news/:id"/>



                <BannersList path="/banners"/>
                <BannersEdit path="/banners/:id"/>



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