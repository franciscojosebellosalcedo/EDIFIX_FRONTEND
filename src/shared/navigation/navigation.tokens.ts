const MODULES = {
    settings: "/settings",
    sales: "/sales",
}

const OPTION = {
    rols: "/rols",
    users: "/users",
    categories: "/categories",
    clients: "/clients",
    products: "/products",
    materials: "/materials",
}

const ACTION = {
    create: "/create",
    update: "/update"
}

export const NAVIGATION = {

    ROL_INDEX: `${MODULES.settings}${OPTION.rols}`,
    ROL_CREATE: `${MODULES.settings}${OPTION.rols}${ACTION.create}`,
    ROL_UPDATE: ( id : number ) => `${MODULES.settings}${OPTION.rols}${ACTION.update}/${id}`,

    USER_INDEX: `${MODULES.settings}${OPTION.users}`,
    USER_CREATE: `${MODULES.settings}${OPTION.users}${ACTION.create}`,
    USER_UPDATE: ( id : number ) => `${MODULES.settings}${OPTION.users}${ACTION.update}/${id}`,

    CATEGORY_INDEX: `${MODULES.sales}${OPTION.users}`,
    CATEGORY_CREATE: `${MODULES.sales}${OPTION.categories}${ACTION.create}`,
    CATEGORY_UPDATE: ( id : number ) => `${MODULES.sales}${OPTION.categories}${ACTION.update}/${id}`,

    CLIENT_INDEX: `${MODULES.sales}${OPTION.clients}`,
    CLIENT_CREATE: `${MODULES.sales}${OPTION.clients}${ACTION.create}`,
    CLIENT_UPDATE: ( id : number ) => `${MODULES.sales}${OPTION.clients}${ACTION.update}/${id}`,

    PRODUCT_INDEX: `${MODULES.sales}${OPTION.products}`,
    PRODUCT_CREATE: `${MODULES.sales}${OPTION.products}${ACTION.create}`,
    PRODUCT_UPDATE: ( id : number ) => `${MODULES.sales}${OPTION.products}${ACTION.update}/${id}`,

    MATERIAL_INDEX: `${MODULES.sales}${OPTION.materials}`,
    MATERIAL_CREATE: `${MODULES.sales}${OPTION.materials}${ACTION.create}`,
    MATERIAL_UPDATE: ( id : number ) => `${MODULES.sales}${OPTION.materials}${ACTION.update}/${id}`,

}