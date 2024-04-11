import Head from 'next/head';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>YVR-HACKS</title>
        <link rel="icon" type="image/png" sizes="32x32" href="image/logo.png" />
      </head>
      <body>
        <div>
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
    
  );
}