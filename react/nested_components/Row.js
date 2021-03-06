import React, { Component } from 'react';
import Column from './Column';


class Row extends Component {

    render() {
        const { row, parent, translates } = this.props

        return (

            <div className="d-flex flex-column flex-lg-row dropdown-container">
                {row.columns && row.columns.map((column, columnKey) => {

                    return (
                        <Column key={columnKey} column={column} 
                            changeSectionDropdownShow={this.props.changeSectionDropdownShow}
                            handleMenu={this.props.handleMenu} 
                            parentTitle={parent}
                            translates={translates} width={this.props.width} height={this.props.height}/>
                    )
                })}
            </div>

        )
    }
}
export default Row