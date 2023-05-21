"use client";
import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSettingsContext} from "@/components/Context";
import {SensorData} from "@/app/dashboard/page";

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString("de", {hour: "2-digit", minute: "2-digit"});
};


export function ChartView({data}) {

    const {settings} = useSettingsContext();

    const getMaxVolumeLiter = () => {
        const maxDistance = settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight;

        return Number((maxDistance * Math.PI * Math.pow(settings.radius, 2)) / 1000).toFixed(2);
    }

    const getVolumeLiter = (distance: number) => {
        let realDistance = settings.heightAboveGround - settings.minWaterHeight - settings.maxWaterHeight - (distance - settings.maxWaterHeight);

        return Number((realDistance * Math.PI * Math.pow(settings.radius, 2)) / 1000).toFixed(2)

    }

    const getPercentage = (data: SensorData[]) => {
        return (data.sort((i1, i2) => new Date(i1.datetime).getTime() - new Date(i2.datetime).getTime()).map((item) => {
            return {
                datetime: item.datetime,
                distance: Number(100 / +getMaxVolumeLiter() * +getVolumeLiter(item.distance ?? 0)).toFixed(2),
            }
        }))
            .map(item => {
                if(+item.distance > 100) {
                    return {
                        ...item,
                        distance: 100
                    }
                }
                return item;
            })
            .filter(item => new Date(item.datetime) >= new Date(new Date().getTime() - 48 * 60 * 60 * 1000));
    }


    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={500} height={400} data={data.sort((i1, i2) => new Date(i1.datetime).getTime() - new Date(i2.datetime).getTime()).filter(item => new Date(item.datetime) >= new Date(new Date().getTime() - 48 * 60 * 60 * 1000))}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="datetime" tickFormatter={formatXAxis}/>
                <YAxis domain={[0, 240]}/>
                <Tooltip labelFormatter={formatXAxis}/>
                <Legend/>
                <Area type={"monotone"} dataKey="distance" stroke="#DC2626" fill="#DC2626"/>
            </AreaChart>
        </ResponsiveContainer>
    );
}