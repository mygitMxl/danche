import { Table } from 'antd';
import React from 'react'

export default function index(props) {
    const tableInit = () => {
        let row_selection = props.rowSelection
        let { selectedRowKeys } = props;
        const rowSelection = {
            type: "radio",
            selectedRowKeys
        }
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection === "checkbox") {
            rowSelection.type = "checkbox";
        } else {
            row_selection = 'radio'
        }
        return <Table
            bordered
            {...props}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if (!row_selection) return;
                        onRowClick(record, index)
                    }
                }
            }}
        />
    }
    const onRowClick = (record, index) => {
        let { rowSelection, selectedRowKeys, selectedItem, selectedIds } = props;
        if (rowSelection === 'checkbox') {
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i === -1) {
                    selectedIds.push(record.id);
                    console.log(selectedIds)
                    selectedRowKeys.push(index);
                    console.log(selectedRowKeys)
                    selectedItem.push(record);
                    console.log(selectedItem)
                } else {
                    selectedIds.splice(i, 1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record];
            }
            props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        } else {
            let selectKey = [index];
            props.updateSelectedItem(selectKey, record)
        }
    }
    return (
        <div>
            {tableInit()}
        </div>
    )
}
