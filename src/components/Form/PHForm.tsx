import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFromConfigProps = {
    defaultValues?: Record<string, any>;
    resolver?: any;
}

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode
} & TFromConfigProps

const PHForm = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {
    const fromConfig: TFromConfigProps = {}
    if (defaultValues) {
        fromConfig['defaultValues'] = defaultValues
    }
    if (resolver) {
        fromConfig['resolver'] = resolver
    }
    const methods = useForm(fromConfig)

    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        methods.reset()
    }
    return (
        <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;