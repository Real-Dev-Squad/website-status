export type SelectOption = {
    label: string;
    value: string | number;
};

export type SingleSelectProps = {
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

export type SelectProps = {
    dev?: boolean;
    options: SelectOption[];
} & SingleSelectProps;
