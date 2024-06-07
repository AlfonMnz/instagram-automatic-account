import {IgApiClient} from "instagram-private-api";
import 'dotenv/config'
const ig = new IgApiClient()
import {readFile} from 'fs';
import {promisify} from 'util';

const readFileAsync = promisify(readFile);

ig.state.generateDevice(process.env.IG_USERNAME);
(async () => {
    try {
        const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        const video = await readFileAsync(process.env.VIDEO_PATH);
        const cover = await readFileAsync(process.env.VIDEO_COVER_PATH);
        const publishResult = await ig.publish.video({
            video,
            coverImage: cover,
            caption: 'Somos rumanos peligrosos #anhqv #mariano #rumanos #aquinohayquienviva'
        });
        console.log({publishResult});
    } catch (e) {
        console.log(e)
    }
})();
