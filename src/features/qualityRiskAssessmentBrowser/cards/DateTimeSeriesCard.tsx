import { IconChartBar, IconError404 } from "@tabler/icons-react";
import { ParentSize } from "@visx/responsive";

import { ILOT } from "@/sampleData/types/ILOT.type";

import PlaceHolder from "@/components/PlaceHolder";
import ContentCard from "@/components/ContentCard";

import DateTimeSeriesVisual from "../plots/DateTimeSeriesVisual";

function DateTimeSeriesCard({
    measurements,
    selected,
}: {
    measurements: ILOT[];
    selected: Date | undefined;
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
            title="Date-Time-Series Chart"
            gridAreaKey="DateStats"
            description="Distribution of selected quality property on a date-time scale."
            isError={false}
            isLoading={false}
            content={
                measurements.length > 0 && selected != undefined ? (
                    <ParentSize>
                        {(parent) => (
                            <DateTimeSeriesVisual
                                width={parent.width}
                                height={parent.height - 10}
                                data={measurements}
                                comparisonValue={selected}
                                comparisonBarWidth={5}
                            />
                        )}
                    </ParentSize>
                ) : undefined
            }
        />
    );
}

export default DateTimeSeriesCard;
