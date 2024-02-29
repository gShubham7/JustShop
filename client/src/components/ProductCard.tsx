import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Grid } from "@mui/material";

const ProductCard = () => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        title="Shrimp and Chorizo Paella"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Price
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container direction="row" justifyContent="space-between">
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Button
            variant="contained"
            sx={{
              bgcolor: theme.palette.error.light,
              borderRadius: 5,
            }}
          >
            <Typography variant="caption">Add to Cart</Typography>
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
