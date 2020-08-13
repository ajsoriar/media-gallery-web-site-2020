import React, {useState, useEffect} from 'react'
import './index.css'

const Aboutinfo = () => {

    const [ state, setState] = useState({
        show: false
    })

    useEffect (()=>{ },[state.show])

    const aboutinfoOnClick = () => {
        console.log("onClick!");
        setState( prev => ({ // Use prev in order to prevent infinite loop
            ...prev,
            show: !prev.show
        }));
    }

    if (!state.show) return (
        <div className="aboutInfoSmall">
            <div className="authorName" onClick={aboutinfoOnClick}>
                <div className="left ">JOSÉ</div>
                <div className="right ">SORIA</div>
            </div>
        </div>
    );

    return (
        state.show && <div className="aboutInfo" onClick={aboutinfoOnClick}>
            <div className="aboutInfoContainer">
                <div className="authorName">
                    <div className="left bigFont">JOSÉ</div>
                    <div className="right bigFont">SORIA</div>
                </div>

                <div className="informationSection">
                    <div className="informationGroup">
                        <div className="title">EUROPE</div> 
                        <p>
                            Hello!<br/>
                            We are here<br/>
                            to stay.<br/>
                            temazo@subidote.com<br/>
                            maximo@subidote.com<br/>
                            +44 000 00 00 00<br/>
                        </p>
                    </div>
                    <div className="informationGroup blur">
                        <div className="title">INSTAGRAM</div> 
                        <p>
                            Hi!<br/>
                            We are here<br/>
                            to play.<br/>
                            #maximosubidote<br/>
                        </p>
                    </div>
                    <div className="informationGroup ">
                        <div className="title">The World</div> 
                        <p>
                            Hello!<br/>
                            Do it harder, better, faster and stronger!<br/>
                            maximo@subidote.com<br/>
                            +34 000 00 00 00<br/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutinfo;