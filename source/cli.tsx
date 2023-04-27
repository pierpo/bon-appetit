#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./ui";

const cli = meow(
  `
  Usage
    $ bon-appetit

  Options
    --bundleId     Your app bundle id
    --packageName  Your app packageName id. Useful to launch an activity.
                       > Example: given the input "com.myapp.debug",
                       > bon-appetit will launch "com.myapp.debug.MainActivity"
    --activity     Full name of the activity to launch.
                   It should includes the packageName.
                   It bypasses the packageName.
                       > Example: "com.myapp.debug.MyCustomActivity"

  Examples
    $ bon-appetit --bundleId=fr.mydomain.myapp.debug
`,
  {
    flags: {
      bundleId: {
        type: "string",
        isRequired: true,
      },
      // TODO one of these two is required. Should be typed as such.
      packageName: {
        type: "string",
        isRequired: false,
      },
      // TODO one of these two is required. Should be typed as such.
      activity: {
        type: "string",
        isRequired: false,
      },
    },
  }
);

render(
  <App
    bundleId={cli.flags.bundleId}
    packageName={cli.flags.packageName}
    activity={cli.flags.activity}
  />
);
