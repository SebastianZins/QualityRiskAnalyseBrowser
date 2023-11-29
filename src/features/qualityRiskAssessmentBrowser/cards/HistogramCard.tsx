import { IconChartBar, IconError404 } from "@tabler/icons-react";

import { MeasurementsValues } from "@/sampleData/types/ILOT.type";

import ContentCard from "@/components/ContentCard";
import PlaceHolder from "@/components/PlaceHolder";
import HistogramChart from "../plots/HistogramChart";

function HistogramCard({
    values,
    selected,
}: {
    values: MeasurementsValues | undefined;
    selected: number | undefined;
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
                <PlaceHolder
                    text={"No measurement data selected!"}
                    icon={IconChartBar}
                />
            }
            title="Histogram Chart"
            gridAreaKey="HistogramStats"
            description="Distribution of selected quality property."
            isError={false}
            isLoading={false}
            content={
                values != undefined && values.values.length > 0 ? (
                    <HistogramChart data={values} selected={selected} />
                ) : undefined
            }
        ></ContentCard>
    );
}

export default HistogramCard;
