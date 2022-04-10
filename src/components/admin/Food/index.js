import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

import * as foodService from "../services/foodService";
import url from "../url";
import DataTable from "../../ui/DataTable";
import * as SweetAlert from "../../ui/SweetAlert";
import Search from "./search";
import CheckAccess from "../Auth/checkAccess";
import { useSelector } from "react-redux";
import { PrimaryBtn, StyledContainer } from "../../../utils/constants/Styles";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import styled from "styled-components";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { EditIcon } from "../../../utils/constants/Icons";
import DeleteIcon from "@mui/icons-material/Delete";
import Breadcrumb from "../../../utils/store/actions/breadcrumb";

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
  const [chefNames, setChefNames] = useState("");

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
      name: "Food Name",
      selector: (row) => row.food_name,
      sortable: true,
    },
    {
      name: "Food Type",
      selector: (row) => (row.food_type ? row.food_type.type : "--"),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) =>
        row.status != null ? (row.status == 1 ? "Active" : "InActive") : "",
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => [
        <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
          <IconButton onClick={() => editFood(row.id)}>
            <EditIcon />
          </IconButton>
        </CheckAccess>,
        <CheckAccess request={["ROLE_ADMIN", "ROLE_CHEF"]}>
          <IconButton onClick={() => deleteFood(row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </CheckAccess>,
      ],
      width: "20%",
    },
  ];

  useEffect(() => {
    if (authState.user.role == "ROLE_ADMIN") {
      getChefNames();
    }
  }, []);

  useEffect(() => {
    getFoodList();
  }, [
    tableValues.page,
    tableValues.perPage,
    tableValues.filterText,
    tableValues.search,
  ]);

  const getFoodList = () => {
    const data = {
      page: tableValues.page,
      perPage: tableValues.perPage,
      filterText: tableValues.filterText,
    };
    Object.keys(tableValues.search).map((key) => {
      data[key] = tableValues.search[key];
    });
    if (authState.user.role == "ROLE_CHEF") {
      data["chef_id"] = authState.user.id;
    }

    setTableValues((prevState) => ({
      ...prevState,
      ...{
        processing: true,
      },
    }));
    foodService
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
  const editFood = (id) => {
    navigate(`${url.FoodEdit}/${id}`);
  };
  const deleteFood = (id) => {
    SweetAlert.deleteConfirm().then((result) => {
      if (result.isConfirmed) {
        foodService
          .Delete(id)
          .then((response) => {
            getFoodList();
            SweetAlert.successAlert("Food deleted successfully");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  const getChefNames = () => {
    console.log("ff");
    if (authState.user.role == "ROLE_ADMIN") {
      foodService.chefNameList().then((response) => {
        setChefNames(response.data);
      });
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <Breadcrumb />
      <StyledBox style={{ backgroundColor: "#fff" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5" component="div" fontWeight="bold">
            Food
          </Typography>
          <CheckAccess request={["ROLE_CHEF"]}>
            <PrimaryBtn
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => navigate(url.FoodAdd)}
              startIcon={<AddCircleIcon size="large" />}
            >
              Add
            </PrimaryBtn>
          </CheckAccess>
        </Stack>
        <Divider style={{ marginBlock: 15 }} />
        <Grid container>
          <Grid item xs={12}>
            <Search
              setData={(search) => {
                setTableValues((prevState) => ({
                  ...prevState,
                  ...{
                    search: search,
                  },
                }));
              }}
              getData={chefNames}
            />
          </Grid>
        </Grid>
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
      </StyledBox>
    </StyledContainer>
  );
};

const StyledBox = styled(Box)`
  padding: 10px;
`;
