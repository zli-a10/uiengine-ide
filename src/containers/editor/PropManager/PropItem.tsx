import React, { useState, useContext, useEffect } from 'react'
import _ from 'lodash'
import { schemaTidy, SchemaPropManager } from '../../../helpers'
import * as propComponents from './PropItems'
import { GlobalContext, PropsContext } from '../../Context'

const schemaPropManager = SchemaPropManager.getInstance()

export const PropItem = (props: IComponentSchema) => {
  const { schema, data, name, uinode, section = 'prop' } = props
  const { preview } = useContext(GlobalContext)
  const { refresh } = useContext(PropsContext)

  const standardSchema = schemaTidy(schema)
  let { type = 'string', ...schemaProps } = standardSchema

  let componentType = props.type
  if (!componentType) {
    componentType = type || 'string'
  }
  const componentName = `${_.upperFirst(componentType)}Component`
  const Com = propComponents[componentName]
  const [value, setValue] = useState(data)

  const onChange = (v: any) => {
    setValue(v)
    schemaPropManager.applySchema(
      section,
      name ? { [name]: standardSchema } : standardSchema,
      v,
      uinode,
      props
    )
    refresh()
  }

  useEffect(() => {
    setValue(data)
  }, [data, uinode])

  // disable the element if it's template
  const disabled = _.has(uinode, 'props.ide_droppable') || preview

  if (Com) {
    return (
      <Com
        onChange={onChange}
        defaultValue={_.get(standardSchema, 'default')}
        value={value}
        uinode={uinode}
        disabled={disabled}
        typeSchema={standardSchema}
        {...schemaProps}
        {...props}
      />
    )
  } else {
    console.warn(
      'name "%s" with type "%s" did not find the correspond component on prop window',
      name,
      componentType
    )
    return null
  }
}
