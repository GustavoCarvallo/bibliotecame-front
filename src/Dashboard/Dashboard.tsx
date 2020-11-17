import React, {useEffect} from 'react'
import {get} from "../utils/http";
import AmountComponent from "./AmountComponent/AmountComponent";
import './Dashboard.css'
import ChartComponent from "./ChartComponent/ChartComponent";
import BestReviewsTable from "./Table/BestReviewsTable";
import MostLoanedTable from "./Table/MostLoanedTable";

type info = {
    delayedLoans: number,
    withdrawnLoans: number,
    readyForWithdrawalLoans: number,
    loansByMonth: LoanDateTuple[],
    amountOfBooks: number,
    amountOfStudents: number,
    bestReviewed: Book[],
    mostLoaned: Book[]
}

export type Book = {
    title: string,
    author: string,
    avgScore: number,
    amountOfLoans: number
}

type LoanDateTuple = {
    first : string,
    second: number
}


const Dashboard = () => {

    const [info, setInfo] = React.useState<info>({delayedLoans:0,
        withdrawnLoans:0,
        readyForWithdrawalLoans: 0,
        loansByMonth: [],
        amountOfBooks: 0,
        amountOfStudents:0,
        bestReviewed: [],
        mostLoaned: []})

    const [labels, setLabels] = React.useState<String[]>([]);
    const [lineChartData, setLineChartData] = React.useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0])

    useEffect(() => {
        get('dashboard').then(res => {
            setLabels(res.loansByMonth.map((e: { first: string; }) => abbreviateDate(e.first)))
            setLineChartData(res.loansByMonth.map((e: { second: any; }) => e.second));
            setInfo(res)
        })
    }, [])

    const abbreviateDate = (date : string) => {
       return date.split(" ")[0].slice(0,3) + " " + date.split(" ")[1].slice(2,4)
    }

    const lineData = {
        labels: labels,
        datasets: [
            {
                label: '# de Prestamos',
                data: lineChartData,
                fill: false,
                backgroundColor: 'rgb(99,161,255)',
                borderColor: 'rgba(99,161,255, 0.4)',
                borderWidth: 4,
            },
        ],

    }

    const lineOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        }
    }

    const dougData = {
        labels: ['Atrasado', 'No Retirado', 'Retirado'],
        datasets: [
            {
                label: '# de Prestamos',
                data: [info.delayedLoans, info.readyForWithdrawalLoans, info.withdrawnLoans],
                backgroundColor: [
                    'rgba(231,12,12,0.4)',
                    'rgba(18,97,219, 0.4)',
                    'rgba(54,183,8, 0.4)'
                ],
                borderColor: [
                    'rgb(198,18,18)',
                    'rgb(18,97,219)',
                    'rgb(54,183,8)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className={"dashboard"}>
            <div className={"numeric-components"}>
                <AmountComponent amount={info.delayedLoans+info.withdrawnLoans+info.readyForWithdrawalLoans} icon={'copy'} text={'Ejemplares Reservados'}/>
                <AmountComponent amount={info.delayedLoans} icon={'calendar-times'} text={'Prestamos Atrasados'}/>
                <AmountComponent amount={info.amountOfBooks} icon={'book'} text={'Cantidad Total de Libros'}/>
                <AmountComponent amount={info.amountOfStudents} icon={'user'} text={'Cantidad Total de Alumnos'}/>
            </div>
            <div className={'charts-container'}>
                <ChartComponent type={'Line'} data={lineData} title={'Cantidad de Prestamos por mes'} options={lineOptions}/>
                <ChartComponent type={'Doughnut'} data={dougData} title={'Estado de los Prestamos'} />
            </div>
            <div className={'tables'}>
                <BestReviewsTable data={info.bestReviewed} title={'Los Mejores Calificados'}/>
                <MostLoanedTable data={info.mostLoaned} title={'Los Más Reservados'}/>
            </div>
        </div>
    )
}

export default Dashboard;