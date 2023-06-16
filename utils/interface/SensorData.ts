export interface SensorData {
    status?: 'SUCCESS' | 'ERROR';
    datetime: string;
    distance: number;
    sensor?: {
        diff: number;
        echoTick: number;
        triggerTick: number;
    }
}
