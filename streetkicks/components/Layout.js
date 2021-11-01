import React, { useContext, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Link,
  Container,
  Box,
  Typography,
  CircularProgress,
  Badge,
} from "@material-ui/core";
import { theme, useStyles } from "../utils/styles";
import Head from "next/head";
import NextLink from "next/link";

export default function Layout({
  children,
  commercePublicKey,
  title = "StreetKicks",
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Head>
        <meta charset="utf-8" />
        <title>{`${title} - StreetKicks`}</title>
        <link rel="icon" href="streetkicks.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <NextLink href="/">
              <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                StreetKicks
              </Link>
            </NextLink>
            <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  Cart
                </Link>
              </NextLink>
            </nav>
          </Toolbar>
        </AppBar>
        <Container component="main" className={classes.main}>
          {children}
        </Container>
        <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"© "}
              StreetKicks 2021 | Sample Project By{" "}
              <a href="www.google.com">
                <u>Suzan</u>
              </a>
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
