import React from "react";
import { curveStep } from "d3";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { AxisLeft, AxisBottom, AxisScale } from "@visx/axis";

import { ILOT } from "@/sampleData/types/ILOT.type";
import { useMantineTheme } from "@mantine/styles";
import { plotlyDarkBase, plotlyLightBase } from "@/styles/plotly-themes";

// Initialize some variables
const axisColor = "rgb(150,150,150)";
const axisBottomTickLabelProps = {
    textAnchor: "middle" as const,
    fontFamily: "Arial",
    fontSize: 10,
    fill: axisColor,
};
const axisLeftTickLabelProps = {
    dx: "-0.25em",
    dy: "0.25em",
    fontFamily: "Arial",
    fontSize: 15,
    textAnchor: "end" as const,
    fill: axisColor,
};

// accessors
export const getDateLineChart = (d: ILOT) => new Date(d.analyseTime);
export const getValueLineChart = (d: ILOT) => d.value;

export default function AreaChart({
    data,
    width,
    yMax,
    margin,
    xScale,
    yScale,
    hideBottomAxis = false,
    hideLeftAxis = false,
    hideWarningLine = false,
    hideSpecLine = false,
    comparisonValue,
    comparisonBarWidth,
    top,
    left,
    children,
}: {
    data: ILOT[];
    xScale: AxisScale<number>;
    yScale: AxisScale<number>;
    width: number;
    yMax: number;
    margin: { top: number; right: number; bottom: number; left: number };
    hideBottomAxis?: boolean;
    hideLeftAxis?: boolean;
    hideWarningLine?: boolean;
    hideSpecLine?: boolean;
    comparisonValue: Date;
    comparisonBarWidth: number;
    top?: number;
    left?: number;
    children?: React.ReactNode;
}) {
    const theme = useMantineTheme();

    let baseLayout: typeof plotlyDarkBase | typeof plotlyLightBase | undefined =
        undefined;
    if (theme.colorScheme === "dark") {
        baseLayout = {
            ...plotlyDarkBase,
        };
    } else {
        baseLayout = {
            ...plotlyLightBase,
        };
    }

    if (width < 10) return null;
    return (
        <Group left={left || margin.left} top={top || margin.top}>
            <rect
                width={width - margin.left - margin.right}
                height={yMax}
                fill={baseLayout.plot_bgcolor}
            />
            <LinePath<ILOT>
                data={data}
                x={(d) => xScale(getDateLineChart(d)) || 0}
                y={(d) => yScale(getValueLineChart(d)) || 0}
                strokeWidth={2}
                stroke={baseLayout.colorway[0]}
                curve={curveStep}
            />
            <Group>
                <LinePath
                    data={[
                        {
                            x:
                                (xScale(comparisonValue) || 0) -
                                comparisonBarWidth,
                            y: Math.min(yMax * 0.05, 0),
                        },
                        {
                            x:
                                (xScale(comparisonValue) || 0) -
                                comparisonBarWidth,
                            y: Math.max(yMax * 0.95, yMax + 5),
                        },
                        {
                            x:
                                (xScale(comparisonValue) || 0) +
                                comparisonBarWidth,
                            y: Math.max(yMax * 0.95, yMax + 5),
                        },
                        {
                            x:
                                (xScale(comparisonValue) || 0) +
                                comparisonBarWidth,
                            y: Math.min(yMax * 0.05, 0),
                        },
                        {
                            x:
                                (xScale(comparisonValue) || 0) -
                                comparisonBarWidth,
                            y: Math.min(yMax * 0.05, 0),
                        },
                    ]}
                    x={(d) => d.x}
                    y={(d) => d.y}
                    stroke={theme.colors.gray[7]}
                    strokeWidth={1}
                    strokeDasharray="8 4"
                />
                {data.length > 0 && (
                    <g strokeWidth={1} strokeDasharray="8 4">
                        {
                            // Min Spec Line
                            (yScale(data[0].minSpec || 0) || 0) > 0 &&
                                !hideSpecLine && (
                                    <LinePath
                                        data={[
                                            {
                                                x: 0,
                                                y:
                                                    yScale(
                                                        data[0].minSpec || 0
                                                    ) || 0,
                                            },
                                            {
                                                x: Math.max(
                                                    width -
                                                        margin.left -
                                                        margin.right,
                                                    0
                                                ),
                                                y:
                                                    yScale(
                                                        data[0].minSpec || 0
                                                    ) || 0,
                                            },
                                        ]}
                                        x={(d) => d.x}
                                        y={(d) => d.y}
                                        stroke={"#00bfff"}
                                    />
                                )
                        }
                        {
                            // Max Spec Line
                            (yScale(data[0].maxSpec || 0) || 0) <= yMax &&
                                !hideSpecLine && (
                                    <LinePath
                                        data={[
                                            {
                                                x: 0,
                                                y:
                                                    yScale(
                                                        data[0].maxSpec || 0
                                                    ) || 0,
                                            },
                                            {
                                                x: Math.max(
                                                    width -
                                                        margin.left -
                                                        margin.right,
                                                    0
                                                ),
                                                y:
                                                    yScale(
                                                        data[0].maxSpec || 0
                                                    ) || 0,
                                            },
                                        ]}
                                        x={(d) => d.x}
                                        y={(d) => d.y}
                                        stroke={"#00bfff"}
                                    />
                                )
                        }
                        {
                            // Min Warning Line
                            (yScale(data[0].minWarning || 0) || 0) > 0 &&
                                !hideWarningLine && (
                                    <LinePath
                                        data={[
                                            {
                                                x: 0,
                                                y:
                                                    yScale(
                                                        data[0].minWarning || 0
                                                    ) || 0,
                                            },
                                            {
                                                x: Math.max(
                                                    width -
                                                        margin.left -
                                                        margin.right,
                                                    0
                                                ),
                                                y:
                                                    yScale(
                                                        data[0].minWarning || 0
                                                    ) || 0,
                                            },
                                        ]}
                                        x={(d) => d.x}
                                        y={(d) => d.y}
                                        stroke={"transparent"}
                                    />
                                )
                        }
                        {
                            // Max Warning Line
                            (yScale(data[0].maxWarning || 0) || 0) <= yMax &&
                                !hideWarningLine && (
                                    <LinePath
                                        data={[
                                            {
                                                x: 0,
                                                y:
                                                    yScale(
                                                        data[0].maxWarning || 0
                                                    ) || 0,
                                            },
                                            {
                                                x: Math.max(
                                                    width -
                                                        margin.left -
                                                        margin.right,
                                                    0
                                                ),
                                                y:
                                                    yScale(
                                                        data[0].maxWarning || 0
                                                    ) || 0,
                                            },
                                        ]}
                                        x={(d) => d.x}
                                        y={(d) => d.y}
                                        stroke={"red"}
                                    />
                                )
                        }
                    </g>
                )}
            </Group>
            {!hideBottomAxis && (
                <AxisBottom
                    top={yMax}
                    scale={xScale}
                    numTicks={width > 520 ? 10 : 5}
                    stroke={axisColor}
                    tickStroke={axisColor}
                    strokeWidth={1}
                    tickLabelProps={() => axisBottomTickLabelProps}
                />
            )}
            {!hideLeftAxis && (
                <AxisLeft
                    scale={yScale}
                    numTicks={5}
                    stroke={axisColor}
                    strokeWidth={1}
                    tickStroke={axisColor}
                    tickLabelProps={() => axisLeftTickLabelProps}
                />
            )}
            {children}
        </Group>
    );
}
