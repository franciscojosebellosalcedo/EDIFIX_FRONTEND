import type { TOptionSelect } from "../types/options.type";

export const getOptionsSelect = <T extends Record<string, any>>(
    list: T[],
    propValue: keyof T,
    propLabel: (keyof T | string)[]
): TOptionSelect[] => {
    return list.map((item) => {
        const label = propLabel
            .map((prop) =>
                prop in item
                    ? String(item[prop as keyof T])
                    : String(prop)
            )
            .join(' ')
            .trim();

        return {
            label,
            value: item[propValue],
        };
    });
};