import React, { Component } from 'react';


class SectionLink extends Component {

    render() {
        const { link } = this.props

        return (
            <a href={link.linkURL} className={link.linkImage ? 'hasImage' : ''} >
                <div className={"sectionLink " + (link.linkIcon ? ' hasIcon ' : '')}>
                    {link.linkIcon && 
                        <img src={link.linkIcon} className="linkicon"/>
                    }

                     {link.linkImage && 
                        <img src={link.linkImage} />
                     }
                    <span>{link.linkTitle}</span>
                </div>
            </a>
        )
    }
}
export default SectionLink