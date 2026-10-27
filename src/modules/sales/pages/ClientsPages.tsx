import type { RouteObject } from "react-router-dom";
import Clients from "../clients/components/Clients";

const ClientPages: RouteObject = {

    path: "clients",

    children: [
        {
            element: <Clients/>,
            index: true
        },
        {
            path: "create",
            element: <></>
        }
    ]
}

export default ClientPages;