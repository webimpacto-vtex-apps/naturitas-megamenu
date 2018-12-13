import React, { Component } from 'react';
import { Link } from 'render' 


class SectionLink extends Component {

    render() {
        const { link } = this.props

        return (
            <Link  to={link.linkURL} className={link.linkImage ? 'hasImage' : ''} >
                <div  onClick={(e) => this.props.handleMenu()} className={"sectionLink " + (link.linkIcon ? ' hasIcon ' : '')}>
                    {link.linkIcon && 
                        <img src={link.linkIcon} className="linkicon"/>
                    }

                     {link.linkImage && 
                        <img src={link.linkImage} />
                     }
                    <span>{link.linkTitle}</span>
                </div>
            </Link>
        )
    }
}
export default SectionLink