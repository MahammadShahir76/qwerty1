import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="/ProviderInfo">Service Provider</Link><br/>
      <Link to="/TakerInfo">Service Taker</Link>
    </div>
  )
}

export default Home