import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statdata } from './statdata';
import { map } from 'rxjs/operators';
import { Features, FullResponse } from './fullresponse';

@Injectable({
	providedIn: 'root'
})
export class StatesService {

	constructor(private http: HttpClient) { }
	/* 
	 * Corona api reference: https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0 
	 * See Data resources -> API
	 */
	private coronaapi: string = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query';
	private stateapi: string = 'https://api.corona-zahlen.org/states';
	private mappedResponse: Array<Statdata> = new Array<Statdata>();

	getStates(): Observable<any> {
		return this.http.get(this.stateapi);
	}

	private gettime(days: number): string {
	   const date = new Date();
	   date.setDate(date.getDate() - days);
	   return date.toISOString().split('T')[0];
   	}   
	/** 
	 * Get timeseries data for specific state in Germany
	 * @idState: State id required to query from api
	 * @days: Time frame to query - Eg: Past 1 week, 2 weeks.
	 * @return: Timeseries - response data from the api.
	 */
	public getTimeseriesGermany(idState: number, days: number): Observable<Statdata[]> {
		const date = this.gettime(days);
		const params: HttpParams = new HttpParams()
			.set('f', 'json')
			.set(
				'where',
				`IdBundesland = ${idState} AND MeldeDatum >= TIMESTAMP '${date}'`
			)
			/* 
			 * https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm 
			 * This app requires date, totalcases, total death, total recovered cases info. Just retrieve that.
			 */
			.set(
				'outStatistics',
				`[
					{
						"statisticType":"max",
						"onStatisticField":"MeldeDatum",
						"outStatisticFieldName":"date"
					},
					{
						"statisticType":"sum",
						"onStatisticField":"AnzahlTodesfall",
						"outStatisticFieldName":"deaths"
					},
					{
						"statisticType":"sum",
						"onStatisticField":"AnzahlFall",
						"outStatisticFieldName":"cases"
					},
					{
						"statisticType":"sum",
						"onStatisticField":"AnzahlGenesen",
						"outStatisticFieldName":"recovered"
					}
				 ]
				`
			)
			.set('groupByFieldsForStatistics', 'MeldeDatum')
;

		const requestUrl = this.coronaapi;
		return this.http
			.get<FullResponse>(requestUrl, { params })
			.pipe(
				map((reply: FullResponse) => {
					this.mappedResponse.length = 0;

					/* 
					 * Iterate through the response data and store the required statistics, so that
					 * these data can be utilized in the bar-chart
					 */
					if (!reply.error && reply.features) {
						reply.features.forEach((feature: Features) => {
							this.mappedResponse.push({
								totalcases: feature.attributes.cases,
								totaldeath: feature.attributes.deaths,
								totalrecovered: feature.attributes.recovered,
								date: new Date(feature.attributes.date).toDateString()
							});
						});
					}
					else {
						/* Just print http response failed. Detailed error could also be shown */
						throw new HttpErrorResponse({
							statusText: "http response failed"
						});
					}
					return this.mappedResponse;
				})
			);
	}
}
