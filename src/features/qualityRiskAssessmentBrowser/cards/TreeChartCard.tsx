import { IconChartBar, IconError404 } from "@tabler/icons-react";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import { treeType } from "@/sampleData/types/GraphObject.type";

import ContentCard from "@/components/ContentCard";
import PlaceHolder from "@/components/PlaceHolder";
import ZoomableTreeChart from "../plots/ZoomableTreeChart";

function TreeChardCard({
    data,
    handleUpdateSelectedMaterial,
}: {
    data: treeType;
    handleUpdateSelectedMaterial: (material: treeType) => void;
}) {
    return (
        <ContentCard
            errorPlaceholder={
                <PlaceHolder
                    text="No property data found!"
                    icon={IconError404}
                />
            }
            defaultPlaceholder={
                <PlaceHolder text={"No data found!"} icon={IconChartBar} />
            }
            title="Quality Risk Correlation Browser"
            gridAreaKey="TreeCard"
            description="Comparison Browser for potential risk to the end product quality based on measurement deviations of single props."
            isError={false}
            isLoading={false}
            content={
                <ParentSize>
                    {(parent) => (
                        <ZoomableTreeChart
                            width={parent.width}
                            height={parent.height}
                            data={data}
                            handleUpdateSelectedMaterial={
                                handleUpdateSelectedMaterial
                            }
                        />
                    )}
                </ParentSize>
            }
        ></ContentCard>
    );
}

export default TreeChardCard;
