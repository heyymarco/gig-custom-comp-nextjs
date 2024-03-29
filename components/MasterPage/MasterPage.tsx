'use client'

import { FeatureItem } from '@/components/FeatureItem'
import { Tab, TabPanel, Accordion, AccordionItem, Icon, Group, Label, Content, ButtonIcon, ListItem } from '@reusable-ui/components'
import { Image } from '@heymarco/image'



// cssfn:
import {
    // style sheets:
    dynamicStyleSheets,
}                           from '@cssfn/cssfn-react'



// styles:
const useMasterPageStyleSheet = dynamicStyleSheets(
    () => import(/* webpackPrefetch: true */'./MasterPageStyle')
, { id: 'csh0nxia9n' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names
import './MasterPageStyle'



export interface MasterPageProps {
    children ?: React.ReactNode
}
export default function MasterPage({children}: MasterPageProps) {
    // styles:
    const styleSheets = useMasterPageStyleSheet();
    
    
    
    return (
        <Content className={styleSheets.page} theme='primary' gradient>
            <Tab
                theme='primaryAlt'
                size='lg'
                gradient={false}
                defaultExpandedTabIndex={1}
                bodyComponent={<Content size='lg' />}
            >
                <TabPanel label={<h4>React</h4>}>
                    <h2>
                        Universal React Component
                    </h2>
                    <div className={styleSheets.featureList}>
                        <FeatureItem>
                            <h3>
                                Works on <code>create-react-app</code>
                            </h3>
                        </FeatureItem>
                        <FeatureItem>
                            <h3>
                                Works on <code>create-next-app</code>
                            </h3>
                        </FeatureItem>
                    </div>
                    <hr />
                    <h2>
                        Cross Browser Support
                    </h2>
                    <div className={styleSheets.featureList}>
                        <FeatureItem>
                            <h3>
                                Works on <strong>Chrome</strong>
                            </h3>
                        </FeatureItem>
                        <FeatureItem>
                            <h3>
                                Works on <strong>Firefox</strong>
                            </h3>
                        </FeatureItem>
                        <FeatureItem>
                            <h3>
                                Works on <strong>Safari</strong>
                            </h3>
                        </FeatureItem>
                        <FeatureItem>
                            <h3>
                                Works on <strong>Edge</strong>
                            </h3>
                        </FeatureItem>
                    </div>
                </TabPanel>
                <TabPanel label={<h4>Custom Components</h4>}>
                    <Accordion theme='primary'>
                        <AccordionItem bodyComponent={<ListItem className={styleSheets.featurePanel} />} label={<h3><Icon icon='account_tree' /> Composition</h3>} defaultExpanded={true}>
                            <p>
                                Made up from <code>JSX</code>, <code>props</code> and <code>state</code> with <em>no</em> / <em>minimal</em> vanilla JS.
                            </p>
                            <p>
                                No <code>JQuery</code>. Everything is written in <em>react way</em>.
                            </p>
                        </AccordionItem>
                        <AccordionItem bodyComponent={<ListItem className={styleSheets.featurePanel} />} label={<h3><Icon icon='format_list_bulleted' /> Intellisense Friendly</h3>} defaultExpanded={true}>
                            <p>
                                Written in <strong>TypeScript</strong>. Useful for <em>VS Code</em> suggestion dropdown &amp; autocomplete.
                            </p>
                        </AccordionItem>
                        <AccordionItem bodyComponent={<ListItem className={styleSheets.featurePanel} />} label={<h3><Icon icon='color_lens' /> Theme-able</h3>} defaultExpanded={true}>
                            <p style={{display: 'inline'}}>
                                Contextual theme:
                            </p>
                            <Group style={{display: 'inline-flex', marginInlineStart: '1rem'}}>
                                <Label theme='primary' mild={false}>Primary</Label>
                                <Label theme='danger' mild={false}>Danger</Label>
                                <Label theme='success' mild={false}>Success</Label>
                                <Label theme='warning' mild={false}>Warning</Label>
                                <Label theme='dark' mild={false}>Custom 1</Label>
                                <Label theme='info' mild={false}>Custom 2</Label>
                            </Group>
                        </AccordionItem>
                        <AccordionItem bodyComponent={<ListItem className={styleSheets.featurePanel} />} label={<h3><Icon icon='tune' /> Customizable</h3>} defaultExpanded={true}>
                            <p>
                                Using css variables <code>--cust-something: 2em;</code> to customize the component.
                            </p>
                            <p>
                                No <em>SASS variables</em>, everything are <code>CSS variables</code>.
                            </p>
                        </AccordionItem>
                    </Accordion>
                </TabPanel>
                <TabPanel label={<h4>Samples</h4>}>
                    {children}
                </TabPanel>
                <TabPanel label={<h4>I&apos;m on Fiverr</h4>}>
                    <div className={styleSheets.profile}>
                        <Image alt='' src='/marco.jpg' priority={true} className={styleSheets.profileImg} sizes='125w' />
                        <div>
                            <p>
                                Hi I&apos;m Marco. 
                            </p>
                            <p>
                                I&apos;m a front-end web developer. My main job is developing web component in React. I created & maintain over 100+ custom components, hooks, & libs on Github/NPM.
                            </p>
                            <p>
                                I&apos;m on <strong>Fiverr</strong>, waiting for your order to fulfill my <em>passionable job</em>.<br />
                                <ButtonIcon icon='fiverr' theme='success' buttonStyle='link' href='https://www.fiverr.com/heymarco/develop-a-reusable-custom-react-component-ui-widget'>
                                    https://www.fiverr.com/heymarco
                                </ButtonIcon>
                            </p>
                        </div>
                    </div>
                    <hr />
                    <h4>
                        With my service, you&apos;ll get:
                    </h4>
                    <div className={styleSheets.featureList}>
                        <FeatureItem>
                            <h4>
                                High Quality React Component
                            </h4>
                            <p className='lead'>
                                It&apos;s <strong>crafted for you</strong>, based on <em>your requirement</em>.
                                Much better than Bootstrap, Material UI, Chakra UI, and so on.
                            </p>
                        </FeatureItem>
                        <FeatureItem>
                            <h4>
                                Long Term Warranty
                            </h4>
                            <p className='lead'>
                                Even if the delivered project was out of warranty, you still get a <strong>free light modification request</strong>.
                            </p>
                            <p className='lead'>
                                If the modification seems a quite massive, an additional cost may apply.
                            </p>
                        </FeatureItem>
                        <FeatureItem>
                            <h4>
                                Includes My Maintained Libs
                            </h4>
                            <p className='lead'>
                                The delivered component may includes my <strong>pre written libs/utilities/sub_components</strong>.
                                These codes are <strong>actively maintained</strong> under my service.
                                Any bug report will be fixed as soon as possible.
                            </p>
                        </FeatureItem>
                    </div>
                </TabPanel>
            </Tab>
        </Content>
    )
}
