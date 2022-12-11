import { createContext, useContext, useEffect, useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UserFormModal } from './UserFormModal';
import { getUsers } from '../utils/user-requests';
import { UserData } from '../types/user';
import TweenOne, { AnimObjectOrArray } from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { Parallax } from 'rc-scroll-anim';
import { InfiniteScrollTable } from './InfiniteScrollTable';

const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Surname', dataIndex: 'surname' },
    { title: 'Country', dataIndex: 'country' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phoneNumber' },
];
export interface UserDataContextType {
    userData: UserData[],
    updateUserData: (user: UserData) => void,
    totalCount: number,
    updateTotalCount: () => void,
    hasMoreUsers: boolean,
};

const UserDataContext = createContext<UserDataContextType | null>(null);

export const useUserDataContext = () => useContext(UserDataContext);


TweenOne.plugins.push(Children);
interface AddNewRecordButtonProps {
    onClick: () => void,
};

const AddNewRecordButton = ({ onClick }: AddNewRecordButtonProps) => (
    <Button
        onClick={onClick}
        style={{
            marginBottom: '1rem',
            float: 'right',
        }}
        type="primary"
        icon={<PlusOutlined />}>
        Add new record
    </Button>
);


export const UserDataPage = () => {
    const [hasMoreUsers, setHasMoreUsers] = useState(true);
    const [page, setPage] = useState(2);
    const [totalCount, setTotalCount] = useState(0);
    const [animation, setAnimation] = useState<AnimObjectOrArray>();
    const [userData, setUserData] = useState<UserData[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const updateUserData = (user: UserData) => {
        setUserData((prev) => [...prev, user]);
    };

    const updateTotalCount = () => {
        setAnimation({
            Children: {
                value: totalCount + 1, floatLength: 0,
            },
            duration: 1000,
        });
        setTotalCount((prev) => prev + 1);
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const fetchUsers = async () => {
        console.log('aaa fetch!')
        const response = await getUsers(page);
        if (response?.data.length <= 0) {
            setHasMoreUsers(false);
            return;
        };
        setHasMoreUsers(true);
        setPage((prev) => prev + 1);
        setUserData((prev) => [...prev, ...response?.data]);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers(1);
            const total = +(response?.headers['x-total-count'] || 0);
            setUserData(response?.data);
            setAnimation({
                Children: {
                    value: total, floatLength: 0,
                },
                duration: 1000,
            })
            setTotalCount(total);

        };
        fetchUsers();
    }, [])

    return (
        <UserDataContext.Provider value={{ userData, updateUserData, totalCount, updateTotalCount, hasMoreUsers }}>
            <section style={{ width: '100vw', textAlign: 'center', height: '100vh' }}>
                <Typography.Title level={3} style={{ fontSize: 64 }}>
                    There are already
                </Typography.Title>
                <Typography.Title style={{ fontSize: 127 }}>
                    <TweenOne animation={animation}>
                        0
                    </TweenOne>
                </Typography.Title>
                <Typography.Title level={3} style={{ fontSize: 64 }}>
                    records
                </Typography.Title>
            </section>
            <section style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 900, margin: '0 auto' }}>
                    <Parallax
                        animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
                        style={{ transform: 'translateX(-100px)', opacity: 0 }}>
                        <Row>
                            <AddNewRecordButton onClick={openModal} />
                        </Row>
                        <Row>
                            <InfiniteScrollTable hasMoreData={hasMoreUsers} onFetch={fetchUsers} dataSource={userData} columns={columns} scroll={{ y: 300, x: '100vw' }} />
                        </Row>
                    </Parallax>
                </div>
                <UserFormModal visible={isModalVisible} onClose={closeModal} />
            </section>
        </UserDataContext.Provider>

    );

};