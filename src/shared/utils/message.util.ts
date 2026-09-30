import { MESSAGES } from "../messages/index.message";

export const getMessage = (
    code: string | undefined ,
    parameters: Record<string, string>
) => {

    if(!code){
        return "Error desconocido";
    }

    const message: string = MESSAGES[code as keyof typeof MESSAGES];

    return message.replace(
        /\{(\w+)\}/g,
        (_, key: string) => {
            return String(parameters[key] ?? `{${key}}`);
        }
    );

}