import { Button, Modal } from "antd";
import { Formik, useFormikContext } from "formik";
import { AddUserForm } from "./AddUserForm";
import { UserFormValues } from "../types/user";
import { addUser } from "../utils/user-requests";
import { userSchema } from "../utils/user-validation-schema";


const initialValues = {
    name: '',
    surname: '',
    country: undefined,
    email: '',
    phoneNumber: '',
};

const UserModal = ({ visible, onClose }: { visible: any, onClose: any }) => {
    const { submitForm, resetForm } = useFormikContext();
    const handleClose = () => {
        resetForm();
        onClose();
    }

    return (
        <Modal
            title="Add new user"
            open={visible}
            onCancel={handleClose}
            footer={[
                <Button key="cancel" type="primary" onClick={handleClose} danger>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={submitForm}>
                    Submit
                </Button>
            ]}
        >
            <AddUserForm />
        </Modal>
    )
}

interface UserFormModalProps {
    visible: boolean,
    onClose: () => void,
    onSubmit: () => void,
};

export const UserFormModal = ({ onClose, onSubmit, visible = false }: UserFormModalProps) => {
    const handleSubmit = async (values: UserFormValues, props: any) => {
        await addUser(values);
        onSubmit();
        props.resetForm();
        onClose();
    };

    return <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
    >
        <UserModal onClose={onClose} visible={visible} />
    </Formik >
};