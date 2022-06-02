import React, {useCallback, useState} from 'react';
import {IonButton, IonCol, IonIcon, IonLabel, IonRow, IonSpinner,} from '@ionic/react';
import {cameraOutline, clipboardOutline, imageOutline, sadOutline,} from 'ionicons/icons';
import {useFetch} from 'use-http';
import {useFormContext} from 'react-hook-form';

function ImageInput() {
  const { post, response, loading } = useFetch('images', { responseType: 'blob' });
  const { setValue, watch } = useFormContext();
  const image: string = watch('imageUrl');
  const [img, setImg] = useState<string>();

  const pasteFromClipboard = async (): Promise<void> => {
    const imageUrl = await navigator.clipboard.readText();
    await post('getImageBlobFromUrl', { url: imageUrl });
    if (response.ok) {
      const filename: string = response.headers
        .get('content-disposition')
        ?.split('; ')
        .find((dis) => dis.startsWith('filename='))
        ?.slice('filename='.length) ?? '';

      const data = await response.blob();
      setValue('image', { data, filename });
      setImg(URL.createObjectURL(data));
    }
  };

  function AppImage({ imageData }: { imageData: string }) {
    const imageStyle = {
      aspectRatio: '1',
    };

    // eslint-disable-next-line @next/next/no-img-element
    return (<img src={imageData} alt="img" className="object-cover h-full rounded-xl" style={imageStyle as any} />);
  }

  const ImageTemplate = useCallback(() => {
    if (img != null) {
      return <AppImage imageData={img} />;
    }
    if (image != null) {
      return <AppImage imageData={image} />;
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
  }, [img, image, loading]);

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
        <IonButton color="primary" size="small" onClick={pasteFromClipboard} className="ion-text-wrap">
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
