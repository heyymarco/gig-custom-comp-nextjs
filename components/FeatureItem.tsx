import { Basic, Check, Form, Group } from "@reusable-ui/components"
import { useState } from "react"


export interface FeatureItemProps {
    children ?: React.ReactNode
}
export const FeatureItem = (props: FeatureItemProps) => {
    const [enableValidation, setEnableValidation] = useState<boolean>(false);
    return (
        <Group style={{display: 'flex'}}>
            <Check className='solid' theme={enableValidation ? 'success' : 'primary'} nude={false} onActiveChange={({active}) => setEnableValidation(active)} />
            <Form className='fluid' theme='primary' size='sm' enableValidation={enableValidation} isValid={true}>
                {props.children}
            </Form>
        </Group>
    )
}