import React, {useCallback, useState} from 'react';
import {IonButton, IonCol, IonIcon, IonLabel, IonRow, IonSpinner,} from '@ionic/react';
import {cameraOutline, clipboardOutline, imageOutline, sadOutline,} from 'ionicons/icons';
import {useFormContext} from 'react-hook-form';
import ImagesService from "../../services/images.service";

function ImageInput() {

    const {setValue, watch} = useFormContext();
    const image: string = watch('imageUrl');
    const [img, setImg] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const pasteFromClipboard = async (): Promise<void> => {
        const imageUrl = await navigator.clipboard.readText();

        setLoading(true);
        ImagesService.getImageBlobFromUrl(imageUrl)
                .then(({data, filename}) => {
                    setValue('image', {data, filename});
                    setImg(URL.createObjectURL(data));
                }).finally(() => setLoading(false))
    };

    function AppImage({imageData}: { imageData: string }) {
        const imageStyle = {
            aspectRatio: '1',
            objectFit: 'cover'
        };

        // eslint-disable-next-line @next/next/no-img-element
        return (<img src={imageData} alt="img" className="object-cover h-full rounded-xl" style={imageStyle as any}/>);
    }

    const ImageTemplate = useCallback(() => {
        if (img != null) {
            return <AppImage imageData={img}/>;
        }
        if (image != null) {
            return <AppImage imageData={image}/>;
        }
        if (loading) {
            return <IonSpinner/>;
        }
        return (
                <>
                    <IonIcon size="large" icon={sadOutline}/>
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
                    <ImageTemplate/>
                </IonCol>
                <IonCol size="7">
                    <IonButton color="primary" size="small" onClick={pasteFromClipboard} className="ion-text-wrap">
                        <IonIcon icon={clipboardOutline} slot="start"/>
                        Paste From Clipboard
                    </IonButton>
                    <IonButton color="secondary" size="small">
                        <IonIcon icon={cameraOutline} slot="start"/>
                        Open Camera
                    </IonButton>
                    <IonButton color="tertiary" size="small">
                        <IonIcon icon={imageOutline} slot="start"/>
                        Open Gallery
                    </IonButton>
                </IonCol>
            </IonRow>
    );
}

export default ImageInput;
