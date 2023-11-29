import React, { useRef, useState, useMemo, useEffect } from "react";
import { max, extent } from "d3-array";
import { Group } from "@visx/group";
import { scaleTime, scaleLinear } from "@visx/scale";
import { Brush } from "@visx/brush";
import { Bounds } from "@visx/brush/lib/types";
import BaseBrush from "@visx/brush/lib/BaseBrush";
import { Circle } from "@visx/shape";

import { ILOT } from "@/sampleData/types/ILOT.type";

import BrushHandle from "../utils/BrushHandle";
import LineChart, { getDateLineChart, getValueLineChart } from "./LineChart";
import { useMantineTheme } from "@mantine/styles";
import { plotlyDarkBase, plotlyLightBase } from "@/styles/plotly-themes";

function DateTimeSeriesChart({
    width,
    height,
    margin = {
        top: 10,
        left: 40,
        bottom: 20,
        right: 20,
    },
    data,
    comparisonValue,
    comparisonBarWidth,
    compact = false,
}: {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    data: ILOT[];
    comparisonValue: Date;
    comparisonBarWidth: number;
    compact?: boolean;
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

    const selectedBrushStyle = {
        fill: "rgba(0, 0, 0, 0.3)",
        stroke: baseLayout.colorway[7],
    };

    const [filteredStock, setFilteredStock] = useState(data);

    const innerHeight = height - margin.top - margin.bottom;
    const topChartBottomMargin = 0;
    const topChartHeight = innerHeight * 0.85;
    const bottomChartHeight = innerHeight * 0.15;
    // bounds
    const xMax = Math.max(width - margin.left - margin.right, 0);
    const yMax = topChartHeight - 35;
    const xBrushMax = Math.max(width - margin.left - margin.right, 0);
    const yBrushMax = bottomChartHeight;

    const brushMargin = {
        top: 0,
        bottom: 10,
        left: margin.left,
        right: margin.right,
    };

    useEffect(() => {
        const newData = data.sort((a, b) =>
            getDateLineChart(a) < getDateLineChart(b) ? 1 : -1
        );
        setFilteredStock(newData);
    }, [data]);

    const brushRef = useRef<BaseBrush | null>(null);

    const onBrushChange = (domain: Bounds | null) => {
        if (!domain) return;
        const { x0, x1, y0, y1 } = domain;
        const dataCopy = data.filter((s) => {
            const x = getDateLineChart(s).getTime();
            const y = getValueLineChart(s);
            return x > x0 && x < x1 && y > y0 && y < y1;
        });
        setFilteredStock(dataCopy);
    };
    // scales
    const dateScale = useMemo(
        () =>
            scaleTime<number>({
                range: [0, xMax],
                domain: extent(filteredStock, getDateLineChart) as [Date, Date],
            }),
        [xMax, filteredStock]
    );
    const stockScale = useMemo(
        () =>
            scaleLinear<number>({
                range: [yMax, 0],
                domain: [
                    0,
                    Math.max(105, ...filteredStock.map((item) => item.value)),
                ],
                nice: true,
            }),
        [yMax, filteredStock]
    );
    const brushDateScale = useMemo(
        () =>
            scaleTime<number>({
                range: [0, xBrushMax],
                domain: extent(data, getDateLineChart) as [Date, Date],
            }),
        [xBrushMax, data]
    );
    const brushStockScale = useMemo(
        () =>
            scaleLinear({
                range: [yBrushMax, 0],
                domain: [0, max(data, getValueLineChart) || 0],
                nice: true,
            }),
        [yBrushMax, data]
    );

    const initialBrushPosition = useMemo(
        () => ({
            start: { x: brushDateScale(getDateLineChart(data[0])) },
            end: { x: brushDateScale(getDateLineChart(data[0])) },
        }),
        [brushDateScale, data]
    );

    if (width == 0 || height == 0) {
        return;
    }

    console.log(data);
    return (
        <>
            <Group style={{ width: "100%", height: "100%" }}>
                <>
                    <svg width={width} height={topChartHeight}>
                        <rect
                            x={0}
                            y={0}
                            width={width}
                            height={topChartHeight}
                            fill="#edf2ff"
                        />
                        <>
                            <LineChart
                                hideBottomAxis={compact}
                                data={filteredStock}
                                width={width}
                                margin={{
                                    ...margin,
                                    bottom: topChartBottomMargin,
                                }}
                                yMax={yMax}
                                xScale={dateScale}
                                yScale={stockScale}
                                comparisonValue={comparisonValue}
                                comparisonBarWidth={comparisonBarWidth}
                            />
                            {filteredStock.map((glyph) => (
                                <Circle
                                    r={3}
                                    fill={baseLayout!.colorway[0]}
                                    key={
                                        glyph.batchID +
                                        glyph.analyseTime +
                                        glyph.characterID
                                    }
                                    cx={
                                        dateScale(getDateLineChart(glyph)) +
                                        margin.left
                                    }
                                    cy={
                                        stockScale(getValueLineChart(glyph)) +
                                        margin.top
                                    }
                                />
                            ))}
                        </>
                    </svg>
                </>
                <svg width={width} height={bottomChartHeight}>
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={bottomChartHeight}
                        fill="#edf2ff"
                    />
                    <LineChart
                        hideBottomAxis
                        hideLeftAxis
                        hideSpecLine
                        hideWarningLine
                        data={data}
                        width={width}
                        yMax={yBrushMax}
                        xScale={brushDateScale}
                        yScale={brushStockScale}
                        margin={brushMargin}
                        comparisonValue={comparisonValue}
                        comparisonBarWidth={comparisonBarWidth}
                        top={0}
                    >
                        <Brush
                            xScale={brushDateScale}
                            yScale={brushStockScale}
                            width={xBrushMax}
                            height={yBrushMax}
                            margin={brushMargin}
                            handleSize={8}
                            innerRef={brushRef}
                            resizeTriggerAreas={["left", "right"]}
                            brushDirection="horizontal"
                            initialBrushPosition={initialBrushPosition}
                            onChange={onBrushChange}
                            onClick={() => setFilteredStock(data)}
                            selectedBoxStyle={selectedBrushStyle}
                            useWindowMoveEvents
                            renderBrushHandle={(props) => (
                                <BrushHandle {...props} />
                            )}
                        />
                    </LineChart>
                </svg>
            </Group>
            <style>
                {`
        .crosshair {
          position: absolute;
          top: 0;
          left: 0;
        }
        .crosshair.horizontal {
          height: 1px;
          border-top: 1px dashed #8c91a2;
        }
        .crosshair.vertical {
          width: 1px;
          border-left: 1px dashed #8c91a2;
        }`}
            </style>
        </>
    );
}

export default DateTimeSeriesChart;
