import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';


export const LandingChart = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();
    const [monthlySpend, setMonthlySpend] = useState(2500)

    useEffect(
        () => {
            
            const generateLineData = (props) => {
                const {monthlySpend=2200, 
                    numYears=40, 
                    cashbackRate=0.045,
                    growthRate=1.0058} = props;
                const res = [];

                const now = new Date();
                const yearNow = now.getFullYear()
                const monthNow = now.getMonth()
                const dateNow = now.getDate()

                let monthlyContribution = monthlySpend * cashbackRate;
                let value = monthlyContribution;
                for (let i = 0; i < numYears; ++i) {
                    const time = Date.UTC(yearNow + i, monthNow, dateNow);
                    value = monthlyContribution*12 + (value * growthRate);
                    res.push({
                        time,
                        value,
                    });
                }
                console.log(res)

                return res;
            }

            const chart = createChart(
                chartContainerRef.current, 
                {
                    layout: {
                        background: { type: ColorType.Solid, color: backgroundColor },
                        textColor,
                    },
                    width: chartContainerRef.current.clientWidth * .8,
                    height: 300,
                    grid: {
                        vertLines: {
                        color: 'transparent',  // Makes vertical grid lines invisible
                        visible: false,        // Explicitly hide vertical grid lines
                        },
                        horzLines: {
                        color: 'transparent',  // Makes horizontal grid lines invisible
                        visible: false,        // Explicitly hide horizontal grid lines
                        },
                    }, 
                    handleScroll: {
                        mouseWheel: false,  // Disable scrolling with mouse wheel
                        pressedMouseMove: false,  // Disable dragging to scroll
                        horzTouchDrag: false,  // Disable horizontal touch scroll
                        vertTouchDrag: false,  // Disable vertical touch scroll
                    },
                    handleScale: {
                        axisPressedMouseMove: false,  // Disable scaling by dragging axis
                        mouseWheel: false,  // Disable zooming with mouse wheel
                        pinch: false,  // Disable pinch-to-zoom for touch devices
                    },
                    timeScale: {
                        // Custom time scale options
                        timeVisible: true,                // Makes sure the time is visible
                        secondsVisible: false,             // Hides seconds (useful if the chart updates frequently)
                        tickMarkFormatter: (time, tickMarkType, locale) => {
                        // Custom formatter for x-axis ticks
                        const date = new Date(time); // Convert to milliseconds
                        return `${date.getMonth()}-${date.getFullYear()}`;
                        },
                    },
                    rightPriceScale: {
                        borderVisible: false,
                    },
                }
            );
            chart.timeScale().fitContent();

            const exponentialSeriesProps = {'monthlySpend':monthlySpend, 'numYears':40, 'cashbackRate':0.045, 'growthRate':1.12}
            const constantSeriesProps = {'monthlySpend':monthlySpend, 'numYears':40, 'cashbackRate':0.045, 'growthRate':1}
            const exponentialSeries = chart.addLineSeries({ color: 'red', setAutoScale: false });
            const constantSeries = chart.addLineSeries({ color: 'blue', setAutoScale: false  });
            exponentialSeries.setData(generateLineData(exponentialSeriesProps));
            constantSeries.setData(generateLineData(constantSeriesProps));

            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth * .8});
            };
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        }, []
        
    );

    return (
        <div>
            <div
                ref={chartContainerRef}
            />
        </div>
        
    );
};

export default LandingChart

