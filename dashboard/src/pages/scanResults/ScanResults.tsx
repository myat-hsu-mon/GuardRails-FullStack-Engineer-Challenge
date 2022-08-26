import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Label, Table } from "semantic-ui-react";
//api
import { getAllResults } from "../../api/result";
//shared
import MessageUI from "../../shared/message/Message";
import NavigationMenu from "../../shared/navigationMenu/NavigationMenu";
import NoResultFound from "../../shared/noResultFound/NoResultFound";
//utils
import { formatDateAndTime } from "../../utils/formatDate";
//css
import classes from "./ScanResults.module.css";

const colors: any = {
  Queued: "grey",
  "In Progress": "teal",
  Success: "green",
  Failure: "red",
};

const ScanResults: FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [activeItem, setActiveItem] = useState<string>("results");
  const [errors, setErrors] = useState<string>();

  const handleItemClick = (e: SyntheticEvent, data: any) => {
    console.log({ data });

    setActiveItem(data.name);
    if (data.name === "home") {
      navigate("/");
    } else if (data.name === "add new scan") {
      navigate("/new");
    } else {
      navigate(`/${data.name}`);
    }
  };

  const fetchAllResults = async () => {
    try {
      const {
        data: { success, data },
      } = await getAllResults();
      if (success) {
        setResults(data);
      }
    } catch (error: any) {
      console.error(error);
      setErrors(
        error.response ? error.response.data?.message : "Internal Server Error"
      );
    }
  };

  useEffect(() => {
    fetchAllResults();
  }, []);

  return (
    <div className={classes.container}>
      <NavigationMenu
        activeItem={activeItem}
        handleItemClick={handleItemClick}
      />
      <div className={classes.contentContainer}>
        {errors ? (
          <div data-testid="message">
            <MessageUI success={false} message={errors} />
          </div>
        ) : !!results.length ? (
          <Grid>
            <Table size="small" data-testid="table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Repository Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>No. of Findings</Table.HeaderCell>
                  <Table.HeaderCell>Timestamp</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {results.map((result: any) => (
                  <Table.Row key={result._id}>
                    <Table.Cell>{result.repositoryName}</Table.Cell>
                    <Table.Cell>
                      <Label color={colors[result.status]} size="tiny" basic>
                        {result.status}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/results/${result._id}`}>
                        <div className={classes.label}>
                          <span style={{ textDecoration: "underline" }}>
                            View Detail
                          </span>
                          <Label circular color="teal" size="tiny">
                            {result.findings.length}
                          </Label>
                        </div>
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {result.status === "Queued"
                        ? formatDateAndTime(result.queuedAt)
                        : result.status === "In Progress"
                        ? formatDateAndTime(result.scannedAt)
                        : formatDateAndTime(result.finishedAt)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid>
        ) : (
          <NoResultFound text="No Scanning Results" />
        )}
      </div>
    </div>
  );
};

export default ScanResults;
