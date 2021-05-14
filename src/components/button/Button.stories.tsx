import React from "react";
import { storiesOf } from "@storybook/react";

import { Button } from "./Button";

const stories = storiesOf("Canvasx", module);

stories.add("Button", () => {
  return <Button />;
});
