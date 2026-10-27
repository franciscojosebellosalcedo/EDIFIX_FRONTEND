import { AUTH_MESSAGES } from "./auth.message";
import { CATEGORY_MESSAGE } from "./category.message";
import { ERROR_MESSAGE } from "./error.message";
import { ROL_MESSAGE } from "./rol.message";
import { USER_MESSAGE } from "./user.message";
import { WAREHOUSE_MESSAGE } from "./warehouse.message";

export const MESSAGES = {
    ...AUTH_MESSAGES,
    ...USER_MESSAGE,
    ...ERROR_MESSAGE,
    ...ROL_MESSAGE,
    ...CATEGORY_MESSAGE,
    ...WAREHOUSE_MESSAGE
}