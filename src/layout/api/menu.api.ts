import { HttpClient } from "../../shared/api/httpClient";
import type { TMenu } from "../menu.type";

class MenuApi extends HttpClient {

    constructor(){
        super("/menu")
    }

    public async getMenu(){
        return await this.get<TMenu[]>("/");
    }
}

export const menuApi = new MenuApi();