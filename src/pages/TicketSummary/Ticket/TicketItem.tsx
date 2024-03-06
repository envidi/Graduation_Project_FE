import { ReactNode } from 'react'

interface TicketItemType {
  icon: ReactNode
  title: string
  name: string | number | undefined
}
function TicketItem({ icon, title, name }: TicketItemType) {
  return (
    <li className="ticket-info-item">
      <div className="ticket-info-category">
        {icon}
        <p>{title}</p>
      </div>

      <p className="ticket-info-val">
        {/* {userLocation ? userLocation.location : '--'} */}
        {name}
      </p>
    </li>
  )
}

export default TicketItem
