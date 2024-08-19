import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
    label: string;
    name: string;
    options?: { value: string, label: string, disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: 'multiple' | undefined;
    onValueChange: React.Dispatch<React.SetStateAction<string>>
}



const PHSelectWithWatch = ({ label, name, options, disabled, mode, onValueChange }: TPHSelectProps) => {
    const { control } = useFormContext()
    const inputValue = useWatch({
        control,
        name,
    })

    useEffect(() => {
        onValueChange(inputValue)
    }, [inputValue])
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        {...field}
                        style={{ width: '100%' }}
                        options={options}
                        size="large"
                        disabled={disabled}
                    />
                    {error && <p style={{ marginTop: "5px", color: "red" }}>{error.message}</p>}
                </Form.Item>
            )}
        />
    );
};

export default PHSelectWithWatch;