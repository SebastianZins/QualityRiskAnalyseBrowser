import {
    Card,
    Text,
    ScrollArea,
    Stack,
    Group,
    SegmentedControl,
    Center,
    Slider,
} from "@mantine/core";

import MeasurementTableItem from "../utils/MeasurementTableItem";
import { treeType } from "@/sampleData/types/GraphObject.type";
import { useMantineTheme } from "@mantine/styles";
import { nodeType } from "../utils/TreeNode";

function MeasurementTable({
    node,
    selectedILOT,
    handleUpdateMeasurements,
    handleUpdateSelectedILOT,
}: {
    node: treeType | undefined;
    selectedILOT: string | undefined;
    handleUpdateMeasurements: (charID: string) => void;
    handleUpdateSelectedILOT: (ILOTID: string) => void;
}) {
    const theme = useMantineTheme();
    return (
        <Card
            style={{ gridArea: "SelectorCard" }}
            withBorder
            shadow="sm"
            radius="md"
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="apart">
                    <div>
                        <Text c={theme.primaryColor} fw={600}>
                            {"Select a Measurement"}
                        </Text>
                        <Text c="dimmed" size="sm">
                            {"Selected Item: " +
                                (node?.type == nodeType.ProcessOrder
                                    ? "Process Order (" + node?.id + ")"
                                    : node?.materialName +
                                      " (BatchID: " +
                                      node?.batchID +
                                      ")")}
                        </Text>
                    </div>
                </Group>
            </Card.Section>
            <Card.Section withBorder inheritPadding py="xs">
                {node != undefined && node.scores.length > 0 ? (
                    <Center>
                        <div
                            style={{
                                overflowX: "auto",
                                whiteSpace: "nowrap",
                            }}
                        >
                            <ScrollArea>
                                <SegmentedControl
                                    data={node?.scores
                                        .map((item) => item.ILOTID)
                                        .flat()}
                                    onChange={(event) => {
                                        handleUpdateSelectedILOT(event);
                                    }}
                                />
                            </ScrollArea>
                        </div>
                    </Center>
                ) : undefined}
            </Card.Section>
            <ScrollArea mah={500} mx="auto">
                {node && selectedILOT ? (
                    <Stack gap="5">
                        {node.scores
                            .find((item) => item.ILOTID == selectedILOT)!
                            .measurements.map((measure) => {
                                return (
                                    <MeasurementTableItem
                                        key={measure.characterID}
                                        data={measure}
                                        handleUpdateMeasurements={
                                            handleUpdateMeasurements
                                        }
                                    />
                                );
                            })}
                    </Stack>
                ) : undefined}
            </ScrollArea>
        </Card>
    );
}

export default MeasurementTable;
