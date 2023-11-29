import React from "react";
import { useMantineTheme } from "@mantine/styles";
import { ParentSize } from "@visx/responsive";
import dynamic from "next/dynamic";

import { plotlyDarkBase, plotlyLightBase } from "@/styles/plotly-themes";

import { MeasurementsGroupedType } from "@/sampleData/types/ILOT.type";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

function HistogramChart({ data }: { data: MeasurementsGroupedType }) {
    const theme = useMantineTheme();

    let baseLayout = {};
    if (theme.colorScheme === "dark") {
        baseLayout = {
            ...plotlyDarkBase,
        };
    } else {
        baseLayout = {
            ...plotlyLightBase,
        };
    }

    return (
        <ParentSize>
            {(parent) => (
                <Plot
                    data={[
                        {
                            type: "bar",
                            x: data.values.map((item) => item.value),
                            y: data.values.map((item) => item.count),
                        },
                    ]}
                    layout={{
                        ...baseLayout,
                        width: parent.width,
                        height: parent.height - 10,
                        xaxis: {
                            autotick: true,
                            tickcolor: "#000",
                        },
                        margin: {
                            l: 20,
                            r: 20,
                            b: 20,
                            t: 10,
                        },
                    }}
                />
            )}
        </ParentSize>
    );
}

export default HistogramChart;
