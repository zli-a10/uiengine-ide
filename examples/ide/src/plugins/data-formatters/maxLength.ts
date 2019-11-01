function formatterMaxLength(value: string, params: any) {
  const { max = 10, suffix = "..." } = params;
  console.log(value, params);
  return `${value.substr(0, max)}${suffix}`;
}

export const maxLength = {
  execution: formatterMaxLength,
  name: "max-length",
  params: {
    max: "number",
    suffix: "string"
  }
};
