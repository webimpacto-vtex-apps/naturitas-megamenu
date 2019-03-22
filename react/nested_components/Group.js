import React, { Component } from 'react';
import Item from './Item';
import marginClass from '../utils/MarginClass';


class Group extends Component {

    render() {
        const { group } = this.props

        return (
            <ul className={"navbar-nav navgroup "+marginClass(group.margin) + ((group.order != 'none') ? ` order-mvl-${group.order} `: '') + ((group.display == 'Mobile') ? ` d-lg-none`: '')}>
                {group.name &&
                    <div className={"d-lg-none"}>
                        <span className={"menuTitle"}>{group.name}</span>
                    </div>
                }
                {group.menuParentItems && group.menuParentItems.map((item, key) => {
                    return (
                       <Item key={key} item={item} 
                       changeItemDropdownShow={this.props.changeItemDropdownShow} 
                       changeSectionDropdownShow={this.props.changeSectionDropdownShow}
                       handleMenu={this.props.handleMenu}/>
                    )
                })}

            </ul>
        )
    }
}
export default Group