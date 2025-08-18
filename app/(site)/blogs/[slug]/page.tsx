"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const SingleBlog = () => {
  const {slug} = useParams()
  return (
    <div>{slug}</div>
  )
}

export default SingleBlog