import { Col, Row, Spin, Table, TableProps } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

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


export const InfiniteScrollTable = <RecordType extends TableRecord>(props: VirtualTableProps<RecordType>) => {
    const TableRow = ({ record }: TableRowProps<Omit<RecordType, "id">>) => {
        return (
            <Row style={{ width: '100%' }}>
                {Object.values(record).map((val: any) => <Col style={{ height: 30, width: colWidth, padding: 10 }}>{val}</Col>)}
            </Row>
        );
    };
    const { columns, onFetch, hasMoreData } = props;
    const colWidth = Math.floor(900 / (columns?.length || 1));
    console.log(colWidth)

    const renderVirtualTable = (data: any, info: any) => {
        const filteredData = data.map(({ id, ...rest }: RecordType) => rest);
        return (
            <InfiniteScroll
                scrollThreshold={1}
                dataLength={data.length}
                next={onFetch}
                hasMore={hasMoreData}
                height={400}
                loader={<p style={{ textAlign: 'center' }}><Spin /></p>}
            >
                {filteredData.map((i: Omit<RecordType, "id">, index: number) => <TableRow colWidth={colWidth} key={index} record={i} />)}
            </InfiniteScroll>
        )
    };
    return <Table {...props} pagination={false} components={{
        body: renderVirtualTable
    }} />;
}