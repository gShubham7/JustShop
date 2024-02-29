import * as React from "react";
import { Box, Grid, Typography, Container, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const socialMediaLinks = {
  facebook: "#",
  twitter: "#",
  instagram: "#",
};

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        color: "text.secondary",
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Brand Name
            </Typography>
            {/* Add logo here */}
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              PRODUCT
            </Typography>
            <Typography color="inherit">Features</Typography>
            <Typography color="inherit">Integrations</Typography>
            <Typography color="inherit">Pricing</Typography>
            <Typography color="inherit">FAQ</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              COMPANY
            </Typography>
            <Typography color="inherit">About Us</Typography>
            <Typography color="inherit">Careers</Typography>
            <Typography color="inherit">Privacy Policy</Typography>
            <Typography color="inherit">Terms of Service</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              DEVELOPERS
            </Typography>
            <Typography color="inherit">Public API</Typography>
            <Typography color="inherit">Documentation</Typography>
            <Typography color="inherit">Guides</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton
              aria-label="Facebook"
              color="inherit"
              component="a"
              href={socialMediaLinks.facebook}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              color="inherit"
              component="a"
              href={socialMediaLinks.twitter}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              color="inherit"
              component="a"
              href={socialMediaLinks.instagram}
            >
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ pt: 4 }}
        >
          © 2024 Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
