import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Select, MenuItem, OutlinedInput } from "@material-ui/core";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

// styles
import useStyles from "./styles";
import { COLORS } from "./colors";

export default function EntryPieChart(props) {
  var classes = useStyles();

  const { data, title, defaultValue } = props;

  // local
  var [value, setValue] = useState(defaultValue || data[0].id);

  useEffect(() => {
    if (typeof defaultValue === "number" && !isNaN(defaultValue)) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">{title}</Typography>

          <Select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            input={
              <OutlinedInput
                labelWidth={0}
                classes={{
                  notchedOutline: classes.mainChartSelectRoot,
                  input: classes.mainChartSelect,
                }}
              />
            }
            autoWidth
          >
            {data.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {`${item.id} - ${item.bi}`}
              </MenuItem>
            ))}
          </Select>
        </div>
      }
      upperTitle
      bodyClass={classes.bodyWidgetOverflow}
    >
      <ResponsiveContainer width="100%" height={400}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="sum"
            data={data.find((item) => item.id === value)?.projects}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data
              .find((item) => item.id === value)
              ?.projects.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[Math.floor(index % COLORS.length)]}
                  s
                />
              ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Widget>
  );
}
