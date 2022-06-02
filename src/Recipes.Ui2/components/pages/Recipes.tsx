import Image from 'next/image';
import {IonButtons} from '@ionic/react';
import {useState} from 'react';
import {RecipeListItem} from "../../models/recipeListItem";
import Fare from "../../models/constants/fare";
import {useFetch} from 'use-http';
import {ImageLoaderProps} from "next/dist/client/image";
import Card from '../../components/ui/Card';
import FareSegment from "../ui/FareSegment";
import AppPage from "../ui/AppPage";
import routes from "../../models/constants/routes";
import {Link} from 'react-router-dom';

const myLoader = ({src}: ImageLoaderProps) => {
    return src
}

const RecipeCard = ({name, imageUrl, recipeId}: RecipeListItem) => (
    <Link to={routes.view(recipeId)}>
        <Card className="my-auto mx-auto w-full h-full">
            <div className="h-44 sm:h-48 md:h-52 relative">
                <Image className="rounded-t-xl"
                       loader={myLoader}
                       objectFit="cover"
                       src={imageUrl ?? '/037f57bb-0e65-484e-8a6e-210ae41c0847.jpg'}
                       alt=""
                       unoptimized
                       layout='fill'
                />
            </div>
            <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
                <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{name}</h2>
            </div>
        </Card>
    </Link>
);

export default function Recipes() {
    const [fare, setFare] = useState<Fare>('Food');
    const {data: recipeListItems = [], loading} = useFetch<RecipeListItem[]>(
        `recipes/getList?fare=${fare}`, {}, [fare]);

    return (
        <AppPage
            title="Recipes"
            isLoading={loading}
            loadingMessage="Loading Recipes"
            toolbarButtons={(
                <IonButtons slot="primary" collapse className="ion-align-items-baseline">
                    <FareSegment value={fare} onChange={setFare}/>
                </IonButtons>
            )}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {
                    recipeListItems?.map(({recipeId, name, imageUrl}: RecipeListItem) => (
                        <RecipeCard name={name} imageUrl={imageUrl} key={recipeId}
                                    recipeId={recipeId}/>
                    ))
                }
            </div>
        </AppPage>
    );
};
