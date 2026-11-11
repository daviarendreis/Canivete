import { Container, Grid } from "@radix-ui/themes";
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
                title={<>Time to get <em>things</em> done</>}
                subtitle={todayLabel}
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
