import { useMantineTheme } from "@mantine/styles";
import { ParentSize } from "@visx/responsive";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

import { plotlyDarkBase, plotlyLightBase } from "@/styles/plotly-themes";

import { MeasurementsValues } from "@/sampleData/types/ILOT.type";
import { max, min } from "d3";

function HistogramChart({
    data,
    selected,
}: {
    data: MeasurementsValues;
    selected: number | undefined;
}) {
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

    const sortedData = data.values.sort((a, b) => (a.value > b.value ? -1 : 1));

    return (
        <ParentSize>
            {(parent) => (
                <Plot
                    data={[
                        {
                            type: "bar",
                            x: sortedData.map((item) => item.value),
                            y: sortedData.map((item) => item.count),
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
                        shapes: [
                            {
                                type: "line",
                                y0: 0,
                                y1:
                                    max(sortedData.map((item) => item.count)) ||
                                    0,
                                x0: selected,
                                x1: selected,
                                line: {
                                    color: "gray",
                                },
                            },
                        ],
                    }}
                />
            )}
        </ParentSize>
    );
}

export default HistogramChart;
