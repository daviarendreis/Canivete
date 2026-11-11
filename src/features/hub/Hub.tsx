import { Container, Grid } from "@radix-ui/themes";
import { CalendarIcon } from "@radix-ui/react-icons";
import { apps } from "./data/apps"
import AppCard from "./components/AppCard";
import { getTodayLabel } from "../../utils/date";
import useAppSummaries from "./hooks/useAppSummaries";
import PageHeader from "../../components/PageHeader";

export default function Hub() {
    const todayLabel = getTodayLabel()
    const summaries = useAppSummaries()

    return (
        <Container size={'3'}>
            <PageHeader
                eyebrow={todayLabel}
                eyebrowIcon={<CalendarIcon />}
                title={<>Time to get <em>things</em> done</>}
                subtitle="Four small tools to help you work smarter, every day."
            />

            <Grid columns={{ initial: '1', sm: '2' }} gap={'4'}>
                {apps.map((app) => (
                    <AppCard key={app.to} icon={app.icon}
                        name={app.name}
                        description={app.description}
                        color={app.color}
                        to={app.to}
                        summary={summaries[app.to]} />
                ))}
            </Grid>
        </Container>
    )
}
