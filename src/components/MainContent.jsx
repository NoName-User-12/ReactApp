import React, { useEffect, useState } from "react";
import { createChart } from "lightweight-charts"; 
import { DataSet, Network } from 'vis-network/standalone'; 
import { getData } from "../services/apiService";

const MainContent = () => {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const getColor = (type) => {
        let color = '';
        switch(type) {
            case 'Send':
            case 'Receive':
                color = '#00c7ad';
                break;
            case 'GetReward':
                color = '#b7ff8d';
                break;
            case 'GetCommission':
                color = '#6e88fa';
                break;
            case 'Delegate':
                color = '#ff89a1';
                break;
            case 'Redelegate':
                color = '#fff47e';
                break;
        }
        return color;
    }
    const genTraddingChart = (data) => {
        const chartContainer = document.getElementById("tradingViewGraph");

        if (!chartContainer.__chart) {
            const chart = createChart(chartContainer, {
                width: chartContainer.offsetWidth,
                height: 300,
                crosshair: {
                    mode: 0,
                },
                priceScale: {
                    borderColor: "#ccc",
                },
                handleScale: {
                    mouseWheel: true,
                    pinch: true,
                },
                handleScroll: {
                    mouseWheel: true,
                    drag: true,
                },
            });

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: 'blue',
                borderUpColor: 'blue',
                wickUpColor: 'blue',
                downColor: 'red',
                borderDownColor: 'red',
                wickDownColor: 'red',
            });

            candlestickSeries.setData([]
                // data.map(item => ({
                    // time: item.timestamp,
                    // open: item.amount,
                    // high: item.high,
                    // low: item.low,
                    // close: item.close,
                // }))
            );

            chartContainer.__chart = chart;
        }
    }

    const genNetworkChart = (data) => {
        if (data) {
            const networkContainer = document.getElementById("networkGraph");

            let nodeData = [];
            data.forEach(element => {
                if(!nodeData.find(e => e.id == element.from)) {
                    nodeData.push({
                        id: element.from,
                        size: 20,
                        color: {
                            background: element.from?.includes('cosmosvaloper') ? '#ad85e4' : '#fff4e4',
                            border: element.from?.includes('cosmosvaloper') ? '#ad85e4' : '#fff4e4',
                        }
                    });
                }
            });

            const nodes = new DataSet(nodeData);

            let edgeData = [];
            data.forEach(element => {
                edgeData.push({
                    from: element.from,
                    to: element.to,
                    color: {
                        color: getColor(element.type), 
                    },
                    size: 0.5
                });
            });

            const edges = new DataSet(edgeData);

            const networkData = { nodes, edges };
            const options = {
                physics: {
                    enabled: true,
                    solver: 'forceAtlas2Based',
                    forceAtlas2Based: {
                        gravitationalConstant: -200,
                        centralGravity: 0.05,
                        springLength: 300,
                        springConstant: 0.01,
                        nodeDistance: 250,
                    },
                },
                interaction: {
                    dragNodes: true,
                    zoomView: true,
                },
                edges: {
                    smooth: {
                        type: 'dynamic',
                        roundness: 0.7,
                    },
                },
                events: {
                    stabilizationIterationsDone: function () {
                        // Tắt toàn bộ tính năng vật lý sau khi ổn định
                        this.setOptions({
                            physics: {
                                enabled: false,
                            },
                        });
                    },
                },
            };
            
            
            

            let network = new Network(networkContainer, networkData, options);
            network.once('stabilized', function() {
                // Dừng sự di chuyển của các node
                network.setOptions({ physics: { enabled: false } });
            });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();
            if (response) {
                setData(response);
                genTraddingChart(response);
                genNetworkChart(response);
            }
            setLoading(false);
        };

        fetchData();

    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full h-full">
            <div className="flex-grow p-4 border-r border-gray-200 md:w-2/3">
                <div className="flex-1 p-4" id="networkGraph" style={{ height: "800px" }}>
                </div>
            </div>

            <div className="flex flex-col w-[400px] md:w-1/3 p-4 bg-gray-100">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Daily Trading Graph</h2>
                    <div id="tradingViewGraph" style={{ height: "300px" }}>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Ranking</h2>
                    <div className="w-full h-[250px] rounded-md flex items-center justify-center bg-white">
                        <p className="text-gray-500">Ranking</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
