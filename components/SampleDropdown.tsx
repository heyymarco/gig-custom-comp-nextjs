import styles from './SampleDropdown.module.css'
import {
    default as React,
    useState,
} from 'react';
import {
    DropdownListButton,
    ListItem,
    ListSeparatorItem,
    Range,
} from '@reusable-ui/components'



export const SampleDropdown = () => {
    return (
        <DropdownListButton
            theme='primary'
            buttonChildren={
                'Show Menu'
            }
            className={styles.demoDropdown}
        >
            <ListItem>
                A first item
            </ListItem>
            <ListItem>
                A second item
            </ListItem>
            <ListItem className={styles.panelSensivity} actionCtrl={false}>
                <>
                    Sensivity: <Range />
                </>
            </ListItem>
            <ListItem theme='success'>
                Yess
            </ListItem>
            <ListItem theme='danger'>
                Nooo
            </ListItem>
            <ListSeparatorItem />
            <ListItem enabled={false}>
                A disabled item
            </ListItem>
        </DropdownListButton>
    );
}