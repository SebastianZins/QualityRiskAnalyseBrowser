import React, { useEffect, useRef, useState } from "react";
import { Group } from "@visx/group";
import { Tree } from "@visx/hierarchy";
import { HierarchyNode } from "@visx/hierarchy/lib/types";

import { treeType } from "@/sampleData/types/GraphObject.type";

import TreeNode from "../utils/TreeNode";
import { useMantineTheme } from "@mantine/styles";

function TreeChart({
    origin,
    dataHierarchy,
    handleNodeClick,
    handleUpdateSelectedMaterial,
}: {
    origin: { x: number; y: number };
    dataHierarchy: HierarchyNode<treeType>;
    handleNodeClick: () => void;
    handleUpdateSelectedMaterial: (material: treeType) => void;
}) {
    const theme = useMantineTheme();

    const [treeSize, setTreeSize] = useState({
        x: 0,
        y: 0,
        width: 250,
        height: 70,
        top: 0,
        left: 0,
    });

    const objectRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const computeSize = () => {
            const treeGroup =
                objectRef.current?.querySelector<SVGGElement>("#testGroup");
            const bbox = treeGroup?.getBBox();
            const otherBox = treeGroup?.getBoundingClientRect();
            setTreeSize({
                x: otherBox?.x || 0,
                y: otherBox?.y || 0,
                width: bbox?.height || 0,
                height: bbox?.width || 0,
                top: otherBox?.top || 0,
                left: otherBox?.left || 0,
            });
        };
        setTimeout(computeSize, 0);
    }, [dataHierarchy]);

    return (
        <g>
            <g
                transform={
                    `translate(` +
                    (origin.x - 250 * 1.5 + treeSize.width / 2) +
                    `,` +
                    origin.y +
                    `)`
                }
                ref={objectRef}
            >
                <Group id="testGroup" transform={`rotate(90)`}>
                    (
                    <Tree
                        root={dataHierarchy}
                        size={[1000, 1000]}
                        separation={(a, b) => (a.parent == b.parent ? 2 : 4)}
                        nodeSize={[50, 500]}
                    >
                        {(tree) => {
                            const returnTreeGroup = (
                                <Group top={0} left={0}>
                                    {tree.descendants().map((node, key) => {
                                        let top: number;
                                        let left: number;
                                        top = node.y;
                                        left = node.x;

                                        return (
                                            <Group
                                                top={top}
                                                left={left}
                                                key={key}
                                            >
                                                {
                                                    <TreeNode
                                                        y={0}
                                                        x={0}
                                                        data={node}
                                                        useUpdater={
                                                            handleNodeClick
                                                        }
                                                        handleUpdateSelectedMaterial={
                                                            handleUpdateSelectedMaterial
                                                        }
                                                    />
                                                }
                                            </Group>
                                        );
                                    })}
                                    {tree.links().map((link, i) => (
                                        <path
                                            key={i}
                                            d={
                                                "M" +
                                                link.source.x +
                                                "," +
                                                (link.source.y - 240 + 120) +
                                                "C" +
                                                link.source.x +
                                                "," +
                                                (link.source.y -
                                                    240 +
                                                    link.target.y -
                                                    240) /
                                                    2 +
                                                "," +
                                                link.target.x +
                                                "," +
                                                (link.source.y -
                                                    240 +
                                                    link.target.y -
                                                    240) /
                                                    2 +
                                                "," +
                                                link.target.x +
                                                "," +
                                                (link.target.y - 240 - 130)
                                            }
                                            stroke={theme.colors.gray[7]}
                                            fill="none"
                                            strokeWidth={1}
                                            id={"path-" + i.toString()}
                                        />
                                    ))}
                                </Group>
                            );

                            let minX = tree.x,
                                maxX = tree.x,
                                minY = tree.y,
                                maxY = tree.y;
                            tree.leaves().forEach((element) => {
                                if (element.x <= minX) {
                                    minX = element.x;
                                }
                                if (element.x >= maxX) {
                                    maxX = element.x;
                                }
                                if (element.y <= minY) {
                                    minY = element.y;
                                }
                                if (element.y >= maxY) {
                                    maxY = element.y;
                                }
                            });
                            return returnTreeGroup;
                        }}
                    </Tree>
                    )
                </Group>
            </g>
        </g>
    );
}

export default TreeChart;
