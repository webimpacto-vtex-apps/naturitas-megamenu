import React, { Component } from 'react';
import Row from './Row';


class Item extends Component {

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

        return (
            <li className={"nav-item " + (item.rows.length > 0 ? 'dropdown' : '')}>
                <a className={"nav-link" + (item.isGroupMobile ? ' menuTitle ' : '')} href={item.url} id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span style={itemStyle(item)}>
                        {item.icon && item.iconPosition == 'Left' &&
                            <img style={{ marginRight: '5px' }} src={item.icon} />
                        }
                        {item.title}
                        {item.icon && item.iconPosition == 'Right' &&
                            <img style={{ marginLeft: '5px' }} src={item.icon} />
                        }
                    </span>
                </a>

                {item.rows.length > 0 &&
                    <div className={"dropdown-menu " + (item.isGroupMobile ? 'isGroup' : '')} aria-labelledby="navbarDropdown">
                        {!item.isGroupMobile &&
                            <div className={"return col-lg-3 d-lg-none"}>
                                Volver
                            </div>
                        }

                        {!item.isGroupMobile &&
                            <div className={"d-lg-none col-lg-3"}>
                                <div className={"menuTitle"}>SUPLEMENTOS</div>
                                <div className={"viewAllSection"}>Ver todo Suplementos</div>
                            </div>
                        }




                        {item.rows && item.rows.map((row, keyRow) => {
                            return (
                                <Row row={row} />
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