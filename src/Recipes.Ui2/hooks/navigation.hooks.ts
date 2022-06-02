import {useIonRouter} from '@ionic/react';
import {Res, useFetch} from 'use-http';

function useNavigation(route: string) {
    const {push} = useIonRouter();
    const {cache} = useFetch();

    function navigateIfOk(response: Res<any>) {
        if (response.ok) {
            cache.clear();
            push(route);
        }
    }

    return {navigateIfOk};
}

export default useNavigation;
