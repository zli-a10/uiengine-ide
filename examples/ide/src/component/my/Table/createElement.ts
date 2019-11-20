import React, { useContext } from 'react'
import { GlobalContext } from 'uiengine-ide'

const useCreateElement = (elementName: string) => {
  const { preview } = useContext(GlobalContext)

  const e = preview ? elementName : 'div'
  return (props: any) => {
    const { children, ...rest } = props
    return React.createElement(e, rest, children)
  }
}

export default useCreateElement
