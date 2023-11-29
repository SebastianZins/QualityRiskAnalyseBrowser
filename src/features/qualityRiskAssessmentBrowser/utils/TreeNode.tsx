import React, { useState } from "react";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";

import { treeType } from "@/sampleData/types/GraphObject.type";

import { qualityRiskScale } from "@/styles/plotly-themes";

export const enum nodeType {
    RawMaterial,
    ProcessOrder,
    EndProduct,
}
function TreeNode({
    x: posX,
    y: posY,
    data,
    useUpdater,
    handleUpdateSelectedMaterial,
}: {
    x: number;
    y: number;
    data: HierarchyPointNode<treeType>;
    useUpdater: () => void;
    handleUpdateSelectedMaterial: (material: treeType) => void;
}) {
    const isProcessOrderShift = data.data.type == nodeType.ProcessOrder ? 5 : 0;
    const isRawMaterialShift = data.data.type == nodeType.RawMaterial ? 5 : 0;
    const nodeHeight = 70 + 3 * isRawMaterialShift;
    const nodeWidth = 240 + 2 * isProcessOrderShift;

    const x = posX + (nodeWidth + isProcessOrderShift * -2) / 2;
    const y = posY - nodeHeight / 2;

    const padding = { left: 5, right: 5, top: 5, bottom: 5 };

    const scoreSize = 15;

    const [hovered, setHovered] = useState(false);

    const HandleOnNodeClick = () => {
        data.data.isExpanded = !data.data.isExpanded;
        useUpdater();
    };

    return (
        <g
            transform={`rotate(-90)`}
            onMouseEnter={() => {
                setHovered(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
            }}
        >
            <rect
                fill={
                    qualityRiskScale[
                        Math.max(
                            ...data.data.scores
                                .map((measurements) => {
                                    return measurements.measurements.map(
                                        (ilots) => ilots.score
                                    );
                                })
                                .flat()
                        )
                    ]
                }
                height={scoreSize}
                width={nodeWidth}
                x={x + isRawMaterialShift * 2}
                y={y}
                stroke={"black"}
            ></rect>
            <Node_TextBox
                height={nodeHeight}
                width={nodeWidth}
                scoreHeight={scoreSize}
                x={x + isRawMaterialShift * 2}
                y={y}
                data={data}
                padding={padding}
                hovered={hovered}
            ></Node_TextBox>
            {data.data.type != nodeType.ProcessOrder && (
                <rect
                    fill="rgb(78, 78, 78)"
                    height={nodeHeight}
                    width={10}
                    x={x + nodeWidth * (isRawMaterialShift / -5 + 1)}
                    y={y}
                    stroke={"black"}
                ></rect>
            )}
            <rect
                x={x}
                y={y}
                height={nodeHeight}
                width={nodeWidth}
                fill="transparent"
                style={{
                    cursor:
                        data.data.type != nodeType.RawMaterial
                            ? "pointer"
                            : "default",
                }}
                onClick={HandleOnNodeClick}
            />
            <g>
                <SearchImage
                    width={20}
                    height={20}
                    x={x + nodeWidth - 10 - 20 + isRawMaterialShift * 2}
                    y={y + nodeHeight - (nodeHeight - scoreSize - 20) / 2 - 20}
                    onClick={() => {
                        handleUpdateSelectedMaterial(data.data);
                    }}
                ></SearchImage>
            </g>
        </g>
    );
}

type NodeTextBoxProps = {
    height: number;
    width: number;
    scoreHeight: number;
    x: number;
    y: number;
    data: HierarchyPointNode<treeType>;
    padding: { left: number; right: number; top: number; bottom: number };
    hovered: boolean;
    // useUpdater: () => void;
};

function Node_TextBox(props: NodeTextBoxProps) {
    const numberOfRows = props.data.data.type == nodeType.ProcessOrder ? 4 : 5;
    const rowHeight =
        (props.height -
            props.scoreHeight -
            props.padding.top -
            props.padding.bottom) /
        numberOfRows;
    const row0Y = props.y + props.scoreHeight + props.padding.top;

    return (
        <g>
            <rect
                fill={props.hovered ? "var(--mantine-color-gray-3)" : "white"}
                height={props.height - props.scoreHeight}
                width={props.width}
                x={props.x}
                y={props.scoreHeight + props.y}
                stroke="rgb(78, 78, 78)"

                // onClick={() => {
                //     props.data.data.isExpanded = !props.data.data.isExpanded;
                //     props.useUpdater();
                // }}
            ></rect>
            <Node_TextBoxText
                x={props.x}
                textY={row0Y}
                rowHeight={rowHeight}
                data={props.data}
                padding={props.padding}
            />
        </g>
    );
}

type NodeTextBoxTextProps = {
    x: number;
    textY: number;
    rowHeight: number;
    data: HierarchyPointNode<treeType>;
    padding: { left: number; right: number; top: number; bottom: number };
};

function Node_TextBoxText(props: NodeTextBoxTextProps) {
    const col0X = props.x + props.padding.left;
    const fontSize = 10;

    const isProcessOrder =
        props.data.data.type === nodeType.ProcessOrder ? 0 : 1;

    return (
        <g fontSize={fontSize} fontFamily="Arial">
            {isProcessOrder != 1 && (
                <Node_TextBoxTextRow
                    x={col0X}
                    y={props.textY + props.rowHeight * 0.5 + fontSize / 2}
                    textLabel="Process Order ID:"
                    textValue={props.data.data.id}
                />
            )}
            {isProcessOrder == 1 && (
                <>
                    <Node_TextBoxTextRow
                        x={col0X}
                        y={props.textY + props.rowHeight * 0.5 + fontSize / 2}
                        textLabel="Company:"
                        textValue={props.data.data.companyName}
                    />
                    <Node_TextBoxTextRow
                        x={col0X}
                        y={props.textY + props.rowHeight * 1.5 + fontSize / 2}
                        textLabel=""
                        textValue={"(" + props.data.data.id + ")"}
                    />
                </>
            )}
            <Node_TextBoxTextRow
                x={col0X}
                y={
                    props.textY +
                    props.rowHeight * (1.5 + isProcessOrder) +
                    fontSize / 2
                }
                textLabel="Batch:"
                textValue={props.data.data.batchID}
            />
            <Node_TextBoxTextRow
                x={col0X}
                y={
                    props.textY +
                    props.rowHeight * (2.5 + isProcessOrder) +
                    fontSize / 2
                }
                textLabel="Material:"
                textValue={props.data.data.materialName}
            />
            <Node_TextBoxTextRow
                x={col0X}
                y={
                    props.textY +
                    props.rowHeight * (3.5 + isProcessOrder) +
                    fontSize / 2
                }
                textLabel=""
                textValue={"(" + props.data.data.materialID + ")"}
            />
        </g>
    );
}

type NodeTextBoxTextRowProps = {
    x: number;
    y: number;
    textLabel: string;
    textValue: string;
};

function Node_TextBoxTextRow(props: NodeTextBoxTextRowProps) {
    const col1X = props.x + 85;
    return (
        <g>
            <text x={props.x} y={props.y}>
                {props.textLabel}
            </text>
            <text x={col1X} y={props.y}>
                {props.textValue}
            </text>
        </g>
    );
}

type SearchImageProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    onClick: () => void;
};

function SearchImage(props: SearchImageProps) {
    return (
        <svg
            width={props.width}
            height={props.height}
            x={props.x}
            y={props.y}
            viewBox="0 0 24 24"
            fill="none"
            onClick={props.onClick}
            cursor={"pointer"}
        >
            <rect
                fill="rgb(176, 176, 176)"
                height={24}
                width={24}
                x={0}
                y={0}
            ></rect>
            <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default TreeNode;
