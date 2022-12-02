import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { UserFormValues } from "../types/user";
import { sendRequest } from "./api";

export const getUsers = async () => {
    try {
        const { data } = await sendRequest('/users');
        return data;
    } catch ({ message }) {
        toast.error(`Error occurred while fetching users: ${message} `)

    }
};

export const addUser = async (newUserData: UserFormValues) => {
    try {
        const { data } = await sendRequest('/users', 'POST', { id: uuidv4(), ...newUserData });
        toast.success('Added new user successfully!')
        return data;
    } catch ({ message }) {
        toast.error(`Error occurred while adding user: ${message} `)
    }
};