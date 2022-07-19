import React, {useEffect, useState} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import {Bar} from "react-chartjs-2";
import UserService from "../services/user.service";
import LoadingScreen from "./LoadingScreen";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: "Salary Categories",
        },
    },
};

export const labels = ["2.000-4.000", "4.000-6.000", "6.000-8.000", "8.000-10.000", "10.000-12.000", "12.000-20.000", "20.000+"];

function SalaryBarChart(props) {
    const [salaryArray, setSalaryArray] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let salariesCounter = [0, 0, 0, 0, 0, 0, 0];
        UserService.getUsersGrossSalaries()
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    const salary = response.data[i].grossSalary;
                    if (salary > 2000 && salary <= 4000) {
                        salariesCounter[0]++;
                    } else if (salary > 4000 && salary <= 6000) {
                        salariesCounter[1]++;
                    } else if (salary > 6000 && salary <= 8000) {
                        salariesCounter[2]++;
                    } else if (salary > 8000 && salary <= 10000) {
                        salariesCounter[3]++
                    } else if (salary > 10000 && salary <= 12000) {
                        salariesCounter[4]++
                    } else if (salary > 12000 && salary <= 20000) {
                        salariesCounter[5]++
                    } else {
                        salariesCounter[6]++;
                    }
                }

                setSalaryArray(salariesCounter);
                setIsLoading(false);
            })
    }, []);

    const data = {
        labels,
        datasets: [
            {
                label: "No. of employees",
                data: salaryArray,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 99, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 3
            }
        ]
    };

    return (
        <>{!isLoading ? (<Bar options={options} data={data}/>) : (<LoadingScreen/>)}</>
    )
}

export default SalaryBarChart;