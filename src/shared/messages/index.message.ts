import { AUTH_MESSAGES } from "./auth.message";
import { ERROR_MESSAGE } from "./error.message";
import { ROL_MESSAGE } from "./rol.message";
import { USER_MESSAGE } from "./user.message";

export const MESSAGES = {
    ...AUTH_MESSAGES,
    ...USER_MESSAGE,
    ...ERROR_MESSAGE,
    ...ROL_MESSAGE
}