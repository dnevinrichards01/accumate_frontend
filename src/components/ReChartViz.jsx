import React, {useState, useEffect} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import Slider from "./Slider.jsx"
import { Tooltip as ReactTooltip} from 'react-tooltip';
import { FiInfo } from "react-icons/fi";
import "../styles/HomePreLaunch.css"



const ReChartViz = () => {
    const [monthlySpend, setMonthlySpend] = useState(4000);
    const [hoverYear, setHoverYear] = useState(null);

    const dateNow = new Date();

    const props = {monthlySpend:monthlySpend, numYears:41, cashbackRate1:0.046,
        cashbackRate2:0.015, growthRate1:1.12, growthRate2:1.0, dateNow:dateNow}
    const generateLineData = (props) => {
            const {monthlySpend=2200, 
                numYears=41, 
                cashbackRate1=0.046,
                cashbackRate2=0.015,
                growthRate1=1.12,
                growthRate2=1.0,
                dateNow=dateNow} = props;
            const res = [];
        
        
            const yearNow = dateNow.getFullYear()
        
            let exponential = monthlySpend * cashbackRate1;
            let constant = monthlySpend * cashbackRate2;
            for (let i = 0; i < numYears; ++i) {
                const year = yearNow + i;
                exponential = monthlySpend * cashbackRate1 * 12 + (exponential * growthRate1);
                constant = monthlySpend * cashbackRate2 * 12 + (constant * growthRate2);
                res.push({
                    year,
                    exponential,
                    constant
                });
            }
        
            return res;
    }
    const data = generateLineData(props)

    const handleChange = (e) => {
        setMonthlySpend(e)
        data = generateLineData(props)
    }

    const handleMouseMove = (e) => {
        if (e && e.activePayload) {
            setHoverYear(e.activePayload[0].payload.x);
        }
    };

    const handleMouseLeave = () => {
        setHoverYear(null); 
    };

    const CustomTooltip = (props) => {
        const {active, payload} = props;
        if (active && payload && payload.length) {
            const year = payload[0]?.payload?.year;
            return (
                <div className="custom-tooltip" styles={{'pointerEvents': 'none'}}>
                    <p style={{'color': 'white'}}>Year: {year}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {`$${Math.floor(entry.value/1000)}K`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{"width":"100%", "height":"100%",'display':'flex',
            'flexDirection':'column','justifyContent':'center'
        }}>
            <ResponsiveContainer width="100%" height="75%">
                <LineChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                >
                    <CartesianGrid vertical={false} horizontal={false} />
                    <XAxis dataKey="year" domain={[dateNow.getFullYear(),dateNow.getFullYear()+42]} 
                    padding={{ left: 5, right: 0 }}
                    tick={{ fontSize: '.7rem'}}
                    allowDataOverflow
                    ticks={Array.from({length: 11}, (_, i) => 4*i + dateNow.getFullYear())} 
                    >
                    </XAxis>
                    <YAxis tickFormatter={(usd) => `$${Math.floor(usd / 1000)}K`} domain={[0,120000]} 
                        ticks={[0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000]} 
                        tick={{ fontSize: '.7rem', }}
                        padding={{ top: 5, bottom: 5 }} 
                        allowDataOverflow={false}
                        allowDecimals={false}>
                    </YAxis>
                    <Tooltip content={<CustomTooltip/>} position={{ x: 75, y: 10 }}/>
                    
                    <Line type="monotone" dataKey="exponential" name="With Accumate" stroke="rgb(139, 74, 139)"
                    dot={false} strokeWidth={3}/>
                    <Line type="monotone" dataKey="constant" name="Without Accumate" stroke="#ffffff"
                    dot={false} strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
            <div style={{'display':'flex','flexDirection':'column', 'gap':'5px',
                'justifyContent':'center','width':'75%', 'margin':'0% 0% 0% 14%'}}>
                <div style={{'display':'flex','justifyContent':'space-between'}}>
                    <p>How much do you spend each month?</p>
                    <p>${monthlySpend}</p>
                </div>
                <Slider 
                    props={{
                        min:0, 
                        max:8000, 
                        step:1, 
                        initialValue:monthlySpend,
                        sliderHandleChange:handleChange
                    }}
                />
                <FiInfo data-tooltip-id="custom-tooltip" />
                <ReactTooltip id="custom-tooltip" place='bottom'>
                    <div className='tooltiptext'> 
                        With Accumate:
                        <ul>
                            <li>4.6% cashback rate</li>
                            <li>12% annualized returns in S&P 500</li>
                        </ul>
                        Without Accumate:
                        <ul>
                            <li>1.5% cashback</li>
                            <li>No investment of cashback</li>
                        </ul>
                    </div>
                </ReactTooltip>
            </div>
        </div>
    )
};
        
export default ReChartViz;
