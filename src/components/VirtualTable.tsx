import { Table, TableProps } from "antd";
import { FixedSizeGrid as Grid } from 'react-window';
interface TableRecord {
    id: string
}

export const VirtualTable = <RecordType extends TableRecord>(props: TableProps<RecordType>) => {
    const { columns, scroll } = props;
    const renderVirtualTable = (data: any, info: any) => {
        const filteredData = data.map(({ id, ...rest }: RecordType) => rest);
        const colWidth = Math.floor(900 / columns!.length);
        return (
            <Grid
                columnWidth={colWidth}
                rowHeight={54}
                columnCount={columns!.length}
                height={scroll!.y as number}
                rowCount={data.length}
                width={900}>
                {({
                    columnIndex,
                    rowIndex,
                    style,
                }: {
                    columnIndex: number;
                    rowIndex: number;
                    style: React.CSSProperties;
                }) => {
                    const currentColumnValue = Object.values(filteredData[rowIndex])[columnIndex];
                    return (
                        <div
                            style={style}
                        >
                            {`${currentColumnValue}`}
                        </div>
                    )
                }}
            </Grid>)
    };
    return <Table {...props} pagination={false} components={{
        body: renderVirtualTable
    }} />;
}