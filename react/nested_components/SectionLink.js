import React, { Component } from 'react';
import { Link } from 'render' 


class SectionLink extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    render() {
        const { link } = this.props

        const itemStyle = (link) => {
            let style = {}
           
            if (link.linkColor) {
                style.color = link.linkColor
            }
            return style;
        }

        return (
            <Link  to={link.linkURL} className={link.linkImage ? 'hasImage' : ''} >
                <div  onClick={(e) => this.props.handleMenu()} className={"sectionLink " + (link.linkIcon ? ' hasIcon ' : '')}>
                    {link.linkIcon && 
                        <img src={link.linkIcon} className="linkicon"/>
                    }

                     {link.linkImage && 
                        <img src={link.linkImage} />
                     }
                    <span style={itemStyle(link)}>{link.linkTitle}</span>
                </div>
            </Link>
        )
    }
}
export default SectionLink