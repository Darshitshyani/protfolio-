import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { theme } from "@/theme";
import Image from "next/image";
import {
  Figma,
  Flutter,
  Laravel,
  Mongodb,
  NextJs,
  NodeJs,
  PhotoShop,
  Php,
  Python,
  Tailwind,
  TypeScript,
  reactLogo,
} from "@/untils/images";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Techology() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="text-center my-10 w-full" id="hire">
      <div className="flex w-full flex-col justify-center items-center mt-5">
        <h1 className="text-[24px] sm:text-[30px]">Our</h1>
        <h1 className="text-[24px] sm:text-[30px] font-semibold">Tech Stack</h1>
      </div>
      <Box
        sx={{ width: "100%" }}
        className="mt-5 w-full flex justify-center flex-col items-center"
      >
        <Box
          sx={{ fontFamily: "inherit" }}
          className="w-full flex justify-center"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              " & .MuiTabs-indicator": {
                bgcolor: theme.palette.primary.main,
              },
            }}
          >
            <Tab
              label="Backend"
              {...a11yProps(0)}
              style={{ fontFamily: "inherit" }}
              sx={{
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                },
              }}
            />
            <Tab
              label="Frontend"
              sx={{
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                },
              }}
              {...a11yProps(1)}
              style={{ fontFamily: "inherit" }}
            />
            <Tab
              label="Design"
              sx={{
                "&.Mui-selected": {
                  color: theme.palette.primary.main,
                },
              }}
              {...a11yProps(2)}
              style={{ fontFamily: "inherit" }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="flex flex-wrap gap-5 items-center justify-center">
            <Image
              src={NodeJs}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={Laravel}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={Mongodb}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={Php}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={Python}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="flex flex-wrap gap-5 items-center justify-center mt-2">
            <Image
              src={reactLogo}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={NextJs}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={Tailwind}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={Flutter}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={TypeScript}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="flex flex-wrap gap-5 items-center justify-center mt-2">
            <Image
              src={PhotoShop}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
            <Image
              src={Figma}
              alt="not found"
              className="w-[100px] sm:w-[150px]"
            />
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
