import React, { Component } from 'react';
import { Link } from 'render' 
import Row from './Row';


class Item extends Component {
    constructor(props){
        super(props)
        this.dropdown = React.createRef();
        this.state = {
            showItemDropdown: false,
            isSectionDropdownShow: false
        }
    }

    toogleItemDropdown = (e) => {
        e.preventDefault();
        this.props.changeItemDropdownShow(!this.state.showItemDropdown)
        this.setState({
            showItemDropdown: !this.state.showItemDropdown
        })
    }

    itemMouseEnter = (e) => {
        if(!this.state.showItemDropdown && window.innerWidth>1024){
            this.props.changeItemDropdownShow(true)
            this.setState({showItemDropdown:true})
        }
    }

    itemMouseLeave = (e) => {
        if(this.state.showItemDropdown && window.innerWidth>1024){
            this.props.changeItemDropdownShow(false)
            this.setState({showItemDropdown:false})
        }
    }

   changeSectionDropdownShow = show => {
       this.dropdown.current.scrollTop = 0;
       this.setState({isSectionDropdownShow: show})
       this.props.changeSectionDropdownShow(show)
   }



    render() {
        const { item } = this.props
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
        console.log("Render ITEM");
        return (
            <li className={"nav-item " + (item.rows.length > 0 ? 'dropdown' : '')  + (this.state.showItemDropdown ? ' show ' : '')} 
                onMouseEnter={(e) => this.itemMouseEnter(e)}
                onMouseLeave={(e) => this.itemMouseLeave(e)}>
                
                <Link className={"nav-link" + (item.isGroupMobile ? ' menuTitle ' : '')} to={item.url} id="navbarDropdown" 
                onClick={(e) => this.toogleItemDropdown(e)}>
                    <span style={itemStyle(item)}>
                        {item.icon && item.iconPosition == 'Left' &&
                            <img style={{ marginRight: '5px' }} src={item.icon} />
                        }
                        {item.title}
                        {item.icon && item.iconPosition == 'Right' &&
                            <img style={{ marginLeft: '5px' }} src={item.icon} />
                        }
                    </span>
                </Link>

                {item.rows.length > 0 &&
                    <div className={"dropdown-menu " + (this.state.showItemDropdown ? ' show ' : '') +(this.state.isSectionDropdownShow ? ' blockYScroll ' : '') 
                    + (item.isGroupMobile ? 'isGroup' : '')} ref={this.dropdown} aria-labelledby="navbarDropdown">
                        {!item.isGroupMobile &&
                            <div className={"return col-lg-3 d-lg-none"} onClick={(e) => this.toogleItemDropdown(e)}>
                                Volver
                            </div>
                        }

                        {!item.isGroupMobile &&
                            <div className={"d-lg-none col-lg-3"}>
                                <div className={"menuTitle"}>{item.title}</div> 
                                {item.url && 
                                    <Link to={item.url} className={"viewAllSection d-block"}>Ver todo <span>{item.title.toLowerCase().charAt(0).toUpperCase() + item.title.toLowerCase().slice(1) }</span> </Link>
                                }
                            </div>
                        }




                        {item.rows && item.rows.map((row, keyRow) => {
                            return (
                                <Row key={keyRow} row={row} 
                                changeSectionDropdownShow={this.changeSectionDropdownShow}
                                handleMenu={this.props.handleMenu}/>
                            )
                        }
                        )}
                    </div>
                }
            </li>
        )
    }
}
export default Item