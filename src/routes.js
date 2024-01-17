import Billing from "layouts/billing";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";

import SignIn from "layouts/authentication";
import Profile from "layouts/profile";

import { PROFILE_ADMIN, PROFILE_DEVELOPER } from "types";
// Soft UI Dashboard React icons
import CreditCard from "examples/Icons/CreditCard";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Document from "examples/Icons/Document";
import Office from "examples/Icons/Office";
import Shop from "examples/Icons/Shop";


import EditClientes from "pages/clientes/edit";
import EditFacturas from "pages/facturas/edit";
import EditProduct from "pages/products/edit";
import ProductPrices from "pages/products/prices";
import EditPromociones from "pages/promociones/edit";
import EditProvider from "pages/provider/edit";
import EditTienda from "pages/tiendas/edit";
import EditUsuario from "pages/usuario/edit";
import EditVentas from "pages/ventas/edit";

import DuplicarProducto from "pages/products/duplicate";

import CreateClientes from "pages/clientes/create";
import CreateFacturas from "pages/facturas/create";
import OrdenDeCompra from "pages/ordenCompra/create";
import CreateProduct from "pages/products/create";
import CreatePromociones from "pages/promociones/create";
import CreateProvider from "pages/provider/create";
import CreateTienda from "pages/tiendas/create";
import CrearUsuario from "pages/usuario/create";
import CreateVentas from "pages/ventas/create";

import Products from "pages/products";
import Usuarios from "pages/usuario";
import SpaceShip from './examples/Icons/SpaceShip';
import Abastecimiento from './pages/abastecimiento';
import Clientes from './pages/clientes';
import Factura from './pages/facturas';
import Ventas from './pages/ventas';

import Cube from "examples/Icons/Cube";
import RouteGuard from "pages/guards/RouteGuard";
import { PROFILE_PHARMACIST, PROFILE_PHARMACY_ASSISTANT } from "types";
import Settings from './examples/Icons/Settings';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <RouteGuard component={<Dashboard />} profileTypes={[PROFILE_ADMIN, PROFILE_DEVELOPER]}/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Abastecimiento",
    key: "abastecimiento",
    route: "/abastecimiento",
    icon: <Cube size="12px" />,
    component: <RouteGuard component={<Abastecimiento />} profileTypes={[PROFILE_ADMIN, PROFILE_PHARMACIST]} /> ,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Inventario",
    key: "inventario",
    route: "/inventario",
    icon: <SpaceShip size="12px" />,
    component: <RouteGuard component={<Products />} profileTypes={[PROFILE_ADMIN, PROFILE_PHARMACIST, PROFILE_PHARMACY_ASSISTANT,PROFILE_DEVELOPER]} /> ,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Clientes",
    key: "clientes",
    route: "/clientes",
    icon: <CustomerSupport size="12px" />,
    component: <Clientes />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Descuentos y Convenios",
    key: "convenios",
    route: "/convenios",
    icon: <Office size="12px" />,
    component: <Clientes />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Reportes",
    key: "reports",
    route: "/reportes",
    icon: <Document size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ventas",
    key: "ventas",
    route: "/ventas",
    icon: <Document size="12px" />,
    component: <RouteGuard component={<Ventas />} profileTypes={[PROFILE_ADMIN, PROFILE_PHARMACIST]} />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    route: "/usuarios",
    icon: <CustomerSupport size="12px" />,
    component: <RouteGuard component={<Usuarios />} profileTypes={[PROFILE_ADMIN, PROFILE_PHARMACIST]} /> ,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Contabilidad",
    key: "factura",
    route: "/contabilidad",
    icon: <CreditCard size="12px" />,
    component: <RouteGuard component={<Factura />} profileTypes={[PROFILE_ADMIN, PROFILE_PHARMACIST]} /> ,
    noCollapse: true,
  },
  {
    type: "nooocollapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "nooocollapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sistema",
    key: "profile",
    route: "/sistema",
    icon: <Settings size="12px" />,
    component: <RouteGuard component={<Profile />} profileTypes={[PROFILE_ADMIN, PROFILE_PHARMACIST]} />,
    noCollapse: true,
  },
  /*{
    type: "collapse",
    name: "Tiendas",
    key: "tiendas",
    route: "/tiendas",
    icon: <Shop size="12px" />,
    component: <Tiendas />,
    noCollapse: true,
  },*/
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
    component: <RouteGuard component={<EditProduct />} profileTypes={[PROFILE_ADMIN,PROFILE_PHARMACIST]} /> ,
    noCollapse: true,
  },

  {
    type: "nocollapse",
    name: "DuplicarProduct",
    key: "dashboard",
    route: "/productos/duplicar/:id",
    icon: <Shop size="12px" />,
    component: <DuplicarProducto />,
    noCollapse: true,
  },


  {
    type: "nocollapse",
    name: "CreateProduct",
    key: "dashboard",
    route: "/productos/create",
    icon: <Shop size="12px" />,
    component: <RouteGuard component={<CreateProduct />} profileTypes={[PROFILE_ADMIN,PROFILE_PHARMACIST, PROFILE_PHARMACY_ASSISTANT]}/> ,
    noCollapse: true,
  },


  {
    type: "nocollapse",
    name: "EditUsuario",
    key: "dashboard",
    route: "/usuario/edit/:id",
    icon: <Shop size="12px" />,
    component: <RouteGuard component={<EditUsuario />} profileTypes={[PROFILE_ADMIN,PROFILE_DEVELOPER]}/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CrearUsuario",
    key: "dashboard",
    route: "/usuarios/create",
    icon: <Shop size="12px" />,
    component: <RouteGuard component={<CrearUsuario />}  profileTypes={[PROFILE_ADMIN,PROFILE_DEVELOPER]}/>,
    noCollapse: true,
  },
  
  
  {
    type: "nocollapse",
    name: "EditClientes",
    key: "dashboard",
    route: "/clientes/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditClientes />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CreateClientes",
    key: "dashboard",
    route: "/clientes/create",
    icon: <Shop size="12px" />,
    component: <CreateClientes/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "OrdenDeCompra",
    key: "dashboard",
    route: "/orden_de_compra/create",
    icon: <Shop size="12px" />,
    component: <OrdenDeCompra/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "EditFacturas",
    key: "dashboard",
    route: "/facturas/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditFacturas />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CreateFacturas",
    key: "dashboard",
    route: "/facturas/create",
    icon: <Shop size="12px" />,
    component: <CreateFacturas/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "EditPromociones",
    key: "dashboard",
    route: "/promociones/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditPromociones />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CreatePromociones",
    key: "dashboard",
    route: "/promociones/create",
    icon: <Shop size="12px" />,
    component: <CreatePromociones/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "EditVentas",
    key: "dashboard",
    route: "/ventas/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditVentas />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CreateVentas",
    key: "dashboard",
    route: "/ventas/create",
    icon: <Shop size="12px" />,
    component: <CreateVentas/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "ProviderCreate",
    key: "dashboard",
    route: "/provider/create",
    icon: <Shop size="12px" />,
    component: <RouteGuard component={<CreateProvider/>} profileTypes={[PROFILE_ADMIN,PROFILE_PHARMACIST]}/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "EditProvider",
    key: "dashboard",
    route: "/provider/edit/:id",
    icon: <Shop size="12px" />,
    component: <RouteGuard component={<EditProvider/>} profileTypes={[PROFILE_ADMIN,PROFILE_PHARMACIST]}/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "ProductPrices",
    key: "dashboard",
    route: "/inventario/precios/:id",
    icon: <Shop size="12px" />,
    component: <RouteGuard component={<ProductPrices/>} profileTypes={[PROFILE_ADMIN,PROFILE_PHARMACIST,PROFILE_DEVELOPER]}/>,
    noCollapse: true,
  },
  
];

export default routes;
