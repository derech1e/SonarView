"use client";
import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSettingsContext} from "@/components/Context";
import {CalculationHelper} from "@/utils/CalculationHelper";
import {SensorData} from "@/utils/interface/SensorData";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString("de", {hour: "2-digit", minute: "2-digit"});
};


export function ChartView({data}) {

    const {settings} = useSettingsContext();

    const getPercentage = (data: SensorData[]) => {
        return (data.sort((i1, i2) => new Date(i1.datetime).getTime() - new Date(i2.datetime).getTime()).map((item) => {
            return {
                datetime: item.datetime,
                distance: new CalculationHelper(item.distance ?? 0).asPercent(),
            }
        }))
            .map(item => {
                if (+item.distance > 100) {
                    return {
                        ...item,
                        distance: 100
                    }
                }
                return item;
            })
            .filter(item => new Date(item.datetime) >= new Date(new Date().getTime() - settings.range * 60 * 60 * 1000));
    }


    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={500} height={400}
                       data={getPercentage(data).sort((i1, i2) => new Date(i1.datetime).getTime() - new Date(i2.datetime).getTime())}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="datetime" tickFormatter={formatXAxis}/>
                <YAxis domain={[0, 110]}/>
                <Tooltip labelFormatter={formatXAxis}/>
                <Legend/>
                <Area type={"monotone"} dataKey="distance" stroke="#DC2626" fill="#DC2626"/>
            </AreaChart>
        </ResponsiveContainer>
    );
}