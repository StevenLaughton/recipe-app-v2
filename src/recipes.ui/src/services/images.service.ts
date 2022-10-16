import http from "../http-common";

const getImageBlobFromUrl = (url: string): Promise<{ filename: string, data: Blob }> => {
    return http.postRaw('/Images/GetImageBlobFromUrl', { url }).then(async (response) => {
        const filename: string = response.headers
            .get('content-disposition')
            ?.split('; ')
            .find((dis: any) => dis.startsWith('filename='))
            ?.slice('filename='.length) ?? '';

        const data = await response.blob();

        return { filename, data };
    })
}


const ImagesService = {
    getImageBlobFromUrl
};

export default ImagesService;