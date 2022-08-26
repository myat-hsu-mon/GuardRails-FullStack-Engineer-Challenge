import { Component, SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Card,
  Icon,
} from "semantic-ui-react";
//api
import { createResult } from "../../api/result";
//shared
import NavigationMenu from "../../shared/navigationMenu/NavigationMenu";
//css
import classes from "./NewScanResult.module.css";

const scanningStatuses = [
  { key: "1", text: "Queued", value: "Queued" },
  { key: "2", text: "In Progress", value: "In Progress" },
  { key: "3", text: "Success", value: "Success" },
  { key: "4", text: "Failure", value: "Failure" },
];

class NewScanResult extends Component {
  state = {
    isLoading: false,
    isNavigate: false,
    activeItem: "add new scan",
    status: "Queued",
    repositoryName: "",
    fields: [
      {
        type: "",
        ruleId: "",
        locationPath: "",
        positionBeginLine: "",
        description: "",
        severity: "",
      },
    ],
  };

  handleItemClick = (e: SyntheticEvent, data: any) => {
    this.setState((prev) => ({
      ...prev,
      activeItem: data.name,
      isNavigate: true,
    }));
  };

  handleChange = (e: SyntheticEvent, data: any) => {
    this.setState((prev) => ({
      ...prev,
      [data.name]: data.value,
    }));
  };

  handleFieldsChange(index: number, name: string, value: string) {
    let temp: any = [...this.state.fields];
    temp[index][name] = value;

    this.setState((prev) => ({
      ...prev,
      fields: temp,
    }));
  }

  increaseField = () => {
    this.setState((prev) => ({
      ...prev,
      fields: [
        ...this.state.fields,
        {
          type: "",
          ruleId: "",
          locationPath: "",
          positionBeginLine: "",
          description: "",
          severity: "",
        },
      ],
    }));
  };

  decreaseField = () => {
    this.setState((prev) => ({
      ...prev,
      fields: this.state.fields.slice(0, this.state.fields.length - 1),
    }));
  };

  handleCancel = () => {
    this.setState((prev) => ({
      ...prev,
      isNavigate: true,
      activeItem: "results",
    }));
  };

  handleSubmit = async () => {
    try {
      this.setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const { status, repositoryName, fields } = this.state;
      const findings = fields.map((field) => ({
        type: field.type,
        ruleId: field.ruleId,
        location: {
          path: field.locationPath,
          positions: {
            begin: {
              line: field.positionBeginLine,
            },
          },
        },
        metadata: {
          description: field.description,
          severity: field.severity,
        },
      }));
      const body = {
        status,
        repositoryName,
        findings,
        ...(status === "Queued" && { queuedAt: new Date() }),
        ...(status === "In Progress" && { scannedAt: new Date() }),
        ...(status === "Success" && { finishedAt: new Date() }),
        ...(status === "Failed" && { finishedAt: new Date() }),
      };
      console.log({ body });
      const {
        data: { success },
      } = await createResult(body);
      if (success) {
        this.setState((prev) => ({
          ...prev,
          isNavigate: true,
          activeItem: "results",
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      isNavigate,
      activeItem,
      status,
      repositoryName,
      fields,
      isLoading,
    } = this.state;
    return (
      <div className={classes.container}>
        {isNavigate && (
          <Navigate
            to={
              activeItem === "home"
                ? "/"
                : activeItem === "add new scan"
                ? "/new"
                : `/${activeItem}`
            }
          />
        )}
        <NavigationMenu
          activeItem={this.state.activeItem}
          handleItemClick={this.handleItemClick}
        />
        <div className={classes.contentContainer}>
          <Grid centered>
            <Grid.Column className={classes.formColumn}>
              <Header textAlign="center" inverted>
                Create New Scan Result
              </Header>
              <Card centered fluid>
                <Card.Content>
                  <Form widths="equal" size="mini" onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Input
                        required
                        label="Repository Name"
                        name="repositoryName"
                        value={repositoryName}
                        onChange={this.handleChange}
                        placeholder="https://github.com/repo"
                      />
                      <Form.Select
                        required
                        options={scanningStatuses}
                        name="status"
                        value={status}
                        onChange={this.handleChange}
                        label="Scanning Status"
                        placeholder="Status"
                      />
                    </Form.Group>
                    <Segment>
                      <Header as="h5">Fields</Header>
                      {fields.map((field, index) => (
                        <Form.Group key={index}>
                          <Form.Input
                            required
                            fluid
                            size="mini"
                            label="Type"
                            name="type"
                            value={field.type}
                            onChange={(e) =>
                              this.handleFieldsChange(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            placeholder="SAST"
                          />
                          <Form.Input
                            required
                            fluid
                            size="mini"
                            label="Rule ID"
                            name="ruleId"
                            value={field.ruleId}
                            onChange={(e) =>
                              this.handleFieldsChange(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            placeholder="G402"
                          />
                          <Form.Input
                            required
                            fluid
                            size="mini"
                            label="Location Path"
                            name="locationPath"
                            value={field.locationPath}
                            onChange={(e) =>
                              this.handleFieldsChange(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            placeholder="connectors/apigateway.go"
                          />
                          <Form.Input
                            required
                            fluid
                            size="mini"
                            label="Position Line"
                            name="positionBeginLine"
                            value={field.positionBeginLine}
                            onChange={(e) =>
                              this.handleFieldsChange(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            placeholder="60"
                          />
                          <Form.Input
                            required
                            fluid
                            size="mini"
                            label="Description"
                            name="description"
                            value={field.description}
                            onChange={(e) =>
                              this.handleFieldsChange(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            placeholder="TLS security"
                          />
                          <Form.Input
                            required
                            fluid
                            size="mini"
                            label="Severity"
                            name="severity"
                            value={field.severity}
                            onChange={(e) =>
                              this.handleFieldsChange(
                                index,
                                e.target.name,
                                e.target.value
                              )
                            }
                            placeholder="HIGH"
                          />
                        </Form.Group>
                      ))}
                      <Button
                        type="button"
                        icon
                        size="small"
                        onClick={this.increaseField}
                      >
                        <Icon name="plus" />
                      </Button>
                      <Button
                        type="button"
                        icon
                        size="small"
                        onClick={this.decreaseField}
                        disabled={fields.length < 2}
                      >
                        <Icon name="minus" />
                      </Button>
                    </Segment>
                    <Form.Group>
                      <Button
                        type="button"
                        onClick={this.handleCancel}
                        data-testid="cancelBtn"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="teal"
                        loading={isLoading}
                        data-testid="addBtn"
                      >
                        Add New Scan
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default NewScanResult;
