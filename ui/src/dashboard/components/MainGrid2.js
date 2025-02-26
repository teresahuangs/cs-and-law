import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FileUpload from "react-mui-fileuploader";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ModelCard from "./ModelCard"
import Button from "@mui/material/Button";
import { MuiFileInput } from 'mui-file-input'
import { Divider } from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile'


export default function AddressForm(props) {
const models = props.models
const setModels = props.setModels

  const [title, setTitle] = React.useState("")

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [value, setValue] = useState(null);

  const handleFileUploadError = (error) => {
    console.log(error)
  }

  const handleFilesChange = (files) => {
    console.log(files)
    setValue(files);
  };

  const categories = [
    "United Kingdom",
    "United States"
  ];
  return (
    <React.Fragment>
    <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {models?.map((model, index) =>
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 6 }}>
            <ModelCard key={index} {...model} />
        </Grid>
        )}
        </Grid>
        {models?.length > 0 ? <Divider sx={{ bgcolor: "secondary.light" }}/> : <><Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>You have no existing models</Typography> <Divider sx={{ bgcolor: "secondary.light" }}></Divider></>}
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%", minHeight: 300, height: 'fit-content'}}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Train Model
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Model Name
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                value={title}
                id="title"
                name="title"
                label="Model Name"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={(e) => {setTitle(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Country
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Country"
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Upload Images
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
            <FileUpload
      getBase64={true}
      multiFile={true}
      disabled={false}
      title=""
      header=""
      leftLabel=""
      rightLabel=""
      buttonLabel="Select Files"
      buttonRemoveLabel="Remove all"
      maxFileSize={0}
      maxUploadFiles={0}
      maxFilesContainerHeight={200}
      acceptedType={"image/*"}
      //allowedExtensions={["jpg", "jpeg"]}
      onFilesChange={handleFilesChange}
      onError={handleFileUploadError}
      //imageSrc={'path/to/custom/image'}
      onContextReady={(context) => {}}
      LabelsGridProps={{ md: 6, sx: { p:0, m: 0, color: "transparent"} }}
      BannerProps={{sx: { p: 0, color: "transparent", height:"fit-content"}}}
      ContainerProps={{
        elevation: 0,
        variant: "outlined",
        sx: { p: 0, mt: -0.75, color: "transparent", height:0 }
      }}
      placeholderImageDimension={{
        xs: { width: 0, height: 0 },
        sm: { width: 0, height: 0 },
        md: { width: 0, height: 0 },
        lg: { width: 0, height: 0 }
      }}
    />
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" sx={{ color: "#ff781f" }} onClick={() => setModels((prev) => {console.log(prev); return ([...prev, {title: title, country: age, images: value}])})}>
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}