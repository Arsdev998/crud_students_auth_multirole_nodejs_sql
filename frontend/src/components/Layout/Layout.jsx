import React from 'react'
import Navbar from '../navigasi/Navbar'
import Sidebar from '../navigasi/Sidebar'
import Footer from '../footer/Footer'

const Layout = ({children}) => {
  return (
    
      <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-64 p-4">
         {children}
        </div>
      </div>
      <Footer />
    </>

  )
}

export default Layout
