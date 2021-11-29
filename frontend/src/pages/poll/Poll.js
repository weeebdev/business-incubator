import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";

// material
import { Button, Grid } from "@material-ui/core";

// mocks
import { countries, bis } from "./mock";
import {
  usePollState,
  usePollDispatch,
  setData,
  setErrors,
} from "../../context/PollContext";

const customSchema = {
  type: "object",
  properties: {
    country: {
      type: "string",
      enum: countries.map((country) => country.name),
    },
    bi: {
      type: "string",
      enum: bis.map((bi) => bi.name),
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          year: {
            type: "integer",
          },
          number: {
            type: "integer",
          },
          sum: {
            type: "integer",
          },
        },
        required: ["year", "number", "sum"],
      },
    },
  },
  required: ["country", "bi", "projects"],
};

export default function Poll(props) {
  const { data, errors } = usePollState();
  const dispatch = usePollDispatch();

  return (
    <>
      <PageTitle
        title="Poll"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            disabled={Boolean(errors?.length)}
          >
            Report
          </Button>
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={10}>
          <Widget title="Fill the fields" disableWidgetMenu>
            <JsonForms
              schema={customSchema}
              //   uischema={uischema}
              data={data}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data, errors }) => [
                setData(dispatch, data),
                setErrors(dispatch, errors),
              ]}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
