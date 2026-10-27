import { HttpClient } from "../../shared/api/httpClient";
import type { TMenu, TOptionMenu } from "../menu.type";

class MenuApi extends HttpClient {

    constructor(){
        super("/menu")
    }

    public async getMenu(){
        return await this.get<TMenu[]>("/");
    }

    public async getOptions(){
        return await this.get<TOptionMenu[]>("/options");
    }
}

export const menuApi = new MenuApi();