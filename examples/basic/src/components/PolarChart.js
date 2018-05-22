import React from 'react'
import { Polar } from 'react-chartjs-2'

const polarData = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
      label: 'My dataset', // for legend
    },
  ],
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
}

export default class PolarChart extends React.Component {
  render() {
    return (
      <div>
        <h2>Polar Chart</h2>
        <Polar data={polarData} />
      </div>
    )
  }
}
