import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import NextLink from 'next/link';
import Layout from "../components/layout";
import Product from "../models/product";
import data from "../utils/data";
import db from "../utils/db";

export default function Home(props) {
  const { products } = props;
  return (
    <>
      <Layout>
        <div>
          <h1>Products</h1>
          <Grid container spacing={3}>
            {products && products.map((product) => (
              <Grid item md={3} key={product.name}>
                <Card>
                  <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>
                      ${product.price}
                    </Typography>
                    <Button size='small' color='primary'>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    }
  }
}