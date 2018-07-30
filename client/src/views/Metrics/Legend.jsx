import React, { Fragment } from 'react'

const Legend = (props) => {
    const { filter, colorMappings } = props
    return (
        <Fragment>
        {Object.keys(filter).map(f => {
            return (
              <Fragment key={f}>
                <div className="circle" style={{backgroundColor: colorMappings[f]}}></div>
                <a>{f}</a>
              </Fragment>
            )
          })}
        </Fragment>
    )
}

export default Legend