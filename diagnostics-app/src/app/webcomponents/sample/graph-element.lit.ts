//@ts-nocheck

import {
  select,
  scaleOrdinal,
  arc,
  quantize,
  interpolateCool,
  pie,
} from 'd3';
import { LitElement, html, css } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';

@customElement('bar-chart')
export class BarChartElement extends LitElement {
  @query('#graph')
  // @ts-ignore
  graphDiv;

  @property({ type: Number }) width = 400;
  @property({ type: Number }) height = 400;
  @property({ type: String }) data = '[]';

  public chartData: any;

  constructor() {
    super();
    this.chartData = JSON.parse(this.data);
  }

  static styles = css`
    .element-container {
      min-height: 300px;
      padding: 1.3rem 1.6rem;
      background-color: #232323;
      border-radius: 3px;
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `;

  redrawChart() {
    this.chartData = JSON.parse(this.data);
    let svg = select(this.graphDiv);
    this.buildChart(svg);
  }

  firstUpdated() {
    let svg = select(this.graphDiv)
      .attr('width', this.width)
      .attr('height', this.height);
    svg.append('g');
    this.redrawChart();
  }

  updated() {
    this.redrawChart();
  }

  buildChart(svg) {
    let radius = Math.min(this.width, this.height) / 2;

    const t = svg.transition().duration(300);

    let arcShape = arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius - 1);

    let colorScale = scaleOrdinal()
      .domain(this.chartData.map((d) => d.tag))
      .range(
        quantize(
          (t) => interpolateCool(t * 0.8 + 0.1),
          this.chartData.length
        ).reverse()
      );

    let pieDataStructure = pie()
      .sort(null)
      .value((d) => d.value)(this.chartData);

    svg
      .select('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`)
      .attr('stroke', 'white')
      .selectAll('path')
      .data(pieDataStructure)
      .join('path')
      .transition(t)
      .attr('fill', (d) => colorScale(d.data.tag))
      .attr('d', arcShape);
  }

  render() {
    return html`
      <div class="element-container">
        <p>D3 container</p>
        <svg id="graph"></svg>
      </div>
    `;
  }
}
