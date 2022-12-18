import { Button, Modal } from "antd";
import { Formik, useFormikContext } from "formik";
import { UserFormValues } from "../../types/user";
import { addUser } from "../../utils/user-requests";
import { userSchema } from "../../utils/user-validation-schema";
import { UserDataContextType, useUserDataContext } from "../../utils/UserContextProvider";
import { AddUserForm } from "./AddUserForm";

interface UserFormModalProps {
    visible: boolean,
    onClose: () => void,
};

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
                <Button
                    key="cancel"
                    type="primary"
                    onClick={handleClose}
                    danger>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={submitForm}>
                    Submit
                </Button>
            ]}
        >
            <AddUserForm />
        </Modal>
    )
}

const AddUserModal = ({ onClose, visible = false }: UserFormModalProps) => {
    const { updateTotalCount, updateUserData, hasMoreUsers, userData } = useUserDataContext() as UserDataContextType;
    const handleSubmit = async (values: UserFormValues, props: any) => {
        const response = await addUser(values);
        if (!hasMoreUsers) {
            updateUserData([...userData, response?.data]);
        };
        updateTotalCount();
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

export default AddUserModal;