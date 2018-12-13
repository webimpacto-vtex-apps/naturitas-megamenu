import React, { Component } from 'react';
import { Link } from 'render' 
import SectionLink from './SectionLink';



class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSectionDropdown: false
        }
    }

    toogleSectionDropdown = (e) => {
        if (window.innerWidth < 992) {
            e.preventDefault();

            this.props.changeSectionDropdownShow(!this.state.showSectionDropdown)
            this.setState({
                showSectionDropdown: !this.state.showSectionDropdown
            })
        }
    }

    render() {
        const { section } = this.props

        return (
            <div className="dropdown-section">
                <div className={"dropdown-section-title " + (section.sectionLinks.length > 0 ? 'hasItems' : '')}>
                    <Link to={section.sectionURL} onClick={(e) => this.toogleSectionDropdown(e)}>

                        {section.sectionTitle}

                        {section.image &&
                            <img src={section.image} />
                        }
                    </Link>
                </div>
                <div className={"dropdown-section-items" + (this.state.showSectionDropdown ? ' show ' : '')}>
                    <div className={"return col-lg-3 d-lg-none"} onClick={(e) => this.toogleSectionDropdown(e)}>
                        Volver
                    </div>

                    <div className={"d-lg-none col-lg-3"}>
                        <div className={"menuTitle"}>{section.sectionTitle}</div>
                        {section.sectionURL &&
                            <Link to={section.sectionURL} className={"viewAllSection d-block"}>Ver todo <span>{section.sectionTitle.toLowerCase().charAt(0).toUpperCase() + section.sectionTitle.toLowerCase().slice(1)}</span></Link>
                        }

                    </div>


                    <div className="sectionLinks">
                        {section.sectionLinks && section.sectionLinks.map((link, linkKey) => {
                            return (
                                <SectionLink key={linkKey} link={link} handleMenu={this.props.handleMenu} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default Section