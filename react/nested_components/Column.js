import React, { Component } from 'react';
import Section from './Section';


class Column extends Component {

    render() {
        const { column, parentTitle, translates } = this.props

        return (
            <div className={`col${(column.nbColumnsWidth && column.nbColumnsWidth != 'auto' ? '-lg-' + column.nbColumnsWidth : '')} position-static`}>
                {column.sections && column.sections.map((section, sectionKey) => {

                    return (
                        <Section key={sectionKey}
                            section={section} parent={parentTitle}
                            changeSectionDropdownShow={this.props.changeSectionDropdownShow}
                            handleMenu={this.props.handleMenu}
                            translates={translates}/>
                    )
                })}
            </div>
        )
    }
}
export default Column