"use client";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useSettingsContext} from "@/components/Context";
import {CalculationHelper} from "@/utils/CalculationHelper";
import {SensorData} from "@/utils/interface/SensorData";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleString("de", {day: "2-digit", hour: "2-digit", minute: "2-digit"});
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
        return (data.sort((i1, i2) => new Date(i1.datetime).getTime() - new Date(i2.datetime).getTime()).map((item) => {
            return {
                datetime: item.datetime,
                percent: new CalculationHelper(item.distance / 10 ?? 0).asPercent(),
                distance: item.distance / 10,
            }
        }))
            .filter(item => +item.percent > 0)
            .filter(item => +item.percent < 105)
            .map(item => {
                if (+item.percent > 105) {
                    return {
                        ...item,
                        percent: 105,
                        distance: item.distance,
                    }
                }
                return item;
            })
            .filter(item => new Date(item.datetime) >= new Date(new Date().getTime() - settings.range * 60 * 60 * 1000));
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart  width={500} height={400}
                       data={getPercentage(data).sort((i1, i2) => new Date(i1.datetime).getTime() - new Date(i2.datetime).getTime())}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="datetime" tickFormatter={formatXAxis}/>
                <YAxis domain={[0, 105]}/>
                <Tooltip labelFormatter={formatXAxis}/>
                <Legend/>
                {/*<Area type={"step"} dataKey="distance" stroke="#4C9141" fill="#4C9141"/>*/}
                <Area type={"monotoneX"} dataKey="percent" stroke="#DC2626" fill="#DC2626"/>
                <Line type="monotoneX" dataKey="distance" stroke="#4C9141" />
            </ComposedChart>
        </ResponsiveContainer>
    );
}