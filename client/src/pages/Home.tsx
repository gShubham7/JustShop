import { Box, Stack } from "@mui/material";
import banner2 from "../assets/banner2.webp";
import ad from "../assets/ad.gif";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <>
      <Box my={10}>
        <img
          alt="advgif"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Audio/JBL-NM/03_ANC.gif"
          style={{ width: "100%" }}
        />
      </Box>

      <Stack
        direction={["column", "row"]}
        justifyContent="space-between"
        mt={1}
        gap={1}
      >
        <Box>
          <img src={banner2} alt="banner" style={{ width: "100%" }} />
        </Box>
        <Box>
          <img src={ad} alt="ad" style={{ width: "100%" }} />
        </Box>
      </Stack>
      <Reviews />
    </>
  );
};

export default Home;
