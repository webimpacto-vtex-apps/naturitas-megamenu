import React, { Component } from 'react';
import { Link } from 'render' 
import SectionLink from './SectionLink';
import enhanceWithClickOutside from "react-click-outside";



class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSectionDropdown: false
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.showSectionDropdown!=this.state.showSectionDropdown){
            return true;
        }
        return false;
    }

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
        if(this.state.showSectionDropdown){
          this.toogleSectionDropdown()
        }
      }

    render() {
        console.log("render Section")
        const { section } = this.props

        return (
            <div className="dropdown-section">
                <div className={"dropdown-section-title " + (section.sectionLinks.length > 0 ? 'hasItems' : '')}>
                    <a to={section.sectionURL} onClick={(e) => this.clickSectionDropdown(e)}>

                        {section.sectionTitle}

                        {section.image &&
                            <img src={section.image} />
                        }
                    </a>
                </div>
                <div className={"dropdown-section-items" + (this.state.showSectionDropdown ? ' show ' : '')}>
                    <div className={"return col-lg-3 d-lg-none"} onClick={(e) => this.clickSectionDropdown(e)}>
                        Volver
                    </div>

                    <div className={"d-lg-none col-lg-3"}>
                        <div className={"menuTitle"}>{section.sectionTitle}</div>
                        {section.sectionURL &&
                            <Link to={section.sectionURL} className={"viewAllSection d-block"} onClick={this.handleMenu}>
                                Ver todo <span>{section.sectionTitle.toLowerCase().charAt(0).toUpperCase() + section.sectionTitle.toLowerCase().slice(1)}</span>
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