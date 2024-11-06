const URL_MAIN = 'http://localhost:4000';

export const API_ROUTES = {
    LOGIN: `${URL_MAIN}/api/auth/login`,
    USER_AUTH: `${URL_MAIN}/protected-route`, 
    USER_DATA: `${URL_MAIN}/api/usuarios/`, 
    BRANDS: `${URL_MAIN}/api/marcas/`, 
    INVENTORY: `${URL_MAIN}/api/inventario/`,
    MODELS: `${URL_MAIN}/api/modelos/`,
    MODULES: `${URL_MAIN}/api/laboratorios/`
};