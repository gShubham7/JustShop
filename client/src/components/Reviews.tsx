import { Divider, Grid, Paper, Typography } from "@mui/material";

const reviews = [
  {
    id: 1,
    comment:
      "Recommended to me by my local electronics. This product is a godsend",
    author: "Noah kethris, Sydney",
  },
  {
    id: 2,
    comment: "Seriously, they are the most affordable in the market",
    author: "Sanah Thoreau, Ghana",
  },
  {
    id: 3,
    comment: "Plug into perfectness.....",
    author: "Kalki Mehra, India",
  },
  {
    id: 4,
    comment:
      "Since, taking this product, I have cut back considerably on light weighted clothes",
    author: "Mini Mathur, Ahmendabad",
  },
];

const Reviews = () => {
  return (
    <Grid
      container
      spacing={1}
      my={5}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {reviews.map((item) => (
        <Grid key={item.id} item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 1 }}>
            <Grid height={100}>
              <Typography variant="subtitle1">{item.comment}</Typography>
            </Grid>
            <Divider />
            <Grid>
              <Typography color="grey">{item.author}</Typography>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Reviews;
