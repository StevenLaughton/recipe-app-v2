import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonIcon, IonItem,
  IonLabel, IonList,
  IonListHeader,
  useIonAlert,
  useIonRouter,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { createOutline, trashOutline } from 'ionicons/icons';
import { useQuery } from '@tanstack/react-query';
import routes from '../models/constants/routes';
import AppPage from '../components/AppPage';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Step } from '../models/step';
import PortionSelect from '../components/PortionSelect';
import RecipesService from '../services/recipes.service';

type ViewPageProps = RouteComponentProps<{ id: string }>;

function View({ match }: ViewPageProps) {
  const [multiplier, setMultiplier] = useState<number>(1);
  const [present] = useIonAlert();

  const query = useQuery<Recipe>(['recipe', +match.params.id], () => RecipesService.get(+match.params.id));

  const deleteRecipe = async () => {
    const { push } = useIonRouter();

    RecipesService.del(+match.params.id).then(() => push(routes.home));
  };

  const showAreYouSure = async () => {
    await present({
      header: 'Are you sure!',
      message: `Delete ${query.data?.name}?`,
      buttons: [
        'Cancel',
        { text: 'Ok', handler: deleteRecipe },
      ],
    });
  };

  return (
    <AppPage
      title={query.data?.name}
      isLoading={query.status === 'loading'}
      toolbarButtons={(
        <IonButtons slot="primary" className="ion-align-items-start" collapse>
          <IonButton routerLink={routes.edit(match.params.id)}>
            <IonIcon slot="icon-only" icon={createOutline} />
          </IonButton>
          <IonButton onClick={showAreYouSure}>
            <IonIcon slot="icon-only" icon={trashOutline} />
          </IonButton>
        </IonButtons>
                       )}
    >
      <IonListHeader>
        <IonLabel>Ingredients</IonLabel>
        <PortionSelect
          recipePortions={query.data?.portions ?? 1}
          setMultiplier={setMultiplier}
        />
      </IonListHeader>
      <IonList inset>
        {query.data?.ingredients.map(({
          id, quantity, text, isGroupHeader,
        }: Ingredient) => (
          <React.Fragment key={id}>
            {
                                    isGroupHeader
                                      ? <IonListHeader><IonLabel>{text}</IonLabel></IonListHeader>
                                      : <IonItem className="ion-text-wrap">{`${multiplier * (quantity ?? 1)} ${text}`}</IonItem>
                                }
          </React.Fragment>
        ))}
      </IonList>
      <IonListHeader>
        <IonLabel>Steps</IonLabel>
      </IonListHeader>
      <IonList inset>
        {query.data?.steps.map(({ id, text, isGroupHeader }: Step) => (
          <React.Fragment key={id}>
            {
                                    isGroupHeader
                                      ? <IonListHeader><IonLabel>{text}</IonLabel></IonListHeader>
                                      : <IonItem><IonLabel className="ion-text-wrap">{text}</IonLabel></IonItem>
                                }
          </React.Fragment>
        ))}
      </IonList>
    </AppPage>

  );
}

export default View;
