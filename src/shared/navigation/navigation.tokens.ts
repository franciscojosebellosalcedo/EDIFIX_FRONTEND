const MODULES = {
    settings: "/settings"
}

const OPTION = {
    rols: "/rols",
    users: "/users",
}

const ACTION = {
    create: "/create",
    update: "/update"
}

export const NAVIGATION = {
    ROL_INDEX: `${MODULES.settings}${OPTION.rols}`,
    ROL_CREATE: `${MODULES.settings}${OPTION.rols}${ACTION.create}`,
    ROL_UPDATE: ( id : number ) => `${MODULES.settings}${OPTION.rols}${ACTION.update}/${id}`,
}