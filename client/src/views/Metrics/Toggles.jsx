import React, { Fragment } from 'react'

const Toggles = (props) => {
    const { filter, handleInputCheck } = props
    return (
        <Fragment>
        {Object.keys(filter).map(f => {
              return (
                <input key={f} type="checkbox" name={f} checked={filter[f]} onChange={handleInputCheck} />
              )
            })}
        </Fragment>
    )
}

export default Toggles