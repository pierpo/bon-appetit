import React, { useState } from "react";
import { Text, Box, Newline, useInput } from "ink";
import { exec } from "child_process";
import { hasOwnProperty } from "./helpers";
import { mapping } from "./command-and-mappings";

type States = "initial" | "success" | "doing" | "error";

const executeCommand = (cmd: string, setState: (state: States) => void) => {
  setState("doing");
  exec(cmd, (error) => {
    if (error) {
      setState("error");
      return;
    }
    setState("success");
  });
};

const App = ({
  bundleId,
  packageName,
}: {
  bundleId: string;
  packageName: string;
}) => {
  const [state, setState] = useState<States>("initial");

  useInput((input) => {
    if (state === "doing") {
      return;
    }

    if (!bundleId) {
      return;
    }

    if (hasOwnProperty(mapping, input)) {
      const action = mapping[input];

      executeCommand(action.command(bundleId, packageName), setState);
    }
  });

  return (
    <Box flexDirection="column">
      <Box height={2} flexDirection="column">
        <Text>
          Bundle id is: <Text color="blue">{bundleId}</Text>
          <Newline />
          Package name is: <Text color="blue">{packageName}</Text>
        </Text>
        <Newline />
        {state === "initial" && <Text>What do you want to do?</Text>}
        {state === "success" && (
          <Text>
            <Text color="green">Last command was successful! </Text>
            <Text>What do you want to do next?</Text>
          </Text>
        )}
        {state === "doing" && <Text>Executing command...</Text>}
        {state === "error" && <Text color="red">Last command failed!</Text>}
      </Box>
      <Newline />
      <Box flexDirection="column">
        <Text>
          <Newline />
          Available actions:
          <Newline />
        </Text>
        <Box marginX={2}>
          <Text>
            {(Object.keys(mapping) as Array<keyof typeof mapping>).map(
              (key) => (
                <Text key={key}>
                  <Text color="green">{`${key})`}</Text>
                  {` ${mapping[key].title}`}
                  <Newline />
                </Text>
              )
            )}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

module.exports = App;
export default App;
