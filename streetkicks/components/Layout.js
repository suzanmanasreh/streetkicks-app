import React from "react";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

export default function Layout({
  children,
  commercePublicKey,
  title = "StreetKicks",
}) {
  return (
    <React.Fragment>
      <Head>
        <meta charset="utf-8" />
        <title>{`${title} - StreetKicks`}</title>
        <link rel="icon" href="favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </React.Fragment>
  );
}
