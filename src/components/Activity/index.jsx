import { useState } from "react"
import "./activity.css"

const Activity = ({activity}) => {

  const [isActive, setIsActive]= useState(false)
  if (activity !== undefined){setIsActive(true)}
  return (
    <div
          className={({ isActive }) =>
    isActive ? "activite" : "activite mute"
    }>
    <p>{activity.name}</p>
  </div>
  )
}

export default Activity
