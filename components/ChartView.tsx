"use client";
import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString("de", {hour: "2-digit", minute: "2-digit"});
};

export function ChartView({data}) {

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={500} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="datetime" tickFormatter={formatXAxis}/>
                <YAxis/>
                <Tooltip labelFormatter={formatXAxis}/>
                <Legend/>
                <Area type={"monotone"} dataKey="distance" stroke="#DC2626" fill="#DC2626"/>
            </AreaChart>
        </ResponsiveContainer>
    );
}