import Head from "next/head";
import Alert from "@material-ui/lab";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getCommerce from "../utils/commerce";
import Layout from "../components/Layout";
import {
  Grid,
  Slide,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Link,
} from "@material-ui/core";
import useStyles from "./styles";

export default function Home(props) {
  const { products } = props;
  const classes = useStyles();
  return (
    <Layout title="Home" commercePublicKey={props.commercePublicKey}>
      {products.length === 0 && <Alert>No product found</Alert>}
      <Grid container spacing={1}>
        {products.map((product) => (
          <Grid key={product.id} item md={3}>
            <Slide direction="up" in={true}>
              <Card className={classes.root}>
                <Link href={`/products/${product.permalink}`}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      component="img"
                      alt={product.name}
                      image={product.image.url}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {product.name}
                      </Typography>
                      <Box>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="p"
                        >
                          {product.price.formatted_with_symbol}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,
    },
  };
}
