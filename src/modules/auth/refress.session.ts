import { KEY_REFRESS_TOKEN } from "../../constant/auth.constant";
import { setLogin, setLogout } from "../../feactures/auth/authSlice";
import { store } from "../../store";
import { authApi } from "./api/auth.api";

export const refressSession = async () => {

    try {

        const refressToken = localStorage.getItem(KEY_REFRESS_TOKEN);

        if (!refressToken) {

            store.dispatch(setLogout());

            return;
        }

        const response = await authApi.refressSession({ token: refressToken });
        const data = response.data;

        store.dispatch( setLogin(data) );
        localStorage.setItem( KEY_REFRESS_TOKEN , data.refressToken ?? "");

    } catch (error) {

        store.dispatch(setLogout());

    }
}