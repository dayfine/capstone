import React, { Component } from 'react';
import Bubbles from './Bubbles';

const BubbleChart = ({ goalTasks }) => {
  const width = 600, height = 600;

  return (
    <div id="bubblechart">
      <h2>Visualize Your Tasks</h2>
      <Bubbles tasks={goalTasks} width={ width } height={ height } />
    </div>
  )
};

export default BubbleChart;
