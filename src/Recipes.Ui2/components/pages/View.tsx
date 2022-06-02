import React, {useCallback, useEffect, useState} from 'react';
import {
    IonButton,
    IonButtons, IonCard,
    IonIcon,
    IonLabel,
    IonListHeader,
    IonText,
    useIonAlert,
} from '@ionic/react';
import {RouteComponentProps} from 'react-router';
import {useFetch} from 'use-http';
import {createOutline, trashOutline} from 'ionicons/icons';
import routes from "../../models/constants/routes";
import AppPage from "../ui/AppPage";
import {Recipe} from "../../models/recipe";
import {Ingredient} from "../../models/ingredient";
import {Step} from "../../models/step";
import useNavigation from "../../hooks/navigation.hooks";
import PortionSelect from '../ui/PortionSelect';

interface ViewPageProps extends RouteComponentProps<{ id: string }> {
}

function View({match}: ViewPageProps) {
    const {
        get, del, response, loading,
    } = useFetch<Recipe>('recipes');
    const {navigateIfOk} = useNavigation(routes.home);
    const [recipe, setRecipe] = useState<Recipe>();
    const [multiplier, setMultiplier] = useState<number>(1);
    const [present] = useIonAlert();

    useEffect(() => {
        get(`id?id=${match.params.id}`)
            .then((loadedRecipe: Recipe) => {
                if (response.ok) setRecipe(loadedRecipe);
            });
    }, [match.params.id]);

    const deleteRecipe = async () => {
        await del(`id?id=${match.params.id}`);
        navigateIfOk(response);
    };
    const showAreYouSure = async () => {
        await present({
            header: 'Are you sure!',
            message: `Delete ${recipe?.name}?`,
            buttons: [
                'Cancel',
                {text: 'Ok', handler: deleteRecipe},
            ],
        });
    };

    const IngredientList = useCallback(() => (
        <IonCard className="my-auto mx-auto w-full shadow-lg">
            {recipe?.ingredients.map((ingredient: Ingredient) => (
                <div key={ingredient.id} className="px-4 py-2 rounded-xl text-white">
                    <IonText>
                        {ingredient.isGroupHeader && <h4>{ingredient.text}</h4>}
                        {!ingredient.isGroupHeader
                        && (
                            <span>
                  {`${multiplier * (ingredient?.quantity ?? 1)} ${ingredient.text}`}
                </span>
                        )}
                    </IonText>
                </div>
            ))}
        </IonCard>
    ), [recipe, multiplier]);

    const StepList = useCallback(() => (
        <IonCard className="my-auto mx-auto w-full shadow-lg">
            {recipe?.steps.map((step: Step) => (
                <div key={step.id} className="px-4 py-2 rounded-xl text-white">
                    <IonText>
                        {step.isGroupHeader && <h4>{step.text}</h4>}
                        {!step.isGroupHeader
                        && (
                            <p>
                                {step.text}
                            </p>
                        )}
                    </IonText>
                </div>
            ))}
        </IonCard>
    ), [recipe]);

    return (
        <AppPage
            title={recipe?.name}
            isLoading={loading}
            loadingMessage="Loading Recipe"
            toolbarButtons={(
                <IonButtons slot="primary" className="ion-align-items-start" collapse>
                    <IonButton routerLink={routes.edit(match.params.id)}>
                        <IonIcon slot="icon-only" icon={createOutline}/>
                    </IonButton>
                    <IonButton onClick={showAreYouSure}>
                        <IonIcon slot="icon-only" icon={trashOutline}/>
                    </IonButton>
                </IonButtons>
            )}
        >
            <IonListHeader>
                <IonLabel>Ingredients</IonLabel>
                <PortionSelect recipePortions={recipe?.portions ?? 1}
                               setMultiplier={setMultiplier}/>
            </IonListHeader>
            <IngredientList/>
            <IonListHeader>
                <IonLabel>Steps</IonLabel>
            </IonListHeader>
            <StepList/>
        </AppPage>

    );
}

export default View;
