import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";

import Profile from "layouts/profile";
import SignIn from "layouts/authentication";


// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import EditTienda from "pages/tiendas/edit"
import Tiendas from './pages/tiendas'
import CreateTienda from "pages/tiendas/create";
import Products from "pages/products";
import EditProduct from "pages/products/edit";
import CreateProduct from "pages/products/create";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tiendas",
    key: "tiendas",
    route: "/tiendas",
    icon: <Shop size="12px" />,
    component: <Tiendas />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Productos",
    key: "productos",
    route: "/productos",
    icon: <Shop size="12px" />,
    component: <Products />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Facturas",
    key: "factura",
    route: "/facturas",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "Sign In",
    key: "sign-in",
    route: "/",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "EditTienda",
    key: "dashboard",
    route: "/tiendas/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditTienda />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CreateTienda",
    key: "dashboard",
    route: "/tiendas/create",
    icon: <Shop size="12px" />,
    component: <CreateTienda />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "EditProduct",
    key: "dashboard",
    route: "/productos/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditProduct />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CreateProduct",
    key: "dashboard",
    route: "/productos/create",
    icon: <Shop size="12px" />,
    component: <CreateProduct />,
    noCollapse: true,
  },
  
];

export default routes;
