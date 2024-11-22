import { useState, useEffect } from "react"
import api from "../api" 
import EmailForm from "../components/EmailForm"
import LandingChart from "../components/LandingChart"
import ReChartViz from "../components/ReChartViz"
import "../styles/HomePreLaunch.css"

import logo from "../assets/logo_text.jpg"
import digitalWallet from "../assets/digital-wallet.png"
import cardRouting from "../assets/card-routing.png"
import brokerageRobinhood from "../assets/brokerage-robinhood.png"

function HomePreLaunch() {

    return (
        <div className='page-container'>
            <header>
                <div className='menu-bar'>
                    <div className='menu-item menu-logo'>
                        <img src={logo} className='menu-logo'></img>
                    </div>
                    <div className='menu-item menu-title'>
                        <h1>See What You Can Make</h1>
                    </div>
                    <div className='menu-item menu-waitlist-div'>
                        <a href="#waitlist">
                            <button className='menu-button'>Join Waitlist</button>
                        </a>
                    </div>
                </div>
            </header>
            <div className='menu-title-shifted'>
                <h1>See What You Can Make</h1>
            </div>
            <div className='content'>
                <div className='content-row rechart'>
                    <ReChartViz />
                </div>
                <div className='content-row vertical join-waitlist-container' id='waitlist'>
                    <h1>Join Accumate's Waitlist</h1>
                    <div className=''>
                        <EmailForm route='api/waitlist/' style={{'margin': '10px'}}/>
                    </div>
                </div>
                <div className='content-row vertical '>
                    <h1>Accumate</h1>
                    <div className='horizontal two-cols'>
                        <div className='column'>
                            <h2>You</h2>
                            <div className='column column-item indent'>
                                <p>Sign up once</p>
                                <p>Do nothing</p>
                                <p>Watch your wealth grow</p>
                            </div>
                        </div>
                        <div className='column'>
                            <h2>While we automatically</h2>
                            <div className='column column-item indent'>
                                <p>Maximize your cashback</p>
                                <p>Invest it into ETFs</p>
                                <p>74x return on your cashback by retirement</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='content-row vertical'>
                    <h1>How it works</h1>
                    <div className='horizontal three-cols'>
                        <div className='vertical'>
                            <img src={digitalWallet}/>
                            <p>User transacts with Virtual Card</p>
                        </div>
                        <div className='vertical'>
                            <img src={cardRouting}/>
                            <p>Transaction is routed to the most rewarding card</p>
                        </div>
                        <div className='vertical'>
                            <img src={brokerageRobinhood}/>
                            <p>Automatically buys ETF of user's choice</p>
                        </div>
                    </div>
                    
                </div>
                <div className='content-row vertical how-we-get'>
                    <h1>How we get you 4.6% cashback</h1>
                    <div>
                        <p>
                            We have created different combinations of cards 
                            based on what you spend to ensure that you get 
                            the highest possible cashback in each category
                        </p>
                    </div>
                </div>
                <div className='content-row contact-us'>
                    <h2>Contact us</h2>
                    <p>admin@accumatewealth.com</p>
                </div>
            </div>
        </div> 
    )
}

export default HomePreLaunch