import React from "react"
import { storiesOf } from "@storybook/react"

import { Toolbar } from "./Toolbar"

const stories = storiesOf('Canvasx', module);

stories.add('Toolbar', () => {
    return <Toolbar />;
})