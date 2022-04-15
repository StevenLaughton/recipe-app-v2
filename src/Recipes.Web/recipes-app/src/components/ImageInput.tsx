import React, { useCallback, useState } from 'react';
import {
  IonButton, IonCol, IonIcon, IonImg, IonLabel, IonRow, IonSpinner,
} from '@ionic/react';
import {
  cameraOutline, clipboardOutline, imageOutline, sadOutline,
} from 'ionicons/icons';
import { useFetch } from 'use-http';
import { RecipeImage } from '../models/recipe-image';

function ImageInput() {
  const [image, setImage] = useState<RecipeImage | null>(null);
  const { get, response, loading } = useFetch('images/GetBase64String');

  const pasteFromClipboard = async (): Promise<void> => {
    const imageUrl = await navigator.clipboard.readText();
    const recipeImage: RecipeImage = await get(encodeURIComponent(imageUrl));
    if (response.ok) setImage(recipeImage);
  };

  const ImageTemplate = useCallback(() => {
    if (image != null) {
      return <IonImg src={image.imageData} />;
    }
    if (loading) {
      return <IonSpinner />;
    }
    return (
      <>
        <IonIcon size="large" icon={sadOutline} />
        <IonLabel> No picture! </IonLabel>
      </>
    );
  }, [image, loading]);

  return (
    <IonRow>
      <IonCol
        size="5"
        class="ion-align-self-center ion-justify-content-evenly"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ImageTemplate />
      </IonCol>
      <IonCol size="7">
        <IonButton color="primary" size="small" onClick={pasteFromClipboard}>
          <IonIcon icon={clipboardOutline} slot="start" />
          Paste From Clipboard
        </IonButton>
        <IonButton color="secondary" size="small">
          <IonIcon icon={cameraOutline} slot="start" />
          Open Camera
        </IonButton>
        <IonButton color="tertiary" size="small">
          <IonIcon icon={imageOutline} slot="start" />
          Open Gallery
        </IonButton>
      </IonCol>
    </IonRow>
  );
}

export default ImageInput;
