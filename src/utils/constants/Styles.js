import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { DefaultTheme } from "./Theme";

const { primary, secondary } = DefaultTheme.palette;

export const PrimaryBtn = styled(Button)`
  padding: 5px 25px;
  ${(props) => props.round && "border-radius : 50px"};
  border: 1px solid ${primary.main};
  font-size: 14px;
  min-width: 80px;
  ${({ variant }) => variant === "outlined" && "background-color:#fff"};
  &:hover {
    background-color: primary.main;
    opacity: 0.9;
    color: #fff;
  }
`;

export const TextBtn = styled(Button)`
  ${({ active }) => active && `color:${secondary.main}`};
`;

export const IconBtn = styled(IconButton)`
  object-fit: contain;
  &:hover {
    color: ${secondary.dark};
  }
`;

export const SectionBox = styled(Box)`
  padding: 15px;
  background-color: #fff;
  border-radius: 5px;
`;

export const SectionHeader = styled(Typography)`
  color: #000;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TabBtn = styled(Tab)`
  & .mui-selected: {
    background-color: #fff;
    text-align: center;
  }
`;

export const LoadBtn = styled(Button)`
  background-color: #ebedf3;
  color: #000;
  border-radius: 50px;
  border: none;
  padding: 10px 50px;
  font-weight: bold;
`;

export const StyledContainer = styled(Container)`
  padding-block: 10px;
`;

export const FormTextField = styled(TextField)`
  margin-bottom: 25px;
`;

export const FormContainer = styled.div`
  padding-bottom: 25px;
`;

export const ImageUpload = styled(Stack)`
  & label {
    padding: 15px;
    border: 1px dashed ${primary.main};
    cursor: pointer;
    &:hover {
      background-color: ${primary.main}0f;
    },
  }
`;
