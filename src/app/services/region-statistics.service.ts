import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {RegionStatisticsFilter} from "../models/region-statistics/region-statistics-filter";
import {ReportRegionRanking} from "../models/report/report-region-rating/report-region-ranking";
import {RegionStatistics} from "../models/region-statistics/region-statistics";
import {PopulationAgeStatistics} from "../models/region-statistics/population-age-statistics";

@Injectable({
    providedIn: 'root'
})
export class RegionStatisticsService {

    constructor(private httpService: HttpService) {
    }

    getRegionStatistics(params: RegionStatisticsFilter): Observable<{
        rating: Record<number, ReportRegionRanking<RegionStatistics>>,
        manAge: ReportRegionRanking<PopulationAgeStatistics>,
        womanAge: ReportRegionRanking<PopulationAgeStatistics>
    }>{
        return this.httpService.post('/populationRating/get', params);
    }

}
