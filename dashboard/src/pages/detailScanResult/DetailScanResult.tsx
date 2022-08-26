import { FC, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Header, List, Table } from "semantic-ui-react";
//api
import { getResult } from "../../api/result";
//shared
import NavigationMenu from "../../shared/navigationMenu/NavigationMenu";
//utils
import { formatDateAndTime } from "../../utils/formatDate";
//css
import classes from "./DetailScanResult.module.css";

const DetailScanResult: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [result, setResult] = useState<React.SetStateAction<any>>();
  const [activeItem, setActiveItem] = useState<string>("");

  const handleItemClick = (e: SyntheticEvent, data: any) => {
    setActiveItem(data.name);
    if (data.name === "home") {
      navigate("/");
    } else if (data.name === "add new scan") {
      navigate("/new");
    } else {
      navigate(`/${data.name}`);
    }
  };

  const fetchResult = async () => {
    try {
      const {
        data: { success, data },
      } = await getResult(id);
      if (success) {
        console.log({ data });
        setResult(data);
        setActiveItem(data.repositoryName);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  if (!result) return <div>loading...</div>;

  return (
    <div className={classes.container}>
      <NavigationMenu
        activeItem={activeItem}
        handleItemClick={handleItemClick}
      />
      <div className={classes.contentContainer}>
        <Grid className={classes.content}>
          <div className={classes.title}>
            <Header as="h2" color="teal">
              {result.repositoryName}
            </Header>
            <List>
              <List.Item icon="recycle" content={result.status} />
              <List.Item icon="bug" content={result.findings.length} />
              <List.Item
                icon="time"
                content={
                  result.status === "Queued"
                    ? formatDateAndTime(result.queuedAt)
                    : result.status === "In Progress"
                    ? formatDateAndTime(result.scannedAt)
                    : formatDateAndTime(result.finishedAt)
                }
              />
            </List>
          </div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Rule ID</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Severity</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {result.findings.map((finding: any) => (
                <Table.Row key={finding._id}>
                  <Table.Cell>{finding.type}</Table.Cell>
                  <Table.Cell>{finding.ruleId}</Table.Cell>
                  <Table.Cell>{finding.metadata.description}</Table.Cell>
                  <Table.Cell>{finding.metadata.severity}</Table.Cell>
                  <Table.Cell>
                    {finding.location.path} :{" "}
                    {finding.location.positions.begin.line}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid>
      </div>
    </div>
  );
};

export default DetailScanResult;
