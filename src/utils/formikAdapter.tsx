import { FieldProps } from "formik";

export function formikAdapter<T>(ComponentToWrap: any) {
    const AdaptedComponent = ({ field, form, ...props }: FieldProps<T>) => {
        const error = form.errors[field.name];
        const changeHandler = (value: any) => {
            if (typeof value === 'string') {
                form.setFieldValue(field.name, value);
                form.setFieldTouched(field.name, true);
                return;
            };
            field.onChange(value);
        };
        return (
            <div>
                <ComponentToWrap  {...field} {...props} status={!!error && "error"} onChange={changeHandler} />
                {!!error && <div style={{ color: 'red' }}>{`${error}`}</div>}
            </div>
        )
    };
    return AdaptedComponent;
}
