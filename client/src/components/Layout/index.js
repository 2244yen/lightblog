import React from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header'
import Sidebar from '../Sidebar'

function Layout (props) {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-8">
            { props.children }
          </div>
          <div className="col-md-4 col-sm-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Layout)