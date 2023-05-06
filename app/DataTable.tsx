import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {DisplayObject} from "@/app/page";


const DataTable = ({data}: { data: DisplayObject }) => {

    return (
        <TableContainer component={Paper} style={{ width: '100%' }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell align="right"><strong>Value</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        // data.map((row, idx) =>
                        Object.keys(data).map((key, keyIdx) => {
                            return (
                                <TableRow key={keyIdx}>
                                    <TableCell component="th" scope="row">
                                        {key}
                                    </TableCell>
                                    <TableCell align="right">{data[key]}</TableCell>
                                </TableRow>
                            );
                        })
                        // )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;