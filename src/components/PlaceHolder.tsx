import { Stack, Text } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { TablerIconsProps } from "@tabler/icons-react";

type PlaceHolderProps = {
    text?: string;
    icon: React.FC<TablerIconsProps>;
};

const PlaceHolder = (props: PlaceHolderProps) => {
    const theme = useMantineTheme();

    return (
        <Stack
            align="center"
            justify="center"
            h={"100%"}
            styles={{
                root: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
        >
            <props.icon size="150" stroke="0.8" color={theme.colors.dark[1]} />
            {props.text && <Text c={theme.colors.dark[1]}>{props.text}</Text>}
        </Stack>
    );
};

export default PlaceHolder