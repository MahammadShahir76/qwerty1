import React from 'react'
import { Link } from 'react-router-dom'

function ServiceProviderCategory() {
  return (
    <div>
      <Link to="/PlumbersDetails">Plumbers</Link><br/>
      <Link to="/ElectricianDetails">Electricians</Link><br/>
      <Link to="/MechanicalDetails">Mechanics</Link><br/>

      <div>
        <h3>See the service reviews here</h3>
        <Link to="/show-reviews"> See reviews</Link>
      </div>
    </div>
  //  stopped here
  )
}

export default ServiceProviderCategory
