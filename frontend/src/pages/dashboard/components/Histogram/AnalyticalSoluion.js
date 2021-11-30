import React, { useState, useEffect } from "react";
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

// styles
import useStyles from "./styles";

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 20;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#82ca9d" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

export default function AnalyticalSolution(props) {
  var classes = useStyles();

  const { data, defaultValue } = props;

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
          <Typography variant="h5">{"Analytic solution"}</Typography>

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
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sum" fill="#8884d8" minPointSize={5}>
            <LabelList dataKey="number" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  );
}
