import {HEIGHT_ABOVE_GROUND, MAX_WATER_HEIGHT, MIN_WATER_HEIGHT, RADIUS} from "@/utils/Constants";
import {AVERAGE_WATER_FILL_PER_MINUTE, AVERAGE_WATER_USAGE_PER_MINUTE} from "@/components/Context";

export class CalculationHelper {

    public distance!: number;

    constructor(distance?: number) {
        this.distance = distance ?? 0;
    }

    getRealDistance() {
        return HEIGHT_ABOVE_GROUND - MIN_WATER_HEIGHT - MAX_WATER_HEIGHT - (this.distance - MAX_WATER_HEIGHT);
    }

    getMaxRealDistance() {
        return HEIGHT_ABOVE_GROUND - MIN_WATER_HEIGHT - MAX_WATER_HEIGHT;
    }

    getVolumeInLiters(decimals: number = 2) {
        return +((Math.PI * Math.pow(RADIUS, 2) * this.getRealDistance()) / 1000).toFixed(2);
    }

    getMaxVolumeInLiters(decimals: number = 2) {
        return +((Math.PI * Math.pow(RADIUS, 2) * this.getMaxRealDistance()) / 1000).toFixed(decimals);
    }

    asPercent(decimals: number = 2) {
        return (100 / this.getMaxVolumeInLiters(0) * this.getVolumeInLiters(0)).toFixed(decimals);
    }

    asVolumeString(decimals: number = 2) {
        return this.getVolumeInLiters().toFixed(decimals) + 'L';
    }

    asDistanceString(decimals: number = 2) {
        return this.getRealDistance().toFixed(decimals) + 'cm';
    }

    getEstimatedTimeToEmpty() {
        return new Date().getTime() + (this.getRealDistance() / AVERAGE_WATER_USAGE_PER_MINUTE) * 60000
    }

    getEstimatedTimeToFull() {
        return new Date().getTime() + ((this.getMaxRealDistance() - this.getRealDistance()) / AVERAGE_WATER_FILL_PER_MINUTE) * 60000
    }
}