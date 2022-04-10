import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import * as cookService from "../services/cookService";
import url from '../url';
import DataTable from "../../ui/DataTable";
import * as SweetAlert from "../../ui/SweetAlert";

import CheckAccess from '../Auth/checkAccess';

export const Index = () => {
    const navigate = useNavigate();

    // DataTable
    const [tableValues, setTableValues] = useState({
        data: [],
        processing: true,
        totalRows: 0,
        page: 1,
        perPage: 10,
        filterText: '',
        search: {},
    });

    const columns = [
        {
            name: '#',
            //selector: (row, index) => row.id,
            selector: (row, index) => index + 1 + (tableValues.perPage * (tableValues.page - 1)),
            grow: 0,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Mobile ',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'Kitchen Name',
            selector: row => row.kitchen_name,
            sortable: true,
        },

        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => ([
                <CheckAccess request={['ROLE_ADMIN']}>
                    <FaRegEdit variant="secondary" className="editicon" onClick={() => editCook(row.id)} />
                </CheckAccess>,
                <CheckAccess request={['ROLE_ADMIN']}>
                    <FaRegTrashAlt variant="primary" className="deleteicon" onClick={() => deleteCook(row.id)} />
                </CheckAccess>,
            ]),
            width: '20%',
        },
    ];

    useEffect(() => {
        getCookList();
    }, [tableValues.page, tableValues.perPage, tableValues.filterText, tableValues.search]);

    const getCookList = () => {
        const data = {
            page: tableValues.page,
            perPage: tableValues.perPage,
            filterText: tableValues.filterText,
        };
        Object.keys(tableValues.search).map((key) => {
            data[key] = tableValues.search[key];
        });
        setTableValues((prevState) => ({...prevState, ...{
                processing: true,
            }}));
        cookService.Index(data)
            .then((response) => {
                setTableValues((prevState) => ({...prevState, ...{
                        processing: false,
                        data: response.data.list,
                        totalRows: response.data.total,
                    }}));
            }).catch((e) => {
            console.log(e);
        });
    };

    // Actions
    const editCook = (id) => {
        navigate(`${url.CookEdit}/${id}`);
    };
    const deleteCook = (id) => {
        SweetAlert.deleteConfirm().then((result) => {
            if(result.isConfirmed)
            {
                cookService.Delete(id)
                    .then((response) => {
                        getCookList();
                        SweetAlert.successAlert('Cook deleted successfully');
                    }).catch((e) => {
                    console.log(e);
                });
            }
        });
    };


    return (
        <>
            <Container>
                <div className="card">
                    <Row>
                        <Col md={6}><h3>Home Cook</h3></Col>
                        <Col md={6} className="text-end">
                            <CheckAccess request={['ROLE_ADMIN']}>
                                <Button variant="primary" onClick={() => navigate(url.CookAdd)}>
                                    Add
                                </Button>
                            </CheckAccess>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {/*<Search
                                setData={(search) => {
                                    setTableValues((prevState) => ({...prevState, ...{
                                            search: search,
                                        }}));
                                }}
                            />*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <DataTable
                                columns={ columns }
                                data={ tableValues.data }
                                striped
                                pagination
                                paginationServer
                                paginationTotalRows={ tableValues.totalRows }
                                paginationDefaultPage={ tableValues.page }
                                onChangePage={(newPage) => {
                                    setTableValues((prevState) => ({...prevState, ...{
                                            page: newPage,
                                        }}));
                                }}
                                onChangeRowsPerPage={(newPerPage, newPage) => {
                                    setTableValues((prevState) => ({...prevState, ...{
                                            page: newPage,
                                            perPage: newPerPage,
                                        }}));
                                }}
                                subHeader
                                progressPending={ tableValues.processing }
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}