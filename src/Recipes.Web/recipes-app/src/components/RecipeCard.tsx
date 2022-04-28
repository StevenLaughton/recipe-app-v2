import React from 'react';
import {
  IonCard, IonCardHeader, IonCardTitle,
} from '@ionic/react';
import { RecipeListItem } from '../models/recipe-list-item';
import routes from '../models/constants/routes';
import AppImage from './AppImage';

function RecipeCard(props: RecipeListItem) {
  const { name, imageData, recipeId } = props;
  const cardStyle = {
    margin: '10px 10px 5px 5px',
  };

  return (
    <IonCard style={cardStyle} button routerLink={`${routes.view}/${recipeId}`}>
      <AppImage imageData={imageData} />
      <IonCardHeader>
        <IonCardTitle style={{ fontSize: '16px' }}>{name}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}

export default RecipeCard;
