function formatterMaxLength(value: string, params: any) {
  const { max = 10, suffix = "..." } = params;
  return value.length > max ? `${value.substr(0, max)}${suffix}` : value;
}

export const maxLength = {
  execution: formatterMaxLength,
  name: "max-length",
  params: {
    max: "number",
    suffix: "string"
  }
};
