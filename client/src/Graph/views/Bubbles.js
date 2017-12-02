import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

class Bubbles extends Component {
  constructor(props) {
    super(props);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  renderBubbles(data) {
    const { width, height } = this.props;
    const columnForRadius = "priority";
    const columnForColors = "status";
    const svg = d3.select("svg");

    const colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
    const scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
          return +d[columnForRadius];
        }), d3.max(data, function(d) {
          return +d[columnForRadius];
        })]).range([10, 100])

    const bubbles = svg.selectAll('svg')
      .data(data)
      .enter()
      .append("circle")
      .attr('r', function(d) {
        return scaleRadius(d[columnForRadius])
      })
      .style("fill", function(d) {
        return colorCircles(d[columnForColors])
      })
      .attr('transform', 'translate(' + [width / 2, height / 3] + ')')
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))

    const simulation = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength([-600]))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

    function ticked(e) {
      bubbles.attr("cx", function(d) {
        return d.x + 10;
      })
      .attr("cy", function(d) {
        return d.y;
      });
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(1).restart();
      d.fx = d.x;
      d.fy = d.y;
      // return tooltip.style("visibility", "hidden");
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      // return tooltip.style("visibility", "hidden");
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      this.renderBubbles(nextProps.tasks)
    }
  }

  shouldComponentUpdate() { return false }

  render() {
    const { tasks } = this.props;
    if (tasks.length) this.renderBubbles(tasks);
    return (<circle />)
  }
}

export default Bubbles;
