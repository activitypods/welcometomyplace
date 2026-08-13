import { useCallback } from 'react';
import { fetchJson, resolveContainerUri } from '@activitypods/refine-providers/utils';

import { authProvider } from '../providers';
import urlJoin from '../utils/urlJoin';
import { SHAPE_REPOSITORY_URL } from '../config/env';

const FILE_SHAPE_TREE_URI = urlJoin(SHAPE_REPOSITORY_URL, 'shapetrees/File');

/** Upload a raw file to the user's Pod (the container registered for the `File` shape tree,
 *  granted by the `apods:ReadWrite` File access need in `app.service.js`), returning its URL. */
const useUploadImage = () => {
  return useCallback(async (file: File): Promise<string> => {
    const session = authProvider.getSession();
    if (!session) throw new Error('Not authenticated');

    const containerUri = await resolveContainerUri('file', { shapeTreeUri: FILE_SHAPE_TREE_URI }, session.webId, session.token, [
      'https://www.w3.org/ns/activitystreams'
    ]);

    const { headers } = await fetchJson(
      containerUri,
      { method: 'POST', body: file, headers: { 'Content-Type': file.type } },
      session.token
    );

    const location = headers.get('Location');
    if (!location) throw new Error('The Pod did not return a Location header when uploading the file');
    return location;
  }, []);
};

export default useUploadImage;
