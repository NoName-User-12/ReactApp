import React, { useEffect, useState, useRef } from "react";
import { DataSet, Network } from "vis-network/standalone";
import MBarChar from "./chart/MBarChar";
import { api } from "../services/apiService";

const MainContent = ({ filters }) => {
    const [dataTrans, setDataTrans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ranking, setRanking] = useState([]);
    const prevFiltersRef = useRef(filters);

    const defaultChartData = {
        labels: [],
        datasets: [
            {
                label: 'Total amount',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }
    const [handledData, setHandledData] = useState(defaultChartData);


    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, "0");
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const year = d.getFullYear().toString().slice(-2);
        return `${year}/${month}/${day}`;
    };

    const filterData = (data) => {
        if (!data) return [];

        let filteredData = data.filter((item) => {
            var tempFilterType =
                filters.type && filters.type.length > 0
                    ? filters.type.join("-").split("-")
                    : [];
            let typeMatch = tempFilterType.includes(item.type);
            let amountMatch =
                (filters.amountMin ? item.amount >= filters.amountMin : true) &&
                (filters.amountMax ? item.amount <= filters.amountMax : true);
            let tokenMatch = filters.token
                ? item.token === filters.token
                : true;
            let dateMatch = filters.date
                ? new Date(item.timestamp).toLocaleDateString() ===
                new Date(filters.date).toLocaleDateString()
                : true;

            let accountMatch =
                filters.account
                    ? (item.from == filters.account || item.to == filters.account)
                    : true;

            return typeMatch && amountMatch && tokenMatch && dateMatch && accountMatch;
        });

        setDataTrans(filteredData);
    };

    const fetchData = async () => {
        setLoading(true);
        setRanking([]);
        setHandledData(defaultChartData);
        try {
            let response = await api.getData();
            if (response) {
                filterData(response);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const getColor = (type) => {
        let color = "";
        switch (type) {
            case "Send":
            case "Receive":
                color = "#00c7ad";
                break;
            case "GetReward":
                color = "#b7ff8d";
                break;
            case "GetCommission":
                color = "#6e88fa";
                break;
            case "Delegate":
                color = "#ff89a1";
                break;
            case "Redelegate":
                color = "#fff47e";
                break;
        }
        return color;
    };

    const processDataForBarChart = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            return [];
        }

        const groupedData = data.reduce((acc, item) => {
            const date = item.timestamp.split(" ")[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(item);
            return acc;
        }, {});

        const rawData = Object.entries(groupedData).map(
            ([date, transactions]) => {
                var rs = {
                    name: formatDate(date),
                    value: transactions.reduce((sum, transaction) => sum + transaction.totalPrice, 0),
                };

                return rs;
            }
        );

        const sortedData = rawData.sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        const barChartData = {
            labels: sortedData.map(item => item.name),
            datasets: [
                {
                    label: 'Total amount',
                    data: sortedData.map(item => item.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        setHandledData(barChartData);
    };

    const updateChart = (nodeData) => {
        let dataBinding = dataTrans.filter(
            (e) => e.from === nodeData.id || e.to === nodeData.id
        );

        if (!dataBinding) return;
        console.log(dataBinding, dataBinding);
        processDataForBarChart(dataBinding);

        updateRanking(nodeData.id, dataBinding);
    };

    const updateRanking = (id, dataBinding) => {
        let transactionCount = {};
        dataBinding.forEach((e) => {
            let from = e.from;
            if (from != id) {
                if (transactionCount[from]) {
                    transactionCount[from]++;
                } else {
                    transactionCount[from] = 1;
                }
            }
            let to = e.to;
            if (to != id) {
                if (transactionCount[to]) {
                    transactionCount[to]++;
                } else {
                    transactionCount[to] = 1;
                }
            }
        });

        let sortedTransactions = Object.entries(transactionCount)
            .map(([account, count]) => ({ account, count }))
            .sort((a, b) => b.count - a.count);

        let topAccounts = sortedTransactions.slice(0, 5);

        setRanking(topAccounts);
    };

    const genNetworkChart = () => {
        if (dataTrans && dataTrans.length > 0) {
            let networkContainer = document.getElementById("networkGraph");

            let nodeData = [];
            dataTrans.forEach((element) => {
                if (!nodeData.find((e) => e.id == element.from)) {
                    nodeData.push({
                        id: element.from,
                        size: 10,
                        color: {
                            background: element.from?.includes("cosmosvaloper")
                                ? "#ad85e4"
                                : "#fff4e4",
                            border: element.from?.includes("cosmosvaloper")
                                ? "#ad85e4"
                                : "#fff4e4",
                        },
                    });
                }

                if (!nodeData.find((e) => e.id == element.to)) {
                    nodeData.push({
                        id: element.to,
                        size: 20,
                        color: {
                            background: element.to?.includes("cosmosvaloper")
                                ? "#ad85e4"
                                : "#fff4e4",
                            border: element.to?.includes("cosmosvaloper")
                                ? "#ad85e4"
                                : "#fff4e4",
                        },
                    });
                }
            });

            let nodes = new DataSet(nodeData);

            let edgeData = [];
            dataTrans.forEach((element) => {
                edgeData.push({
                    from: element.from,
                    to: element.to,
                    color: {
                        color: getColor(element.type),
                    },
                    size: 0.5,
                });
            });

            let edges = new DataSet(edgeData);

            let networkData = { nodes, edges };

            let options = {
                edges: {
                    smooth: {
                        type: "dynamic",
                        forceDirection: "none",
                        roundness: 0.5,
                    },
                },
                physics: {
                    enabled: true,
                    solver: "repulsion",
                    repulsion: {
                        centralGravity: 0.5,
                        springLength: 200,
                        springConstant: 0.05,
                        nodeDistance: 150,
                        damping: 0.09,
                    },
                    stabilization: {
                        iterations: 200,
                    },
                },
                interaction: {
                    dragNodes: false,
                    dragView: true,
                    zoomView: true,
                },
                layout: {
                    improvedLayout: true,
                    hierarchical: false,
                },
            };

            let network = new Network(networkContainer, networkData, options);

            network.on("click", function (event) {
                let nodeId = event.nodes[0];
                let nodeData = networkData.nodes.get(nodeId);
                if (nodeData && !Array.isArray(nodeData)) {
                    updateChart(nodeData);
                }
            });

            network.on("stabilizationIterationsDone", function () {
                network.setOptions({ physics: { enabled: false } });
                setLoading(false);
            });
        } else {
            setLoading(false);
        }

    };

    // useEffect(() => {
    //     console.log("Render", filters);
    //     fetchData();
    // }, [filters]);

    useEffect(() => {
        if (
            filters.amountMin !== prevFiltersRef.current.amountMin ||
            filters.amountMax !== prevFiltersRef.current.amountMax ||
            filters.token !== prevFiltersRef.current.token ||
            filters.date !== prevFiltersRef.current.date ||
            JSON.stringify(filters.type) !== JSON.stringify(prevFiltersRef.current.type) 
        ) {
            console.log("Render", filters);
            fetchData();
        }

        prevFiltersRef.current = filters;
    }, [filters])

    useEffect(() => {
        genNetworkChart();
    }, [dataTrans]);

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            <div className="relative flex-grow p-4 border-r border-gray-200 md:w-7/12">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
                                <span className="ml-4 text-gray-700">Loading...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="flex-1 p-2"
                    id="networkGraph"
                    style={{ height: "100%" }}
                ></div>
            </div>

            <div className="flex flex-col w-[520px] md:w-5/12 p-4 bg-gray-100">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Daily Trading Graph
                    </h2>
                    <div className="bg-white rounded-lg shadow-md p-1">
                        <MBarChar dataHandled={handledData}></MBarChar>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Ranking</h2>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                                            Account
                                        </th>
                                        <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                                            Transactions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ranking && ranking.length > 0 ? (
                                        ranking.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="border-b hover:bg-gray-100"
                                            >
                                                <td className="py-2 px-4 text-sm text-gray-800">
                                                    {item.account}
                                                </td>
                                                <td className="py-2 px-4 text-sm text-gray-800">
                                                    {item.count}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="border-b text-center">
                                            <td
                                                colSpan="3"
                                                className="py-4 px-4 text-sm text-gray-500"
                                            >
                                                No transactions yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
