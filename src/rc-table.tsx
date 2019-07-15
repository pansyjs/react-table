import React, { useState } from 'react';
import classNames from 'classnames';
import { Table, Icon } from 'antd';
import {
  PaginationConfig,
  TableProps,
  SorterResult,
  TableCurrentDataSource
} from 'antd/es/table';
import { isBoolean } from '@alitajs/autils';
import './rc-table.less';

const prefixCls = 'rc-table';

export interface ITableData<T> {
  list: T[];
  pagination?: PaginationConfig | false;
}

interface IProps<T> extends TableProps<T> {
  onSelectRow?: (rows: T[]) => void;
  data: ITableData<T>;
  selectedRows?: T[];
  onChange?: (
    pagination: PaginationConfig,
    filters: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
    extra?: TableCurrentDataSource<T>
  ) => void;
}

const RcTable: React.FC<IProps<any>> = props => {
  const {
    className,
    style,
    rowKey,
    data,
    onChange,
    onSelectRow,
    ...restProps
  } = props;
  const { list = [], pagination } = data;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>(
    []
  );

  const handleTableChange = (pagination, filters, sorter) => {
    onChange && onChange(pagination, filters, sorter);
  };

  const handleShowTotal = total => {
    return `共 ${total} 条`;
  };

  let paginationProps = {};

  if (!isBoolean(pagination)) {
    paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: handleShowTotal,
      pageSizeOptions: ['10', '50', '100'],
      ...pagination
    };
  }

  const handleRowSelectChange = (
    selectedRowKeys: string[] | number[],
    selectedRows: any[]
  ) => {
    onSelectRow && onSelectRow(selectedRows);

    setSelectedRowKeys(selectedRowKeys);
  };

  const customExpandIcon = props => {
    return (
      <span
        onClick={e => props.onExpand(props.record, e)}
        className="ant-table-row-expand-icon"
      >
        {props.expanded && <Icon type="down" />}
        {!props.expanded && <Icon type="right" />}
      </span>
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectChange
  };

  return (
    <Table
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      rowKey={rowKey}
      dataSource={list}
      rowSelection={onSelectRow ? rowSelection : null}
      pagination={isBoolean(pagination) ? pagination : paginationProps}
      onChange={handleTableChange}
      expandIcon={props.expandedRowRender ? customExpandIcon : null}
      {...restProps}
    />
  );
};

RcTable.defaultProps = {
  rowKey: 'id'
};

export default RcTable;
