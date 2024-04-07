import React from 'react'

export default function Title(title, fontSize, margin) {
  return (
    <h1 styile = {{fontSize, margin, color: 'purple'}}>
        {title}
    </h1>
  )
}
