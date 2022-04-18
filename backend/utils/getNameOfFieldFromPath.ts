export const getNameOfFieldFromPath = (path: string): string =>
  path.replaceAll("body", "").replace(".", "");
