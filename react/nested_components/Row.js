import React, { Component } from 'react';
import Column from './Column';


class Row extends Component {

    render() {
        const { row } = this.props

        return (

            <div className="d-flex flex-column flex-lg-row dropdown-container">
                {row.columns && row.columns.map((column, columnKey) => {
                    console.log(column)
                    return (
                        <Column column={column} />
                    )
                })}
            </div>

        )
    }
}
export default Row