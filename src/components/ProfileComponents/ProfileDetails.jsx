import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Box,
  OutlinedInput,
} from "@mui/material";
import imgHolder from "../../assets/images/noimage.png";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/authenticate/authSlice";
import { imageUploader } from "../../features/update/uploadImage";

function ProfileDetails() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const [image, setFile] = useState(user.image);

  // let [address,setAddress] = useState(null);
  const [firstName, setFName] = useState(user.firstName)
  const [lastName, setLName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate()

  let imgP = process.env.REACT_APP_SERVER_URL + "/images";
  let [isfetching, setFetching] = useState(false);

  const dispatch = useDispatch();

  const onChangeFName = (e) => {
    setFName(e.target.value);
    // console.log(email);
  };
  const onChangeLName = (e) => {
    setLName(e.target.value);
    // console.log(pass);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
    // console.log(phone);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let id = user._id;
    const updatedData = {
      firstName,
      lastName,
      email,
      phone,
      image,
    };
    console.log(updatedData);
    dispatch(updateUser({ user, id, updatedData }))
    console.log('done');
    setIsChanged(true)
  }


  useEffect(() => {
    if (typeof image !== "string" && image !== null) {
      imageUploader(image, setFile, setFetching);
    }
  }, [image]);

  useEffect(() => {
    setFile(user.image);
    // setAddress(props?.item?.address);
  }, [])

  return (
    <Container sx={{ my: 10 }}>
      {" "}
      <div>
        {" "}
        <Container
          sx={{
            pt: 5,
            pb: 5,
          }}
        >
          {/* sx={{ my: "50px", py: "50px" }} */}

          <Paper>
            <Container maxWidth="md">
              <Box
                sx={{ display: "flex", flexDirection: "column", my: "10px" }}
              >
                <Typography
                  variant="h2"
                  textAlign="center"
                  fontFamily={"serif"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  mt={2}
                >
                  {" "}
                  Account Info{" "}
                </Typography>

                <Divider
                  color={"primary"}
                  variant="middle"
                  sx={{ height: 3 }}
                ></Divider>
              </Box>
            </Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Grid
                container
                spacing={2}
                component="form"
                onSubmit={onSubmit}
                display={"flex"}
                flexDirection="row"
                justifyContent={"center"}
                alignItems="center"
              >
                {" "}
                <Grid item xs={12} md={6} justify="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box mt={2}>

                      <img
                        src={
                          image ?
                            (typeof (image) === 'string' ?
                              (image.startsWith('http') ?
                                image :
                                imgP + '/' + image) :
                              URL.createObjectURL(image)) :
                            imgHolder
                        }
                        width="400px"
                      />
                    </Box>

                    <FormControl sx={{ mb: 12 }}>
                      <Button variant="contained" component="label">
                        Upload
                        <input
                          hidden
                          type="file"
                          name="myImage"
                          onChange={(event) => {
                            console.log(event.target.files[0]);
                            setFile(event.target.files[0]);
                          }}
                        />{" "}
                      </Button>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    textAlign="center"
                    fontFamily={"serif"}
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    color="primary.dark"
                  >
                    {" "}
                    Account Details
                  </Typography>
                  <Container sx={{ my: 2 }}>
                    <Grid
                      container
                      display={"flex"}
                      flexWrap={"wrap"}
                      justifyContent={"space-between"}
                    >
                      <Grid item xs={12} md={5.5}>
                        {" "}
                        <FormControl sx={{ mt: 2 }} fullWidth>
                          <InputLabel htmlFor="FirstName-Field">
                            First Name
                          </InputLabel>
                          <OutlinedInput
                            id="FirstName-Field"
                            label="First Name"
                            onChange={onChangeFName}
                            value={firstName}
                            startAdornment={
                              <InputAdornment position="start"></InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={5.5}>
                        <FormControl sx={{ mt: 2 }} fullWidth>
                          <InputLabel htmlFor="LastName-Field">
                            Last Name
                          </InputLabel>
                          <OutlinedInput
                            id="LastName-Field"
                            label="Last Name"
                            onChange={onChangeLName}
                            value={lastName}
                            startAdornment={
                              <InputAdornment position="start"></InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                      <InputLabel htmlFor="Email-Field">Email</InputLabel>
                      <OutlinedInput
                        id="Email-Field"
                        label="Email"
                        value={email}
                        onChange={onChangeEmail}
                      />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                      <InputLabel htmlFor="Phone-Field">Phone</InputLabel>
                      <OutlinedInput
                        id="Phone-Field"
                        label="Phone"
                        value={phone}
                        onChange={onChangePhone}
                      />
                    </FormControl>

                    <FormControl sx={{ mt: 2 }}>
                      <Button variant="contained" type="sumbit">
                        {" "}
                        Submit
                      </Button>
                    </FormControl>
                  </Container>
                </Grid>
              </Grid>
            </Box>
            {isChanged ? navigate('/Profile/Dashboard') : null}
          </Paper>
        </Container>
      </div>
    </Container>
  );
}

export default ProfileDetails;
