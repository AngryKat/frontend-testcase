import type { ColumnsType } from 'antd/es/table';
import { UserData } from '../types/user';
import { VirtualTable } from './VirtualTable';

const userTableCols: ColumnsType<UserData> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
];

interface UserDataTableProps {
    data: UserData[],
};

export const UserDataTable = ({ data }: UserDataTableProps) => {
    return <VirtualTable style={{ width: 900, }} columns={userTableCols} dataSource={data} scroll={{ y: 300, x: '100vw' }} />
}