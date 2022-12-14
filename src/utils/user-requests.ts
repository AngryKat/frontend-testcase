import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { UserFormValues } from "../types/user";
import { sendRequest } from "./api";

export const getUsers = async (page?: number) => {
    try {
        let requestPath = '/users';
        if (page) {
            requestPath += `?_page=${page}&_limit=20`;
        }
        const response = await sendRequest(requestPath);
        return response;
    } catch (error) {
        toast.error('Error occurred while fetching users')
    };
};

export const addUser = async (newUserData: UserFormValues) => {
    try {
        const response = await sendRequest('/users', 'POST', { id: uuidv4(), ...newUserData });
        toast.success('Added new user successfully!')
        return response;
    } catch (error) {
        toast.error('Error occurred while adding user:');
    }
};