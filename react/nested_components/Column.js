import React, { Component } from 'react';
import Section from './Section';


class Column extends Component {

    render() {
        const { column } = this.props

        return (
            <div className={`col${(column.nbColumnsWidth && column.nbColumnsWidth != 'auto' ? '-lg-' + column.nbColumnsWidth : '')} position-static`}>
            {column.sections && column.sections.map((section, sectionKey) => {
                console.log("section", section);
                return (
                    <Section section={section}/>
                )
            })}
        </div>
        )
    }
}
export default Column