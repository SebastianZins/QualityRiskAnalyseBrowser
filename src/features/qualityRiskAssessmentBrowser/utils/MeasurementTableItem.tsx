import { Paper, Text, Card } from "@mantine/core";
import { useHover } from "@mantine/hooks";

import useStyles from "../page-content/QualityRiskAssessmentBrowserPageContent.styles";
import { qualityRiskScale } from "@/styles/plotly-themes";

function MeasurementTableItem({
    data,
    handleUpdateMeasurements,
}: {
    data: {
        characterID: string;
        characterName: string;
        score: number;
    };
    handleUpdateMeasurements: (measurementID: string) => void;
}) {
    const { hovered, ref } = useHover();

    const { classes } = useStyles();

    return (
        <Card
            key={Math.random()}
            shadow="xl"
            radius="xs"
            withBorder
            pl={6}
            pr={8}
            pt={6}
            pb={6}
            ref={ref}
            bg={hovered ? "var(--mantine-color-gray-light-hover)" : "white"}
            onClick={() => {
                handleUpdateMeasurements(data.characterID);
            }}
        >
            <div className={classes.stackLayoutWrapper}>
                <Text size="s" style={{ gridArea: "Text" }}>
                    {data.characterName}
                </Text>
                <Paper
                    shadow="xs"
                    withBorder
                    style={{
                        background:
                            qualityRiskScale[
                                Math.floor(data.score) % 5
                                // Math.max(selected)
                            ],
                    }}
                ></Paper>
            </div>
        </Card>
    );
}

export default MeasurementTableItem;
