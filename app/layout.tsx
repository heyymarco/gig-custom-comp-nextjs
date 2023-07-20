'use client'

import './layout.css'

import './StylesCSR'                    // client_side_rendering CSS (required)
import { StylesSSR } from './StylesSSR' // server_side_rendering CSS (optional)

import '@/theme.config'



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <head>
                <StylesSSR />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
