import React from "react";
import { useRouter } from "next/router";
import data from "../../utils/data";
import Layout from "../../components/layout";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../../utils/styles";
import Image from "next/image";
import Product from "../../models/product";
import db from "../../utils/db";

export default function ProductScreen(props) {
  const { product } = props;
  const classes = useStyles();
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <>
      <Layout title={product.name} description={product.description}>
        <div className={classes.section}>
          <NextLink href="/" passHref>
            <Link>
              <Typography color="primary">back to products</Typography>
            </Link>
          </NextLink>
        </div>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
            <ListItem>
                <Typography component='h1' variant="h1">{product.name}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating: {product.rating} stars ({product.numReview} reviews)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography></Typography>Description:
                <Typography>{product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12} >
            <Card className={classes.detailCard}>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{product.countInStoke > 0 ? 'In stoke' : 'Unavailable'}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Button fullWidth variant="contained" color="primary">
                  Add to cart
                </Button>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    }
  }
}