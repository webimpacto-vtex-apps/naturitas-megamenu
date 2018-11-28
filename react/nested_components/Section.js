import React, { Component } from 'react';
import SectionLink from './SectionLink';


class Section extends Component {

    render() {
        const { section } = this.props

        return (
            <div className="dropdown-section">
                <div className={"dropdown-section-title "+(section.sectionLinks.length>0 ? 'hasItems' : '')}>
                    <a href={section.sectionURL}>
                        
                        {section.sectionTitle}

                        {section.image && 
                            <img src={section.image} />
                        }
                    </a>
                </div>
                <div className="dropdown-section-items">
                    <div className="sectionLinks">
                        {section.sectionLinks && section.sectionLinks.map((link, linkKey) => {
                            return (
                                <SectionLink link={link}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default Section