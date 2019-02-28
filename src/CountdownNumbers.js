import React from 'react';
import { Statistic } from 'semantic-ui-react';

const CountdownNumbers = props => {
  const time = props.time;
  const label = props.label;
  return (
    <Statistic color="red" inverted style={{padding: 5}}>
      <Statistic.Value>{time}</Statistic.Value>
      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  )

}

export default CountdownNumbers;
