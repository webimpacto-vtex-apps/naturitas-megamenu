import React, { Component, PureComponent } from 'react';
import { Link } from 'vtex.render-runtime'
import SectionLink from './SectionLink';
import enhanceWithClickOutside from "react-click-outside";



class Section extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showSectionDropdown: false
        }
    }

    /*shouldComponentUpdate(nextProps, nextState){
        if(nextState.showSectionDropdown!=this.state.showSectionDropdown){
            return true;
        }
        return false;
    }*/

    handleMenu = () => {
        this.props.handleMenu();
        this.toogleSectionDropdown();
    }

    clickSectionDropdown = (e) => {
        if (window.innerWidth < 992) {
            e.preventDefault();
            this.toogleSectionDropdown();
        }
    }

    toogleSectionDropdown = (e) => {
        this.props.changeSectionDropdownShow(!this.state.showSectionDropdown)
        this.setState({
            showSectionDropdown: !this.state.showSectionDropdown
        })
    }

    handleClickOutside() {
        if (this.state.showSectionDropdown) {
            this.toogleSectionDropdown()
        }
    }

    render() {
        const { section, parent, translates } = this.props

        let sectionLink =
            <Link to={section.sectionURL} onClick={this.handleMenu}>

                {section.sectionTitle}

                {section.image &&
                    <img className={section.display && section.display == 'PC' ? ` d-none d-lg-block d-xl-none` : ''} src={section.image} />
                }
            </Link>

        if (this.props.width <= 991) {
            sectionLink =
                <a href={section.sectionURL} onClick={(e) => this.clickSectionDropdown(e)}>

                    {section.sectionTitle}

                    {section.image &&
                        <img className={section.display && section.display == 'PC' ? ` d-none d-lg-block d-xl-none` : ''} src={section.image} />
                    }
                </a>
        }

        return (
            <div className="dropdown-section">
                <div className={"dropdown-section-title " + (section.sectionLinks.length > 0 ? 'hasItems' : '')}>
                    {sectionLink}
                </div>
                <div className={"dropdown-section-items" + (this.state.showSectionDropdown ? ' show ' : '')}>
                    <div className={"return col-lg-3 d-lg-none"} onClick={(e) => this.clickSectionDropdown(e)}>
                        {translates && translates.volverA} {parent}
                    </div>

                    <div className={"d-lg-none col-lg-3"}>
                        <div className={"menuTitle"}>{section.sectionTitle}</div>
                        {section.sectionURL &&
                            <Link to={section.sectionURL} className={"viewAllSection d-block"} onClick={this.handleMenu}>
                                {translates && translates.verTodo} <span>{section.sectionTitle && section.sectionTitle.toLowerCase().charAt(0).toUpperCase() + section.sectionTitle.toLowerCase().slice(1)}</span>
                            </Link>
                        }

                    </div>


                    <div className="sectionLinks">
                        {section.sectionLinks && section.sectionLinks.map((link, linkKey) => {
                            return (
                                <SectionLink key={linkKey} link={link} handleMenu={this.handleMenu} />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default enhanceWithClickOutside(Section)