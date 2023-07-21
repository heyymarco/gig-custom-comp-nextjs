'use client'

import './layout.css'

import { StylesCSR } from './StylesCSR' // client_side_rendering CSS (required)
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
                <StylesCSR />
                <StylesSSR />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
