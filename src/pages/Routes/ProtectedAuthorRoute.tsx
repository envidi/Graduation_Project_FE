import { Navigate } from 'react-router-dom'
import { ContextMain } from '@/context/Context'
import { useContext } from 'react'

function ProtectedAuthorized({
  redirectPath = '/',
  children
}: {
  redirectPath?: string
  children: React.ReactNode
}) {
  const { userDetail } = useContext(ContextMain)
  if (userDetail && userDetail.message && Object.keys(userDetail.message).length > 0) {
    return children
  }

  return <Navigate to={redirectPath} replace />
}

export default ProtectedAuthorized
