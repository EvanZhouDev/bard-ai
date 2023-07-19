import { expect, test, vi } from 'vitest'
import Bard from "../index.js"
import fs from "fs"
import fetch from "node-fetch";

test('Ensures correct parsing of Bard Response', async () => {
    let responseText = fs.readFileSync(`${__dirname}/assets/response.txt`).toString();
    vi.mock("node-fetch");
    fetch.mockReturnValueOnce(Promise.resolve({ status: 200, text: () => 'SNlM0e":"some_mock_snlm0e"' }));
    fetch.mockReturnValueOnce(Promise.resolve({ status: 200, text: () => responseText }));
    let myBard = new Bard("some_cookie", {
        fetch: fetch
    });
    expect(await myBard.ask("Show me some pictures of kittens", {
        format: Bard.JSON
    })).toEqual({
        "content": "Sure, here are some images of kittens:\n\n* **Cute kitten sleeping.** This kitten is sleeping soundly, curled up in a ball. Its fur is soft and fluffy, and its little paws are tucked under its chin.\n![Image of Cute kitten sleeping](https://lh3.googleusercontent.com/bip/APOwr83OUIRTktWM7oXHgRhNp43hA9NGIQlnIkOWAP2QmxppGozoGj79pWc3LFekDnFxY3UzhCtLNOAfXh_Ce_jGuz_ZekoND_c53rq-QVR59ClSuX0vCFKJGqOFAfK7yTqYF0FgzAcZLCVlMqSs8J9mi85PscZrJmPeYmxNQIPmxCyf7lIkgIbacpTL15iaEv8BKynoP33Y9mdK16LbXnZutpGgzI2GP7GhEmuyhW0Vqw=w250-h200-p)\n* **Two kittens playing.** These two kittens are having a great time playing together. They are chasing each other around, and they are both purring with happiness.\n![Image of Two kittens playing](https://lh3.googleusercontent.com/bip/APOwr82Tr9stuXrd9E5xWe1_MC8wDceSILmhpZPLtGKqoXVaAKFM5xIncv08NeEZehVlhBQNVP4-ekLu3GqkHYlZB5KnPAubXx760JVUn2zPjz_g57Jo56M7Uubfyv_k4QvYhhCfK4hOGacWB3pE_XAACRU0Z9kivI9tMqrbNvVnuE053EzxXnkb3MV2T-U=w250-h200-p)\n* **Kitten sitting in a box.** This kitten is sitting in a box, looking very content. The box is just the right size for the kitten, and it is curled up in a ball.\n![Image of Kitten sitting in a box](https://lh3.googleusercontent.com/bip/APOwr81n5Bb-Y9w4q-OQ3xqgSy2vRJ3KsbIfjUqCA2WFfgWWKp4rMaYFSJOyA0XLRI7kJL3Yos6XVqd8_wr-LAWWTsVjxRON1Wcg9vjJnu7zplvVMCrm3-6LPH-kri3Ygoyt1xse9JmRKInZ6jXdRdvBFhK0rwWzHis68xMp5u7_ly5z8BsZ=w250-h200-p)\n* **Kitten grooming itself.** This kitten is grooming itself, licking its fur. It is very focused on its task, and it does not seem to notice that anyone is watching.\n![Image of Kitten grooming itself](https://lh3.googleusercontent.com/bip/APOwr83-xTQhKIyBLgp52i6-P1kdScRScTGSUKlkuh5RCDEQ3aUyeUMqTxH9cmAUavEYcO35q_lt31nYRyrUZiORuk8RLK3qVgBOmbqf6B5i84i7vi3eegVFxxfh2rY28rcfuUS4CThO4IIQ2BoTJygPDCBNGQVgh_kCRhKB5BOVNhSmxlYrEQ=w250-h200-p)\n* **Kitten playing with yarn.** This kitten is playing with a piece of yarn. It is batting the yarn around, and it seems to be having a lot of fun.\n![Image of Kitten playing with yarn](https://lh3.googleusercontent.com/bip/APOwr80VAt_gg18U2dcTnskrV1P3eppdhWO860r6DvYBBTp-TPlmVg78ghStEr_bnv-76KZ26GeYVlviu_kOprWsqM1YCX9zdqcXk68Plx1W9zxdmn7b6pcP89QFF3Bpe7h74NlXOv30iE5ijW3g-yCYNpJ6N58uhLJafBWDz2sO6BczsJHJs8XYqXJUNnGm6P4D=w250-h200-p)\n\nI hope you enjoy these images of kittens!",
        "images": [
            {
                "tag": "[Image of Cute kitten sleeping]",
                "url": "https://lh3.googleusercontent.com/bip/APOwr83OUIRTktWM7oXHgRhNp43hA9NGIQlnIkOWAP2QmxppGozoGj79pWc3LFekDnFxY3UzhCtLNOAfXh_Ce_jGuz_ZekoND_c53rq-QVR59ClSuX0vCFKJGqOFAfK7yTqYF0FgzAcZLCVlMqSs8J9mi85PscZrJmPeYmxNQIPmxCyf7lIkgIbacpTL15iaEv8BKynoP33Y9mdK16LbXnZutpGgzI2GP7GhEmuyhW0Vqw=w250-h200-p",
                "info": {
                    "raw": "https://static.vecteezy.com/system/resources/thumbnails/002/459/866/original/little-fluffy-cute-kitten-sleeping-on-the-sofa-free-video.jpg",
                    "source": "https://www.vecteezy.com/free-videos/kitten-sleep",
                    "alt": "Cute kitten sleeping",
                    "website": "www.vecteezy.com",
                    "favicon": "https://encrypted-tbn3.gstatic.com/favicon-tbn?q=tbn:ANd9GcT098AvY4ELzrALrbIm7uduz0Ql9naqDdGTnPeIExtWVSLE4A_ZX_pH-w9JO7h-O7mYKWQXkiDPviq7isHRBoFzQKhuq9_qedQeBg"
                }
            },
            {
                "tag": "[Image of Two kittens playing]",
                "url": "https://lh3.googleusercontent.com/bip/APOwr82Tr9stuXrd9E5xWe1_MC8wDceSILmhpZPLtGKqoXVaAKFM5xIncv08NeEZehVlhBQNVP4-ekLu3GqkHYlZB5KnPAubXx760JVUn2zPjz_g57Jo56M7Uubfyv_k4QvYhhCfK4hOGacWB3pE_XAACRU0Z9kivI9tMqrbNvVnuE053EzxXnkb3MV2T-U=w250-h200-p",
                "info": {
                    "raw": "https://www.comfortzone.com/-/media/Project/OneWeb/ComfortZone/Images/Blog/cats-playing-or-fighting.jpg",
                    "source": "https://www.comfortzone.com/behavior-blog/multi-cat-tension/are-my-cats-playing-or-fighting",
                    "alt": "Two kittens playing",
                    "website": "www.comfortzone.com",
                    "favicon": "https://encrypted-tbn2.gstatic.com/favicon-tbn?q=tbn:ANd9GcT98soiKiRG_35l-ElZqgJgz2DGLpuz60W5ldBhlPx-_TCzFBnT_13KmP4C2V16uaZ1u7kb0tdZz4A4loB3-PemAQ_IHncoymf8m0YoDQ"
                }
            },
            {
                "tag": "[Image of Kitten sitting in a box]",
                "url": "https://lh3.googleusercontent.com/bip/APOwr81n5Bb-Y9w4q-OQ3xqgSy2vRJ3KsbIfjUqCA2WFfgWWKp4rMaYFSJOyA0XLRI7kJL3Yos6XVqd8_wr-LAWWTsVjxRON1Wcg9vjJnu7zplvVMCrm3-6LPH-kri3Ygoyt1xse9JmRKInZ6jXdRdvBFhK0rwWzHis68xMp5u7_ly5z8BsZ=w250-h200-p",
                "info": {
                    "raw": "https://www.pawtracks.com/wp-content/uploads/sites/2/2020/12/kitten-lying-in-litter-box.jpg?p=1",
                    "source": "https://www.pawtracks.com/cats/cat-lying-litter-box/",
                    "alt": "Kitten sitting in a box",
                    "website": "www.pawtracks.com",
                    "favicon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcTfoYSAIbAFAYQhNCtvELvu0qNo_v5cVd8hDvSNdAyO3KCiyKnBldd1FyALMrRA1pczeh7GZKMF4QLkEbbuI-UKw5NqT4RrvoKNpl8"
                }
            },
            {
                "tag": "[Image of Kitten grooming itself]",
                "url": "https://lh3.googleusercontent.com/bip/APOwr83-xTQhKIyBLgp52i6-P1kdScRScTGSUKlkuh5RCDEQ3aUyeUMqTxH9cmAUavEYcO35q_lt31nYRyrUZiORuk8RLK3qVgBOmbqf6B5i84i7vi3eegVFxxfh2rY28rcfuUS4CThO4IIQ2BoTJygPDCBNGQVgh_kCRhKB5BOVNhSmxlYrEQ=w250-h200-p",
                "info": {
                    "raw": "https://149360918.v2.pressablecdn.com/wp-content/uploads/2018/10/cat-18-fowler-cat-grooming.jpeg",
                    "source": "https://www.texvetpets.org/article/grooming-behavior-of-cats/",
                    "alt": "Kitten grooming itself",
                    "website": "www.texvetpets.org",
                    "favicon": "https://encrypted-tbn0.gstatic.com/favicon-tbn?q=tbn:ANd9GcQwAos5Jt2d4uTKF4e4CMksnwO1RIWGvBPWpe1lH3Fpatj972urxtpg5N42ZnNXOcaloxII3o0rJMDEFtOLHxJIwXhEAdITA64EXb9d"
                }
            },
            {
                "tag": "[Image of Kitten playing with yarn]",
                "url": "https://lh3.googleusercontent.com/bip/APOwr80VAt_gg18U2dcTnskrV1P3eppdhWO860r6DvYBBTp-TPlmVg78ghStEr_bnv-76KZ26GeYVlviu_kOprWsqM1YCX9zdqcXk68Plx1W9zxdmn7b6pcP89QFF3Bpe7h74NlXOv30iE5ijW3g-yCYNpJ6N58uhLJafBWDz2sO6BczsJHJs8XYqXJUNnGm6P4D=w250-h200-p",
                "info": {
                    "raw": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/kitten-playing-with-yarn-garry-gay.jpg",
                    "source": "https://pixels.com/featured/kitten-playing-with-yarn-garry-gay.html",
                    "alt": "Kitten playing with yarn",
                    "website": "pixels.com",
                    "favicon": "https://encrypted-tbn1.gstatic.com/favicon-tbn?q=tbn:ANd9GcS0yPn8eV-5MGmAULoO8dkkkrMw7U_TqSkCjKT202XEjTSUv3KWguglXuPdAxbZY5wMg1uxLmRd_87IDLuolGANlWK7KQ"
                }
            }
        ],
        "ids": {
            "conversationID": "c_cfeb92fb4c9879fa",
            "responseID": "r_cfeb92fb4c987917",
            "choiceID": "rc_cfeb92fb4c9874a8",
            "_reqID": "100000"
        }
    })
})