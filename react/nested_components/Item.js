import React, { Component } from 'react';
import { Link } from 'render'
import Row from './Row';
import enhanceWithClickOutside from "react-click-outside";


class Item extends Component {
    constructor(props) {
        super(props)
        this.dropdown = React.createRef();
        this.dropdownContent = React.createRef();
        this.state = {
            showItemDropdown: false,
            isSectionDropdownShow: false
        }
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            (nextState.showItemDropdown != this.state.showItemDropdown) ||
            (nextState.isSectionDropdownShow != this.state.isSectionDropdownShow)
        ) {
            return true
        }
        return false;
    }

    handleMenu = () => {
        this.props.handleMenu();
        this.showItemDropdown(false);
    }

    toogleItemDropdown = (e) => {
        console.log(!this.state.showItemDropdown && this.props.item.rows.length > 0);

        e.preventDefault();
        this.props.changeItemDropdownShow(!this.state.showItemDropdown)
        this.setState({
            showItemDropdown: !this.state.showItemDropdown
        })
        
    }

    showItemDropdown = (show) => {
        this.props.changeItemDropdownShow(show)

        let newState = { showItemDropdown: show }

        
        let originalHeight = document.querySelector(`#${this.dropdown.current.id} .dropdown-container`).offsetHeight
        
        
        this.setState(newState, () => {
            if(this.state.showItemDropdown){
                this.dropdown.current.style.height = originalHeight+"px";
            }
            else{
                this.dropdown.current.style.height = 0+"px";
            }
        })
    }

    itemMouseEnter = (e) => {
        if (!this.state.showItemDropdown && window.innerWidth > 1024) {
            this.showItemDropdown(true)
        }
    }

    itemMouseLeave = (e) => {
        if (this.state.showItemDropdown && window.innerWidth > 1024) {
            this.showItemDropdown(false)
        }
    }

    changeSectionDropdownShow = show => {
        this.dropdown.current.scrollTop = 0;
        this.setState({ isSectionDropdownShow: show })
        this.props.changeSectionDropdownShow(show)
    }

    handleClickOutside() {
      if(this.state.showItemDropdown){
        this.showItemDropdown(false)
      }
    }



    render() {
        const { item, translates } = this.props
        const itemStyle = (item) => {
            let style = {}
            if (item.color) {
                style.color = item.color
            }
            if (item.bold) {
                style.fontWeight = 'bold'
            }
            return style;
        }

        const itemLinkContent = (
            <span style={itemStyle(item)}>
                {item.icon && item.iconPosition == 'Left' &&
                   <span className="content-img"> <img style={{ marginRight: '5px' }} src={item.icon} /></span>
                }
                <span>{item.title}</span>
                {item.icon && item.iconPosition == 'Right' &&
                   <span className="content-img"> <img style={{ marginLeft: '5px' }} src={item.icon} /></span>
                }
            </span>
        )

        const itemLink =
        (!this.state.showItemDropdown && this.props.item.rows.length > 0)
            ? (<a className={"nav-link" + (item.isGroupMobile ? ' menuTitle ' : '')} to={item.url} id="navbarDropdown"
                onClick={(e) => this.toogleItemDropdown(e)}>
                {itemLinkContent}
            </a>)
            : (<Link className={"nav-link" + (item.isGroupMobile ? ' menuTitle ' : '')} to={item.url} id="navbarDropdown"
                onClick={this.handleMenu}>
                {itemLinkContent}
            </Link>)


        return (
            <li className={"nav-item " + (item.rows.length > 0 ? 'dropdown' : '') + (this.state.showItemDropdown ? ' show ' : '')}
                onMouseEnter={(e) => this.itemMouseEnter(e)}
                onMouseLeave={(e) => this.itemMouseLeave(e)}>

                {itemLink}

                {item.rows.length > 0 &&
                    <div id={"dropdown-menu"+this.props.keyNumber} className={"dropdown-menu " + (this.state.showItemDropdown ? ' show ' : '') + (this.state.isSectionDropdownShow ? ' blockYScroll ' : '')
                        + (item.isGroupMobile ? 'isGroup' : '')} ref={this.dropdown} aria-labelledby="navbarDropdown">
                        {!item.isGroupMobile &&
                            <div className={"return col-lg-3 d-lg-none"} onClick={(e) => this.showItemDropdown(false)}>
                                {translates && translates.volver}
                            </div>
                        }

                        {!item.isGroupMobile &&
                            <div className={"d-lg-none col-lg-3"}>
                                <div className={"menuTitle"}>{item.title}</div>
                                {item.url &&
                                    <Link to={item.url} className={"viewAllSection d-block"} onClick={this.handleMenu}>
                                        {translates && translates.verTodo} <span>{item.title && item.title.toLowerCase().charAt(0).toUpperCase() + item.title.toLowerCase().slice(1)}</span>
                                    </Link>
                                }
                            </div>
                        }




                        {item.rows && item.rows.map((row, keyRow) => {
                            return (
                                <Row key={keyRow} row={row}
                                    changeSectionDropdownShow={this.changeSectionDropdownShow}
                                    handleMenu={this.handleMenu} parent={item.title} 
                                    translates={translates}/>
                            )
                        }
                        )}
                    </div>
                }
            </li>
        )
    }
}
export default enhanceWithClickOutside(Item)