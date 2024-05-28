import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ElectricBolt,
  CreditScoreOutlined,
  WorkspacePremiumOutlined,
  AccessAlarmOutlined,
} from "@mui/icons-material";

const MyBox = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        gap: 3,
        py: 1.6,
        justifyContent: useMediaQuery("(min-width: 600px)") ? "center" : "left",
      }}
    >
      {props.icon}
      <Box>
        <Typography variant="body1">{props.title}</Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 300, color: theme.palette.text.secondary }}
        >
          {props.subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

const IconSection = () => {
  const theme = useTheme();
  return (
    <Container sx={{ mt: 3 }}>
      <Stack
        sx={{ bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff" }}
        divider={
          useMediaQuery("(min-width:600px)") ? (
            <Divider orientation="vertical" flexItem />
          ) : null
        }
        direction={"row"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <MyBox
          icon={<ElectricBolt fontSize="large" />}
          title={"Fast Delivery"}
          subTitle={"Start from $10"}
        />
        <MyBox
          icon={<WorkspacePremiumOutlined fontSize="large" />}
          title={"Money Guarantee"}
          subTitle={"7 Days Black"}
        />
        <MyBox
          icon={<AccessAlarmOutlined fontSize="large" />}
          title={"365 Days"}
          subTitle={"For free return"}
        />
        <MyBox
          icon={<CreditScoreOutlined fontSize="large" />}
          title={"Payment"}
          subTitle={"Secure system"}
        />
      </Stack>
    </Container>
  );
};

export default IconSection;
