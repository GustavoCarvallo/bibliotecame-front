import React from 'react'
import "./ChartComponent.css"
import {Line, Doughnut} from 'react-chartjs-2';

type Props = {
    type: string,
    data: any,
    title: string,
    options?: any,
}

const ChartComponent = (props: Props) => {
    return (
        <div className={'chart-component'}>
            <div className={'title'}>
                <h4 className={'chart-title-text'}>{props.title}</h4>
            </div>
            <div className={'chart'}>
            { (props.type === 'Doughnut') ?
                <Doughnut width={50} height={30} data={props.data} options={props.options}/>
                :
                <Line width={50} height={30} data={props.data} options={props.options}/>

            }
            </div>
        </div>


        )


}
export default ChartComponent;