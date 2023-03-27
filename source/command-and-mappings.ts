const commands = {
  start: (bundleId: string, packageName: string) =>
    `adb shell am start -n ${bundleId}/${packageName}.MainActivity`,
  restart: (bundleId: string, packageName: string) =>
    `adb shell am force-stop ${bundleId} && adb shell am start -n ${bundleId}/${packageName}.MainActivity`,
  kill: (bundleId: string) => `adb shell am force-stop ${bundleId}`,
  clearData: (bundleId: string) => `adb shell pm clear ${bundleId}`,
  uninstall: (bundleId: string) => `adb uninstall ${bundleId}`,
  reverse: () => `adb reverse tcp:8081 tcp:8081`,
} as const;

export const mapping = {
  "1": {
    command: commands.start,
    title: "launch",
  },
  "2": {
    command: commands.restart,
    title: "restart",
  },
  "3": {
    command: commands.kill,
    title: "kill",
  },
  "4": {
    command: commands.clearData,
    title: "clear storage",
  },
  "5": {
    command: (bundleId: string, packageName: string) =>
      `${commands.clearData(bundleId)}` +
      ` && ` +
      `${commands.restart(bundleId, packageName)}`,
    title: "clear & restart",
  },
  "6": {
    command: commands.reverse,
    title: "adb reverse tcp:8081 tcp:8081",
  },
  "u": {
    command: commands.uninstall,
    title: "uninstall",
  },
} as const;
