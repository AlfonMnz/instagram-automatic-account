import {IgApiClient} from "instagram-private-api";
import 'dotenv/config'
const ig = new IgApiClient()
import {readFile} from 'fs';
import {promisify} from 'util';
import moment from 'moment-timezone';
const readFileAsync = promisify(readFile);

ig.state.generateDevice(process.env.IG_USERNAME);
(async () => {
    try {
        const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        const video = await readFileAsync(process.env.VIDEO_PATH);
        const cover = await readFileAsync(process.env.VIDEO_COVER_PATH);
        const momentStartDate = moment.tz(process.env.START_DATE, "Europe/Madrid")
        setInterval(async () => {
            let dateInSpain = moment().tz("Europe/Madrid");
            if (dateInSpain.hours() === 0 && dateInSpain.minutes() === 10) {
                const diffDays = dateInSpain.diff(momentStartDate, 'days');
                const publishResult = await ig.publish.video({
                    video,
                    coverImage: cover,
                    caption: `Día: ${diffDays}\n Somos rumanos peligrosos #anhqv #mariano #rumanos #aquinohayquienviva`
                });
                console.log({publishResult, dateInSpain});    
            }
            
        }, 60000);
        
    } catch (e) {
        console.log(e)
    }
})();
