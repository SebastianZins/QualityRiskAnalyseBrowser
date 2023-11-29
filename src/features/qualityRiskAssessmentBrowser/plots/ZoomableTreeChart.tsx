/* eslint react/jsx-handler-names: "off" */
import React, { useEffect, useState } from "react";
import { Zoom } from "@visx/zoom";
import { RectClipPath } from "@visx/clip-path";
import { hierarchy } from "@visx/hierarchy";

import { treeType } from "@/sampleData/types/GraphObject.type";

import TreeChart from "./TreeChart";
import { useMantineTheme } from "@mantine/styles";

const margin = { top: 10, bottom: 10, left: 10, right: 10 };

function ZoomableTreeChart({
    width,
    height,
    data,
    handleUpdateSelectedMaterial,
}: {
    width: number;
    height: number;
    data: treeType;
    handleUpdateSelectedMaterial: (material: treeType) => void;
}) {
    const theme = useMantineTheme();

    const [showMiniMap, setShowMiniMap] = useState<boolean>(true);
    const [screenSize, setScreenSize] = useState({
        width: width - margin.left - margin.right,
        height: height - margin.bottom - margin.top,
    });

    const [origin, setOrigin] = useState({
        x: (width - margin.left - margin.right) / 2,
        y: (height - margin.bottom - margin.top) / 2,
    });

    const [dataHierarchy, setDataHierarchy] = useState(
        hierarchy(data, (d) => (d.isExpanded ? d.children : null))
    );

    useEffect(() => {
        setScreenSize({ width, height });
        setOrigin({
            x: (width - margin.left - margin.right) / 2,
            y: (height - margin.bottom - margin.top) / 2,
        });
    }, [width, height]);

    const initialTransform = {
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0,
    };

    const handleNodeClick = () => {
        setDataHierarchy(() => {
            return hierarchy(data, (d) => (d.isExpanded ? d.children : null));
        });
    };

    return (
        <div>
            <Zoom<SVGSVGElement>
                width={screenSize.width}
                height={screenSize.height}
                scaleXMin={1 / 1000}
                scaleXMax={1000}
                scaleYMin={1 / 1000}
                scaleYMax={1000}
                initialTransformMatrix={initialTransform}
            >
                {(zoom) => (
                    <div>
                        <svg
                            width={screenSize.width}
                            height={screenSize.height}
                            style={{
                                cursor: zoom.isDragging ? "grabbing" : "curser",
                                touchAction: "none",
                                position: "absolute",
                                overflow: "clip",
                            }}
                            ref={zoom.containerRef}
                            pointerEvents={"visibleFill"}
                        >
                            <RectClipPath
                                id="zoom-clip"
                                width={screenSize.width}
                                height={screenSize.height}
                            />
                            <rect
                                width={screenSize.width}
                                height={screenSize.height}
                                rx={14}
                                fill={theme.colors.gray[5]} //"#6b667e"
                                onTouchStart={zoom.dragStart}
                                onTouchMove={zoom.dragMove}
                                onTouchEnd={zoom.dragEnd}
                                onMouseDown={zoom.dragStart}
                                onMouseMove={() => {
                                    if (zoom) {
                                        zoom.dragMove;
                                        //console.log("outer", zoom.toString());
                                    }
                                }}
                                onMouseUp={zoom.dragEnd}
                                onMouseLeave={
                                    zoom
                                        ? () => {
                                              if (zoom.isDragging)
                                                  zoom.dragEnd();
                                          }
                                        : () => {}
                                }
                            />
                            <g transform={zoom.toString()}>
                                <TreeChart
                                    origin={origin}
                                    dataHierarchy={dataHierarchy}
                                    handleNodeClick={handleNodeClick}
                                    handleUpdateSelectedMaterial={
                                        handleUpdateSelectedMaterial
                                    }
                                ></TreeChart>
                            </g>
                            {showMiniMap && (
                                <g
                                    clipPath="url(#zoom-clip)"
                                    transform={`
                                        scale(0.25)
                                        translate(${
                                            screenSize.width * 3 - 60 - 6
                                        }, ${screenSize.height * 3 - 60 - 6})
                                    `}
                                >
                                    <rect
                                        width={screenSize.width}
                                        height={screenSize.height}
                                        fill={theme.colors.gray[7]}
                                    />
                                    <g transform={zoom.toString()}>
                                        <g transform={zoom.toString()}>
                                            <TreeChart
                                                origin={origin}
                                                dataHierarchy={dataHierarchy}
                                                handleNodeClick={() => {}}
                                                handleUpdateSelectedMaterial={() => {}}
                                            ></TreeChart>
                                        </g>
                                    </g>
                                    <rect
                                        width={screenSize.width - 5}
                                        height={screenSize.height - 5}
                                        fill="white"
                                        fillOpacity={0.2}
                                        stroke="white"
                                        strokeWidth={4}
                                        transform={zoom.toStringInvert()}
                                    />
                                    <rect
                                        width={screenSize.width - 0}
                                        height={screenSize.height - 0}
                                        fill="none"
                                        stroke="white"
                                        strokeWidth={20}
                                    />
                                </g>
                            )}
                        </svg>
                        <div className="controls">
                            <button
                                type="button"
                                className="btn btn-zoom"
                                onClick={() => {
                                    zoom.scale({ scaleX: 1.2, scaleY: 1.2 });
                                }}
                            >
                                +
                            </button>
                            <button
                                type="button"
                                className="btn btn-zoom btn-bottom"
                                onClick={() => {
                                    zoom.scale({ scaleX: 0.8, scaleY: 0.8 });
                                }}
                            >
                                -
                            </button>
                            <button
                                type="button"
                                className="btn btn-lg"
                                onClick={zoom.center}
                            >
                                Center
                            </button>
                            <button
                                type="button"
                                className="btn btn-lg"
                                onClick={zoom.reset}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                className="btn btn-lg"
                                onClick={zoom.clear}
                            >
                                Clear
                            </button>
                        </div>
                        <div className="mini-map">
                            <button
                                type="button"
                                className="btn btn-lg"
                                onClick={() => setShowMiniMap(!showMiniMap)}
                            >
                                {showMiniMap ? "Hide" : "Show"} Mini Map
                            </button>
                        </div>
                    </div>
                )}
            </Zoom>
            <style jsx>{`
                .btn {
                    margin: 0;
                    text-align: center;
                    border: none;
                    background: #333333;
                    color: #888;
                    padding: 0 4px;
                    border-top: 1px solid #0a0a0a;
                }
                .btn-lg {
                    font-size: 12px;
                    line-height: 1;
                    padding: 4px;
                }
                .btn-zoom {
                    width: 26px;
                    font-size: 22px;
                }
                .btn-bottom {
                    margin-bottom: 1rem;
                }
                .description {
                    font-size: 12px;
                    margin-right: 0.25rem;
                }
                .controls {
                    position: absolute;
                    top: 80px;
                    right: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
                .mini-map {
                    position: absolute;
                    bottom: 25px;
                    right: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    right: 30px;
                }
                .relative {
                    position: relative;
                }
            `}</style>
        </div>
    );
}

export default ZoomableTreeChart;
