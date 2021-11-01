import { RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { CurrentRoute } from '../shared/types';


// recursively get params and data of all child routes
function mergeRouteParams(route: ActivatedRouteSnapshot | null, getter: (r: ActivatedRouteSnapshot) => Params): Params {
    if (route && route != null) {
        const currentParams = getter(route);
        const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
        return { ...currentParams, ...mergeRouteParams(primaryChild, getter) };
    }

    return {};
}

function mergeRouteData(route: ActivatedRouteSnapshot | null): Data {
    if (route && route != null) {
        const currentData = route.data;
        const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
        return { ...currentData, ...mergeRouteData(primaryChild) };
    }

    return {};
}

export class CustomRouterStateSerializer implements RouterStateSerializer<CurrentRoute> {
    serialize(routerState: RouterStateSnapshot): CurrentRoute {
        return {
            url: routerState.url,
            params: mergeRouteParams(routerState.root, r => r.params),
            queryParams: mergeRouteParams(routerState.root, r => r.queryParams),
            data: mergeRouteData(routerState.root)
        };
    }
}