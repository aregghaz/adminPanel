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
import ProductEdit from "./pages/admin/products/edit";
import UsersList from "./pages/admin/users/list";
import BannersList from "./pages/admin/banners/list";
import UserEdit from "./pages/admin/users/edit";
import BannersEdit from "./pages/admin/banners/edit";
import UsersCreate from "./pages/admin/users/create";
import NewsList from "./pages/admin/news/list";
import NewsCreate from "./pages/admin/news/create";
import NewsEdit from "./pages/admin/news/edit";
import VideoList from "./pages/admin/video/list";
import VideoEdit from "./pages/admin/video/edit";
import VideoCreate from "./pages/admin/video/create";
import SlidersList from "./pages/admin/sliders/list";
import SliderCreate from "./pages/admin/sliders/create";
import SliderEdit from "./pages/admin/sliders/edit";
import TagsList from "./pages/admin/tags/list";
import TagsCreate from "./pages/admin/tags/create";
import TagsEdit from "./pages/admin/tags/edit";
import CallBackList from "./pages/admin/callBack/list";
import ContactEdit from "./pages/admin/contact/edit";
import OrderPrice from "./pages/admin/price/list";
import Questions from "./pages/admin/questions/list";
import OrdersList from "./pages/admin/orders/list";
import VendorProfile from "./pages/admin/profile/profile";


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

                <UsersList path="/users"/>
                <UserEdit path="/users/:id"/>
                <UsersCreate path="/users/create"/>

                <NewsList path="/news"/>
                <NewsCreate path="/news/create"/>
                <NewsEdit path="/news/:id"/>

                <VideoList path="/video"/>
                <VideoEdit path="/video/:id"/>
                <VideoCreate path="/video/create"/>



                <BannersList path="/banners"/>
                <BannersEdit path="/banners/:id"/>

                <SlidersList path="/sliders"/>
                <SliderCreate path="/sliders/create"/>
                <SliderEdit path="/sliders/:id"/>

                <TagsList path="/tags"/>
                <TagsCreate path="/tags/create"/>
                <TagsEdit path="/tags/:id"/>

                <CallBackList path="/call-back"/>
                <ContactEdit path="/contacts"/>
                <OrderPrice path="/order-price"/>
                <Questions path="/questions"/>

                <OrdersList path="/orders"/>
                <VendorProfile path="/profile"/>



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