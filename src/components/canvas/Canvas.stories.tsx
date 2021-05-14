import React from "react"
import { storiesOf } from "@storybook/react"

import { Canvas } from "./Canvas"

const stories = storiesOf('Canvasx', module);

stories.add('Canvas', () => {
    return <Canvas />;
})