import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Select, MenuItem, OutlinedInput } from "@material-ui/core";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";
import { COLORS } from "./colors";

// styles
import useStyles from "./styles";

export default function Histogram(props) {
  var classes = useStyles();

  const { data, xName, yName, title, defaultValue } = props;

  // local
  var [value, setValue] = useState(defaultValue || data[0].id);

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
        <BarChart
          width={500}
          height={300}
          data={data.find((item) => item.id === value)?.projects}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xName} />
          <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
          {/* <YAxis yAxisId="right" orientation="right"  /> */}
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey={yName}
            fill={COLORS[Math.floor(Math.random() * COLORS.length)]}
          />
          {/* <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />	 */}
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  );
}
