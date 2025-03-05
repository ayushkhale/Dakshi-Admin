import React from 'react'
import Bloghero from '../components/Blog/Bloghero'
import Allblogs from '../components/Blog/Allblogs'
import Categories from '../components/Home Components/Categories'
import Teamjoin from '../components/Home Components/Teamjoin'
const Blog = () => {
  return (
    <div>
      <Bloghero />
      <Allblogs />
      <Categories />
      <Teamjoin/>
    </div>
  )
}

export default Blog