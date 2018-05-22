import React from 'react'
import RadarChart from './RadarChart'
import PolarChart from './PolarChart'
export default class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <RadarChart />
        <PolarChart />
      </div>
    )
  }
}
