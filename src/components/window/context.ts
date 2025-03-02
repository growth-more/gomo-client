import { createContext, useContext } from 'react'
import { WindowViewContextProps } from './type'

const DEFAULT_VALUE: WindowViewContextProps = {
  viewSize: {
    width: 0,
    height: 0,
  },
}

export const WindowViewContext = createContext<WindowViewContextProps>(DEFAULT_VALUE)

export const useWindowViewContext = () => useContext(WindowViewContext)
