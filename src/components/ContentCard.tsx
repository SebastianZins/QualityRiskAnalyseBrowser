import {
    Card,
    LoadingOverlay,
    Text,
    useMantineTheme,
    Group,
} from "@mantine/core";

type ContentCardProps = {
    title: string;
    description: string;
    content?: React.ReactNode;
    furtherOptions?: React.ReactNode;
    gridAreaKey: string;
    isLoading: boolean;
    isError: boolean;
    errorPlaceholder: React.ReactNode;
    defaultPlaceholder: React.ReactNode;
};

const ContentCard = ({
    title,
    description,
    content,
    furtherOptions,
    gridAreaKey,
    isLoading,
    isError,
    errorPlaceholder,
    defaultPlaceholder,
}: ContentCardProps) => {
    const theme = useMantineTheme();

    return (
        <Card
            style={{ gridArea: gridAreaKey }}
            withBorder
            shadow="sm"
            radius="md"
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="apart">
                    <div>
                        <Text c={theme.primaryColor} fw={600}>
                            {title}
                        </Text>
                        <Text c="dimmed" size="sm">
                            {description}
                        </Text>
                    </div>
                    {furtherOptions}
                </Group>
            </Card.Section>
            <Card.Section
                inheritPadding
                style={{ height: "calc(100% - 40px)" }}
            >
                <LoadingOverlay visible={isLoading} />
                {isError
                    ? errorPlaceholder
                    : content === undefined
                    ? defaultPlaceholder
                    : content}
            </Card.Section>
        </Card>
    );
};

export default ContentCard;
