import { useEffect, useState } from 'react';
import { Button, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Parallax } from 'rc-scroll-anim';
import TweenOne, { AnimObjectOrArray } from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { useUserDataContext } from '../../utils/UserContextProvider';
import { getUsers } from '../../utils/user-requests';
import InfiniteScrollTable from '../InfiniteScrollTable';
import AddUserModal from '../AddUserModal';

import './UserDataPage.scss';

TweenOne.plugins.push(Children);

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Surname', dataIndex: 'surname', key: 'surname' },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phoneNumber', key: 'phoneNumber' },
];

const AddNewRecordButton = ({ onClick }: { onClick: () => void }) => (
    <Button
        onClick={onClick}
        className="add_button"
        type="primary"
        icon={<PlusOutlined />}>
        Add new record
    </Button>
);


const UserDataPage = () => {
    const {
        totalCount,
        updateUserData,
        userData,
        updateTotalCount,
        updateHasMoreUsers,
        hasMoreUsers,
    } = useUserDataContext()!;
    const [page, setPage] = useState(2);
    const [animation, setAnimation] = useState<AnimObjectOrArray>();
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setAnimation({
            Children: {
                value: totalCount + 1, floatLength: 0,
            },
            duration: 1000,
        });
    }, [totalCount])

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const fetchUsers = async () => {
        const response = await getUsers(page);
        if (response?.data.length <= 0) {
            updateHasMoreUsers(false);
            return;
        };
        updateHasMoreUsers(true);
        setPage((prev) => prev + 1);
        updateUserData([...userData, ...response?.data])
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsers(1);
            const total = +(response?.headers['x-total-count'] || 0);
            updateUserData(response?.data);
            updateTotalCount(total);
            setAnimation({
                Children: {
                    value: total, floatLength: 0,
                },
                duration: 1000,
            })
        };
        fetchUsers();
    }, [])

    return (
        <>
            <div className='record_number_container'>
                <Typography.Title style={{ fontSize: 64 }}>
                    There are already
                </Typography.Title>
                <Typography.Title style={{ fontSize: 127 }}>
                    <TweenOne animation={animation}>
                        0
                    </TweenOne>
                </Typography.Title>
                <Typography.Title style={{ fontSize: 64 }}>
                    records
                </Typography.Title>
            </div>
            <div className='table_container'>
                <div style={{ width: 900, margin: '0 auto' }}>
                    <Parallax
                        animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
                        style={{ transform: 'translateX(-100px)', opacity: 0 }}>
                        <Row>
                            <AddNewRecordButton onClick={openModal} />
                        </Row>
                        <Row>
                            <InfiniteScrollTable
                                hasMoreData={hasMoreUsers}
                                onFetch={fetchUsers}
                                dataSource={userData}
                                columns={columns}
                            />
                        </Row>
                    </Parallax>
                </div>
                <AddUserModal visible={isModalVisible} onClose={closeModal} />
            </div>
        </>

    );

};

export default UserDataPage;