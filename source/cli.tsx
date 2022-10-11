#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";

const cli = meow(
  `
  Usage
    $ appkiller

  Options
    --bundleId     Your app bundle id
    --packageName  Your app packageName id

  Examples
    $ appkiller --bundleId=fr.mydomain.myapp.debug
`,
  {
    flags: {
      bundleId: {
        type: "string",
        isRequired: true,
      },
      packageName: {
        type: "string",
        isRequired: true,
      },
    },
  }
);

render(
  <App bundleId={cli.flags.bundleId} packageName={cli.flags.packageName} />
);
