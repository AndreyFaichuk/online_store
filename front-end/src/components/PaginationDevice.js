import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const PaginationDevice = observer(() => {

    const {device} = useContext(Context)
    const pageOfCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let k = 0; k < pageOfCount; k++){
        pages.push(k + 1)
    }

    return (
        <Pagination>
            {pages.map(number =>
                <Pagination.Item
                    key={number}
                    active={device.page === number}
                    onClick={() => device.setPage(number)}>
                    {number}
                </Pagination.Item>
            )}
        </Pagination>
    );
})

export default PaginationDevice;