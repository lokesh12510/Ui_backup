import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as authService from "../services/authService";
import ReCaptcha from "../../ui/ReCaptcha";
import * as actions from "../../../utils/store/actions";
import url from "../url";
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import StaticImages from "../../../utils/constants/Images";

const initialValues = {
  email: "",
  password: "",
  recaptcha: "",
  attempts: 0,
};

export const Login = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const loginAttempts = useSelector((state) => state.loginAttempts);
  useEffect(() => {
    setValues((p) => ({ ...p, ["attempts"]: loginAttempts }));
  }, [loginAttempts]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState("");

  const recaptchaRef = React.createRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (recaptchaRef.current) {
      const recaptchaValue = recaptchaRef.current.getValue();
      if (recaptchaValue) {
        recaptchaRef.current.reset();
        values.recaptcha = recaptchaValue;
      }
    }
    authService
      .Login(values)
      .then((response) => {
        dispatch({ type: "RESET_LOGIN_ATTEMPTS" });
        const token = response.data.token;
        const user = response.data.user;
        dispatch(actions.authLogin(token, user));
        navigate(url.Home);
      })
      .catch((e) => {
        dispatch({ type: "UPDATE_LOGIN_ATTEMPTS" });
        let error = e.response.data.error[0];
        setErrors(error);
      });
  };

  const hasErrorFor = (fieldName) => {
    return !!errors[fieldName];
  };

  const renderError = (fieldName) => {
    let status = hasErrorFor(fieldName);
    if (status) {
      return errors[fieldName][0];
    }
  };

  return (
    <Container maxWidth="lg" style={{ height: "95vh" }}>
      <p className="text-danger text-center font-weight-bold">
        {renderError("mismatch_credentials")}
      </p>

      <Grid container component="main" style={{ minHeight: "100%" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${StaticImages.AuthBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={StaticImages.LogoLight}
              alt="logo"
              style={{ marginBottom: 20 }}
            />
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={(e) => onSubmit(e)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                placeholder="Enter User Name"
                autoComplete="email"
                autoFocus
                helperText={renderError("email")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleInputChange}
                placeholder="Enter Password Here"
                autoComplete="current-password"
                helperText={renderError("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {values.attempts > 3 && (
                <div className="form-group py-2">
                  <label>ReCaptcha</label>
                  <ReCaptcha
                    size="normal"
                    ref={recaptchaRef}
                    onChange={(value) => {
                      //setValues(p => ({ ...p, ['recaptcha']: value }));
                    }}
                  />
                  <span className="text-danger">
                    {renderError("recaptcha")}
                  </span>
                </div>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
