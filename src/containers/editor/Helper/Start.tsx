import React, { useContext, useState } from "react";
import _ from "lodash";
import { Button } from "antd";
import Tour from "reactour";
import steps from "./steps";

export const Start: React.FC = (props: any) => {
  const [tour, setTour] = useState(true);

  return (
    <Tour steps={steps} isOpen={tour} onRequestClose={() => setTour(false)} />
  );
};
