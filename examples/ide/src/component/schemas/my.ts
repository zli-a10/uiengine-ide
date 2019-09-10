import { number } from "prop-types";

export default [
  {
    id: "general", // prefix
    title: "General",
    children: [
      {
        component: "my:Section",
        title: "My Section",
        isContainer: true,
        schema: {
          active: "boolean",
          title: "string"
        },
        defaultProps: {
          active: true,
          title: "Section 1"
        }
      }
    ]
  }
];
