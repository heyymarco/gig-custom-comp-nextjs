import { ListItem, Navscroll } from "@reusable-ui/components";
import { useRef } from "react";
import { dynamicStyleSheets } from '@cssfn/cssfn-react'



// styles:
const useDummyArticleStyleSheet = dynamicStyleSheets(
    () => import(/* webpackPrefetch: true */'./dummyArticleStyle')
, { id: 'lkfjfg645jhd' });



interface ParagraphLoremProps {
    words? : number
}
const lorems = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem accusantium et ipsam, architecto cupiditate recusandae dolorem itaque tempore expedita commodi eos doloremque molestias. Impedit doloribus maxime rem, iste quia consequuntur?'.split(' ');
const ParagraphLorem = ({ words }: ParagraphLoremProps) => (
    <p>
        { (words ? lorems.slice(0, words) : lorems).join(' ') }
    </p>
);

export const SampleNavigation = () => {
    const styles = useDummyArticleStyleSheet();
    const scrollableArticleRef = useRef<HTMLElement>(null);
    
    return (
        <div className={styles.dummyPage}>
            <article
                ref={scrollableArticleRef}
                
                className={styles.dummyArticle}
            >
                <section>
                    <h1>First section</h1>
                    <ParagraphLorem words={8} />
                </section>
                <section>
                    <h1>Second section</h1>
                    <ParagraphLorem words={8} />
                    <ParagraphLorem words={8} />
                    <ParagraphLorem words={8} />
                </section>
                <section>
                    <h1>Third section</h1>
                    <ParagraphLorem words={8} />
                    <ParagraphLorem words={8} />
                    <ParagraphLorem words={8} />
                </section>
                <section>
                    <h1>Fourth section</h1>
                    <ParagraphLorem words={8} />
                </section>
                <section>
                    <h1>Fifth section</h1>
                    <ParagraphLorem words={8} />
                    <ParagraphLorem words={8} />
                    <ParagraphLorem words={8} />
                </section>
                <section>
                    <h1>Last section</h1>
                    <ParagraphLorem words={8} />
                </section>
            </article>
            
            <Navscroll theme='primary' scrollingOf={scrollableArticleRef}>
                <ListItem>
                    First section
                </ListItem>
                <ListItem>
                    Second section
                </ListItem>
                <ListItem>
                    Third section
                </ListItem>
                <ListItem>
                    Fourth section
                </ListItem>
                <ListItem>
                    Fifth section
                </ListItem>
                <ListItem>
                    Last section
                </ListItem>
            </Navscroll>
        </div>
    );
}