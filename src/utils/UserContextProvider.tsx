import { createContext, ReactNode, useContext, useState } from 'react';
import { UserData } from '../types/user';

export interface UserDataContextType {
    hasMoreUsers: boolean,
    updateHasMoreUsers: (value: boolean) => void,
    userData: UserData[],
    updateUserData: (newData: UserData[]) => void,
    totalCount: number,
    updateTotalCount: (count?: number) => void,
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataContextProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [hasMoreUsers, setHasMoreUsers] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const updateUserData = (newData: UserData[]) => {
        setUserData(newData);
    }

    const updateTotalCount = (count?: number) => {
        if (count) {
            setTotalCount(count);
        } else {
            setTotalCount((prev) => prev + 1);
        }
    }

    const updateHasMoreUsers = (value: boolean) => {
        setHasMoreUsers(value);
    }

    return <UserDataContext.Provider value={{
        userData,
        updateUserData,
        totalCount,
        updateTotalCount,
        updateHasMoreUsers,
        hasMoreUsers,
    }}>
        {children}
    </UserDataContext.Provider>
}

export const useUserDataContext = () => useContext(UserDataContext);