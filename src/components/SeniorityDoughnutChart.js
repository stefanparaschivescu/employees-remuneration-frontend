import React, {useEffect, useState} from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import UserService from "../services/user.service";
import LoadingScreen from "./LoadingScreen";

ChartJS.register(ArcElement, Tooltip, Legend);

const calculateSeniority = (date) => {
    let seniorityDifMs = Date.now() - date.getTime();
    let seniorityDate = new Date(seniorityDifMs);
    return Math.abs(seniorityDate.getUTCFullYear() - 1970);
}

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: "The seniority of employees inside the company",
        },
    },
    maintainAspectRatio: false
};

function SeniorityDoughnutChart(props) {
    const [seniorityArray, setSeniorityArray] = useState([0, 0, 0, 0, 0, 0]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let seniorityCounter = [0, 0, 0, 0, 0, 0];
        UserService.getUsersHireDates()
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    const seniority = calculateSeniority(new Date(response.data[i].createdAt));
                    if (seniority < 1) {
                        seniorityCounter[0]++;
                    } else if (seniority >= 1 && seniority < 2) {
                        seniorityCounter[1]++;
                    } else if (seniority >= 2 && seniority < 4) {
                        seniorityCounter[2]++;
                    } else if (seniority >= 4 && seniority < 6) {
                        seniorityCounter[3]++;
                    } else if (seniority >= 6 && seniority < 10) {
                        seniorityCounter[4]++;
                    } else {
                        seniorityCounter[5]++;
                    }
                }
                setSeniorityArray(seniorityCounter);
                setIsLoading(false);
            })
    }, []);

    const data = {
        labels: ["<1Y (Starters)", "1-2Y (Juniors)", "2-4Y (Middle)", "4-6Y (Seniors)",
            "6-10Y (Leaders/Managers)", "10Y+ (Administrators)"],
        datasets: [
            {
                data: seniorityArray,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.4)",
                    "rgba(54, 162, 235, 0.4)",
                    "rgba(255, 206, 86, 0.4)",
                    "rgba(75, 192, 192, 0.4)",
                    "rgba(153, 102, 255, 0.4)",
                    "rgba(255, 159, 64, 0.4)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <>{!isLoading ? (<Doughnut options={options} data={data}/>) : (<LoadingScreen/>)}</>);
}

export default SeniorityDoughnutChart;