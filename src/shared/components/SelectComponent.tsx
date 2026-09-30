import { useEffect, useMemo, useState, type FC } from 'react';
import { InputGroup } from 'react-bootstrap';
import Select from 'react-select';

type Props = {
    options: { value: any; label: string }[];
    defaultValue?: any;
    onChange: Function;
    title: string;
    className?: string;
    id: string;
    isDisabled?: boolean;
    isOpenMenu?: boolean;
    autoFocus?: boolean;
    isZIndexSuperior?: boolean;
    fontSizeText?: number;
};

const SelectComponent: FC<Props> = ({
    options,
    defaultValue,
    onChange,
    title,
    fontSizeText,
    id,
    className,
    isDisabled,
    isOpenMenu,
    autoFocus,
    isZIndexSuperior,
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [mode , _ ] = useState("light");
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const valueFound = useMemo(() => {
        return options.find((op) => op.value === defaultValue);
    }, [defaultValue, options]);

    const customStyles = useMemo(() => ({
        control: (base, state) => ({
            ...base,
            backgroundColor: mode === 'dark' ? '#2C2C3A' : '#FFFFFF',
            borderRadius: '6px',
            border: '1px solid #0d6efd',
            width: '100%',
            cursor: 'pointer',
            borderColor: state.isFocused ? '#ccc' : base.borderColor,
            outline: 'none',
        }),

        placeholder: (provided) => ({
            ...provided,
            color: mode === 'dark' ? '#B0B0B0' : '#9B9B9B',
        }),

        input: (provided) => ({
            ...provided,
            color: mode === 'dark' ? '#FFFFFF' : '#000000',
            border: '0px',
            boxShadow: 'none',
            width: '100%',
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: mode === 'dark' ? '#2C2C3A' : '#FFFFFF',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }),

        menuPortal: (provided) => ({
            ...provided,
            zIndex: isZIndexSuperior ? 99999 : 30,
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? '#339CFF'
                : state.isSelected
                    ? '#007BFF'
                    : mode === 'dark'
                        ? '#2C2C3A'
                        : '#FFFFFF',
            color: state.isFocused || state.isSelected ? '#fff' : undefined,
            cursor: 'pointer',
            padding: '8px 10px',
            fontSize: `${fontSizeText ?? 13}px`,

            whiteSpace: 'normal',
            wordBreak: 'break-word',
            lineHeight: '1.2',
            marginBottom: '3px',
        }),

        container: (provided) => ({
            ...provided,
            width: '100%',
        }),

        valueContainer: (provided) => ({
            ...provided,
            overflow: 'hidden',
        }),

        singleValue: (provided) => ({
            ...provided,
            color: mode === 'dark' ? '#92929F' : '#2C2C3A',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }),
    }), [mode, isZIndexSuperior, fontSizeText]);

    useEffect(() => {
        setMenuIsOpen(!!isOpenMenu);
    }, [isOpenMenu]);

    useEffect(() => {
        setSelectedOption(valueFound);
    }, [valueFound]);

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.stopPropagation();
        }
    };

    return (
        <InputGroup size="sm">
            {title && <InputGroup.Text>{title}</InputGroup.Text>}

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    flex: 1,
                    paddingLeft: 0,
                    paddingRight: className !== 'form-control' ? 35 : 0,
                }}
                className={`${className} ${className ? 'py-0' : 'pe-0 py-0'}`}
            >
                <Select
                    id={id}
                    value={selectedOption ?? valueFound}
                    options={options}
                    onChange={(selected) => {
                        setSelectedOption(selected);
                        onChange(selected);
                    }}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    placeholder="Seleccionar"
                    isDisabled={isDisabled}
                    autoFocus={autoFocus}
                    styles={customStyles}
                    noOptionsMessage={() => 'No se encontró la opción'}
                    menuIsOpen={menuIsOpen}
                    onMenuOpen={() => setMenuIsOpen(true)}
                    onMenuClose={() => setMenuIsOpen(false)}
                    onKeyDown={(e) => {
                        if (menuIsOpen) handleKeyDown(e);
                    }}

                />
            </div>
        </InputGroup>
    );
};

export default SelectComponent;