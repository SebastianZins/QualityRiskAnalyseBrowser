import QualityRiskAssessmentBrowserPageContent from "@/features/qualityRiskAssessmentBrowser/page-content/QualityRiskAssessmentBrowserPageContent";
import {
    AppShell,
    Group,
    MantineProvider,
    createTheme,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";

export default function App({}) {
    const theme = createTheme({});
    const theme1 = useMantineTheme();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

    return (
        <MantineProvider theme={theme}>
            <AppShell
                padding="md"
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "sm",
                    collapsed: {
                        desktop: !desktopOpened,
                    },
                }}
            >
                <AppShell.Header>
                    <Title c={theme1.primaryColor} order={1} pt={5} pl={20}>
                        Quality Risk Assessment Tool
                    </Title>
                </AppShell.Header>
                <AppShell.Navbar></AppShell.Navbar>
                <AppShell.Main>
                    <QualityRiskAssessmentBrowserPageContent />
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
