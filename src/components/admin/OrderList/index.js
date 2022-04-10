import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Nav,
  InputGroup,
} from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit, FaEye } from "react-icons/fa";

import * as orderListService from "../services/orderListService";
import url from "../url";
import DataTable from "../../ui/DataTable";
import * as SweetAlert from "../../ui/SweetAlert";
import Search from "./search";
import CheckAccess from "../Auth/checkAccess";
import { Modal } from "react-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";
import { constants } from "../../../utils/constants";
import parse from "html-react-parser";
import { SectionBox, StyledContainer } from "../../../utils/constants/Styles";
import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";

export const Index = () => {
  const navigate = useNavigate();

  // DataTable
  const [tableValues, setTableValues] = useState({
    data: [],
    processing: true,
    totalRows: 0,
    page: 1,
    perPage: 10,
    filterText: "",
    search: {},
  });
  const authState = useSelector((state) => state.auth);

  const [Dates, setDates] = useState({
    today: moment().format("YYYY-MM-DD"),
    secondday: "",
    thirdday: "",
    fourthday: "",
    fifthday: "",
    sixthday: "",
    seventhday: "",
  });

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [show, setShow] = useState(false);
  const [DeliveryStatus, setDeliveryStatus] = useState();
  const [rowID, setRowID] = useState();
  const [statusChange, setStatusChange] = useState(false);
  const [OrderInfo, setOrderInfo] = useState({
    order_reference_number: "",
    name: "",
    contact_number: "",
    order_date_time: "",
    payment_status: "",
    delivery_status: "",
    total_price: "",
  });
  const [CustomerInfo, setCustomerInfo] = useState({
    name: "",
    contact_number: "",
  });

  const [OrderDetail, setOrderDetail] = useState([
    {
      price: "",
      no_of_items: "",
      food_name: "",
      short_description: "",
      food_type: "",
      food: [],
    },
  ]);

  const [FoodDetail, setFoodDetail] = useState([
    {
      food_name: "",
      short_description: "",
      food_type: "",
    },
  ]);

  const handleClose = () => {
    setShow(false);
  };
  const updateDeliveryStatus = async (orderId, deliverystatus) => {
    orderListService
      .updateDeliveryStatus(orderId, deliverystatus)
      .then((response) => {
        setStatusChange(false);
        getOrderList();
      });
  };

  const handleChange = (e) => {
    setDeliveryStatus(e.target.value);
    setStatusChange(true);
  };
  useEffect(() => {
    if (statusChange) {
      updateDeliveryStatus(rowID, DeliveryStatus);
    }
  }, [statusChange]);

  const columns = [
    {
      name: "#",
      //selector: (row, index) => row.id,
      selector: (row, index) =>
        index + 1 + tableValues.perPage * (tableValues.page - 1),
      grow: 0,
      sortable: true,
    },
    {
      name: "Food Item",
      selector: (row) => (row.food ? row.food.food_name : ""),
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row) => row.no_of_items,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },

    {
      name: "Delivery Time",
      selector: (row) => convertDate(row.date_time),
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) =>
        row.order.payment_status != null
          ? row.order.payment_status == 1
            ? "Paid"
            : "Pending"
          : "",
      sortable: true,
    },

    {
      name: "Delivery Status",
      selector: (row) => row.delivery_status,
      cell: (row) => (
        <select
          name="status"
          className="form-control status"
          value={row.delivery_status}
          onClick={() => setRowID(row.id)}
          onChange={handleChange}
        >
          <option value="0">select Status</option>
          <option value="1">Order Confirmed</option>
          <option value="2">Food Packed</option>
          <option value="3">Delivered</option>
          <option value="4">Cancelled</option>
        </select>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => [
        <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
          <FaEye
            variant="secondary"
            className="editicon"
            onClick={() => showOrderDetails(row.id)}
          />
        </CheckAccess>,
      ],
      width: "20%",
    },
  ];

  useEffect(() => {
    getOrderList();
  }, [
    tableValues.page,
    tableValues.perPage,
    tableValues.filterText,
    tableValues.search,
    selectedDate,
  ]);

  useEffect(() => {
    const dateList = {};
    dateList.today = moment().format("YYYY-MM-DD");
    const date = new Date();
    dateList.secondday = moment(date.setDate(date.getDate() + 1)).format(
      "YYYY-MM-DD"
    );
    dateList.thirdday = AddDates(dateList.secondday);
    dateList.fourthday = AddDates(dateList.thirdday);

    dateList.fifthday = AddDates(dateList.fourthday);
    dateList.sixthday = AddDates(dateList.fifthday);
    dateList.seventhday = AddDates(dateList.sixthday);
    setDates(dateList);

    //Dates.secondday =
  }, []);

  const AddDates = (nextdate) => {
    const newdate = new Date(nextdate);
    return moment(newdate.setDate(newdate.getDate() + 1)).format("YYYY-MM-DD");
  };

  const convertDate = (deliveryDatetime) => {
    const deliverytime = new Date(deliveryDatetime);
    return moment(deliverytime).format("HH:mm:ss A");
  };

  const getOrderList = () => {
    const data = {
      page: tableValues.page,
      perPage: tableValues.perPage,
      filterText: tableValues.filterText,
    };
    Object.keys(tableValues.search).map((key) => {
      data[key] = tableValues.search[key];
    });
    // console.log(moment().format('YYYY-MM-D'));
    if (authState.user.role == "ROLE_CHEF") {
      data["chef_id"] = authState.user.id;
    }
    data["orderDate"] = selectedDate;
    setTableValues((prevState) => ({
      ...prevState,
      ...{
        processing: true,
      },
    }));
    orderListService
      .Index(data)
      .then((response) => {
        setTableValues((prevState) => ({
          ...prevState,
          ...{
            processing: false,
            data: response.data.list,
            totalRows: response.data.total,
          },
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Actions
  const showOrderDetails = (id) => {
    let chef_id = 0;
    if (authState.user.role == "ROLE_CHEF") {
      chef_id = authState.user.id;
    }
    orderListService.Show(id, chef_id).then((response) => {
      setOrderInfo(response.data.OrderInfo);
      if (response.data.OrderInfo.user) {
        setCustomerInfo(response.data.OrderInfo.user);
      }

      const orderdetail = response.data.OrderDetail;
      setOrderDetail(orderdetail);

      setShow(true);

      // setCustomerDetail(response.data.CustomerDetails);
      // setCustomerAddress(response.data.DeliveryDetails);
    });
  };

  const handleSelect = (e, value) => {
    const resettableValues = {};
    resettableValues.page = 1;
    resettableValues.perPage = 10;
    resettableValues.filterText = "";
    resettableValues.search = {};
    setTableValues(resettableValues);

    setSelectedDate(value);

    //.log(eventKey);
  };

  return (
    <>
      <StyledContainer>
        <SectionBox>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" component="div" fontWeight="bold">
              Food
            </Typography>
          </Stack>
          <Divider style={{ marginBlock: 15 }} />

          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs
              value={moment().format("YYYY-MM-DD")}
              onChange={handleSelect}
              centered
            >
              <Tab label={Dates.today} value={Dates.today} />
              <Tab label={Dates.secondday} value={Dates.secondday} />
              <Tab label={Dates.thirdday} value={Dates.thirdday} />
              <Tab label={Dates.fourthday} value={Dates.fourthday} />
              <Tab label={Dates.fifthday} value={Dates.fifthday} />
              <Tab label={Dates.sixthday} value={Dates.sixthday} />
              <Tab label={Dates.seventhday} value={Dates.seventhday} />
            </Tabs>
          </Box>

          <Row className="mg-5">
            <Col md={12}>
              <DataTable
                columns={columns}
                data={tableValues.data}
                striped
                pagination
                paginationServer
                paginationTotalRows={tableValues.totalRows}
                paginationDefaultPage={tableValues.page}
                onChangePage={(newPage) => {
                  setTableValues((prevState) => ({
                    ...prevState,
                    ...{
                      page: newPage,
                    },
                  }));
                }}
                onChangeRowsPerPage={(newPerPage, newPage) => {
                  setTableValues((prevState) => ({
                    ...prevState,
                    ...{
                      page: newPage,
                      perPage: newPerPage,
                    },
                  }));
                }}
                subHeader
                progressPending={tableValues.processing}
              />
            </Col>
          </Row>
        </SectionBox>
      </StyledContainer>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
        className="order_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group py-3">
                <label>
                  <b>Order Reference Number :&nbsp;&nbsp; </b>
                </label>
                <label>{OrderInfo.order_reference_number}</label>
              </div>
              <div className="form-group py-3">
                <label>
                  <b>Ordered By :&nbsp;&nbsp; </b>
                </label>
                <label>{CustomerInfo.name}</label>
              </div>
              <div className="form-group py-3">
                <label>
                  <b>Contact Number :&nbsp;&nbsp; </b>
                </label>
                <label>{CustomerInfo.contact_number}</label>
              </div>
              <div className="form-group py-3">
                <label>
                  <b>Ordered Date Time :&nbsp;&nbsp; </b>{" "}
                </label>
                <label>
                  {moment(OrderDetail.date_time).format(
                    "YYYY-MM-DD HH:mm:ss A"
                  )}
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group py-3">
                <label>
                  <b>Payment Status :&nbsp;&nbsp; </b>{" "}
                </label>
                <label>
                  {OrderInfo.payment_status != null
                    ? OrderInfo.payment_status == 1
                      ? "Paid"
                      : "Pending"
                    : ""}
                </label>
              </div>
              <div className="form-group py-3">
                <label>
                  <b>Delivery Status :&nbsp;&nbsp;</b>{" "}
                </label>
                <label>
                  {constants.DeliveryType[OrderDetail.delivery_status]}
                </label>
              </div>
              <div className="form-group py-3">
                <label>
                  <b>Customer Address :&nbsp;&nbsp; </b>{" "}
                </label>
                <label>{OrderInfo.address}</label>
              </div>
            </div>
          </div>

          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title></Card.Title>

              <div className="experiemce-details">
                <div className="row">
                  <div className="form-group py-2 col-md-4">
                    <label>
                      <b></b>{" "}
                    </label>
                    <img
                      src={
                        OrderDetail.food
                          ? constants.baseURL + OrderDetail.food.image_url
                          : ""
                      }
                    ></img>
                  </div>
                  <div className="form-group py-2 col-md-2">
                    <label>
                      <b>Food Item</b>{" "}
                    </label>
                    <p>{OrderDetail.food ? OrderDetail.food.food_name : ""} </p>
                  </div>
                  <div className="form-group py-2 col-md-4">
                    <label>
                      <b>Description</b>{" "}
                    </label>
                    <p>
                      {parse(
                        OrderDetail.food
                          ? OrderDetail.food.short_description
                          : ""
                      )}
                    </p>
                  </div>

                  <div className="form-group py-2 col-md-2">
                    <label>
                      <b>Price</b>
                    </label>
                    <p>{OrderDetail.price}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          {/* )
            })} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
