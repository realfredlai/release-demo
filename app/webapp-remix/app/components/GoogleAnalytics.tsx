import Script from "next/script";
import { getConfig } from '@reebok/shared';
import * as gtag from '@/utils/gtag'

const GoogleAnalytics = () => {
    return (
        <>
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${getConfig().google.analyticsId}`} />
        <Script id='config-init'
            strategy='afterInteractive' dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${getConfig().google.analyticsId}', {
                  page_path: window.location.pathname,
                  });
                `,
            }}/>
        </>
    )
}

export default GoogleAnalytics
