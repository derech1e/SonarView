"use client";
import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSettingsContext} from "@/components/Context";
import {CalculationHelper} from "@/utils/CalculationHelper";
import {SensorData} from "@/utils/interface/SensorData";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString("de", {hour: "2-digit", minute: "2-digit"});
};

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
};


export function ChartView({data}) {

    const {settings} = useSettingsContext();

    const getPercentage = (data: SensorData[]) => {
        console.log(settings.range)
        return (data.sort((i1, i2) => new Date(i1.datetime).getTime() - new Date(i2.datetime).getTime()).map((item) => {
            return {
                datetime: item.datetime,
                // percent: new CalculationHelper(item.distance ?? 0).asPercent(),
                distance: item.distance,
            }
        }))
            // .filter(item => +item.percent > 0)
            // .filter(item => +item.percent < 100)
            // .map(item => {
            //     if (+item.percent > 100) {
            //         return {
            //             ...item,
            //             percent: 100,
            //             distance: item.distance,
            //         }
            //     }
            //     return item;
            // })
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
                {/*<Area type={"step"} dataKey="distance" stroke="#4C9141" fill="#4C9141"/>*/}
                <Area type={"step"} dataKey="distance" stroke="#DC2626" fill="#DC2626"/>
            </AreaChart>
        </ResponsiveContainer>
    );
}