
import React from 'react'
import './index.css'
import { Component } from 'react'

class SideInformationPane extends Component {

    constructor() {
        super();
        this.state = {
            title: "Title",
            isvideo: false,
            aboutText: null,
            technologies: [{
                software: "POTOSHOP",
                version: "CS6"
            },{
                software: "ILLUSTRATOR",
                version: "CS6"  
            }]
        }
    }

    render(state) {
        return <div className="informationPane bg">
            <div className="informationPane">
                {this.state.title}
                {this.state.aboutText}
            </div>
        </div>
    }
}

export default SideInformationPane;