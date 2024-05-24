// NetworkTopology.js
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
      { id: "Router", group: 1, icon: "src\pages\ciscoSimulation\FW1RZLaWYAE5Gha.jpg" },
      { id: "Switch", group: 2 },
      { id: "PC", group: 3 },
    ];
  
    let links = [
      { source: "Router", target: "Switch" },
      { source: "Switch", target: "PC" },
    ];
  
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(800 / 2, 600 / 2));
  
    // Define the icons for the nodes
    nodes.forEach((node, i) => {
        svg.append("pattern")
          .attr("id", `icon-${i}`)
          .attr("width", 1)
          .attr("height", 1)
          .append("image")
          .attr("xlink:href", node.icon)
          .attr("width", 40)
          .attr("height", 40);
      });
    
      let link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));
  
    const drag = simulation => {
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
        // event.subject.fx = null;
        // event.subject.fy = null;
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
      .attr("fill", (d, i) => `url(#icon-${i})`)
      .call(drag(simulation));

    // Add new nodes and links
    function addNodeAndLink(event, d) {
      const newNode = { id: `New node ${nodes.length + 1}`, group: 1 };
      const newLink = { source: d.id, target: newNode.id };

      nodes.push(newNode);
      links.push(newLink);

      update();
    }

    node.on("click", addNodeAndLink);

    // Update the network topology
    function update() {
      // Update the nodes
      node = node.data(nodes, d => d.id);
      node.exit().remove();
      node = node.enter().append("circle").attr("r", 20).merge(node);

        // Apply drag behavior to new nodes
        node.call(drag(simulation));

        // Add double click event to remove nodes
        node.on("dblclick", function(event, d) {
        // Remove the clicked node
        nodes = nodes.filter(n => n !== d);
        // Remove any links associated with the clicked node
        links = links.filter(l => l.source !== d && l.target !== d);
  
        // Update the network topology
        update();
    });

      // Update the links
      link = link.data(links, d => `${d.source.id}-${d.target.id}`);
      link.exit().remove();
      link = link.enter().append("line").merge(link);

      // Update the simulation
      simulation.nodes(nodes);
      simulation.force("link").links(links);
      simulation.alpha(1).restart();
    }

    update();
  
    node.call(drag(simulation));
  
    node.append("title")
      .text(d => d.id);
  
    const zoom = d3.zoom()
      .on("zoom", (event) => {
        svg.attr("transform", event.transform);
      });
  
    svg.call(zoom);
  
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
  
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });
  }, []);

  return <div ref={ref} />;
}

export default NetworkTopology;