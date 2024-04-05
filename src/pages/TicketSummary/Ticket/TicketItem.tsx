import { ReactNode, memo } from 'react'

interface TicketItemType {
  icon: ReactNode
  title: string
  name: string | number | undefined
}

export default memo(
  function TicketItem({ icon, title, name }: TicketItemType) {
    return (
      <li className="ticket-info-item">
        <div className="ticket-info-category">
          {icon}
          <p>{title}</p>
        </div>

        <p className="ticket-info-val">{name ? name : '--'}</p>
      </li>
    )
  },
  (prevProp, nextProp) => prevProp.name !== nextProp.name
)
