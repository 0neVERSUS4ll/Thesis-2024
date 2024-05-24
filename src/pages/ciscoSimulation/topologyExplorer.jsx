import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function NetworkTopology() {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .append("svg")
      .attr("width", 800)
      .attr("height", 600);

    let nodes = [
      { id: "Router", group: 1, details: "Router details..." },
      { id: "Switch", group: 2, details: "Switch details..." },
      { id: "PC", group: 3, details: "PC details..." },
    ];

    let links = [
      { source: "Router", target: "Switch", details: "Connection details..." },
      { source: "Switch", target: "PC", details: "Connection details..." },
    ];

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(800 / 2, 600 / 2));

    const drag = (simulation) => {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    let node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 20)
      .call(drag(simulation));

    node.on("click", function(event, d) {
      // Display the details of the clicked node
      alert(d.details);
    });

    let link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));
  }, []);

  return <div ref={ref}></div>;
}

export default NetworkTopology;