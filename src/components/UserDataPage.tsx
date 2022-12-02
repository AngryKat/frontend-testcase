import { useEffect, useState } from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UserFormModal } from './UserFormModal';
import { getUsers } from '../utils/user-requests';
import { UserDataTable } from './UserDataTable';
import { UserData } from '../types/user';
import TweenOne, { AnimObjectOrArray } from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { Parallax } from 'rc-scroll-anim';

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
    const [rowsCount, setRowsCount] = useState(0);
    const [animation, setAnimation] = useState<AnimObjectOrArray>();
    const [userData, setUserData] = useState<UserData[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSubmit = () => {
        setRowsCount(prev => prev + 1);
    };
    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUserData(users);
            setAnimation({
                Children: {
                    value: users.length, floatLength: 0,
                },
                duration: 1000,
            })
        };
        fetchUsers();
    }, [rowsCount])


    return (
        <>
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
                        <AddNewRecordButton onClick={openModal} />
                        <UserDataTable data={userData} />
                    </Parallax>
                </div>
                <UserFormModal visible={isModalVisible} onClose={closeModal} onSubmit={handleSubmit} />
            </section>
        </>

    );

};