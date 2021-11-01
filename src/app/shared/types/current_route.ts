import { Data, Params } from '@angular/router';


export default interface CurrentRoute {
    url: string;
    queryParams: Params;
    params: Params;
    data: Data;
}