import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const initialValues = {
  cook_id: "",
  food_name: "",
};

const Search = (props) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSearch = () => {
    props.setData(values);
  };
  const handleReset = () => {
    setValues((prevState) => ({ ...prevState, ...initialValues }));
    props.setData(initialValues);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <TextField
          id="food_name"
          name="food_name"
          label="Food Name"
          variant="outlined"
          size="small"
          value={values.food_name}
          onChange={handleChange}
          style={{ minWidth: 600 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="info"
          type="button"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Stack>
    </>
  );
};

export default Search;

{
  /* <Col md={4}>
                    {props.getData && 
                    (
                        <div className="form-group py-3">
                        <select name="cook_id" classN ame="form-control country" value={values.cook_id} onChange={handleChange}>
                            <option value="">select chef</option>
                            {props.getData && props.getData.map((item, index) => (<option value={item.id} > {item.name}</option>))}
                        </select>
                        </div>
                    )}
                  
                </Col> */
}
