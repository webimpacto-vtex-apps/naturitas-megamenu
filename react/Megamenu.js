import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';
import Group from './nested_components/Group';
import './style.css'

class Megamenu extends Component {
    constructor(props) {
        super();
        this.swipe = 0;

        this.Megamenu = React.createRef();

        this.state = {
            showmenu: false,
            isItemDropdownShow: false,
            isSectionDropdownShow: false
        }
    }

    changeItemDropdownShow = (show) => {
        if(show != this.state.isItemDropdownShow){
            this.Megamenu.current.scrollTop = 0;
            this.setState({isItemDropdownShow: show})
        }
    }

    changeSectionDropdownShow = show => {
        if(show != this.state.isSectionDropdownShow){
            this.Megamenu.current.scrollTop = 0;
            this.setState({isSectionDropdownShow: show})
        }
    }

    showOrNotMenu() {

        if (this.state.showmenu) {

            document.getElementsByClassName('render-provider')[0].classList.add('showmenu')
            document.getElementsByClassName('render-container')[0].classList.add('showmenu')
        }
        else {
            document.getElementsByClassName('render-provider')[0].classList.remove('showmenu')
            document.getElementsByClassName('render-container')[0].classList.remove('showmenu')
        }
    }

    handleMenu() {
        this.setState({
            showmenu: !this.state.showmenu
        }, this.showOrNotMenu);
    }

    onSwipeStart(event) {
        this.swipe = 0;
    }


    onSwipeMove(position, event) {
        if (position.x < 0) {
            document.getElementsByClassName('render-provider')[0].style.left = `calc(87% - ${Math.abs(position.x)}px)`
            this.swipe = position.x;
        }
    }

    onSwipeEnd(event) {
        if (this.swipe < -30) {
            this.setState({ showmenu: false }, this.showOrNotMenu)
        }
        document.getElementsByClassName('render-provider')[0].removeAttribute('style');
    }

    render() {
        const { menuParentItems, menuGroups } = this.props
        
        return (
            <Swipe
                onSwipeStart={this.onSwipeStart.bind(this)}
                onSwipeMove={this.onSwipeMove.bind(this)}
                onSwipeEnd={this.onSwipeEnd.bind(this)}>

                <nav className="navbar navbar-expand-lg navbar-light">

                    <button className="navbar-toggler icon" type="button" onClick={this.handleMenu.bind(this)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className={"collapse navbar-collapse" + ((this.state.isItemDropdownShow || this.state.isSectionDropdownShow) ? ' blockYScroll ' : '')} 
                     ref={this.Megamenu} id="navbarSupportedContent">

                        <div className={"header-menu-mobile d-flex d-lg-none"}>
                            <div className="nav-closer" onClick={(e) => this.handleMenu()}>

                            </div>
                            <span className="icon-leafs_naturitas m-auto d-lg-none" />
                        </div>

                        <div className={"menu-mobile-account d-flex d-lg-none"}>
                            <div className={"mr-auto"}>Bienvenido</div>
                            <div><a href="#">Iniciar Sesión</a></div>
                        </div>

                        <div className="menuItemsContainer d-flex flex-column flex-lg-row w-100">
                            {menuGroups && menuGroups.map((group, groupKey) => {
                                return (
                                    <Group group={group} key={groupKey}
                                            changeItemDropdownShow={this.changeItemDropdownShow} 
                                            changeSectionDropdownShow={this.changeSectionDropdownShow}
                                            handleMenu={this.handleMenu.bind(this)}/>
                                )
                            })}
                        </div>


                    </div>

                </nav>

            </Swipe>


        )
    }
}

Megamenu.uiSchema = {
    menuGroups: {
        items: {
            menuParentItems: {
                items: {
                    icon: {
                        'ui:widget': 'image-uploader',
                    },
                    rows: {
                        items: {
                            columns: {
                                items: {
                                    sections: {
                                        items: {
                                            image: {
                                                'ui:widget': 'image-uploader',
                                            },
                                            sectionLinks: {
                                                items: {
                                                    linkImage: {
                                                        'ui:widget': 'image-uploader',
                                                    },
                                                    linkIcon: {
                                                        'ui:widget': 'image-uploader',
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
}

Megamenu.getSchema = (props) => {
    return {
        title: 'Mega Menu',
        description: 'Mega Menu',
        type: 'object',
        properties: {
            menuGroups: {
                title: 'Menu Groups',
                type: 'array',
                items: {
                    title: 'Menu Group',
                    type: 'object',
                    properties: {
                        name: {
                            title: 'Mobile Name',
                            type: 'string',
                        },
                        display: {
                            title: 'Display',
                            type: 'string',
                            enum: ['Mobile & PC', 'PC', 'Mobile']
                        },
                        margin: {
                            title: 'Margin',
                            type: 'string',
                            enum: ['none', 'Left', 'Center', 'Right'],
                            default: 'none'
                        },
                        order: {
                            title: 'Order Mobile',
                            type: 'string',
                            enum: ['none', "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                            default: 'none'
                        },

                        menuParentItems: {
                            title: 'Main Menu Items',
                            type: 'array',
                            items: {
                                title: 'Main Menu Item',
                                type: 'object',
                                properties: {
                                    title: {
                                        title: 'Front Title',
                                        type: 'string'
                                    },
                                    url: {
                                        title: 'URL',
                                        type: 'string'
                                    },
                                    display: {
                                        title: 'Display',
                                        type: 'string',
                                        enum: ['Mobile & PC', 'PC', 'Mobile']
                                    },
                                    isGroupMobile: {
                                        title: 'Mobile Group',
                                        type: 'boolean',
                                        default: false
                                    },
                                    bold: {
                                        title: 'Bold',
                                        type: 'boolean',
                                        default: false
                                    },
                                    color: {
                                        title: 'Color',
                                        type: 'string'
                                    },
                                    icon: {
                                        title: 'Icon',
                                        type: 'string'
                                    },
                                    iconPosition: {
                                        title: 'Icon Position',
                                        type: 'string',
                                        enum: ['Right', 'Left'],
                                        default: 'Right'
                                    },

                                    rows: {
                                        title: 'rows',
                                        type: 'array',
                                        items: {
                                            title: 'Row',
                                            type: 'object',
                                            properties: {
                                                columns: {
                                                    title: 'Columns',
                                                    type: 'array',
                                                    items: {
                                                        title: 'Column',
                                                        type: 'object',
                                                        properties: {

                                                            nbColumnsWidth: {
                                                                title: 'Columns Width',
                                                                type: 'string',
                                                                enum: ['auto', "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                                                            },
                                                            sections: {
                                                                title: 'Section',
                                                                type: 'array',
                                                                items: {
                                                                    title: 'Section',
                                                                    type: 'object',
                                                                    properties: {
                                                                        sectionTitle: {
                                                                            title: 'Section Title',
                                                                            type: 'string'
                                                                        },
                                                                        sectionURL: {
                                                                            title: 'URL',
                                                                            type: 'string'
                                                                        },
                                                                        image: {
                                                                            title: 'Image',
                                                                            type: 'string'
                                                                        },
                                                                        sectionLinks: {
                                                                            title: 'Section Links',
                                                                            type: 'array',
                                                                            items: {
                                                                                title: 'Section Link',
                                                                                type: 'object',
                                                                                properties: {
                                                                                    linkTitle: {
                                                                                        title: 'Title Link',
                                                                                        type: 'string',
                                                                                    },
                                                                                    linkURL: {
                                                                                        title: 'URL',
                                                                                        type: 'string'
                                                                                    },
                                                                                    linkImage: {
                                                                                        default: '',
                                                                                        title: 'Image',
                                                                                        type: 'string',
                                                                                        widget: {
                                                                                            'ui:widget': 'image-uploader',
                                                                                        },
                                                                                    },
                                                                                    linkIcon: {
                                                                                        default: '',
                                                                                        title: 'Icon',
                                                                                        type: 'string',
                                                                                        widget: {
                                                                                            'ui:widget': 'image-uploader',
                                                                                        },
                                                                                    },

                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                },



            },
        },
    }
}

export default Megamenu