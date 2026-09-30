export const formattDate = (date: string | Date | undefined ): string => {

    if(!date){
        return "";
    }

    if (date instanceof Date) {
        return date.toISOString().split("T")[0];
    }

    return date.split("T")[0];
};