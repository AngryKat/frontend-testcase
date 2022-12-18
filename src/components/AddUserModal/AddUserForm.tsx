import { Col, Input, Row, Select } from "antd";
import { Field, Form } from "formik";
import { countries } from 'countries-list';
import { formikAdapter } from "../../utils/formikAdapter";
import { UserFormValues } from "../../types/user";

const TextInput = formikAdapter<UserFormValues>(Input);
const SelectInput = formikAdapter<UserFormValues>(Select);
const countriesOptions = Object.values(countries).map(({ name }) => ({ label: name, value: name }));

export const AddUserForm = () => {
    return (
        <Form>
            <Row gutter={[16, 16]} style={{ padding: '1rem' }}>
                <Col span={12}>
                    <Field
                        name="name"
                        id="name"
                        component={TextInput}
                        placeholder="Name" />
                </Col>
                <Col span={12}>
                    <Field
                        name="surname"
                        id="surname"
                        component={TextInput}
                        placeholder="Surname" />
                </Col>
                <Col span={12}>
                    <Field
                        name="email"
                        id="email"
                        component={TextInput}
                        type="email"
                        placeholder="Email" />
                </Col>
                <Col span={12}>
                    <Field
                        name="phoneNumber"
                        id="phoneNumber"
                        component={TextInput}
                        type="tel"
                        placeholder="Phone number" />
                </Col>
                <Col span={24}>
                    <Field
                        style={{ width: "100%" }}
                        name="country"
                        id="country"
                        component={SelectInput}
                        placeholder="Select country"
                        options={countriesOptions}
                        showSearch
                    />
                </Col>
            </Row>

        </Form>
    )
};
