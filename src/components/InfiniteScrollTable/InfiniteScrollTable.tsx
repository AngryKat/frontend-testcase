import { Col, Row, Spin, Table, TableProps } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import './InfiniteScrollTable.scss';

interface TableRecord {
    id: string
}

interface VirtualTableProps<T> extends TableProps<T> {
    onFetch: () => void,
    hasMoreData: boolean,
};

interface TableRowProps<T> {
    colWidth: number | string,
    record: T,
};

const isLastIndex = (index: number, array: any[]) => index + 1 === array.length;

const TableRow = <RecordType,>({ record, colWidth }: TableRowProps<Omit<RecordType, "id">>) => {
    return (
        <Row>
            {Object.values(record).map((value: any, index, arr) => (
                <Col
                    key={value.id}
                    style={{ ...(!isLastIndex(index, arr) && { width: colWidth }) }}
                    className="TableRow-cell"
                >
                    {value}
                </Col>
            ))}
        </Row>
    );
};

const InfiniteScrollTable = <RecordType extends TableRecord>(props: VirtualTableProps<RecordType>) => {
    const { columns, onFetch, hasMoreData } = props;
    const colWidth = Math.floor(900 / (columns?.length || 1));
    const sizedColumns = columns?.map((col) => ({ ...col, width: colWidth }));
    const renderVirtualTable = (data: any, info: any) => {
        const filteredData = data.map(({ id, ...rest }: RecordType) => rest);
        return (
            <InfiniteScroll
                scrollThreshold={1}
                dataLength={data.length}
                next={onFetch}
                hasMore={hasMoreData}
                height={400}
                loader={
                    <p className="spinner">
                        <Spin />
                    </p>}
            >
                {filteredData.map(
                    (i: Omit<RecordType, "id">, index: number) => (<TableRow colWidth={colWidth} key={index} record={i} />)
                )}
            </InfiniteScroll>
        );
    };
    return (
        <Table
            {...props}
            className="InfiniteScrollTable"
            pagination={false}
            scroll={{ y: 400, x: "100vw" }}
            columns={sizedColumns}
            components={{
                body: renderVirtualTable
            }}
        />
    );
};

export default InfiniteScrollTable;