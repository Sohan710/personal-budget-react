import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function D3DoughnutChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const width = 700;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
      .domain(data.map((item) => item.title))
      .range([
        "#ffcd56", "#ff6384", "#36a2eb", "#fd6b19",
        "#283747", "#7D3C98", "#FA0404", "#2ECC71",
      ]);

    const arc = d3
      .arc()
      .outerRadius(radius - 90) 
      .innerRadius(radius - 10); 


    const pie = d3.pie()
      .sort(null)
      .value((d) => d.budget);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .style("fill", (d) => color(d.data.title));

    arcs.append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text((d) => d.data.title);
    
    // Create legend
    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return `translate(-${width / 4}, ${(i - data.length / 2) * 20})`; // Adjust legend position
      });

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => color(d.title));

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text((d) => d.title);
  }, [data]);

  return (
    <svg ref={svgRef}></svg>
  );
}

export default D3DoughnutChart;
