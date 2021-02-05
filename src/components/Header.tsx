import { useContext } from "react"
import { FaCheck } from "react-icons/fa"

import { Switch } from '.'
import tema from '../context'

const Header: React.FC = () => {
  const { handleTheme } = useContext(tema)

  return (
    <header>
      <div className="container">
        <div>
          TODO LIST<FaCheck />
        </div>
        <div>
          <Switch handleTheme={handleTheme} />
        </div>
      </div>
    </header>
  )
}

export default Header
