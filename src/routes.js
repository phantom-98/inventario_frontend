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


import EditProduct from "pages/products/edit";
import EditTienda from "pages/tiendas/edit"
import EditClientes from "pages/clientes/edit";
import EditFacturas from "pages/facturas/edit";
import EditPromociones from "pages/promociones/edit";
import EditVentas from "pages/ventas/edit";
import EditProvider from "pages/provider/edit"
import ProductPrices from "pages/products/prices"
import EditUsuario from "pages/usuario/edit";

import DuplicarProducto from "pages/products/duplicate";

import CreateTienda from "pages/tiendas/create";
import CreateProduct from "pages/products/create";
import CreateClientes from "pages/clientes/create";
import CreateFacturas from "pages/facturas/create";
import CreatePromociones from "pages/promociones/create";
import CreateVentas from "pages/ventas/create";
import CreateProvider from "pages/provider/create"
import CrearUsuario from "pages/usuario/create";
import OrdenDeCompra from "pages/ordenCompra/create";

import Tiendas from './pages/tiendas'
import Products from "pages/products";
import Ventas from './pages/ventas'
import Clientes from './pages/clientes'
import Factura from './pages/facturas'
import Abastecimiento from './pages/abastecimiento'
import SpaceShip from './examples/Icons/SpaceShip';
import Usuarios from "pages/usuario";

import Settings from './examples/Icons/Settings';
import Cube from "examples/Icons/Cube";

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
    name: "Abastecimiento",
    key: "abastecimiento",
    route: "/abastecimiento",
    icon: <Cube size="12px" />,
    component: <Abastecimiento />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Inventario",
    key: "inventario",
    route: "/inventario",
    icon: <SpaceShip size="12px" />,
    component: <Products />,
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
    component: <Ventas />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    route: "/usuarios",
    icon: <CustomerSupport size="12px" />,
    component: <Usuarios />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Contabilidad",
    key: "factura",
    route: "/contabilidad",
    icon: <CreditCard size="12px" />,
    component: <Factura />,
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
    component: <Profile />,
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
    component: <EditProduct />,
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
    component: <CreateProduct />,
    noCollapse: true,
  },


  {
    type: "nocollapse",
    name: "EditUsuario",
    key: "dashboard",
    route: "/usuario/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditUsuario />,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "CrearUsuario",
    key: "dashboard",
    route: "/usuarios/create",
    icon: <Shop size="12px" />,
    component: <CrearUsuario />,
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
    component: <CreateProvider/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "EditProvider",
    key: "dashboard",
    route: "/provider/edit/:id",
    icon: <Shop size="12px" />,
    component: <EditProvider/>,
    noCollapse: true,
  },
  {
    type: "nocollapse",
    name: "ProductPrices",
    key: "dashboard",
    route: "/inventario/precios/:id",
    icon: <Shop size="12px" />,
    component: <ProductPrices/>,
    noCollapse: true,
  },
  
];

export default routes;
